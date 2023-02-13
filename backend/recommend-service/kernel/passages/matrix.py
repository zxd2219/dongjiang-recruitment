from kernel.basic import InnerProductSimilarityScore
from models.job import Job
from models.user import User


def matrixF(user: User, top: int = 10) -> list[int]:
    jobs_score = {}
    all_jobs: list[Job] = db.get_all_jobs()
    for job in all_jobs:
        score = InnerProductSimilarityScore(user.embedding, job.embedding)
        jobs_score[job.id] = score
    return sorted(jobs_score.items(), key=lambda x: x[1], reverse=True)[:top]
