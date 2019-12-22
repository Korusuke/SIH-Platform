from datetime import datetime
from oauth2client.service_account import ServiceAccountCredentials
import gspread
import bs4
import csv
import requests
import re
from PIL import Image, ImageDraw, ImageFont

all = []
url = "https://www.sih.gov.in/sih2020PS?page="

r = requests.get('https://www.sih.gov.in/sih2020PS')
data = r.text
soup = bs4.BeautifulSoup(data, 'html.parser')
pages = int(soup.find_all("ul", class_="pagination")[
            0].findChildren('li', recursive=False)[-2].text)
print(pages)
count = 0


def cleaner(text):
    text = text.strip()
    re.sub(' +',' ',text)
    text = "".join(re.findall(r"[a-zA-Z0-9,()'\":;{}[\]\\/. ]", text))
    return text


def parser(desc):
    rows = desc.split('\r\n')
    result = ""
    f1, f2 = 0, 0
    for i in range(len(rows)):
        if re.search(r"•|[0-9].", rows[i][:2]):
            if f1 == 0:
                result += "<ul>"
                f1 += 1
            if f2 == 1:
                result += "</ul>"
                f2 -= 1
            result += "<li>{}</li>".format(cleaner(rows[i][2:]))
        elif rows[i][:1] == 'o':
            if f2 == 0:
                result += "<ul>"
                f2 += 1
            result += "<li>{}</li>".format(cleaner(rows[i][2:]))
        else:
            if f1 == 1:
                result += "</ul>"
                f1 -= 1
            if f2 == 1:
                result += "</ul>"
                f2 -= 1
            result += cleaner(rows[i])
    if f2 == 1:
        result += "</ul>"
    if f1 == 1:
        result += "</ul>"

    return result


def logo_parser(company, logo_url):
    logo_url = logo_url.strip()
    company = "".join(re.findall(r"[a-zA-Z0-9]", company))
    if logo_url.find('no_image.png') != -1:
        img = Image.new('RGB', (100, 100), color = (38, 11, 44))
        d = ImageDraw.Draw(img)
        font = ImageFont.truetype("arial.ttf", 30)
        d.text((42, 32), company[0].upper(), fill=(255,255,255), font=font)
        image_name = 'company_logo/{}.png'.format(company)
        img.save(image_name)
    else:
        image_data = requests.get(logo_url).content
        image_name = "company_logo/{}.{}".format(company, logo_url.split('.')[-1])
        with open(image_name, 'wb') as file:
            file.write(image_data)
    logo_url = "/storage/" + image_name
    return logo_url


for i in range(1, pages + 1):
    rurl = url + str(i)
    r = requests.get(rurl)
    data = r.text
    soup = bs4.BeautifulSoup(data, 'html.parser')
    table = soup.find_all("tbody")[0]
    rows = table.findChildren("tr", recursive=False)
    for x in rows:
        # x = x.text
        ele = x.find_all('td')
        company = ele[1].contents[0]
        logo_url = logo_parser(company, ele[0].find('img')['src'])
        # print(logo_url)
        ps_title = ele[2].contents[0].contents[0]
        modal = ele[2].find_all('tr')
        ps_desc = modal[0].find_all('td')[0].text
        yt_link = modal[4].find_all('td')[0].text
        ds_link = modal[5].find_all('td')[0].text
        category = ele[-3].contents[0]  # 9
        ps_num = ele[-2].contents[0]  # 10
        dbucket = ele[-1].contents[0]  # 11
        ps_desc = parser(ps_desc)
        g = [company, ps_num, category, dbucket,
             ps_title, ps_desc, yt_link, ds_link, logo_url]
        count += 1
        all.append(g)
    # print('xxxxxxx')
print(count)


head = ['company', 'id', 'category', 'domain',
        'title', 'description', 'youtube', 'dataset', 'logo']

file_name = 'data/PS.csv'
csvfile = open(file_name, 'w')
with csvfile:
    csvwriter = csv.writer(csvfile, dialect='excel')
    csvwriter.writerow(head)
    for i in all:
        csvwriter.writerow(i)

file_name = 'data/' + str(datetime.now()) + '.csv'
csvfile = open(file_name, 'w')
with csvfile:
    csvwriter = csv.writer(csvfile, dialect='excel')
    csvwriter.writerow(head)
    for i in all:
        csvwriter.writerow(i)

from pymongo import MongoClient

# Push to MongoDB
mongodb_uri = "mongodb://probably:pr0b4bly@ds255857.mlab.com:55857/sih_platform"
client = MongoClient(mongodb_uri)
db = client.sih_platform
col = db.ps
print(col)
count = 0
try:
    for ps in all:
        print(count, end='\r')
        count += 1
        # print(ps[1])
        data = {
            "Company": ps[0],
            "Number": ps[1],
            "Category": ps[2],
            "Domain": ps[3],
            "Title": ps[4],
            "Description": ps[5],
            "Youtube": ps[6],
            "Dataset": ps[7],
            "Logo": ps[8],
        }
        # print(col.find({'Number': data['Number']}))
        if col.find({'id': data['id']}).count() == 0:
            print(ps[1])
            col.insert(data)
except Exception as err:
    print(err)


# Update the spreadsheet now


# scope = ['https://spreadsheets.google.com/feeds',
#          'https://www.googleapis.com/auth/drive']

# credentials = ServiceAccountCredentials.from_json_keyfile_name(
#     'secrets/auth.json', scope)

# gc = gspread.authorize(credentials)


# sht = gc.open_by_url(
#     'https://docs.google.com/spreadsheets/d/1Mh8YwVGhyWVSoszik6zFyyPnHG53b43NIpSGyOShzrI')

# worksheet = sht.get_worksheet(0)

# cell_list = worksheet.range('A1:H' + str(len(all) + 1))
# flatten_list = [j for sub in all for j in sub]
# for i in range(0,8):
#     cell_list[i].value = head[i]
# for i in range(8, len(cell_list)):
#     cell_list[i].value = flatten_list[i-8]

# # Update in batch
# worksheet.update_cells(cell_list)
