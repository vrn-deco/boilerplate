/*
 * @Author: benaozhi
 * @Date: 2019-08-10 16:13:01
 * @LastEditTime: 2019-08-17 10:31:08
 * @Description: util
 * @Exports { setResult, Headers, getPassWord, Fs }
 */
const b64 = require('base-64');
const stu = require('./status');
const md5 = require('js-md5');
const con = require('../../public/config');
const Path = require('path');
const writeFileSync = require('fs').writeFileSync;

/**
 * 设置返回体格式
 * @param {Object} res 返回参数result
 * @param {Number} status
 * @param {String} desc
 */
const setResult = (res = "",status = 10001,desc) =>{
  let json = {};
  json.result = res;
  json.status = status;
  if(desc !== undefined){
      json.desc = desc;
  }else{
      json.desc = stu[status];
  }
  return json;
};

/**
 * 剥离头文件，获取token值
 * @param {String} str
 */
const Headers = (str = "") => {
  let encode = b64.decode(str).split(':')[1];
  return encode;
};

/**
 * 加密密码
 * @param {String} str
 */
const getPassWord = (str = "") => {
  let md5PassWord = md5(con.NT_SCRECTKEY + str);
  return md5PassWord;
}

const Fs = class Fs{
  constructor(file){
      this.file = file;
  }
  setFileName(){
      let fileName = Date.now() + Math.random().toString().slice(2, 8);
      return fileName;
  }
  save(){
      const filePath = this.setFileName() + Path.extname(this.file.originalname);
      const name = Path.join(Path.resolve(),"static","upload", filePath);
      try {
          writeFileSync(name, this.file.buffer)
      } catch (err) {
          // 做日志记录
          throw err
      }
      return filePath;
  }
};

module.exports = { setResult, Headers, getPassWord, Fs }
