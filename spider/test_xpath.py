#-*-coding:utf8-*-

'''import urllib.request
import zlib
import chardet
from lxml import etree

url = "https://car.autohome.com.cn/config/series/2951.html"
response = urllib.request.urlopen(url)
content = response.read()

# 处理压缩编码
gzipped = response.headers.get('Content-Encoding')
if gzipped:
    html = zlib.decompress(content, 16+zlib.MAX_WBITS)
else:
    html = content

mychar = chardet.detect(html)
coding = mychar['encoding']

# 转换编码方式
if coding == 'gb2312' or coding == 'GB2312':
    html = html.decode('gb2312', 'ignore')
if coding == 'utf-8' or coding == 'UTF-8':
    html = html.decode('utf-8', 'ignore')
if coding == 'gbk' or coding == 'GBK':
    html = html.decode('gbk', 'ignore')

# 将页面源码转换为xml用于后续识别
selector = etree.HTML(html)'''

from selenium import webdriver
from lxml import etree

driver =webdriver.PhantomJS(executable_path="C:/Users/mia/Desktop/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs.exe")
driver.implicitly_wait(30) # 隐性等待，最长等30秒
url = "https://car.autohome.com.cn/config/series/2951.html"
html = driver.get(url)
html = driver.page_source

# 方案:
selector = etree.HTML(html)
print(selector)
#能源类型
汽油 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[4]/td[1]/div[1]")[0]
print(汽油.xpath('string(.)'))
#上市时间
时间 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[5]/td[1]/div[1]")[0]
print(时间.xpath('string(.)'))
#最大功率kW
max_功率 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[6]/td[1]/div[1]")[0]
print(max_功率.xpath('string(.)'))
#最大扭矩Nm
扭矩 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[7]/td[1]/div[1]")[0]
print(扭矩.xpath('string(.)'))
#变速箱
变速箱 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[9]/td[1]/div[1]")[0]
print(变速箱.xpath('string(.)'))
#最高车速kmph
max_车速 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[12]/td[1]/div[1]")[0]
print(max_车速.xpath('string(.)'))
#官方0-100kmph加速
加速 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[13]/td[1]/div[1]")[0]
print(加速.xpath('string(.)'))
#工信部综合油耗Lp100km
油耗 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[16]/td[1]/div[1]")[0]
print(油耗.xpath('string(.)'))
#整车质保几年或多少万公里
质保 = selector.xpath("//div[@id='config_data']/table[2]/tbody[1]/tr[18]/td[1]/div[1]")[0]
print(质保.xpath('string(.)'))
#长度mm
长度 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[2]/td[1]/div[1]")[0]
print(长度.xpath('string(.)'))
#宽度mm
宽度 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[3]/td[1]/div[1]")[0]
print(宽度.xpath('string(.)'))
#高度mm
高度 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[4]/td[1]/div[1]")[0]
print(高度.xpath('string(.)'))
#车身结构
结构 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[9]/td[1]/div[1]")[0]
print(结构.xpath('string(.)'))
#车门数
车门 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[10]/td[1]/div[1]")[0]
print(车门.xpath('string(.)'))
#座位数
座位 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[11]/td[1]/div[1]")[0]
print(座位.xpath('string(.)'))
#油箱容积L
油箱 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[12]/td[1]/div[1]")[0]
print(油箱.xpath('string(.)'))
#行李箱容积L
行李箱 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[13]/td[1]/div[1]")[0]
print(行李箱.xpath('string(.)'))
#整备质量kg
质量 = selector.xpath("//div[@id='config_data']/table[3]/tbody[1]/tr[14]/td[1]/div[1]")[0]
print(质量.xpath('string(.)'))
#排量L
排量 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[4]/td[1]/div[1]")[0]
print(排量.xpath('string(.)'))
#气缸排列形式
气缸排列 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[6]/td[1]/div[1]")[0]
print(气缸排列.xpath('string(.)'))
#气缸数
气缸数 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[7]/td[1]/div[1]")[0]
print(气缸数.xpath('string(.)'))
#最大马力
马力 = selector.xpath("//div[@id='config_data']/table[4]/tbody[1]/tr[13]/td[1]/div[1]")[0]
print(马力.xpath('string(.)'))