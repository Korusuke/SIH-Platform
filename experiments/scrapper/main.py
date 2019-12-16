import requests
import re
import bs4

url = "https://www.sih.gov.in/sih2020PS?page="
page = 1

r = requests.get(url+str(page))
data = r.text
soup = bs4.BeautifulSoup(data, 'html.parser')
table = soup.find_all("tbody")[0]
rows = table.find_all("tr")
