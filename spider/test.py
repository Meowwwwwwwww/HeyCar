'''from bs4 import BeautifulSoup
import requests


url = 'http://dealer.bitauto.com/beijing/'
wb_data = requests.get(url)
wb_data.encoding = "UTF-8"
soup = BeautifulSoup(wb_data.text,'lxml')
news_titles = soup.find("div.col-xs-6 left > h6")
print(news_titles)

url = 'http://www.bjjtgl.gov.cn/jgj/flfg/index.html'
wb_data = requests.get(url)
wb_data.encoding = "UTF-8"
soup = BeautifulSoup(wb_data.text,'lxml')

# 从解析文件中通过select选择器定位指定的元素，返回一个列表
news_titles = soup.select("div.xxlb")
#img = soup.select('img[width="60"]')
#print(news_titles)
# 对返回的列表进行遍历
for n in news_titles:
    # 提取出标题和链接信息
    title = n.get_text()
    link = n.get("href")
    data = {
        '标题':title,
        '链接':link
    }
    print(data)'''

from bs4 import BeautifulSoup
import requests
import string

# url = 'https://www.autohome.com.cn/car/#pvareaid=3311275'


for character in string.ascii_uppercase:
    tab = 'http://www.autohome.com.cn/grade/carhtml/'
    url_lazy = tab + character + '_photo.html'
    web_data_lazy = requests.get(url_lazy)
    soup_lazy = BeautifulSoup(web_data_lazy.text,'lxml')
    #首页信息爬取
    car = soup_lazy.select('body > dl > dd > ul > li > h4')
    price = soup_lazy.select('body > dl > dd > ul > li > div > a.red')
    images = soup_lazy.select('img[width=160]')
    #详细页面信息爬取
    link = soup_lazy.select('body > dl > dd > ul > li > h4 > a')
    list_car = []
    #循环进入链接
    for lnk in link:
        #进入子页面1
        transfer_link = 'http:' + lnk.get('href')
        web_data_transfer = requests.get(transfer_link)
        soup_transfer = BeautifulSoup(web_data_transfer.text, 'lxml')
        d_car = soup_transfer.select('body > div.content > div.subnav > div.subnav-title > div.subnav-title-name > a')
        for d in d_car:
            list_car.append(d.get_text())

    #循环打印出结果
    for cr, prc, img, d_cr in zip(car, price, images, list_car):
        print(cr.get_text(), prc.get_text(), img.get('src'), d_cr)

'''for character in string.ascii_uppercase:
    tab = 'https://www.autohome.com.cn/grade/carhtml/'
    url_lazy = tab + character +'_photo.html'
    web_data_lazy = requests.get(url_lazy)
    soup_lazy = BeautifulSoup(web_data_lazy.text, 'lxml')

    car = soup_lazy.select('body > dl > dd > ul > li > h4')
    price = soup_lazy.select('body > dl > dd > ul > li > div > a.red')
    img = soup_lazy.select('img[width=160]')
    for i,j,k in zip(car , price , img):
        print(i.get_text(),j.get_text(),k.get('scr'))'''





'''url = 'https://news.qq.com'
wb_data = requests.get(url)
soup = BeautifulSoup(wb_data.text,'lxml')

# 从解析文件中通过select选择器定位指定的元素，返回一个列表
news_titles = soup.select("div.text > em.f14 > a.linkto")

# 对返回的列表进行遍历
for n in news_titles:
    # 提取出标题和链接信息
    title = n.get_text()
    link = n.get("href")
    data = {
        '标题':title,
        '链接':link
    }
    print(data)'''

'''titles = soup.select('body > div.wrap > div.container > div.main > div.head > div:nth-child(2) > div > div > em > a')
print(soup)'''