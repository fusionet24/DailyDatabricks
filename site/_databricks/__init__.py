import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(usecwd=True))

def get_spark_session(app_name="DailyDatabricks"):
    from databricks.connect import DatabricksSession
    return DatabricksSession.builder.getOrCreate()
