from models.user import User


def userCF(user: User, n: int = 40, k: int = 5, top: int = 10) -> list[int]:
    jobs_score = {}
    user_top_n_similar_users = user.get_top_similar_users(n)
    for similar_user_id, similar_score in user_top_n_similar_users:
        top_k_like_jobs = User(similar_user_id).get_top_like_jobs(k)
        for job_id, like_score in top_k_like_jobs:
            may_like_score = similar_score * like_score
            if job_id not in jobs_score:
                jobs_score[job_id] = may_like_score
            else:
                jobs_score[job_id] += may_like_score
    return sorted(jobs_score.items(), key=lambda x: x[1], reverse=True)[:top]
