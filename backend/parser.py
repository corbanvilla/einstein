from bs4 import BeautifulSoup as bs
from json import dumps

with open('computer_science.xml', 'r') as f:
    data = f.read()

xml_soup = bs(data, 'lxml-xml')

html_page = xml_soup.find('FIELD', { 'class': 'ps_pagecontainer'}).contents[0]

html_soup = bs(html_page, 'lxml')
html_soup.prettify()

classes = html_soup.find_all(['table'])

for c in classes:
    print(c)
    break

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


