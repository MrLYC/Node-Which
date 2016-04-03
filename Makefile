init:
<<<<<<< abdac5ebc7420ac2f36bbdbf44e73345c8dafac4
	cd src; npm init
	
install:
	cd src; npm install $(package) --save

.PHONY: init install
=======
	npm init
	
install-package:
	npm install $(package) --save
	
install:
	npm install

.PHONY: init install-package install
>>>>>>> add command parser
