from airflow import DAG
from airflow.decorators import task
from datetime import datetime

default_args = {
    'owner': 'airflow',
    'start_date': datetime(2024, 1, 1),
    'retries': 1,
}

with DAG(
    dag_id='hello_world_dag',
    default_args=default_args,
    schedule=None,  # Use 'schedule' instead of 'schedule_interval'
    catchup=False,
    tags=['example'],
) as dag:

    @task
    def say_hello():
        print("👋 Hello, World from Airflow!")

    say_hello()
