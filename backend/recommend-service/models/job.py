from __future__ import annotations
from kernel.basic import JobSimilarityScore
from models.user import User


class Job:
    def __init__(self, id):
        self.id = id
        self.embedding = None
        self.user_like_scores = set()
        self.job_similar_scores = set()

    def get_user_like_score(self, user: User) -> int:
        return sum([user.viewed_jobs.get(self.id, 0), user.applied_jobs.get(self.id, 0), user.collect_jobs.get(self.id, 0), user.shared_jobs.get(self.id, 0)])

    def get_job_similar_score(self, job: Job) -> int:
        return JobSimilarityScore(self, job, 10)

    def get_top_like_users(self, n: int) -> list[tuple[int, int]]:
        return sorted(self.user_like_scores, key=lambda u: u.score, reverse=True)[:n]

    def get_top_similar_jobs(self, n: int) -> list[tuple[int, int]]:
        return sorted(self.job_similar_scores, key=lambda j: j.score, reverse=True)[:n]

    def save(self):
        db.set_job(self.id, self)
