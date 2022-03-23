# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/9 22:04
"""

__author__ = 'Cphayim'


# Scope 基类
class Scope:
    allow_api = set()
    allow_module = set()

    forbidden = set()

    def __add__(self, other):
        """
        运算符重载
        权限相加，支持链式调用
        :param other: scope
        :return:
        """
        if not isinstance(other, Scope):
            raise TypeError('other must be a Scope instance or subclass instance')
        self.allow_api = self.allow_api | other.allow_api
        self.allow_module = self.allow_module | other.allow_module
        self.forbidden = self.forbidden | other.forbidden

        return self


# 用户组
class UserScope(Scope):
    allow_api = {
        'v1.user+get_user',
        'v1.user+delete_user',
        'v1.gift+create'
    }
    # forbidden = {
    #     'v1.user+super_get_user',
    #     'v1.user+super+delete_user'
    # }
    #
    # def __init__(self):
    #     self + AdminScope()


# 管理员组
class AdminScope(Scope):
    # allow_api = {
    #     'v1.user+super_get_user',
    #     'v1.user+super_delete_user'
    # }
    allow_module = {'v1.user'}

    # def __init__(self):
    # self + UserScope()


def is_in_scope(scope_str, endpoint):
    """
    判断用户组是否有访问权限
    :param scope_str: 用户 scope 标识
    :param endpoint:
    :return:
    """
    # "反射" 创建 scope 实例
    scope = globals()[scope_str]()
    return (
            not __is_forbidden(scope, endpoint)
            and __is_allow_module(scope, endpoint)
            or __is_allow_api(scope, endpoint)
    )


def __is_forbidden(scope, endpoint):
    """是否禁止的"""
    return endpoint in scope.forbidden


def __is_allow_module(scope, endpoint):
    """是否有完整模块访问权"""
    # endpoint -> 'blue_name.red_name+func_name'
    splits = endpoint.split('+')
    if len(splits) != 2:
        return False
    return splits[0] in scope.allow_module


def __is_allow_api(scope, endpoint):
    """是否可以访问当前api"""
    return endpoint in scope.allow_api
