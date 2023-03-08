.DEFAULT_GOAL := all

.PHONY: all
all:
	scripts/dependencies.sh
	scripts/add_id.pl
	scripts/generate_person_html.pl

REGEX := 'local $$/ = undef; while(<>){ s/^\s+"id"\s+:.*$$//mg;  s/,\s+\}/\}/g; print; }' 

.PHONY: clean
clean:
	-perl -i -e $(REGEX) dataset/dataset.json
	-rm -f package-lock.json
	-rm -f resources/*.html
	-rm -rf node_modules
