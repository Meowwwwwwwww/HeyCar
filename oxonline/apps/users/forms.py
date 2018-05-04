# _*_ coding: utf-8 _*_
__author__ = 'koshiro'
__date__ = '2018/5/2 22:32'
from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True, min_length=5)