#!/usr/bin/env perl

use strict;
use warnings;
use utf8;
use v5.36;
use JSON;


use constant JSON_PATH     => 'mapa.json';
use constant OUTPUT_PATH   => 'output.html';

use constant OUTPUT_BEGIN  => 
q{
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td witdh="30%" valign="top">
					<h3><a name="indice"/>Índice</h3>
                    <!-- Lista com o Índice -->
};

use constant OUTPUT_MIDDLE => 
q{
                </td>
                <td width="70%">
                    <!---- Informação das Cidades -->
};

use constant OUTPUT_END    => 
q{
                </td>
            </tr>
        </table>
    </body>
</html>
};

use constant REF_TEMPLATE  => '				<li><a href="#__id__">__city_name__</a></li>';
use constant LIST_TEMPLATE => 
q{
					<a name="__id__"/> 
					<h3>__city_name__</h3>
					<p><b>população:</b> __population__</p>
					<p><b>descrição:</b> __description__</p>
					<p><b>distrito:</b> __district__</p>

					<center>
						<hr witdh="80%"/>
					</center>  
};


sub get_json_str(){

	open my $fh, '<', JSON_PATH or die "$!";

	local $/ = undef;

	my $json_str = <$fh>;

	close $fh;

	return $json_str;
}


sub write_html($cities_ref){

	my @cities = @{$cities_ref};

	open my $fh, '>:utf8', OUTPUT_PATH or die "$!";

	print $fh OUTPUT_BEGIN;

	foreach(@cities){

		my $template = REF_TEMPLATE;
		$template =~ s/__id__/${$_}{'id'}/g;
		$template =~ s/__city_name__/${$_}{'nome'}/g;

		say $fh $template;
	}

	print $fh OUTPUT_MIDDLE;

	foreach(@cities){

		my $template = LIST_TEMPLATE;

		$template =~ s/__id__/${$_}{'id'}/g;
		$template =~ s/__city_name__/${$_}{'nome'}/g;
		$template =~ s/__district__/${$_}{'distrito'}/g;
		$template =~ s/__population__/${$_}{'população'}/g;
		$template =~ s/__description__/${$_}{'descrição'}/g;

		say $fh $template;
	}

	print $fh OUTPUT_END;

	close $fh;
}


sub main(){

	my $json_str = get_json_str();
	my %json_hash = %{decode_json $json_str};

	my @cities = sort { ${$a}{'nome'} cmp ${$b}{'nome'} } @{$json_hash{'cidades'}};
	write_html(\@cities);
}


main();
