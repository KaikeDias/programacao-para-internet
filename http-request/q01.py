import requests
import requests_cache
from bs4 import BeautifulSoup
from pprint import pprint

requests_cache.install_cache('moz_data')
response = requests.get('https://www.mozilla.org/pt-BR/', verify=False)
soup = BeautifulSoup(response.text, 'html.parser')
links = soup.find_all('a')

for link in links: 
    print(' - ', link.get('href'))