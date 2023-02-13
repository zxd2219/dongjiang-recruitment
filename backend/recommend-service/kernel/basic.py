import math

from models.job import Job
from models.user import User


# 计算职位job1和职位job2的相似度
# 对job1和job2同时喜欢的用户越多，相似度越高
# job1：职位1，job2：职位2
def JobSimilarityScore(job1: Job, job2: Job, n: int = 10):
    # 最喜欢job1的n个用户集合
    w1 = set(job1.get_top_like_users(n))
    # 最喜欢job2的n个用户集合
    w2 = set(job2.get_top_like_users(n))
    # 两个职位都喜欢的用户集合
    v = w1 & w2
    # 计算余弦相似度
    return len(v) / math.sqrt(len(w1) * len(w2))


# 计算用户user1和用户user2的相似度
# user1和user2同时喜欢的职位越多，相似度越高
# user1：用户1，user2：用户2
def UserSimilarityScore(user1: User, user2: User, n: int = 10):
    # 用户1喜欢的职位集合
    j1 = set(user1.get_top_like_jobs(n))
    # 用户2喜欢的职位集合
    j2 = set(user2.get_top_like_jobs(n))
    # 两个用户都喜欢的职位集合
    i = j1 & j2
    # 计算余弦相似度
    return sum(map(lambda j: 1 / math.log(1 + len(j.users)), i)) / math.sqrt(len(j1) * len(j2)) / math.sqrt(len(j1) * len(j2))


# 内积相似度算法
def InnerProductSimilarityScore(embedding1: list[int], embedding2: list[int]):
    return sum(map(lambda x: x[0] * x[1], zip(embedding1, embedding2)))
