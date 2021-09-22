up:
	docker-compose up

down:
	docker-compose down

build:
	cd frontend-quest && npm run build	

deploy:
	cd frontend-quest && npm run build
	firebase deploy