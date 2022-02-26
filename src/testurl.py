from urllib.request import urlopen
  
# import json
import json
# store the URL in url as 
# parameter for urlopen
url = "https://frappe.io/api/method/frappe-library?page=2&title=and"
  
# store the response of URL
response = urlopen(url)
  
# storing the JSON response 
# from url in data
data_json = json.loads(response.read())
  
# print the json response
no_of_books = 10
print(type(data_json))
print(type(data_json['message']))
for bk in range(len(data_json['message'])):
    if bk >= no_of_books:
        break
    print(data_json['message'][bk]) 
    
    print(bk)

