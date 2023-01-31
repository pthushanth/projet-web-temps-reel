.PHONY: start down restart

start:
	docker-compose up -d
	cd nodejs_server
	Npx sequelize db:migrate 
	Npx sequelize db:seed:all

down:
	docker-compose down

restart: down start
