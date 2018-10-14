database:
	@docker-compose up -d database
.PHONY: database

# setup-database: database
# 	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:create --env test" server
# .PHONY: setup-database

migrate: database
	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:migrate --debug true --env test" server
.PHONY: migrate

# undo-migration: database
# 	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:migrate:undo --debug true --env test" server
# .PHONY: test-setup-database

undo-all-migrate: database
	@docker-compose run --rm --entrypoint="node_modules/.bin/sequelize db:migrate:undo:all --debug true --env test" server
.PHONY: test-setup-database

server: database
	@docker-compose up server
.PHONY: server

server-background: database
	@docker-compose up -d server
.PHONY: server-background

setup: migrate
.PHONY: setup

test: server-background
	@docker-compose run --rm --entrypoint="yarn test" server
.PHONY: test

down:
	@docker-compose down
.PHONY: down
