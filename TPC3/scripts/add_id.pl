#!/usr/bin/env perl

use v5.36;
use autodie;
use JSON;

use constant PATH => 'dataset/dataset-extra1.json';

sub main(){

	local $/ = undef;

	open my $ifh, '<', PATH;

	my $json_obj  = JSON->new()->utf8(1);
	my %json_hash = %{$json_obj->decode(<$ifh>)};
	close $ifh;


	my @people_list = @{$json_hash{'pessoas'}};
	${$people_list[$_]}{'id'} = "p$_" foreach(0..$#people_list);


	open my $ofh, '>', PATH;
	print $ofh $json_obj->pretty(1)->encode(\%json_hash);
}

main();
