import requests
import requests_cache
from bs4 import BeautifulSoup
from pprint import pprint

requests_cache.install_cache('react_docs_data')
response = requests.get('https://beta.reactjs.org/', verify=False)
soup = BeautifulSoup(response.text, 'html.parser')
text = soup.get_text()

term = input('Termo que deseja encontrar: ')

ocurrences = []
position = 0

while True: 
    position = text.find(term, position)
    
    if position == -1 :
        break
    ocurrences.append(position)
    position += 1

for ocurrence in ocurrences :
    start_context = max(0, ocurrence - 20)
    end_context = min(len(text), ocurrence + len(term) + 20)
    context = text[start_context:end_context]
    print('-', context)
