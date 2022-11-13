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

    # print(c)

    # 1-off
    if (len(contents) > 1):
        contents = [contents[-1]]

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


    # print(f'chekcing time : {timing}')
    # add a professor entry
    # if 'timings' not in all_classes[class_name]:
    #     all_classes[class_name]['timings'] = set()


    all_classes[class_name]['timings'].append(timing)

    # print(timing)
    # print(c)

    # break

    # if len(class_name) > 1:

    # sloppy edge case
    # if ()

    # print(c.b.contents)
    # break


# description old
# print(html_soup)
# d3 = html_soup.find_all(string=re.compile(r"<!-- Begin HTML Area Name Undisclosed -->([\s\S]*?)<!-- End HTML Area -->"))
# for x in d3:
#     print(x)
#     print('\n\n\n')
# print(f'd3: {d3}')
# d2 = html_soup.find_all('div', id=lambda x: x and x.startswith('fullDescription'),attrs={'class': "courseDescription"})
# for d in d2:
#     for s in d.stripped_strings:
#         print(s)
#     # print(d)
#
# print(len(d2))

class_full_name = html_soup.find_all('span', attrs={'style': 'background-color: white; font-family: arial; color: black; font-size: 16px; font-weight: normal'})
all_class_2 = [d.strip().replace('\n', '').replace('   ', '') for c in class_full_name for d in c.stripped_strings]
# for z in class_full_name:
#     for a in z.stripped_strings:
#         all_class_2.append(a)
#         # print(a)

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
    # print(s)
# print(len(final_descs))

# print(dumps(final_descs))

# print(final_descs)
# print(all_class_2)

# for c in all_class_2:
#     print(c.strip().replace('\n','').replace('   ', ''))

# for class_name,a,b,c in grouper(4, all_class_2):
#     # print(f'Foudn class: {class_name}')
#     # print(f'Class desc: {full_desc}')
#     print(class_name)
#     print(a)
#     print(b)
#     print(c)
# print(len(all_class_2))


# print(html_soup)

# descriptions = html_soup.find_all('p', attrs={'style': 'font-size: 12px'})
# print(f'found descriptions: {len(descriptions)}')
# # for description in descriptions:
# #     for s in description.stripped_strings:
# #         print(s)
#     # print(description.stripped_strings)
#
# str_descs = [s for description in descriptions for s in description.stripped_strings]
#
# # merge descriptions into data
#
# final_descs = []
# for s in str_descs:
#     # skip ellipsed
#     if s.strip()[-3:] == '...':
#         continue
#     if 'more description for' in s:
#         continue
#
#     if 'less description for' in s:
#         continue
#
#     final_descs.append(s)
#     # print(s)

# print(str_descs)

# print(all_classes)
# print(html_soup)

final_list = []
for c, c_dets in all_classes.items():
    final_list.append({
        'title': c,
        'timings': list(c_dets.get('timings'))
    })

# print(len(final_descs))
print(len(final_list))

# for c in all_classes:
#     print(c)
    # if c.get('timings'):
    #     all_classes[c]['timings'] = list(c['timings'])
print(dumps(final_list))
# print(len(classes))
# for sib in html_soup.find('b').next_siblings:
#     print(sib)

# print(html_soup.find_all('b'))
# print(html_soup.find_all('p'))
# soup.find('ps_pagecontainer')
# print()
# print(soup.find(''))

# dumps(soup)


# print(str(data))


