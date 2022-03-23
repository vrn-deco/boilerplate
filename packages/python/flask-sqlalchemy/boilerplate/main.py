#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/4 18:23
"""
from werkzeug.exceptions import HTTPException

from app import create_app
from app.libs.error import APIException
from app.libs.error_code import ServerError

__author__ = 'Cphayim'

app = create_app()


# 全局异常处理
@app.errorhandler(Exception)
def framework_error(e):
    if isinstance(e, APIException):
        return e
    if isinstance(e, HTTPException):
        code = e.code
        msg = e.description
        error_code = 1007
        return APIException(code, msg, error_code)
    else:
        # 这里多数是服务端异常，可以做 log
        if not app.config.get('DEBUG'):
            # 非调试模式，返回概要信息
            return ServerError()
        else:
            # 调试模式，返回完整错误堆栈
            raise e


if __name__ == '__main__':
    app.run(
        debug=app.config.get('DEBUG', False)
    )
