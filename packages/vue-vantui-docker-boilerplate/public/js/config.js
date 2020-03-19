/**
 *  全局配置文件
 *  暴露在 global.config 中
 *  ! 本文件不经过 babel，请注意 ES6 语法与 API
 *  Author: aozhi
 *  CreatDate: 2019-04-30
 */
;(function() {
  var config = {
    DEV: {
      BASE_URL_MAP: {
        DEFAULT: 'http://localhost:8012'
      }
    },
    PROD: {
      BASE_URL_MAP: {
        DEFAULT: 'xxx'
      }
    }
  }
  var g = typeof window ? window : global
  g.NT_CONFIG = config
})();
