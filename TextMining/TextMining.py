# -*- coding: utf-8 -*-
"""
Created on Thu Apr 19 15:40:48 2018

@author: adminsistrator
"""

# import matplotlib.pyplot as plt
import Functions as fc
import pandas as pd
import os
# import jieba
import jieba.analyse as ana



if __name__ == '__main__':
    
    # 评论数据集的位置，第一个实际需要处理的地址，第二个是样例地址
    file_path = "C:\\Users\\adminsistrator\\Desktop\\汽车销售数据文件\\汽车销售数据文件\\carcomment\\"
    # file_path = "C:\\Users\\adminsistrator\\Desktop\\TextExample\\"
    path_dir =  os.listdir(file_path)
    
    # 停用词库的位置
    ana.set_stop_words("C:\\Users\\adminsistrator\\Desktop\\汽车销售数据文件\\停用词.txt")
     
    # 情感词库位置
    f = open('C:\\Users\\adminsistrator\\Desktop\\最全中文情感和语义词库\\SentimentAnalysisWordsLib\\汉语情感词极值表\\汉语情感词极值表.txt')
    emotion_points = pd.read_csv(f, names=['word', 'point'], delim_whitespace=True, encoding='utf8')
    del f
    
    # 从文件中取出情感词和评分，并转换为列表形式
    series_word = emotion_points['word']
    list_word = []
    for word in series_word:
        list_word.append(word)
    del series_word
    del word
    
    series_point = emotion_points['point']
    list_point = []
    for point in series_point:
        list_point.append(point)
    del series_point
    del point
    
    del emotion_points
    
    # 生成一个包含所有文件完整路径的列表full_path_list
    full_path_list = []
    
    for dir in path_dir:
        full_path = file_path + dir
        full_path_list.append(full_path)
    del dir
    del full_path
    
    # 车型ID的列表car_ID_list
    car_ID_list = []
    # 评论集大小的列表comment_num_list
    comment_num_list = []
    # 车型评论的列表，每个车型对应一个储存评论的列表car_comments_list
    car_comments_list = []
    
    for path in full_path_list:
        f = open(path)
        file = pd.read_csv(f)
        
        # 获取评论数
        num = file.shape[0]
        comment_num_list.append(num)
        
        # 获取车型ID
        if(num > 0):
            text = file.iat[0,1]
        else:
            text = '-1'
        car_ID_list.append(text)
        
        # 获取评论
        comments = file['postTitle']
        car_comments_list.append(comments)
        
        # 处理缺失值
        i = 0
        for sen in comments:
            txt = str(sen)
            txt.strip()
            if(txt == 'nan'):
                comments[i] = '王小猪'
            i += 1
        file.to_csv(path)
        
    del comments
    # del file
    del path
    del num
    del text
    del sen
    del txt
    
    # 生成车型名ID的列表car_name_list(去除path_dir后面的.csv)
    car_name_list = []
    
    for dir in path_dir:
        new_dir = dir.replace('.csv', '')
        car_name_list.append(new_dir)
    del dir
    del new_dir
    del path_dir
    
    # 进行分词
    # jieba_split_list = fc.split(car_comments_list)
    # 去除停用词
    jieba_wipeoff_list = fc.wipeoff(car_comments_list)
    
    # 进行词频统计
    word_freq_list = fc.word_freq_count(jieba_wipeoff_list)    
    
    # 统计情感分数，总分=情感总分/评论数
    car_points_list = []
    for i in range(0,len(car_name_list)-1):
        
        # 取出第i个车型
        test_list = word_freq_list[i]
        
        j = 0
        point = 0
        for word in test_list.index:
            if word in list_word:
                point += float(test_list[j])*list_point[list_word.index(word)]
            j += 1
        if comment_num_list[i]>0:
            point = point/comment_num_list[i]
        car_points_list.append(point)
        
    del point
    del word
    del i
    del j
    del test_list
    
    # 把各个车型的情感得分标准化
    car_normalized_points_list = []
    max = max(car_points_list)
    min = min(car_points_list)
    for point in car_points_list:
        point = (point - min)/(max-min)
        car_normalized_points_list.append(point)
        
    del max
    del min
    
    
    car_points_list.append(0)
    car_points_list.pop()
    # 生成汇总好的数据框SummarySheet
    SummarySheet = pd.DataFrame(
    {
    '车型ID': car_ID_list,
    '评论数':  comment_num_list,
    '车型名ID': car_name_list,
    '情感指数': car_points_list,
    '标准化的情感指数': car_normalized_points_list
    }
    )
    print('\nSummary Sheet:\n')
    print(SummarySheet)
    
    # 把SummarySheet储存为csv文件
    SummarySheet.to_csv("C:\\Users\\adminsistrator\\Desktop\\文本挖掘\\SummarySheet.csv")

    
'''a=b=c=d=e=0
for num in comment_num_list:
    if num<=10:
        a += 1
    elif num>10 and num<=100:
        b += 1
    elif num>100 and num<=1000:
        c += 1
    elif num>1000 and num<=10000:
        d += 1
    else:
        e += 1
print(a)
print(b)
print(c)
print(d)
print(e)
num = a+b+c+d+e
print(num)'''