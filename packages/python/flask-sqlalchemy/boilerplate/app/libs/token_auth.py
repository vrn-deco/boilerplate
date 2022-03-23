# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/5 23:31
"""
from collections import namedtuple

from flask import current_app, g, request
from flask_httpauth import HTTPBasicAuth
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired

from app.libs.error_code import AuthFailed, Forbidden
from app.libs.scope import is_in_scope

__author__ = 'Cphayim'

auth = HTTPBasicAuth()
User = namedtuple('User', ['uid', 'ac_type', 'scope'])


@auth.verify_password
def verify_password(token, pwd):
    """
    访问权限验证器
    HTTP BasicAuth
    Authorization -> basic base64(account:password)
    我们使用 token 替代 account，password 为空
    :param token: 令牌
    :param pwd: ''
    :return:
    """
    user_info = verify_auth_token(token)
    if not user_info:
        return False
    # 将用户信息保存在 flask.g 下( g 是线程隔离的)
    g.user = user_info
    return True


def verify_auth_token(token):
    """
    验证 token
    :param token:
    :return:
    """
    s = Serializer(current_app.config.get('SECRET_KEY'))
    try:
        data = s.loads(token)
    except BadSignature:
        # 令牌无效
        raise AuthFailed(msg='token is invalid', error_code=1002)
    except SignatureExpired:
        # 令牌过期
        raise AuthFailed(msg='token is expired', error_code=1003)

    uid = data['uid']
    ac_type = data['type']
    scope = data['scope']

    # 当前用户是否有权限访问视图函数
    allow = is_in_scope(scope, request.endpoint)
    if not allow:
        raise Forbidden()

    return User(uid, ac_type, scope)
