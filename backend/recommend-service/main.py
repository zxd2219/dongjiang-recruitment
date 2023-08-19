from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kernel.passages.content import content
from kernel.passages.itemcf import itemCF
from kernel.passages.usercf import userCF
from kernel.cronJobs import job, user
from kernel.sortings.mmr import mmr
from utils.database import db
import requests
import uvicorn
import json
import yaml
import os


# 注意不要改变任意 recompute 的顺序
def _recompute_parameters():
    db.start_cache()
    user.recompute_job_like_scores()  # 重新计算职位喜欢分数
    job.recompute_user_like_scores()  # 重新计算用户喜欢分数
    user.recompute_user_similar_scores()  # 重新计算用户相似度
    job.recompute_job_similar_scores()  # 重新计算职位相似度
    job.recompute_content_similar_scores()  # 重新计算职位内容相似度
    db.change_last_update_time()  # 更新最后更新时间
    db.clear_recommend_cache()
    db.stop_cache()


# 判断环境变量是否为定时任务模式
if os.environ.get("IS_CRON", "false") == "true":
    _recompute_parameters()
    exit(0)


config = yaml.load(
    open("/etc/dongjiang-recruitment/config.yaml"),
    Loader=yaml.FullLoader
)

API_BASE_URL = config["service"]["baseUrl"]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/recommend/recompute_parameters")
def recompute_parameters():
    _recompute_parameters()
    return {"msg": "success"}


def login_as_admin():
    url = API_BASE_URL + "/authentication/actions/login"
    payload = json.dumps({
        "userName": config["service"]["username"],
        "password": config["service"]["password"],
    })
    headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()["body"]["token"]


def _send_recommend_message(body, token: str):
    url = API_BASE_URL + "/common/sendRecommend"
    payload = json.dumps(body)
    headers = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
        'Accept': '*/*',
    }
    requests.request("POST", url, headers=headers, data=payload)


@app.get("/recommend/send_recommend_message")
def send_recommend_message():
    token = login_as_admin()
    user_ids = db.get_all_user_ids()
    for user_id in user_ids:
        recommend_job = get_recommend_jobs(user_id)
        if recommend_job is not None and len(recommend_job) > 0:
            _send_recommend_message({
                "userId": user_id,
                "positionId": recommend_job[0][0],
            }, token)
    return {"msg": "success"}


@app.get("/recommend/get_recommend_jobs")
def get_recommend_jobs(id: str):
    cache = db.get_recommend_cache(id)
    if cache is not None:
        return cache
    user = db.get_user(id)
    if user is None:
        return list()
    # 根据用户的历史行为召回候选职位
    item_cf_jobs = itemCF(user, 100, 20)
    user_cf_jobs = userCF(user, 100, 20)
    content_jobs = content(user, 10, 5)
    # matrix_f_jobs = matrixF(user, 200)
    # 对召回结果进行和并后去重
    recommend_jobs = dict()
    for job_id, score in item_cf_jobs:
        if user.get_job_like_score(job_id) is not None:
            continue
        if not job_id in recommend_jobs:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id] = (job_id, score)
    for job_id, score in user_cf_jobs:
        if user.get_job_like_score(job_id) is not None:
            continue
        if not job_id in recommend_jobs:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id] = (job_id, score)
    for job_id, score in content_jobs:
        if user.get_job_like_score(job_id) is not None:
            continue
        if not job_id in recommend_jobs:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id] = (job_id, score)
    # 对数据进行多样性重排
    recommend_jobs_list = mmr(list(recommend_jobs.values()), 0.4)
    db.set_recommend_cache(id, recommend_jobs_list)
    return recommend_jobs_list


if __name__ == "__main__":
    uvicorn.run("__main__:app", host="0.0.0.0", port=8000, reload=True)
