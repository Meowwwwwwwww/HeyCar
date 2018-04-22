# -*- coding: utf-8 -*-
"""
Created on Thu Apr 19 15:40:48 2018

@author: adminsistrator
"""

# import matplotlib.pyplot as plt
import Functions as fc
import pandas as pd
import os
import jieba
import jieba.analyse as ana
    
if __name__ == '__main__':
    
    # 评论数据集的位置，第一个为所有评论数据共2023个文件，第二个是包含6个文件样例
    # file_path = "C:\\Users\\adminsistrator\\Desktop\\汽车销售数据文件\\汽车销售数据文件\\carcomment\\"
    file_path = "C:\\Users\\adminsistrator\\Desktop\\TextExample\\"
    path_dir =  os.listdir(file_path)
    
    # 停用词库的位置
    ana.set_stop_words("C:\\Users\\adminsistrator\\Desktop\\汽车销售数据文件\\停用词.txt")
    
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
        num = file.shape[0]
        comment_num_list.append(num)
        if(num > 0):
            text = file.iat[0,1]
        else:
            text = '-1'
        car_ID_list.append(text)
        comments = file['postTitle']
        car_comments_list.append(comments)
        
    del comments
    del file
    del path
    del num
    del text
    
    # 生成车型名ID的列表car_name_list(去除path_dir后面的.csv)
    car_name_list = []
    
    for dir in path_dir:
        new_dir = dir.replace('.csv', '')
        car_name_list.append(new_dir)
    del dir
    del new_dir
    del path_dir
    
    # 进行分词
    jieba_split_list = fc.split(car_comments_list)
    # 去除停用词
    jieba_wipeoff_list = fc.wipeoff(car_comments_list)
    
    # 进行词频统计
    word_freq_list = fc.word_freq_count(jieba_wipeoff_list)    
    # ********************************************************************

    # ********************************************************************
    
    # 生成汇总好的数据框SummarySheet
    SummarySheet = pd.DataFrame(
    {
    '车型ID': car_ID_list,
    '评论数':  comment_num_list,
    '车型名ID': car_name_list,
    '标签1': 1.0
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