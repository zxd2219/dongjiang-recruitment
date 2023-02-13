from kernel.basic import JobSimilarityScore
from models.job import Job


def recompute_job_to_job_similar_score():
    jobs: list[Job] = db.get_all_jobs()
    for job in jobs:
        job.job_similar_scores = set()
        for other_job in jobs:
            if job.id != other_job.id:
                job.job_similar_scores.add(
                    JobSimilarityScore(job, other_job)
                )
        job.save()
