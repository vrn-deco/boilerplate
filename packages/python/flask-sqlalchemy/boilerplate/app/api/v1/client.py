# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 23:42
"""
from flask import request
from werkzeug.exceptions import HTTPException

from app.libs.error_code import Success
from app.validators.forms import ClientTypeForm, UserEmailForm
from app.libs.enums import ClientTypeEnum
from app.libs.redprint import Redprint
from app.models.user import User

__author__ = 'Cphayim'

api = Redprint('client')


@api.route('/register', methods=['POST'])
def create_client():
    """
    创建用户
    :return:
    """
    form = ClientTypeForm().validate_for_api()
    promise = {
        ClientTypeEnum.USER_EMAIL: __register_user_by_email
    }
    promise[form.type.data]()

    return Success()


def __register_user_by_email():
    form = UserEmailForm().validate_for_api()
    User.register_by_email(
        form.nickname.data, form.account.data, form.secret.data
    )
