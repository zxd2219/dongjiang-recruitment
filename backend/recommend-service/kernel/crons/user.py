from kernel.basic import UserSimilarityScore
from models.user import User


def recompute_user_to_user_similar_score():
    users: list[User] = db.get_all_users()
    for user in users:
        user.user_similar_scores = set()
        for other_user in users:
            if user.id != other_user.id:
                user.user_similar_scores.add(
                    UserSimilarityScore(user.id, other_user.id)
                )
        db.set_users_to_user_similar_score(user.id, user.user_similar_scores)
