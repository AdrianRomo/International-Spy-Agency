build:
	docker-compose build

start:
	docker-compose up --build

clean:
	docker-compose stop
	docker-compose down
	docker volume prune

migrations:
	docker-compose exec api python manage.py makemigrations

migrate:
	docker-compose exec api python manage.py migrate

loaddata:
	docker-compose exec api python manage.py loaddata users.json