# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 23:44
"""
from enum import Enum

__author__ = 'Cphayim'


class ClientTypeEnum(Enum):
    """
    客户端类型枚举
    """
    # 邮箱
    USER_EMAIL = 100
    # 手机号
    USER_MOBILE = 101

    # 微信小程序
    USER_MINAPP = 200
    # 微信公众号
    USER_WX = 201


class HTTPStatusCode(Enum):
    """
    HTTP 状态码枚举
    """
    QUERY_OK = 200  # GET
    CREATE_OR_UPDATE_OK = 201  # POST, PUT
    DELETE_OK = 204  # DELETE

    BAD_REQUEST = 400  # 参数错误
    UNAUTHORIZED = 401  # 没有访问权限
    FORBIDDEN = 403  # 拒绝访问
    NOT_FOUND = 404  # 找不到资源
    METHOD_NOT_ALLOWED = 405  # 不被允许的请求类型
    REQUEST_TIMEOUT = 408  # 请求超时
    REQUEST_URI_TOO_LONG = 414  # 请求 URI 过长
    TOO_MARY_REQUEST = 429  # 请求过于频繁

    SERVER_ERROR = 500  # 服务器端未知错误
    SERVICE_UNAVAILABLE = 503  # 服务暂不可用
