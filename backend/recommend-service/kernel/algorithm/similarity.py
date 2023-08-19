from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from models.user import User
    from models.job import Job
from kernel.algorithm.like import get_user_like_score
from utils.database import db
from simhash import Simhash
import math


def get_job1_score_mul_like_job1_score(user: User, *job_ids: list[str]) -> int:
    score = 1
    for job_id in job_ids:
        score *= get_user_like_score(job_id, user)
    return score


# 计算职位job1和职位job2的相似度
# 对job1和job2同时喜欢的用户越多，相似度越高
# job1：职位1，job2：职位2
def get_job_similarity_score(job1: Job, job2: Job, n: int = 10):
    # 最喜欢job1的n个用户集合
    w1 = set(job1.user_like_scores[:n] if n >= 0 else job1.user_like_scores)
    # 最喜欢job2的n个用户集合
    w2 = set(job2.user_like_scores[:n] if n >= 0 else job2.user_like_scores)
    # 两个职位都喜欢的用户集合
    v = w1 & w2
    # 计算余弦相似度
    p1 = sum(map(lambda w: get_job1_score_mul_like_job1_score(db.get_user(w[0]), job1.id, job2.id), v))  # NOQA
    p2 = math.sqrt(sum(map(lambda w: get_user_like_score(job1.id, db.get_user(w[0])) ** 2, w1)))  # NOQA
    p3 = math.sqrt(sum(map(lambda w: get_user_like_score(job2.id, db.get_user(w[0])) ** 2, w2)))  # NOQA
    if p2 == 0 or p3 == 0:
        return 0
    return p1 / (p2 * p3)  # NOQA


def get_one_division_ln_one_plus_job_like_count(job: Job):
    ln_one_plus_job_like_count = math.log(1 + len(job.user_like_scores))
    if ln_one_plus_job_like_count == 0:
        return 0
    return 1 / ln_one_plus_job_like_count


# 计算用户user1和用户user2的相似度
# user1和user2同时喜欢的职位越多，相似度越高
# user1：用户1，user2：用户2
def get_user_similarity_score(user1: User, user2: User, n: int = 10):
    # 用户1喜欢的职位集合
    j1 = set(user1.job_like_scores[:n] if n >= 0 else user1.job_like_scores)
    # 用户2喜欢的职位集合
    j2 = set(user2.job_like_scores[:n] if n >= 0 else user2.job_like_scores)
    # 两个用户都喜欢的职位集合
    i = j1 & j2
    # 计算余弦相似度
    p1 = sum(map(lambda j: get_one_division_ln_one_plus_job_like_count(db.get_job(j[0])), i))  # NOQA
    p2 = math.sqrt(len(j1) * len(j2))
    if p2 == 0:
        return 0
    return p1 / p2  # NOQA


# 内积相似度算法
def get_inner_product_similarity_score(embedding1: list[int], embedding2: list[int]):
    return sum(map(lambda x: x[0] * x[1], zip(embedding1, embedding2)))


def get_text_similarity_score(text1: str, text2: str):
    simhash1 = Simhash(text1)
    simhash2 = Simhash(text2)
    # 最大hash位数
    max_hashbit = max(len(bin(simhash1.value)), len(bin(simhash2.value)))
    # 汉明距离
    distince = simhash1.distance(simhash2)
    # 相似度
    similar = 1 - distince / max_hashbit
    return similar
