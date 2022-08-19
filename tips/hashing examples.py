# Databricks notebook source
df = spark.read.option('header',True).csv('/databricks-datasets/flights/departuredelays.csv') # sample dataset

display(df)

# COMMAND ----------

import pyspark.sql.functions as F

df.withColumn("columnhash", F.xxhash64(*df.schema.names))

df.withColumn("columnhash", F.hash(*df.columns))

df.withColumn("columnhash", F.md5(F.concat(*df.columns)))

df.withColumn("columnhash", F.sha1(F.concat(*df.columns)))

df.withColumn("columnhash", F.sha2(F.concat(*df.columns),numBits=256))

