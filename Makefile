BIN=node_modules/.bin

test:
	make lint
	$(BIN)/mocha test/specs
	$(BIN)/doxdox lib/cmd.js -p package.json -l markdown | diff DOCUMENTATION.md -

lint:
	$(BIN)/eslint cmd.js
	$(BIN)/eslint test/specs

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha test/specs && $(BIN)/codecov

docs:
	$(BIN)/doxdox lib/cmd.js -p package.json -l markdown -o DOCUMENTATION.md

.PHONY: test coverage
