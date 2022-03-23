# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/6 15:52
"""

__author__ = 'Cphayim'


class Person:
    name = 'Cphayim'
    age = 18

    def __init__(self):
        self.gender = 'male'

    # 当给 dict() 传递了一个对象时，它会去调用对象下的 keys() 方法
    # keys 方法返回所有希望被写入字典的 key
    def keys(self):
        return ('name', 'age', 'gender')

    def __getitem__(self, item):
        return getattr(self, item)


o = Person()
print(o.__dict__)
# print(o['__name'])
print(dict(o))
