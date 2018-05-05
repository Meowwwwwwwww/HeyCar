import csv
import pandas as pd
from bs4 import BeautifulSoup
import requests
import string

data = pd.read_csv('url_list.csv')
list = data['url']
link = list[0]
print(link)
web_data_transfer = requests.get(str(link))
soup_transfer = BeautifulSoup(web_data_transfer.text, 'lxml')
    #爬取汽车名字
d_car = soup_transfer.select('body > div > div.subnav > div.subnav-title > div.subnav-title-name > a')
print(d_car)