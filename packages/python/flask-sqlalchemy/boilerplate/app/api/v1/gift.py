# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/11 15:29
"""
from flask import g

from app.libs.error_code import DuplicateGift, Success
from app.libs.redprint import Redprint
from app.libs.token_auth import auth
from app.models.base import db
from app.models.book import Book
from app.models.gift import Gift

__author__ = 'Cphayim'

api = Redprint('gift', url_prefix='/gift')


@api.route('/<isbn>', methods=['POST'])
@auth.login_required
def create(isbn):
    uid = g.user.uid
    Book.query.filter_by(isbn=isbn).first_or_404()
    if Gift.query.filter_by(isbn=isbn, uid=uid).first():
        raise DuplicateGift()
    with db.auto_commit():
        gift = Gift()
        gift.isbn = isbn
        gift.uid = uid
        db.session.add(gift)

    return Success()
