from bs4 import BeautifulSoup
import requests
import string
import pandas as pd



# 把读下来的url存入dictionary
url_info = []
img_info = []
name_info = []
for character in string.ascii_uppercase:
    tab = 'http://www.autohome.com.cn/grade/carhtml/'
    url_lazy = tab + character + '_photo.html'
    web_data_lazy = requests.get(url_lazy)
    soup_lazy = BeautifulSoup(web_data_lazy.text,'lxml')
    #首页信息爬取
    car = soup_lazy.select('body > dl > dd > ul > li > h4')
    #price = soup_lazy.select('body > dl > dd > ul > li > div > a.red')
    images = soup_lazy.select('img[width=160]')
    #详细页面信息爬取
    link = soup_lazy.select('body > dl > dd > ul > li > h4 > a')

    for img in images:
        img_info.append(img.get('src'))

    for lnk in link:
        #进入子页面1
        transfer_link = 'http:' + lnk.get('href')
        url_info.append(transfer_link)

    for cr in car:
        name_info.append(cr.get_text())

'''name = 'data/url_list.xlsx'
tmp_frame.to_csv(name, encoding='utf8')'''

SummarySheet = pd.DataFrame(
        {
            'url': url_info,
            'name': name_info
        }
    )

# 把SummarySheet储存为csv文件
SummarySheet.to_csv("D:\\python 用\\car\\data\\url_list.csv")

SummarySheet2 = pd.DataFrame(
        {
            'img': img_info,
            'name': name_info
        }
    )
SummarySheet2.to_csv("D:\\python 用\\car\\data\\img_list.csv")