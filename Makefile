init:
	npm init

install-package:
	npm install $(package) --save

install:
	npm install

.PHONY: init install-package install
