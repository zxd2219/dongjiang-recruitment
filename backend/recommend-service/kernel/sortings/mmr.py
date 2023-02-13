from kernel.basic import JobSimilarityScore
from models.job import Job
from models.user import User


def mmr(jobs: list[tuple[int, int]], rate: float = 0.5, n: int = 10):
    # 将所有已选中的职位移植
    chose_jobs = []
    mr = map(
        lambda j: [
            j[0],
            rate * j[1] - (1-rate) * max(
                map(
                    lambda y: JobSimilarityScore(Job(j[0]), Job(y[0])),
                    chose_jobs
                )
            )
        ],
        jobs
    )
    return sorted(mr, key=lambda x: x[1], reverse=True)[:n]
