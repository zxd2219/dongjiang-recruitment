from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from models.user import User
from kernel.algorithm.similarity import get_user_similarity_score
from kernel.algorithm.like import get_job_like_score
from utils.database import db
import threading
import math


def recompute_job_like_scores_thread(users: list[User]):
    for user in users:
        viewed_job_ids = db.get_all_user_viewed_job_ids(user.id)
        applied_job_ids = db.get_all_user_applied_job_ids(user.id)
        collect_job_ids = db.get_all_user_collect_job_ids(user.id)
        has_action_job_ids = set(viewed_job_ids + applied_job_ids + collect_job_ids)  # NOQA
        user.job_like_scores = sorted(list(
            map(
                lambda j: (
                    j,
                    get_job_like_score(
                        j,
                        viewed_job_ids,
                        applied_job_ids,
                        collect_job_ids
                    )
                ),
                has_action_job_ids
            )
        ), key=lambda x: x[1], reverse=True)
        db.save_user(user)


def recompute_job_like_scores():
    all_user = list(map(lambda id: db.get_user(id), db.get_all_user_ids()))  # NOQA
    step = math.ceil(len(all_user) / 30)
    threads: list[threading.Thread] = list()
    for index in range(0, len(all_user), step):
        thread = threading.Thread(
            target=recompute_job_like_scores_thread,
            args=(all_user[index: index + step],)
        )
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()


def recompute_user_similar_scores_thread(users: list[User], all_user: list[User]):  # NOQA
    for user in users:
        user_similar_scores = list()
        for other_user in all_user:
            if user.id != other_user.id:
                similarity_score = get_user_similarity_score(user, other_user, -1)  # NOQA
                if similarity_score > 0:
                  user_similar_scores.append((other_user.id, similarity_score))
        user.user_similar_scores = sorted(user_similar_scores, key=lambda x: x[1], reverse=True)  # NOQA
        db.save_user(user)


def recompute_user_similar_scores():
    all_user = list(map(lambda id: db.get_user(id), db.get_all_user_ids()))  # NOQA
    step = math.ceil(len(all_user) / 30)
    threads: list[threading.Thread] = list()
    for index in range(0, len(all_user), step):
        thread = threading.Thread(
            target=recompute_user_similar_scores_thread,
            args=(all_user[index: index + step], all_user)
        )
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()
