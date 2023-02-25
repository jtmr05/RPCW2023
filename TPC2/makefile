.DEFAULT_GOAL := all

all: index.html

index.html:
	@./xml_generator.pl
	@./html_generator.py

.PHONY: clean
clean:
	-rm -f index.html
	-rm -rf out
	

