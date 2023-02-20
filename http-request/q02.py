import requests
import requests_cache
from bs4 import BeautifulSoup
from pprint import pprint

requests_cache.install_cache('react_docs_data')
response = requests.get('https://beta.reactjs.org/', verify=False)
soup = BeautifulSoup(response.text, 'html.parser')

tag = input('Digite uma tag: ')
contents = soup.find_all(tag)

for content in contents: 
    print('-', content.get_text())
