from bs4 import BeautifulSoup as bs
from json import dumps

with open('computer_science.xml', 'r') as f:
    data = f.read()

xml_soup = bs(data, 'lxml-xml')

html_page = xml_soup.find('FIELD', { 'class': 'ps_pagecontainer'}).contents[0]

html_soup = bs(html_page, 'lxml')
html_soup.prettify()

classes = html_soup.find_all(['table'])

all_classes = set()
for c in classes:

    contents = c.b.contents

    # 1-off
    if (len(contents) > 1):
        contents = [contents[-1]]

    class_name = contents[0]
    all_classes.add(class_name)

    # if len(class_name) > 1:

    # sloppy edge case
    # if ()

    # print(c.b.contents)
    # break

print(all_classes)
print(len(classes))
# for sib in html_soup.find('b').next_siblings:
#     print(sib)

# print(html_soup.find_all('b'))
# print(html_soup.find_all('p'))
# soup.find('ps_pagecontainer')
# print()
# print(soup.find(''))

# dumps(soup)


# print(str(data))


