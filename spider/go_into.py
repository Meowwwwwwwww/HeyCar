from bs4 import BeautifulSoup
from lxml import etree
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
    list_price = []
    list_级别 = []
    list_上市时间 = []
    list_最大功率 = []
    list_最大扭矩 = []
    list_长度 = []
    list_宽度 = []
    list_高度 = []
    list_轴距 = []
    list_车身结构 = []
    list_车门数 = []
    list_座位数 = []
    list_油箱容积 = []
    list_行李箱容积 = []
    list_整备质量 = []
    list_排量 = []
    list_发动机型号 = []
    list_进气形式 = []
    list_气缸排列形式 = []
    list_气缸数 = []
    list_最大马力 = []
    list_最大功率 = []
    list_最大功率转速 = []
    list_燃料形式 = []
    list_燃油标号 = []
    list_供油方式 = []
    list_变速箱类型 = []
    list_驱动方式 = []

    #循环进入链接
    for lnk in link:
        #进入子页面1
        transfer_link = 'http:' + lnk.get('href')
        web_data_transfer = requests.get(transfer_link)
        soup_transfer = BeautifulSoup(web_data_transfer.text, 'lxml')
            #爬取汽车名字
        d_car = soup_transfer.select('body > div > div.subnav > div.subnav-title > div.subnav-title-name > a')
        if len(d_car) == 0:
            d_car = soup_transfer.select('body > div.wrapper > div.subnav > div > div.subnav-title-name > a')
        for d in d_car:
            list_car.append(d.get_text())
            #爬取汽车价格
        d_price = soup_transfer.select(
            'body > div.content > div.row > div.column.grid-16 > div.area.fn-clear > div.autoseries > div.autoseries-info > dl > dt:nth-of-type(1) > a.red')
        if len(d_price) == 0:
            d_price = soup_transfer.select(
                'body > div.content > div.row > div.column.grid-16 > div.area.fn-clear > div.autoseries > div.autoseries-info > dl > dt:nth-of-type(1) > span')
        if len(d_price) == 0:
            d_price = soup_transfer.select('body > div.wrapper > div.subnav > div > div.subnav-title-name > a')
        for p in d_price:
            list_price.append(p.get_text())

        #打开详情页面
        detail = soup_transfer.select('body > div > div > div > ul > li:nth-of-type(2) > a')
        if len(detail) != 0:    #如果不为空
                # 提取网址并打开
            for dtl in detail:
                detail_link = 'http:' + dtl.get('href')
            print(detail_link)
            html = etree.HTML(detail_link)
            web_data_detail = requests.get(detail_link)
            soup_detail = BeautifulSoup(web_data_detail.text, 'lxml')
            table = soup_detail.findAll("tr")
            #table = html.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[10]/td[1]/div[1]")

            print(table)
            #d_级别 = soup_detail.select('body > div > div > table > tbody > #tr_2 > td:nth-of-type(2) > div')
            #print(d_级别)


    #循环打印出结果
    for cr, prc, img, d_cr, d_prc in zip(car, price, images, list_car, list_price):
        print(cr.get_text(), prc.get_text(), img.get('src'), d_cr, d_prc)
