.DEFAULT_GOAL := all

all: index.html

index.html:
	@./generator.pl

.PHONY: clean
clean:
	-rm -f index.html
	-rm -rf out
	

