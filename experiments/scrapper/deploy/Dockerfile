FROM python:3.6
ENV PYTHONUNBUFFERED 1

WORKDIR /

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "./scrape.py" ]