import os
import csv
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pymongo import MongoClient

mongodb_uri = "mongodb://localhost:27017/sih_platform"
client = MongoClient(mongodb_uri)
db = client.sih_platform
dir = '/home/ubuntu/SIH/experiments/scrapper/deploy/'

collection_list = db.collection_names()
for name in collection_list:
	col = db[name]
	data = []
	for doc in col.find():
		data.append(doc)
	head = data[0].keys()
	file_name = dir + 'backup/' + name + '.csv'
	with open(file_name, 'w') as f:
		csvwriter = csv.writer(f, dialect='excel')
		csvwriter.writerow(head)
		for doc in data:
			csvwriter.writerow(doc.values())


scope = ['https://spreadsheets.google.com/feeds',
	'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name(
    dir+'secrets/auth.json', scope)

gc = gspread.authorize(credentials)
sheet_id = 'SHEET_ID'

sheet = gc.open_by_key(sheet_id)
for col in collection_list:
	sheet.values_update(
		col,
		params={'valueInputOption': 'USER_ENTERED'},
		body={'values': list(csv.reader(open(dir+'backup/'+col+'.csv')))}
	)


