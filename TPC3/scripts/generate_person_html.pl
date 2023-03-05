#!/usr/bin/env perl

use v5.36;
use autodie;
use utf8;
use JSON;

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


sub underscore_to_space($str){
    return ($str =~ s/_/ /gr);
}

sub write_hash($ofh, $key, $hash_ref){

    my %hash = %{$hash_ref};


    say $ofh qq{\t\t<li><b>$key</b>:<table class="w3-table w3-striped">};

    while(my ($k, $v) = each %hash){

        $k = underscore_to_space($k);
        $v = underscore_to_space($v);

        my $boolean_v = $v eq '1' ? 'sim' : ($v eq '0' ? 'não' : $v);

        say $ofh "\t\t\t<tr><td><b><i>$k</i></b></td>";
        say $ofh qq{\t\t\t<td style="text-align:right">$boolean_v</td></tr>};
    }

    say $ofh "\t\t</table></li>";
}

sub write_list($ofh, $key, $array_ref){

    my @array = @{$array_ref};


    say $ofh "\t\t<li><b>$key</b>:\n\t\t<ul>";

    foreach my $elem (@array){
        $elem = underscore_to_space($elem);
        say $ofh "\t\t\t<li>$elem</li>";
    }

    say $ofh "\t\t</ul></li>";
}

sub write_scalar($ofh, $key, $value){

    $value = underscore_to_space($value);

    say $ofh "\t\t<li><b>$key</b>: $value</li>";
}


sub main(){

    binmode STDOUT, ":utf8";

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

            say $ofh
            qq{
            <div class="w3-card-4" style="width:30%;margin:auto">

            <header class="w3-container w3-cyan">
              <h3>$person_hash{'nome'}</h3>
            </header>

            <div class="w3-container">

            <ul>
            };

            delete $person_hash{'id'};
            delete $person_hash{'nome'};


            foreach my $key (sort { $a cmp $b } keys %person_hash){

                my $value = $person_hash{$key};
                $key = underscore_to_space($key);


                my $ref_type = ref $value;

                if($ref_type eq 'ARRAY'){
                    write_list($ofh, $key, $value);
                }
                elsif($ref_type eq 'HASH'){
                    write_hash($ofh, $key, $value);
                }
                elsif($ref_type eq ''){
                    write_scalar($ofh, $key, $value);
                }
            }

            say $ofh "\n\t</ul>\n\t</div>\n\t</div>";

            print $ofh END_HTML;
            close $ofh;
        }
        else {
            die "Malformed JSON file: No 'id' key";
        }

    }
}

main();
