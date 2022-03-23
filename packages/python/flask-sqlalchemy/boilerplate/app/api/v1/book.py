# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 20:17
"""
from flask import request, jsonify
from sqlalchemy import or_

from app.libs.redprint import Redprint
from app.models.book import Book
from app.validators.forms import BookSearchForm

__author__ = 'Cphayim'

api = Redprint('book', url_prefix='/book')


@api.route('/search')
def search():
    form = BookSearchForm().validate_for_api()
    # 模糊搜索
    q = '%' + form.q.data + '%'
    books = Book.query.filter(or_(Book.title.like(q), Book.publisher.like(q))).all()
    books = [book.hide('summary', 'id') for book in books]
    return jsonify(books)


@api.route('/<isbn>/detail')
def detail(isbn):
    book = Book.query.filter_by(isbn=isbn).first_or_404()
    return jsonify(book)
