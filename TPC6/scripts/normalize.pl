#!/usr/bin/env perl

use v5.36;
use autodie;
use JSON;

use constant PATH => 'data/dataset.json';

sub main(){

	local $/ = undef;
	open my $ifh, '<', PATH;

	my $json_obj  = JSON->new()->utf8(1);
	my @json_list = @{$json_obj->decode(<$ifh>)};

	close $ifh;


    do { ${$_}{'BI'} = delete ${$_}{'CC'} if(exists ${$_}{'CC'}) } for(@json_list);


	open my $ofh, '>', PATH;
	print $ofh $json_obj->pretty(1)->encode(\@json_list);
}

main();
