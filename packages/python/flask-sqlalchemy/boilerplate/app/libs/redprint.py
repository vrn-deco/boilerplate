# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 20:26
"""

__author__ = 'Cphayim'


class Redprint:
    """
    红图
    """

    def __init__(self, name, url_prefix=None):
        self.name = name
        self.mound = []
        self.url_prefix = url_prefix or '/' + str(name)

    def route(self, rule, **options):
        """
        路由装饰器
        :param rule: 路径
        :param options: 关键字参数
        :return:
        """

        def decorator(f):
            # 将视图函数和路由配置保存到 mound 中
            self.mound.append((f, str(rule), options))
            return f

        return decorator

    def register(self, bp, url_prefix=None):
        """
        将红图注册到蓝图
        :param bp: 蓝图对象
        :param url_prefix: url 前缀
        :return:
        """
        url_prefix = str(url_prefix or self.url_prefix)

        for f, rule, options in self.mound:
            # 如果 rule 不是以 '/' 开头，补全
            if rule and rule[0] != '/':
                rule = '/' + rule

            # 在开头补上红图的 url_prefix
            rule = url_prefix + rule

            # 将视图函数及路由规则添加到红图对应的蓝图上
            endpoint = self.name + '+' + options.pop('endpoint', f.__name__)
            bp.add_url_rule(rule, endpoint, f, **options)
