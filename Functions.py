# -*- coding: utf-8 -*-
"""
Created on Fri Apr 20 19:26:00 2018

@author: adminsistrator
"""
import jieba
import jieba.analyse as ana
import pandas as pd

# 输入评论集，返回分词后的列表
def split(car_comments_list):
    jieba_split_list = []
    for comment_list in car_comments_list:
        word_list_list = []
        for comments in comment_list:
            word_list = jieba.lcut(comments)
            for word in word_list:
                word_list_list.append(word)
        jieba_split_list.append(word_list_list)
    return jieba_split_list

# 输入评论集，返回通过TF-IDF算法去除停用词并分词后的列表
def wipeoff(car_comments_list):
    jieba_wipeoff_list = []
    for comment_list in car_comments_list:
        jieba_one_list = []
        for comments in comment_list:
            after_jieba = ana.extract_tags(comments, topK=20)
            for word in after_jieba:
                jieba_one_list.append(word)
        jieba_wipeoff_list.append(jieba_one_list)
    
    return jieba_wipeoff_list

def word_freq_count(array):
    word_freq = []
    for i in range(0, len(array)):
        split_df = pd.DataFrame(array[i], columns=['word'])
        split_result = split_df.groupby(['word']).size()
        split_freqlist = split_result.sort_values(ascending=False)
        word_freq.append(split_freqlist)
    return word_freq
        