init:
	cd src; npm init
	
install:
	cd src; npm install $(package) --save

.PHONY: init install