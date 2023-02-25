#!/usr/bin/env perl

use v5.36;
use autodie;
use utf8;

use constant ARQELEM_PATTERN => qr{<ARQELEM>.+</ARQELEM>$}s;
use constant IDENT_PATTERN   => qr{<IDENTI>\s*(.+?)\s*</IDENTI>}s;
use constant XML_PATH        => 'arq.xml';
use constant XML_DECL        => '<?xml version="1.0" encoding="utf-8"?>';
use constant XML_DIR         => 'out/';
use constant HTML_PATH       => 'index.html';

use constant BEGIN_HTML      =>
q{<!DOCTYPE html>
<html>
    <head>
        <title>Arqueossítios</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Arqueossítios</h1>
        <h3>Indíce:</h3>
        <ul>};

use constant END_HTML        =>
q{      </ul>
    </body>
</html>};


sub generate_html($name_to_index_ref){

	my %name_to_index = %{$name_to_index_ref};

    open my $fh, '>:utf8', HTML_PATH;

    say $fh BEGIN_HTML;

    foreach(sort { $a cmp $b } keys %name_to_index){

        my $href = "<li><a href='$name_to_index{$_}'>$_</a></li>";

        say $fh $href;
    }

    say $fh END_HTML;
}


sub main(){

	mkdir XML_DIR unless(-d XML_DIR);


	open my $input_fh, '<:utf8', XML_PATH;

	local $/ = '</ARQELEM>';

	my %name_to_index = ();

	for(my $file_index = 1; <$input_fh>; ++$file_index){

		next if($_ !~ ARQELEM_PATTERN);

		my $inner_content = ($& =~ s|^(\s+)|substr $1, 0, (length $1) / 2|regm);
		#my $inner_content = $&;

		open my $output_fh, '>:utf8', XML_DIR . "arq${file_index}.xml";
		say $output_fh XML_DECL;
		say $output_fh $inner_content;

		# would be closed anyway
		# only here for error checking
		close $output_fh;

		if($inner_content =~ IDENT_PATTERN){
			$name_to_index{$1} = $file_index;
		}
	}

	generate_html(\%name_to_index);
}

main();
