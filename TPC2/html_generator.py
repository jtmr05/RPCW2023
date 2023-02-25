#!/usr/bin/env python3

import bs4
import os
import re


XML_PATH   : str = 'arq.xml'
HTML_DIR   : str = 'out/'
HTML_PATH  : str = 'index.html'
PATTERN    : re.Pattern = re.compile(r'(.+)\.xml$')
HTML_BEGIN : str = '''
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
'''
HTML_END   : str = '''
    </body>
</html>
'''


def write_html(path : str, parent_tag : bs4.Tag):

    with open(path, 'w', encoding='utf-8') as hfh:

        hfh.write(HTML_BEGIN)
        hfh.write(f"\t\t<title>{path}</title>\n")
        hfh.write(f"\t</head>\n\n")
        hfh.write('\t<body>\n\n')

        for child in parent_tag.descendants:
            if child.string and child.name:
                hfh.write(f"\t\t<li><b>{child.name}</b>: {child.string}</li>\n")

        hfh.write(HTML_END)


def main():

    def make_tuple(x : str) -> tuple[str, str]:
        basename : str = PATTERN.search(x)[1]
        return (f"{HTML_DIR}{x}", f"{HTML_DIR}{basename}.html")

    filenames : list[str] = map(
        make_tuple,
        filter(
            lambda x: PATTERN.search(x),
            os.listdir(HTML_DIR)
        )
    )


    for fn_tuple in filenames:

        xml_tree : bs4.BeautifulSoup

        with open(fn_tuple[0], 'r', encoding='utf-8') as xfh:

            xml_tree = bs4.BeautifulSoup(xfh, 'lxml-xml')


        parent_tag : bs4.Tag = xml_tree.ARQELEM

        write_html(fn_tuple[1], parent_tag)


if __name__ == '__main__':
    main()
