ALL_TESTS = $(shell find ./test -name "*-test.js")


test-node:
	./node_modules/.bin/_mocha $(ALL_TESTS) --timeout 9999999 --ignore-leaks --bail --reporter list

fixturize:
	./scripts/testing/fixturize.sh