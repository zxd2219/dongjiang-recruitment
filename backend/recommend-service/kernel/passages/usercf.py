from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from models.user import User
from utils.database import db


def userCF(user: User, n: int = 40, k: int = 5) -> list[tuple[str, int]]:
    jobs_score = {}
    user_top_n_similar_users = user.user_similar_scores[:n]
    for similar_user_id, user_similar_score in user_top_n_similar_users:
        top_k_like_jobs = db.get_user(similar_user_id).job_like_scores[:k]
        for like_job_id, job_like_score in top_k_like_jobs:
            may_like_score = user_similar_score * job_like_score
            if like_job_id not in jobs_score:
                jobs_score[like_job_id] = may_like_score
            else:
                jobs_score[like_job_id] += may_like_score
    return sorted(jobs_score.items(), key=lambda x: x[1], reverse=True)  # NOQA
