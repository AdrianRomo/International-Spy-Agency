FROM python:3.8-slim

WORKDIR /usr/src/app

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y gcc ncat python3-dev musl-dev \
    && pip install psycopg2-binary

RUN pip install --upgrade pip
RUN pip install poetry

COPY pyproject.toml poetry.lock ./
RUN poetry lock

RUN poetry export -f requirements.txt > requirements.txt --without-hashes --dev && \
    pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app/

ENTRYPOINT ["/usr/src/app/.scripts/entrypoint.sh"]
