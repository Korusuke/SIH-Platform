from pymongo import MongoClient

mongodb_uri = "mongodb://localhost:27017/sih_platform"
client = MongoClient(mongodb_uri)
db = client.sih_platform

stats = {'First': 0, 'Second': 0, 'Third': 0, 'Fourth': 0}
users = db.users.find()
teams = db.teams.find()
for team in teams:
	for user in team['members']:
		u = db.users.find_one({'email': user})
		try:
			stats[u['year']] += 1
		except:
			print(user)
print(stats)
