from __future__ import annotations
from contextlib import contextmanager
import time
from models.job import Job
from models.user import User
from psycopg2 import pool, extensions
import pymongo
import yaml


config = yaml.load(
    open("/etc/dongjiang-recruitment/config.yaml"),
    Loader=yaml.FullLoader
)


class DataBase:
    def __init__(self):
        self.use_cache = False
        self.job_cache = {}
        self.user_cache = {}
        self.job_content_cache = {}
        # 初始化 postgresql_connection_pool
        postgresql_connection_pool = pool.SimpleConnectionPool(
            5, 100,
            host=config["database"]["host"],
            port=config["database"]["port"],
            user=config["database"]["username"],
            password=config["database"]["password"],
            dbname=config["database"]["database"],
            keepalives=1,
            keepalives_idle=30,
            keepalives_interval=10,
            keepalives_count=5
        )
        self.postgresql_connection_pool = postgresql_connection_pool
        # 初始化 postgresql_client
        mongo_client = pymongo.MongoClient(
            host=config["mongo"]["host"],
            port=config["mongo"]["port"],
            username=config["mongo"]["username"],
            password=config["mongo"]["password"],
        )
        mongo_database = mongo_client[config["mongo"]["database"]]
        self.user_collection = mongo_database[config["mongo"]["user_collection"]]  # NOQA
        self.job_collection = mongo_database[config["mongo"]["job_collection"]]  # NOQA
        self.cache_collection = mongo_database[config["mongo"]["cache_collection"]]  # NOQA
        self.history_collection = mongo_database[config["mongo"]["history_collection"]]  # NOQA

    @contextmanager
    def get_cursor(self, key=None):
        try:
            with self.postgresql_connection_pool.getconn(key) as conn, conn.cursor() as cur:
                yield cur
        finally:
            self.postgresql_connection_pool.putconn(conn)

    def start_cache(self):
        self.use_cache = True
        self.job_cache = {}
        self.user_cache = {}
        self.job_content_cache = {}

    def stop_cache(self):
        self.use_cache = False
        self.job_cache = {}
        self.user_cache = {}
        self.job_content_cache = {}

    def get_recommend_cache(self, user_id: str) -> list | None:
        cache_from_db = self.cache_collection.find_one({"id": user_id})  # NOQA
        if cache_from_db is None:
            return None
        return cache_from_db["cache"]

    def set_recommend_cache(self, user_id: str, cache: list):
        self.cache_collection.insert_one({"id": user_id, "cache": cache})  # NOQA

    def clear_recommend_cache(self):
        self.cache_collection.delete_many({})

    def change_last_update_time(self):
        self.history_collection.update_one(
            {"id": "last_update_time"},
            {"$set": {"value": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}},  # NOQA
            upsert=True
        )

    def get_last_update_time(self) -> str | None:
        last_update_time = self.history_collection.find_one({"id": "last_update_time"})  # NOQA
        if last_update_time is None:
            return None
        return last_update_time["value"]

    def get_all_job_ids(self) -> list[str]:
        with self.get_cursor() as cursor:
            cursor.execute(
                'SELECT "id" FROM position WHERE "deletedAt" IS NULL')
            job_ids = list(map(lambda x: x[0], cursor.fetchall()))
            return job_ids

    def get_job_content(self, job_id: str) -> str:
        if self.use_cache:
            if job_id in self.job_content_cache:
                return self.job_content_cache[job_id]
            with self.get_cursor() as cursor:
                cursor.execute(
                    'SELECT "description" FROM position WHERE "id" = %s AND "deletedAt" IS NULL',
                    (job_id,)
                )
                job_content = cursor.fetchone()
                if job_content is None:
                    self.job_content_cache[job_id] = ""
                else:
                    self.job_content_cache[job_id] = job_content[0]
                return self.job_content_cache[job_id]
        with self.get_cursor() as cursor:
            cursor.execute(
                'SELECT "description" FROM position WHERE "id" = %s AND "deletedAt" IS NULL',
                (job_id,)
            )
            job_content = cursor.fetchone()
            if job_content is None:
                return ""
            return job_content[0]

    def get_changed_job_ids(self) -> list[str] | None:
        with self.get_cursor() as cursor:
            last_update_time = self.get_last_update_time()
            if last_update_time is None:
                return None
            cursor.execute(
                'SELECT "id" FROM position WHERE "updatedAt" > %s AND "deletedAt" IS NULL',
                (last_update_time,)
            )
            job_ids = list(map(lambda x: x[0], cursor.fetchall()))
            return job_ids

    def get_job(self, job_id: str) -> Job:
        if self.use_cache:
            if job_id in self.job_cache:
                return self.job_cache[job_id]
            job_from_db = self.job_collection.find_one({"id": job_id})  # NOQA
            if job_from_db is None:
                self.job_cache[job_id] = Job(id=job_id)
            else:
                self.job_cache[job_id] = Job(dict=job_from_db)
            return self.job_cache[job_id]
        job_from_db = self.job_collection.find_one({"id": job_id})  # NOQA
        if job_from_db is None:
            return Job(id=job_id)
        return Job(dict=job_from_db)

    def save_job(self, job: Job):
        self.job_collection.update_one({"id": job.id}, {"$set": job.to_dict()}, upsert=True)  # NOQA

    def get_all_user_ids(self) -> list[str]:
        with self.get_cursor() as cursor:
            cursor.execute(
                'SELECT "id" FROM applicant WHERE "deletedAt" IS NULL')
            user_ids = list(map(lambda x: x[0], cursor.fetchall()))
            return user_ids

    def get_all_user_viewed_job_ids(self, user_id: str) -> list[str]:
        with self.get_cursor() as cursor:
            cursor.execute(
                'SELECT "positionId" FROM applicant_inspection_record WHERE "applicantId" = %s AND "deletedAt" IS NULL',
                (user_id,)
            )
            job_ids = list(map(lambda x: x[0], cursor.fetchall()))
            return job_ids

    def get_all_user_applied_job_ids(self, user_id: str) -> list[str]:
        with self.get_cursor() as cursor:
            cursor.execute(
                'SELECT "positionId" FROM delivery_record WHERE "applicantId" = %s AND "deletedAt" IS NULL',
                (user_id,)
            )
            job_ids = list(map(lambda x: x[0], cursor.fetchall()))
            return job_ids

    def get_all_user_collect_job_ids(self, user_id: str) -> list[str]:
        with self.get_cursor() as cursor:
            cursor.execute(
                'SELECT "positionId" FROM garner_record WHERE "applicantId" = %s AND "deletedAt" IS NULL',
                (user_id,)
            )
            job_ids = list(map(lambda x: x[0], cursor.fetchall()))
            return job_ids

    def get_user(self, user_id: str) -> User:
        if self.use_cache:
            if user_id in self.user_cache:
                return self.user_cache[user_id]
            user_from_db = self.user_collection.find_one({"id": user_id})  # NOQA
            if user_from_db is None:
                self.user_cache[user_id] = User(id=user_id)
            else:
                self.user_cache[user_id] = User(dict=user_from_db)
            return self.user_cache[user_id]
        user_from_db = self.user_collection.find_one({"id": user_id})  # NOQA
        if user_from_db is None:
            return User(id=user_id)
        return User(dict=user_from_db)

    def save_user(self, user: User):
        self.user_collection.update_one({"id": user.id}, {"$set": user.to_dict()}, upsert=True)  # NOQA


db = DataBase()
