class Job:
    def __init__(self, id: str | None = None, dict: dict | None = None):
        self.id: str = id if dict is None else dict["id"]  # NOQA
        self.embedding: list[float] = [] if dict is None else dict["embedding"]  # NOQA
        self.user_like_scores: list[tuple[str, int]] = [] if dict is None else list(map(lambda x: (x[0], x[1]), dict["user_like_scores"]))  # NOQA
        self.user_like_scores_dict: dict[str, int] | None = None
        self.job_similar_scores: list[tuple[str, int]] = [] if dict is None else list(map(lambda x: (x[0], x[1]), dict["job_similar_scores"]))  # NOQA
        self.job_similar_scores_dict: dict[str, int] | None = None
        self.content_similar_scores: list[tuple[str, int]] = [] if dict is None else list(map(lambda x: (x[0], x[1]), dict["content_similar_scores"]))  # NOQA
        self.content_similar_scores_dict: dict[str, int] | None = None

    def get_user_like_score(self, user_id: str, default: int | None = None) -> int | None:
        if self.user_like_scores_dict is None:
            self.user_like_scores_dict = dict(self.user_like_scores)
        return self.user_like_scores_dict.get(user_id, default)

    def get_job_similar_score(self, job_id: str, default: int | None = None) -> int | None:
        if self.job_similar_scores_dict is None:
            self.job_similar_scores_dict = dict(self.job_similar_scores)
        return self.job_similar_scores_dict.get(job_id, default)

    def get_content_similar_score(self, job_id: str, default: int | None = None) -> int | None:
        if self.content_similar_scores_dict is None:
            self.content_similar_scores_dict = dict(self.content_similar_scores)  # NOQA
        return self.content_similar_scores_dict.get(job_id, default)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "embedding": self.embedding,
            "user_like_scores": self.user_like_scores,
            "job_similar_scores": self.job_similar_scores,
            "content_similar_scores": self.content_similar_scores
        }
