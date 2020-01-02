from pymongo import MongoClient

mongodb_uri = "mongodb://localhost:27017/sih_platform"
client = MongoClient(mongodb_uri)
db = client.sih_platform
collection_list = db.collection_names()
for name in collection_list:
	if name!='ps':
		db[name].remove()
	print(db[name].find())
