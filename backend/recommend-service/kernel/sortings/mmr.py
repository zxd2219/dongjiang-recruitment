from utils.database import db
from models.job import Job


def get_job_similarity_score(job1: Job, job2_id: str) -> float:
    score = job1.get_content_similar_score(job2_id)
    if score == None:
        return 0
    return score


def get_max_job_similarity_score(job: Job, selected_jobs: list[tuple[str, int]]) -> float:
    max_score = 0
    for job_id, _ in selected_jobs:
        score = get_job_similarity_score(job, job_id)
        if score > max_score:
            max_score = score
    return max_score


def get_max_mmr_score_job(selected_jobs: list[tuple[str, int]], unselected_jobs: list[tuple[str, int]], rate: float = 0.5) -> tuple[str, int]:
    max_mmr_job = None
    max_mmr_score = -1
    for job_id, job_score in unselected_jobs:
        mmr_score = rate * job_score - (1 - rate) * get_max_job_similarity_score(db.get_job(job_id), selected_jobs)  # NOQA
        if mmr_score > max_mmr_score:
            max_mmr_score = mmr_score
            max_mmr_job = (job_id, job_score)
    return max_mmr_job


def mmr(jobs: list[tuple[str, int]], rate: float = 0.5, n: int | None = None) -> list[tuple[str, int]]:
    selected_jobs = []
    unselected_jobs = jobs
    try:
        db.start_cache()
        if n == None:
            while len(unselected_jobs) > 0:
                max_mmr_job = get_max_mmr_score_job(selected_jobs, unselected_jobs, rate)  # NOQA
                selected_jobs.append(max_mmr_job)
                unselected_jobs.remove(max_mmr_job)
        else:
            for _ in range(n):
                max_mmr_job = get_max_mmr_score_job(selected_jobs, unselected_jobs, rate)  # NOQA
                selected_jobs.append(max_mmr_job)
                unselected_jobs.remove(max_mmr_job)
    finally:
        db.stop_cache()
    return selected_jobs
