# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 20:17
"""
from flask import jsonify, g

from app.libs.error_code import NotFound, DeleteSuccess, AuthFailed
from app.libs.redprint import Redprint
from app.libs.token_auth import auth
from app.models.base import db
from app.models.user import User

__author__ = 'Cphayim'

api = Redprint('user', url_prefix='/user')


@api.route('/<int:uid>', methods=['GET'])
@auth.login_required
def super_get_user(uid):
    """
    查询指定用户 - 管理员接口
    :param uid: 用户 id
    :return:
    """
    user = User.query.filter_by(id=uid).first_or_404()
    return jsonify(user)


@api.route('', methods=['GET'])
@auth.login_required
def get_user():
    """
    查询当前用户
    :return:
    """
    uid = g.user.uid
    user = User.query.filter_by(id=uid).first_or_404()
    return jsonify(user)


@api.route('/<int:uid>', methods=['DELETE'])
@auth.login_required
def super_delete_user(uid):
    """
    删除指定用户 - 管理员接口
    :param uid: 用户 id
    :return:
    """
    with db.auto_commit():
        user = User.query.filter_by(id=uid).first_or_404()
        user.delete()
    return DeleteSuccess()


@api.route('', methods=['DELETE'])
@auth.login_required
def delete_user():
    """
    删除当前用户
    :return:
    """
    uid = g.user.uid
    with db.auto_commit():
        user = User.query.filter_by(id=uid).first_or_404()
        user.delete()
    return DeleteSuccess()


@api.route('/<int:uid>', methods=['PUT'])
def super_update_user(uid):
    return 'super update user'


@api.route('', methods=['PUT'])
def update_user():
    return 'update user'

# @api.route('/<int:uid>', methods=['DELETE'])
# def delete_user():
#     return 'delete user'
