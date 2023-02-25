#!/usr/bin/env perl

use v5.36;
use utf8;
use autodie;
use JSON;


use constant JSON_PATH     => 'mapa.json';
use constant OUTPUT_PATH   => 'output.html';

use constant BEGIN_HTML    =>
q{<html>
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
                    <!-- Lista com o Índice -->};

use constant MIDDLE_HTML   =>
q{
                </td>
                <td width="70%">
                    <!---- Informação das Cidades -->};

use constant END_HTML      =>
q{              </td>
            </tr>
        </table>
    </body>
</html>};


use constant REF_TEMPLATE        => 
    '                    <li><a href="#__id__">__city_name__</a></li>';

use constant LIST_TEMPLATE_BEGIN =>
q{
                    <a name="__id__"/>
                    <h3>__city_name__</h3>
                    <p><b>população:</b> __population__</p>
                    <p><b>descrição:</b> __description__</p>
                    <p><b>distrito:</b> __district__</p>

                    <h4>Ligações</h4>};

use constant LIST_TEMPLATE_LINKS =>
q{                    <li><a href="#__neighbour_id__">__neighbour_city_name__</a>} .
q{ (__distance__kms de distância)</li>};

use constant LIST_TEMPLATE_END   =>
q{
                    <center>
                        <hr witdh="80%"/>
                    </center>};


sub get_json_str(){

    open my $fh, '<', JSON_PATH;

    local $/ = undef;

    return <$fh>;
}


sub write_html($cities_ref, $graph_ref, $id_to_name_ref){

    my @cities     = @{$cities_ref};
    my %graph      = %{$graph_ref};
    my %id_to_name = %{$id_to_name_ref};

    open my $fh, '>:utf8', OUTPUT_PATH;

    say $fh BEGIN_HTML;

    foreach(@cities){

        my $template = REF_TEMPLATE;
        $template =~ s/__id__/${$_}{'id'}/g;
        $template =~ s/__city_name__/${$_}{'nome'}/g;

        say $fh $template;
    }

    say $fh MIDDLE_HTML;

    foreach(@cities){

        my $template = LIST_TEMPLATE_BEGIN;

        $template =~ s/__id__/${$_}{'id'}/g;
        $template =~ s/__city_name__/${$_}{'nome'}/g;
        $template =~ s/__district__/${$_}{'distrito'}/g;
        $template =~ s/__population__/${$_}{'população'}/g;
        $template =~ s/__description__/${$_}{'descrição'}/g;

        say $fh $template;


        my $city_id = ${$_}{'id'};
        my @sorted_dests = 
            sort 
                { $id_to_name{$a} cmp $id_to_name{$b} } 
                keys %{$graph{$city_id}};

        foreach my $dest (@sorted_dests){

            my $link_template = LIST_TEMPLATE_LINKS;

            $link_template =~ s/__neighbour_id__/$dest/g;
            $link_template =~ s/__neighbour_city_name__/$id_to_name{$dest}/g;
            $link_template =~ s/__distance__/${$graph{$city_id}}{$dest}/g;

            say $fh $link_template;
        }

        say $fh LIST_TEMPLATE_END;
    }

    say $fh END_HTML;
}


sub get_hash_graph($links_ref){

    my @links = @{$links_ref};


    my %origin_to_neighbours = ();

    my $neighbour_to_distance_ref = {};

    my $curr_city_id = '';


    foreach(@links){

        if(${$_}{'origem'} ne $curr_city_id){

            unless($curr_city_id eq ''){
                $origin_to_neighbours{$curr_city_id} = $neighbour_to_distance_ref;
            }

            $curr_city_id = ${$_}{'origem'};
            $neighbour_to_distance_ref = {};
        }


        my $neighbour_city_id = ${$_}{'destino'};
        my $distance = ${$_}{'distância'};

        ${$neighbour_to_distance_ref}{$neighbour_city_id} = $distance;
    }

    $origin_to_neighbours{$curr_city_id} = $neighbour_to_distance_ref;

    return \%origin_to_neighbours;
}

sub get_id_to_name_hash($cities_ref){

    my @cities = @{$cities_ref};

    my $id_to_name_ref = {};

    foreach(@cities){

        ${$id_to_name_ref}{${$_}{'id'}} = ${$_}{'nome'};
    }

    return $id_to_name_ref;
}


sub main(){

    my $json_str = get_json_str();
    my %json_as_hash = %{JSON::decode_json $json_str};

    my @cities = sort { ${$a}{'nome'} cmp ${$b}{'nome'} } @{$json_as_hash{'cidades'}};
    my @links  = sort { ${$a}{'origem'} cmp ${$b}{'origem'} } @{$json_as_hash{'ligações'}};


    my $graph_ref = get_hash_graph(\@links);
    my $id_to_name_ref = get_id_to_name_hash(\@cities);

    write_html(\@cities, $graph_ref, $id_to_name_ref);
}

main();
