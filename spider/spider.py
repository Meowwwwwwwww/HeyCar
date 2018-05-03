from bs4 import BeautifulSoup
from lxml import etree
import requests
import string
import os
import pandas as pd
from selenium import webdriver
from lxml import etree
import pandas
import time
from datetime import datetime
from urllib import parse


# 变量初始化
i = 0

list_car = []
list_price = []
list_汽油 = []
list_时间 = []
list_最大功率 = []
list_最大扭矩 = []
list_变速箱类型 = []
list_最大车速 = []
list_加速 = []
list_油耗 = []
list_质保 = []
list_长度 = []
list_宽度 = []
list_高度 = []
list_车身结构 = []
list_车门数 = []
list_座位数 = []
list_油箱容积 = []
list_行李箱容积 = []
list_整备质量 = []
list_排量 = []
list_气缸排列形式 = []
list_气缸数 = []
list_最大马力 = []

data = pd.read_csv('data/url_list.csv')
list = data['url']

start_from = data.index[0]

for i in range(len(list)):

    car_info = {}

    link = list[start_from]
    print(link)
    web_data_transfer = requests.get(str(link))
    soup_transfer = BeautifulSoup(web_data_transfer.text, 'lxml')
    # 爬取当前页面
    #### 爬取汽车名字
    d_car = soup_transfer.select('body > div > div.subnav > div.subnav-title > div.subnav-title-name > a')
    if len(d_car) == 0:
        d_car = soup_transfer.select('body > div.wrapper > div.subnav > div > div.subnav-title-name > a')
    for d in d_car:
        list_car.append(d.get_text())
    #### 爬取汽车价格
    d_price = soup_transfer.select(
        'body > div.content > div.row > div.column.grid-16 > div.area.fn-clear > div.autoseries > div.autoseries-info > dl > dt:nth-of-type(1) > a.red')
    if len(d_price) == 0:
        d_price = soup_transfer.select(
            'body > div.content > div.row > div.column.grid-16 > div.area.fn-clear > div.autoseries > div.autoseries-info > dl > dt:nth-of-type(1) > span')
    if len(d_price) == 0:
        d_price = soup_transfer.select('body > div.wrapper > div.subnav > div > div.subnav-title-name > a')
    for p in d_price:
        list_price.append(p.get_text())

    # 打开详情页面
    detail = soup_transfer.select('body > div > div > div > ul > li:nth-of-type(2) > a')
    if len(detail) != 0:  # 如果不为空
        # 提取网址并打开
        for dtl in detail:
            detail_link = 'http:' + dtl.get('href')
        print(detail_link)
        web_data_detail = requests.get(detail_link)
        soup_detail = BeautifulSoup(web_data_detail.text, 'lxml')
        d_if = soup_detail.select('body > div.mainWrap.sub_nav > p')
        print(len(d_if))
        # 如果不是特殊错误页面
        if len(d_if) == 0:
            # 模拟登入网页并解析地址
            driver = webdriver.PhantomJS(
                executable_path="C:/Users/mia/Desktop/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs.exe")
            driver.implicitly_wait(30)  # 隐性等待，最长等30秒
            # url = "https://car.autohome.com.cn/config/series/2951.html"
            html = driver.get(detail_link)
            html = driver.page_source
            # 提取方案:
            selector = etree.HTML(html)
            print(selector)
            # 能源类型
            汽油 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[4]/td[1]/div[1]")[0]
            print(汽油.xpath('string(.)'))
            list_汽油.append(汽油.xpath('string(.)'))
            # 上市时间
            时间 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[5]/td[1]/div[1]")[0]
            print(时间.xpath('string(.)'))
            list_时间.append(时间.xpath('string(.)'))
            # 最大功率kW
            max_功率 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[6]/td[1]/div[1]")[0]
            print(max_功率.xpath('string(.)'))
            list_最大功率.append(max_功率.xpath('string(.)'))
            # 最大扭矩Nm
            扭矩 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[7]/td[1]/div[1]")[0]
            print(扭矩.xpath('string(.)'))
            list_最大扭矩.append(扭矩.xpath('string(.)'))
            # 变速箱
            变速箱 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[9]/td[1]/div[1]")[0]
            print(变速箱.xpath('string(.)'))
            list_变速箱类型.append(变速箱.xpath('string(.)'))
            # 最高车速kmph
            max_车速 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[12]/td[1]/div[1]")[0]
            print(max_车速.xpath('string(.)'))
            list_最大车速.append(max_车速.xpath('string(.)'))
            # 官方0-100kmph加速
            加速 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[13]/td[1]/div[1]")[0]
            print(加速.xpath('string(.)'))
            list_加速.append(加速.xpath('string(.)'))
            # 工信部综合油耗Lp100km
            油耗 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[16]/td[1]/div[1]")[0]
            print(油耗.xpath('string(.)'))
            list_油耗.append(油耗.xpath('string(.)'))
            # 整车质保几年或多少万公里
            '''质保 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[18]/td[1]/div[1]")[0]
            print(质保.xpath('string(.)'))
            list_质保.append(质保.xpath('string(.)'))'''
            # 长度mm
            长度 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[2]/td[1]/div[1]")[0]
            print(长度.xpath('string(.)'))
            list_长度.append(长度.xpath('string(.)'))
            # 宽度mm
            宽度 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[3]/td[1]/div[1]")[0]
            print(宽度.xpath('string(.)'))
            list_宽度.append(宽度.xpath('string(.)'))
            # 高度mm
            高度 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[4]/td[1]/div[1]")[0]
            print(高度.xpath('string(.)'))
            list_高度.append(高度.xpath('string(.)'))
            # 车身结构
            结构 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[9]/td[1]/div[1]")[0]
            print(结构.xpath('string(.)'))
            list_车身结构.append(结构.xpath('string(.)'))
            # 车门数
            车门 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[10]/td[1]/div[1]")[0]
            print(车门.xpath('string(.)'))
            list_车门数.append(车门.xpath('string(.)'))
            # 座位数
            座位 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[11]/td[1]/div[1]")[0]
            print(座位.xpath('string(.)'))
            list_座位数.append(座位.xpath('string(.)'))
            # 油箱容积L
            油箱 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[12]/td[1]/div[1]")[0]
            print(油箱.xpath('string(.)'))
            list_油箱容积.append(油箱.xpath('string(.)'))
            # 行李箱容积L
            行李箱 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[13]/td[1]/div[1]")[0]
            print(行李箱.xpath('string(.)'))
            list_行李箱容积.append(行李箱.xpath('string(.)'))
            # 整备质量kg
            质量 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[14]/td[1]/div[1]")[0]
            print(质量.xpath('string(.)'))
            list_整备质量.append(质量.xpath('string(.)'))
            # 排量L
            排量 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[4]/td[1]/div[1]")[0]
            print(排量.xpath('string(.)'))
            list_排量.append(排量.xpath('string(.)'))
            # 气缸排列形式
            气缸排列 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[6]/td[1]/div[1]")[0]
            print(气缸排列.xpath('string(.)'))
            list_气缸排列形式.append(气缸排列.xpath('string(.)'))
            # 气缸数
            气缸数 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[7]/td[1]/div[1]")[0]
            print(气缸数.xpath('string(.)'))
            list_气缸数.append(气缸数.xpath('string(.)'))
            # 最大马力
            马力 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[13]/td[1]/div[1]")[0]
            print(马力.xpath('string(.)'))
            list_最大马力.append(马力.xpath('string(.)'))

            """为car_info添加数据"""
            car_info['name'] = list_car[i]
            car_info['price'] = list_price[i]
            car_info['能源类型'] = list_汽油[i]
            car_info['上市时间'] = list_时间[i]
            car_info['最大功率'] = list_最大功率[i]
            car_info['最大扭矩'] = list_最大扭矩[i]
            car_info['变速箱类型'] = list_变速箱类型[i]
            car_info['最大车速'] = list_最大车速[i]
            car_info['官方0-100kmph加速'] = list_加速[i]
            car_info['工信部综合油耗Lp100km'] = list_油耗[i]
            car_info['长度mm'] = list_长度[i]
            car_info['宽度mm'] = list_宽度[i]
            car_info['高度mm'] = list_高度[i]
            car_info['车身结构'] = list_车身结构[i]
            car_info['车门数'] = list_车门数[i]
            car_info['座位数'] = list_座位数[i]
            car_info['油箱容积'] = list_油箱容积[i]
            car_info['行李箱容积'] = list_行李箱容积[i]
            car_info['整备质量'] = list_整备质量[i]
            car_info['排量'] = list_排量[i]
            car_info['气缸排列形式'] = list_气缸排列形式[i]
            car_info['气缸数'] = list_气缸数[i]
            car_info['最大马力'] = list_最大马力[i]

            tmp_frame = pd.DataFrame(car_info, index=[0])
            name = 'data/{}.csv'.format(list_car[i])
            '''if os.path.exists(name):
                continue'''
            tmp_frame.to_csv(name, encoding='utf8')

        else:
            """为list添加数据"""
            list_汽油.append('暂无')
            list_时间.append('暂无')
            list_最大功率.append('暂无')
            list_最大扭矩.append('暂无')
            list_变速箱类型.append('暂无')
            list_最大车速.append('暂无')
            list_加速.append('暂无')
            list_油耗.append('暂无')
            list_质保.append('暂无')
            list_长度.append('暂无')
            list_宽度.append('暂无')
            list_高度.append('暂无')
            list_车身结构.append('暂无')
            list_车门数.append('暂无')
            list_座位数.append('暂无')
            list_油箱容积.append('暂无')
            list_行李箱容积.append('暂无')
            list_整备质量.append('暂无')
            list_排量.append('暂无')
            list_气缸排列形式.append('暂无')
            list_气缸数.append('暂无')
            list_最大马力.append('暂无')
            """为car_info添加数据"""
            car_info['name'] = list_car[i]
            car_info['price'] = list_price[i]
            car_info['能源类型'] = list_汽油[i]
            car_info['上市时间'] = list_时间[i]
            car_info['最大功率'] = list_最大功率[i]
            car_info['最大扭矩'] = list_最大扭矩[i]
            car_info['变速箱类型'] = list_变速箱类型[i]
            car_info['最大车速'] = list_最大车速[i]
            car_info['官方0-100kmph加速'] = list_加速[i]
            car_info['工信部综合油耗Lp100km'] = list_油耗[i]
            car_info['长度mm'] = list_长度[i]
            car_info['宽度mm'] = list_宽度[i]
            car_info['高度mm'] = list_高度[i]
            car_info['车身结构'] = list_车身结构[i]
            car_info['车门数'] = list_车门数[i]
            car_info['座位数'] = list_座位数[i]
            car_info['油箱容积'] = list_油箱容积[i]
            car_info['行李箱容积'] = list_行李箱容积[i]
            car_info['整备质量'] = list_整备质量[i]
            car_info['排量'] = list_排量[i]
            car_info['气缸排列形式'] = list_气缸排列形式[i]
            car_info['气缸数'] = list_气缸数[i]
            car_info['最大马力'] = list_最大马力[i]

            tmp_frame = pd.DataFrame(car_info, index=[0])
            name = 'data/{}.csv'.format(list_car[i])
            '''if os.path.exists(name):
                continue'''
            tmp_frame.to_csv(name, encoding='utf8')
    else:
            """为list添加数据"""
            list_汽油.append('暂无')
            list_时间.append('暂无')
            list_最大功率.append('暂无')
            list_最大扭矩.append('暂无')
            list_变速箱类型.append('暂无')
            list_最大车速.append('暂无')
            list_加速.append('暂无')
            list_油耗.append('暂无')
            list_质保.append('暂无')
            list_长度.append('暂无')
            list_宽度.append('暂无')
            list_高度.append('暂无')
            list_车身结构.append('暂无')
            list_车门数.append('暂无')
            list_座位数.append('暂无')
            list_油箱容积.append('暂无')
            list_行李箱容积.append('暂无')
            list_整备质量.append('暂无')
            list_排量.append('暂无')
            list_气缸排列形式.append('暂无')
            list_气缸数.append('暂无')
            list_最大马力.append('暂无')
            """为car_info添加数据"""
            car_info['name'] = list_car[i]
            car_info['price'] = list_price[i]
            car_info['能源类型'] = list_汽油[i]
            car_info['上市时间'] = list_时间[i]
            car_info['最大功率'] = list_最大功率[i]
            car_info['最大扭矩'] = list_最大扭矩[i]
            car_info['变速箱类型'] = list_变速箱类型[i]
            car_info['最大车速'] = list_最大车速[i]
            car_info['官方0-100kmph加速'] = list_加速[i]
            car_info['工信部综合油耗Lp100km'] = list_油耗[i]
            car_info['长度mm'] = list_长度[i]
            car_info['宽度mm'] = list_宽度[i]
            car_info['高度mm'] = list_高度[i]
            car_info['车身结构'] = list_车身结构[i]
            car_info['车门数'] = list_车门数[i]
            car_info['座位数'] = list_座位数[i]
            car_info['油箱容积'] = list_油箱容积[i]
            car_info['行李箱容积'] = list_行李箱容积[i]
            car_info['整备质量'] = list_整备质量[i]
            car_info['排量'] = list_排量[i]
            car_info['气缸排列形式'] = list_气缸排列形式[i]
            car_info['气缸数'] = list_气缸数[i]
            car_info['最大马力'] = list_最大马力[i]

            tmp_frame = pd.DataFrame(car_info, index=[0])
            name = 'data/{}.csv'.format(list_car[i])
            '''if os.path.exists(name):
                continue'''
            tmp_frame.to_csv(name, encoding='utf8')

    #data.drop(data.index[0],inplace=True)
    data.drop(start_from, axis=0, inplace=True)
    data.to_csv("D:\\python 用\\car\\data\\url_list.csv")
    start_from = start_from +1

    i = i + 1

