import requests 
from bs4 import BeautifulSoup
from tabulate import tabulate

url = input('Type the URL of the website that you want to extract the table: ')

response = requests.get(url)
content = response.content

soup = BeautifulSoup(content, 'html.parser')
table = soup.find('table')

lines = []
for line in table.find_all("tr"):
    columns = []

    for column in line.find_all("td"):
        columns.append(column.text)
        
    lines.append(columns)

print(tabulate(lines, headers="firstrow"))