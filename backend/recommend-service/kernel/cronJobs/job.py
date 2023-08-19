from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from models.user import User
    from models.job import Job
from kernel.algorithm.similarity import get_job_similarity_score, get_text_similarity_score
from kernel.algorithm.like import get_user_like_score
from utils.database import db
import threading
import math


def recompute_user_like_scores_thread(jobs: list[Job], all_user: list[User]):
    for job in jobs:
        has_action_user = list(filter(lambda u: u.get_job_like_score(job.id) is not None, all_user))  # NOQA
        job.user_like_scores = sorted(list(
            map(
                lambda u: (
                    u.id,
                    get_user_like_score(
                        job.id,
                        u
                    )
                ),
                has_action_user
            )
        ), key=lambda x: x[1], reverse=True)
        db.save_job(job)


def recompute_user_like_scores():
    all_job = list(map(lambda id: db.get_job(id), db.get_all_job_ids()))
    all_user = list(map(lambda id: db.get_user(id), db.get_all_user_ids()))
    step = math.ceil(len(all_job) / 30)
    threads: list[threading.Thread] = list()
    for index in range(0, len(all_job), step):
        thread = threading.Thread(
            target=recompute_user_like_scores_thread,
            args=(all_job[index: index + step], all_user)
        )
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()


def recompute_job_similar_scores_thread(jobs: list[Job], all_job: list[Job]):
    for job in jobs:
        job_similar_scores = list()
        for other_job in all_job:
            if job.id != other_job.id:
                similarity_score = get_job_similarity_score(job, other_job, -1)  # NOQA
                if similarity_score > 0:
                    job_similar_scores.append((other_job.id, similarity_score))
        job.job_similar_scores = sorted(job_similar_scores, key=lambda x: x[1], reverse=True)  # NOQA
        db.save_job(job)


def recompute_job_similar_scores():
    all_job = list(map(lambda id: db.get_job(id), db.get_all_job_ids()))
    step = math.ceil(len(all_job) / 30)
    threads: list[threading.Thread] = list()
    for index in range(0, len(all_job), step):
        thread = threading.Thread(
            target=recompute_job_similar_scores_thread,
            args=(all_job[index: index + step], all_job)
        )
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()


def recompute_content_similar_scores_thread(jobs: list[Job], all_job: list[Job], changed_job_ids: list[str] | None):  # NOQA
    for job in jobs:
        content_similar_scores = list()
        for other_job in all_job:
            if job.id != other_job.id:
                cached_score = job.get_content_similar_score(other_job.id)
                if cached_score is not None and changed_job_ids is not None and job.id not in changed_job_ids and other_job.id not in changed_job_ids:  # NOQA
                    content_similar_scores.append((other_job.id, cached_score))
                    continue
                similarity_score = get_text_similarity_score(db.get_job_content(job.id), db.get_job_content(other_job.id))  # NOQA
                if similarity_score > 0:
                    content_similar_scores.append((other_job.id, similarity_score))  # NOQA
        job.content_similar_scores = sorted(content_similar_scores, key=lambda x: x[1], reverse=True)  # NOQA
        db.save_job(job)


def recompute_content_similar_scores():
    all_job = list(map(lambda id: db.get_job(id), db.get_all_job_ids()))
    changed_job_ids = db.get_changed_job_ids()
    step = math.ceil(len(all_job) / 30)
    threads: list[threading.Thread] = list()
    for index in range(0, len(all_job), step):
        thread = threading.Thread(
            target=recompute_content_similar_scores_thread,
            args=(all_job[index: index + step], all_job, changed_job_ids)
        )
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()
