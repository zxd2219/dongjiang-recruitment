class User:
    def __init__(self, id: str | None = None, dict: dict | None = None):
        self.id: str = id if dict is None else dict["id"]  # NOQA
        self.embedding: list[float] = [] if dict is None else dict["embedding"]  # NOQA
        self.job_like_scores: list[tuple[str, int]] = [] if dict is None else list(map(lambda x: (x[0], x[1]), dict["job_like_scores"]))  # NOQA
        self.job_like_scores_dict: dict[str, int] | None = None
        self.user_similar_scores: list[tuple[str, int]] = [] if dict is None else list(map(lambda x: (x[0], x[1]), dict["user_similar_scores"]))  # NOQA
        self.user_similar_scores_dict: dict[str, int] | None = None

    def get_job_like_score(self, job_id: str, default: int | None = None) -> int | None:
        if self.job_like_scores_dict is None:
            self.job_like_scores_dict = dict(self.job_like_scores)
        return self.job_like_scores_dict.get(job_id, default)

    def get_user_similar_score(self, user_id: str, default: int | None = None) -> int | None:
        if self.user_similar_scores_dict is None:
            self.user_similar_scores_dict = dict(self.user_similar_scores)
        return self.user_similar_scores_dict.get(user_id, default)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "embedding": self.embedding,
            "job_like_scores": self.job_like_scores,
            "user_similar_scores": self.user_similar_scores,
        }
