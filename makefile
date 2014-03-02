ALL_TESTS = $(shell find ./test -name "*-test.js")


test-node:
	./node_modules/.bin/_mocha $(ALL_TESTS) --timeout 3000 --ignore-leaks --bail

fixturize:
	./scripts/testing/fixturize.sh