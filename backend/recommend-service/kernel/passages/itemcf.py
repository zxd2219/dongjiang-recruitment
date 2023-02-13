from models.job import Job
from models.user import User


def itemCF(user: User, n: int = 40, k: int = 5, top: int = 10) -> list[int]:
    jobs_score = {}
    user_top_n_like_jobs = user.get_top_like_jobs(n)
    for job_id, like_score in user_top_n_like_jobs:
        top_k_similar_jobs = Job(job_id).get_top_similar_jobs(k)
        for similar_job_id, similar_score in top_k_similar_jobs:
            may_like_score = similar_score * like_score
            if similar_job_id not in jobs_score:
                jobs_score[similar_job_id] = may_like_score
            else:
                jobs_score[similar_job_id] += may_like_score
    return sorted(jobs_score.items(), key=lambda x: x[1], reverse=True)[:top]
