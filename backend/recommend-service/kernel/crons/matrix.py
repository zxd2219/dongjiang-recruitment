import torch
from torch.autograd import Variable
from models.job import Job
from models.user import User

embedding_len = 20
learning_rate = 1e-6
punishment_severity = 0.00001


def recompute_matrix_factorization_model():
    users: list[User] = db.get_all_users()
    jobs: list[Job] = db.get_all_jobs()
    userIds = []
    jobIds = []
    scores = []
    for user in users:
        for job_id, score in user.job_like_scores:
            userIds.append(user.id)
            jobIds.append(job_id)
            scores.append(score)
    # 用户参数
    U = Variable(
        torch.randn(
            [len(set(userIds)), embedding_len]
        ),
        requires_grad=True
    )
    # 职位参数
    P = Variable(
        torch.randn(
            [len(set(jobIds)), embedding_len]
        ),
        requires_grad=True
    )
    # 定义网络
    R = torch.mm(U, P.t())
    # 预测值
    forecast_score = torch.gather(
        R.view(1, -1)[0],
        0,
        Variable(
            torch.LongTensor(
                userIds * len(set(jobIds)) + jobIds
            )
        )
    )
    # 预测值与实际值的差值
    different = forecast_score - Variable(torch.FloatTensor(scores))
    # 基础损失函数（均方误差）
    baseLoss = different.pow(2).sum()
    # 正则化（L2范数）
    regularizer = punishment_severity * (U.pow(2).sum()+P.pow(2).sum())
    # 正则化损失函数
    loss = baseLoss + regularizer
    # 优化器（梯度下降）
    optimizer = torch.optim.SGD([U, P], lr=learning_rate, momentum=0.9)

    for i in range(len(userIds)):
        # 反向传播
        loss.backward()
        # 更新参数
        optimizer.step()
        R = torch.mm(U, P.t())
        # 预测值
        forecast_score = torch.gather(
            R.view(1, -1)[0],
            0,
            Variable(
                torch.LongTensor(
                    userIds * len(set(jobIds)) + jobIds
                )
            )
        )
        # 预测值与实际值的差值
        different = forecast_score - Variable(torch.FloatTensor(scores))
        # 基础损失函数（均方误差）
        baseLoss = different.pow(2).sum()
        # 正则化（L2范数）
        regularizer = punishment_severity * (U.pow(2).sum()+P.pow(2).sum())
        # 正则化损失函数
        loss = baseLoss + regularizer

    for user in users:
        u_index = list(set(userIds)).index(user.id)
        user.embedding = U[u_index].data.numpy()
        user.save()
    for job in jobs:
        j_index = list(set(jobIds)).index(job.id)
        job.embedding = P[j_index].data.numpy()
        job.save()
