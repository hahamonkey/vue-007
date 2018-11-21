const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];
  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;
    let child, proto;
    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }
    // 处理循环引用
    const index = parents.indexOf(parent);
    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);
    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }
    return child;
  };
  return _clone(parent);
};

const getCookie = name => {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

const format = fmt => {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//设置cookie,增加到vue实例方便全局调用
const setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + '=' + encodeURI(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

//删除cookie
const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
};

const getRandom = (count) => {
  var num = '';
  for (let i = 0; i < count; i++) {
    num += Math.floor(Math.random() * 10)
  }
  return num;
}

const urlSplice = (url) => {
  let urlArr = url.split('/');
  if (urlArr.length) {
    return urlArr[urlArr.length - 1];
  } else {
    return '';
  }
}

/*存储值在localStorage*/
const setLocalStorage = (name, value) => {
  window.localStorage.setItem(name, JSON.stringify(value));
}

/*移除localStorage里面的值*/
const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name);
}

/*获取localStorage里面的值*/
const getLocalStorage = (name) => {
  if (window.localStorage.getItem(name)) {
    return JSON.parse(window.localStorage.getItem(name));
  } else {
    return '';
  }
}

/*存储值在sessionStorage*/
const setSessionStorage = (name, value) => {
  window.sessionStorage.setItem(name, JSON.stringify(value));
}

/*移除sessionStorage里面的值*/
const removeSessionStorage = (name) => {
  window.sessionStorage.removeItem(name);
}

/*获取sessionStorage里面的值*/
const getSessionStorage = (name) => {
  if (window.sessionStorage.getItem(name)) {
    return JSON.parse(window.sessionStorage.getItem(name));
  } else {
    return '';
  }
}

/*递归获取登陆时默认菜单*/
const getCurrentMenu = (menuList) => {
  let menu = {};
  const _getCurrentMenu = (menuList) => {
    menu = menuList[0];
    if (menu.leaves) {
      return _getCurrentMenu(menu.leaves);
    } else {
      return menu;
    }
  }
  return _getCurrentMenu(menuList);
}

/*递归删除对象中值为空的属性*/
const deleteEmptyObjectVal = (objInfo) => {
  const _deleteEmptyObjectVal = (objInfo) => {
    for(let key in objInfo) {
      if (objInfo[key] == '') {
        delete objInfo[key];
      }else if (typeof objInfo[key] === 'object') {
        _deleteEmptyObjectVal(objInfo[key]);
      }
    }
  }
  _deleteEmptyObjectVal(objInfo);
}

/*删除对象中值为空的属性*/
const deleteEmptyField = (objInfo) => {
  let objRes = {};
  for (let key in objInfo) {
    if (objInfo[key]) {
      objRes[key] = objInfo[key];
    }
  }
  return objRes;
}

/*获取对象的key值的数组*/
const getObjetKeys = (objInfo) => {
  let objRes = [];
  for (let key in objInfo) {
    objRes.push(key);
  }
  return objRes;
}

export default {
  clone,
  getCookie,
  setCookie,
  delCookie,
  getRandom,
  urlSplice,
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
  removeSessionStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  getSessionStorage,
  getCurrentMenu,
  deleteEmptyField,
  getObjetKeys,
  deleteEmptyObjectVal
};
