#!/usr/bin/env perl

use strict;
use warnings;
use autodie;
use v5.36;

use constant PATTERN  => qr{<ARQELEM>.+</ARQELEM>$}s;
use constant XML_PATH => 'arq.xml';
use constant XML_DECL => '<?xml version="1.0" encoding="utf-8"?>';
use constant OUT_DIR  => '/out';


sub main(){

	mkdir OUT_DIR unless(-d OUT_DIR);


	open my $input_fh, '<', XML_PATH;

	local $/ = '</ARQELEM>';

	for(my $file_index = 1; <$input_fh>; ++$file_index){

		next if($_ !~ PATTERN);

		open my $output_fh, '>', OUT_DIR . "arq${file_index}.xml";
		say $output_fh XML_DECL;
		say $output_fh $&;
	
		# would be closed anyway
		# only here for error checking
		close $output_fh; 
	}
}

main();
