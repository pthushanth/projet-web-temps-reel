.PHONY: start down restart

start:
	docker-compose up -d


down:
	docker-compose down

restart: down start