#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/9 20:30
  创建管理员账号
"""
from app import create_app
from app.models.base import db
from app.models.user import User

__author__ = 'Cphayim'

ADMIN_NICKNAME = 'root'
ADMIN_EMAIL = '管理员邮箱'
ADMIN_PASSWORD = '管理员密码'

app = create_app()
with app.app_context():
    if User.query.filter_by(email=ADMIN_EMAIL).first():
        print('创建失败，该管理员账号已存在')
    else:
        with db.auto_commit():
            user = User()
            user.nickname = ADMIN_NICKNAME
            user.email = ADMIN_EMAIL
            user.password = ADMIN_PASSWORD
            user.auth = 2
            db.session.add(user)
        print('创建成功')
        print('email: ' + ADMIN_EMAIL)
        print('password: ' + ADMIN_PASSWORD)
