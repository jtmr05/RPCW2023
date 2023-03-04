#!/usr/bin/env perl

use v5.36;
use autodie;
use JSON;
use feature qw(switch);
no warnings qw(experimental);

use constant OUTPUT_DIR => 'resources/';
use constant JSON_PATH  => 'dataset/dataset-extra1.json';

use constant BEGIN_HTML =>
q{
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="w3.css" />
		<meta charset="utf-8" />
};

use constant END_HTML   =>
q{
	</body>
</html>
};


sub write_hash($ofh, $key, $hash_ref){

	my %hash = %{$hash_ref};

}

sub write_list($ofh, $key, $array_ref){

	my @array = @{$array_ref};
}


sub main(){

	local $/ = undef;
	open my $ifh, '<', JSON_PATH;
	
	my $json_obj  = JSON->new()->utf8(1);
	my %json_hash = %{$json_obj->decode(<$ifh>)};

	close $ifh;


	my @people = @{$json_hash{'pessoas'}};

	foreach my $p (@people){

		my %person_hash = %{$p};

		if(exists $person_hash{'id'}){

			open my $ofh, '>:utf8', OUTPUT_DIR . $person_hash{'id'} . '.html';

			print $ofh BEGIN_HTML;

			say $ofh "\t\t<title>$person_hash{'nome'}</title>";
			say $ofh "\t</head>\n\t<body>";

			delete $person_hash{'id'};

			
			foreach my $key (sort { $a cmp $b } keys %person_hash){

				my $value = $person_hash{$key};

				given(ref $value){

					when('HASH'){  write_hash($ofh, $key, $value); } #TODO

					when('ARRAY'){ write_list($ofh, $key, $value); } #TODO

					when(''){

						say $ofh "<li><b>$key</b>: $value</li>";

					}

					default {}
				}

			}

			print $ofh END_HTML;
			close $ofh;
		}
		else {
			die "Malformed JSON file: No 'id' key";
		}

	}
}

main();
