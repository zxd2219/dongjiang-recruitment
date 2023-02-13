import os
from models.user import User
from fastapi import FastAPI, Depends
from kernel.crons import job, user, matrix
from utils.auth import get_current_active_user
from kernel.passages.itemcf import itemCF
from kernel.passages.usercf import userCF
from kernel.passages.matrix import matrixF
from kernel.sortings.dssm import dssm
from kernel.sortings.mmr import mmr

# 判断环境变量是否为定时任务模式
if os.environ.get("IS_CRON", "false") == "true":
    job.recompute_job_to_job_similar_score()
    user.recompute_user_to_user_similar_score()
    matrix.recompute_matrix_factorization_model()
    exit(0)

app = FastAPI()


@app.get("/jobs")
def get_recommend_jobs(n: int, current_user: User = Depends(get_current_active_user)):
    # 根据用户的历史行为召回候选职位
    item_cf_jobs = itemCF(current_user, 40, 5, 10)
    user_cf_jobs = userCF(current_user, 40, 5, 10)
    matrix_f_jobs = matrixF(current_user, 200)
    # 对召回结果进行和并后去重
    add_job_ids = set()
    recommend_jobs = []
    for job_id, score in item_cf_jobs:
        if job_id not in add_job_ids:
            add_job_ids.add(job_id)
            recommend_jobs.append((job_id, score))
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    for job_id, score in user_cf_jobs:
        if job_id not in add_job_ids:
            add_job_ids.add(job_id)
            recommend_jobs.append((job_id, score))
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    for job_id, score in matrix_f_jobs:
        if job_id not in add_job_ids:
            add_job_ids.add(job_id)
            recommend_jobs.append((job_id, score))
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    # 对数据进行多样性重排
    recommend_jobs = mmr(recommend_jobs, 20)
    # 返回前 n 个结果
    return recommend_jobs[:n]


@app.post("/jobs/{job_id}")
def apply_user_job_action(job_id: int, action: "view" | "apply" | "collect" | "share", current_user: User = Depends(get_current_active_user)):
    match action:
        case "view":
            current_user.viewed_jobs.add(job_id)
        case "apply":
            current_user.applied_jobs.add(job_id)
        case "collect":
            current_user.collect_jobs.add(job_id)
        case "share":
            current_user.shared_jobs.add(job_id)
        case _:
            return {"message": "bad request"}
    current_user.recompute_job_like_scores()
    return {"message": "success"}
