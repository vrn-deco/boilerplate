# -*- coding: utf-8 -*-
"""
  Created by Cphayim at 2018/7/5 13:33
"""
from flask import request, json
from werkzeug.exceptions import HTTPException

__author__ = 'Cphayim'


class APIException(HTTPException):
    code = 500
    msg = 'sorry, we make a mistake (*￣︶￣)!'
    error_code = 999

    def __init__(self, code=None, msg=None, error_code=None, headers=None):
        if code:
            self.code = code
        if msg:
            self.msg = msg
        if error_code:
            self.error_code = error_code

        super(APIException, self).__init__(description=msg, response=None)

    # 重写 HTTPException 的 get_body 与 get_header，换回 json 格式的数据
    def get_body(self, environ=None):
        body = dict(
            error_code=self.error_code,
            msg=self.msg,
            # 请求类型 路径名(不包含主机名和端口号，不包含?参数)
            # 例:'POST v1/client/register'
            request=request.method + ' ' + self.get_url_no_param()
        )
        return json.dumps(body)

    def get_headers(self, environ=None):
        return [('Content-Type', 'application/json')]

    @staticmethod
    def get_url_no_param():
        full_path = str(request.full_path)
        main_path = full_path.split('?')[0]
        return main_path
