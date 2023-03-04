REGEX := 'local $$/ = undef; while(<>){ s/^\s+"id"\s+:.*$$//mg;  s/,\s+\}/\}/g; print; }' 

.PHONY: clean
clean:
	-perl -i -e $(REGEX) dataset/dataset-extra1.json
	-rm -f package-lock.json
	-rm -rf node_modules
