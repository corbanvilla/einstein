from bs4 import BeautifulSoup as bs
from json import dumps
import re
from itertools import zip_longest


def grouper(n, iterable, fillvalue=None):
    "grouper(3, 'ABCDEFG', 'x') --> ABC DEF Gxx"
    args = [iter(iterable)] * n
    return zip_longest(fillvalue=fillvalue, *args)

with open('computer_science.xml', 'r') as f:
    data = f.read()

xml_soup = bs(data, 'lxml-xml')

html_page = xml_soup.find('FIELD', { 'class': 'ps_pagecontainer'}).contents[0]

html_soup = bs(html_page, 'lxml')
html_soup.prettify()

# print(html_soup)
classes = html_soup.find_all(['table'])

all_classes = {}
for c in classes:

    contents = c.b.contents

    if (len(contents) > 1):
        continue

    class_name = contents[0]
    # all_classes.add(class_name)

    timing = c.find(string=re.compile(r'.* at .* with .*'))

    if timing is None:
        continue

    timing = timing.strip()

    if class_name not in all_classes:
        all_classes[class_name] = {
            # 'timing': timing,
            'title': class_name,
            'timings': []
        }
    all_classes[class_name]['timings'].append(timing)



class_full_name = html_soup.find_all('span', attrs={'style': 'background-color: white; font-family: arial; color: black; font-size: 16px; font-weight: normal'})
all_class_2 = [d.strip().replace('\n', '').replace('   ', ' ') for c in class_full_name for d in c.stripped_strings]

final_descs = []
for s in all_class_2:
    # skip ellipsed
    if s.strip()[-3:] == '...':
        continue
    if 'more description for' in s:
        continue

    if 'less description for' in s:
        continue

    # cs exceptionm
    # todo - more robust checking
    if  'Big Data Systems' in s:
        continue

    final_descs.append(s)

# turn class,desc into dict
descs_dict = {}
for c, c_desc in grouper(2, final_descs):
    descs_dict[c] = c_desc

print(len(all_classes))
print(len(final_descs))
print(descs_dict)

final_list = []
for c, c_dets in all_classes.items():

    #O(n) search | better names
    title = c
    desc = None
    for name, description in descs_dict.items():
        if c in name:
            title = name
            desc = description
            print(f'foudn {c} in {title} | setting {description}')

    final_list.append({
        'title': title,
        'timings': list(c_dets.get('timings')),
        'description': desc,
    })

print(dumps(final_list))