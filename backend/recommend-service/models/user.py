from __future__ import annotations
from kernel.basic import UserSimilarityScore
from models.job import Job


class User:
    def __init__(self, id):
        self.id = id
        self.embedding = None
        self.job_like_scores = set()
        self.user_similar_scores = set()
        self.viewed_jobs = set()
        self.applied_jobs = set()
        self.collect_jobs = set()
        self.shared_jobs = set()

    def apply_job_action(self, job_id: int, action: "view" | "apply" | "collect" | "share"):
        match action:
            case "view":
                self.viewed_jobs.add(job_id)
            case "apply":
                self.applied_jobs.add(job_id)
            case "collect":
                self.collect_jobs.add(job_id)
            case "share":
                self.shared_jobs.add(job_id)
            case _:
                return {"message": "bad request"}
        db.set_user_job_like_score(
            self.id, job_id, self.get_job_like_score(job_id)
        )
        return {"message": "success"}

    def get_job_like_score(self, job: Job) -> int:
        return sum([self.viewed_jobs.get(job.id, 0), self.applied_jobs.get(job.id, 0), self.collect_jobs.get(job.id, 0), self.shared_jobs.get(job.id, 0)])

    def get_user_similar_score(self, user: User) -> int:
        return UserSimilarityScore(self, user, 10)

    def get_top_like_jobs(self, n: int) -> list[tuple[int, int]]:
        return sorted(self.job_like_scores, key=lambda j: j.score, reverse=True)[:n]

    def get_top_similar_users(self, n: int) -> list[tuple[int, int]]:
        return sorted(self.user_similar_scores, key=lambda u: u.score, reverse=True)[:n]

    def save(self):
        db.set_user(self.id, self)
