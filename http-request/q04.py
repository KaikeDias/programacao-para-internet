import requests
from pprint import pprint
import os

if not os.path.exists('images') :
    os.makedirs('images')

url = input('Type the URL of image that you want to download: ')
name_file = input('Type the image file name: ')

path = os.path.join('images', f"{name_file}.jpg")
response = requests.get(url)

with open(path, 'wb') as image: 
    response = requests.get(url)

    if not response.ok :
        print('An error occurred, status', response.status_code)
    else:
        for data in response.iter_content(1024):
            if not data: 
                break
            image.write(data)
        
    print('\nThe image was successfully saved =)')
    