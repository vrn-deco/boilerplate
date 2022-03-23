# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 23:47
"""
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, Email, Regexp, ValidationError

from app.libs.enums import ClientTypeEnum
from app.models.user import User
from app.validators.base import BaseForm

__author__ = 'Cphayim'


class ClientTypeForm(BaseForm):
    """
    客户类型表单验证
    """
    type = IntegerField(
        validators=[
            DataRequired()
        ]
    )
    account = StringField(
        validators=[
            DataRequired(),
            Length(min=5, max=32)
        ]
    )
    secret = StringField()

    def validate_type(self, value):
        try:
            # 如果不能成功转为枚举类型，说明参数是无效的
            client_type = ClientTypeEnum(value.data)
        except ValueError as e:
            raise e

        self.type.data = client_type


class UserEmailForm(ClientTypeForm):
    """
    用户邮件注册表单验证
    """
    account = StringField(
        validators=[
            DataRequired(),
            Length(min=5, max=32),
            Email(message='invalid email')
        ]
    )
    secret = StringField(
        validators=[
            DataRequired(),
            Regexp(r'^[A-Za-z0-9_*&$#@]{6,22}$')
        ]
    )
    nickname = StringField(
        validators=[
            DataRequired(),
            Length(min=2, max=20)
        ]
    )

    def validate_account(self, value):
        if User.query.filter_by(email=value.data).first():
            raise ValidationError(message='the email of account already exists')


class BookSearchForm(BaseForm):
    q = StringField(validators=[DataRequired()])


class TokenForm(BaseForm):
    token = StringField(validators=[DataRequired()])
