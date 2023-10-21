FROM python:3.11

WORKDIR /app

COPY poetry.lock poetry.lock
COPY pyproject.toml pyproject.toml

RUN pip install poetry

RUN poetry install

COPY . .

RUN chmod 755 start.sh

ENTRYPOINT [ "sh", "/app/start.sh" ]