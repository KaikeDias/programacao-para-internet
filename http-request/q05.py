import requests
from bs4 import BeautifulSoup

query = input('What do you want to search? ')
url = "http://www.google.com/search"

response = requests.get(url, params = {'q': query})

soup = BeautifulSoup(response.text, 'html.parser')
links = soup.find_all('a')

urls = []
for link in links: 
    url = link.get('href')
    if url.startswith('/url?q='): 
        urls.append(url[7:])

for url in urls:
    print('-', url)

