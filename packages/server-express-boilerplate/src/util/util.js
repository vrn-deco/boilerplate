/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-04
 */
const b64 = require('base-64');
const stu = require('./status');
const md5 = require('js-md5');
const con = require('../../public/config');
const Path = require('path');
const writeFileSync = require('fs').writeFileSync;

/**
 *
 * @type {exports.setResult}
 */

const setResult = exports.setResult = (res = "",status = 10001,desc) =>{
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

const Headers = exports.Headers = (str = "") => {
    let encode = b64.decode(str).split(':')[1];
    return encode;
};

exports.PassWord = class PassWord {
    constructor(str = ""){
        this.str = str;
    }
    getPassWord(){
        let md5PassWord = md5(con.NT_SCRECTKEY + this.str);
        return md5PassWord;
    }
};

const Err = exports.Err = class Err{
    isTokenDue(res, data,fn){
        if(data === -1){
            res.json(setResult("",10004));
        }else if(data === -2){
            res.json(setResult("无效令牌",10004,"无效令牌"))
        }else{
            fn()
        }
    }
    isErr(res, err,fn){
        if(err){
            res.json(setResult("",10002));
            console.log(err);
        }else{
            fn()
        }
    }
}

const Fs = exports.Fs = class Fs{
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
