from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from models.user import User


def get_job_like_score(job_id: str, *idss: list[str]) -> int:
    score = 0
    for ids in idss:
        if job_id in ids:
            score += 1
    return score


def get_user_like_score(job_id: str, user: User) -> int | None:
    return user.get_job_like_score(job_id)
