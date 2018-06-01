
function handleResponse (response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

function handleJSONResponse (response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
}
function handleTextResponse (response) {
  return response.text()
    .then(text => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
}

const __ = {}

// 原生fetch请求
__.fetch = function (url, opts) {
	return fetch(url, opts).then(handleResponse)
}

// Promise ajax
__.ajax = function (url, {method, body}) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest()
		request.open(method, url)
		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				if(request.status === 200){
					resolve(JSON.parse(request.responseText))
			    } else {
			    	reject(JSON.parse(request.responseText))
			    }
			}
		}
		request.send(body)
	})
}

// ajax请求
__.ajax2 = function (url, {method, body}) {
	return {
		fetch: function (success, error) {
			let request = new XMLHttpRequest()
			request.open(method, url)
			request.onreadystatechange = function() {
				if (request.readyState === 4) {
					console.log(request)
					if(request.status === 200){
						success(JSON.parse(request.responseText))
				    } else {
				    	error(request.responseText)
				    }
				}
			}
			request.send(body)
		}
	}
}

const _replaceSelectOptions = function (el, arr, attr) {
	let tpl = arr.map(item => {
		return `<option ${item.active?'selected':''} value="${item.value}" ${
			((i) => {
				let val = item.variety && item.variety.length > 0 ? encodeURIComponent(JSON.stringify(item.variety)) : '';
				return (attr || 'data-sub') + '=' + val
			})(item)
		}>${item.label}</option>`
	})
	el.innerHTML = tpl.join('')
}

const _replaceSelectOptionsAccordingToParent = function  (child, parent, attr) {
	let value = $(parent).val()
	let $selected = $(parent).find('option[value="'+ value +'"]')
	let varieties = JSON.parse(decodeURIComponent($selected.attr(attr || 'data-sub')))
	_replaceSelectOptions(child, varieties, attr)
}

// 替换select 的options
__.replaceSelectOptions = _replaceSelectOptions
// 根据父select的value 替换子select
__.replaceSelectOptionsAccordingToParent = _replaceSelectOptionsAccordingToParent

// 所有每一轮，所有函数都执行完，才进行第二轮执行
__.everyFn = function (...fn) {
  let arr =[]
  fn.forEach((item) => {
    if (typeof item !== 'function') {
      throw new Error(item.toString() + ' is not function')
    }
    let obj = {
      fn: item,
      runable: true
    }
    obj.changeRunable = function () {
      obj.runable = true
    }
    arr.push(obj)
  })
  return function () {
    if (arr.every((item) => {return item.runable === true})) {
      arr.forEach((item) => {
        item.runable = false
        item.fn(item.changeRunable)
      })
    }
  }
}

//日期格式化
__.dateFormat = function (data, format) {
  var res = format;
  var week = ['日', '一', '二', '三', '四', '五', '六'];
  res = res.replace(/yyyy|YYYY/, data.getFullYear());
  res = res.replace(/yy|YY/, (data.getYear() % 100) > 9 ? (data.getYear() % 100).toString() : '0' + (data.getYear() % 100));
  res = res.replace(/MM/, (data.getMonth() + 1) > 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1));
  res = res.replace(/M/g, (data.getMonth() + 1));
  res = res.replace(/w|W/g, week[data.getDay()]);
  res = res.replace(/dd|DD/, data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate());
  res = res.replace(/d|D/g, data.getDate());
  res = res.replace(/hh|HH/, data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours());
  res = res.replace(/h|H/g, data.getHours());
  res = res.replace(/mm/, data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes());
  res = res.replace(/m/g, data.getMinutes());
  res = res.replace(/ss|SS/, data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds());
  res = res.replace(/s|S/g, data.getSeconds());
  return res
};

// 睡眠
__.sleep = function (numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime){
      return;
    }
  }
}

//是否是手机号码
__.isPhone = function (tel) {
    return /^1[0-9]{10}$/.test(tel);
}

//是否是身份证
__.isIDCard = function (a) {
    return !(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(a) && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(a))
}

//是否是数值,最多保留到小数点后两位
__.isNumeric = function (a) {
    return /^[0-9]+(.[0-9]{1,2})?$/.test(a);
}

//剩余时间,传递距离当前时间的毫秒数
const _formatMillisecond = function (millisecond) {
    let day = parseInt(millisecond/24/60/60/1000);
    let hour = parseInt((millisecond - day*24*60*60*1000)/60/60/1000);
    let minute = parseInt((millisecond - day*24*60*60*1000 - hour*60*60*1000)/60/1000);
    let second = parseInt((millisecond - day*24*60*60*1000 - hour*60*60*1000 - minute*60*1000)/1000);
    return {
        d: day,
        h: hour,
        m: minute,
        s: second,
    }
}
__.leftTime = function (millisecond) {
    let obj = _formatMillisecond(millisecond);
    let arr = [{
        a: '天',
        b: obj.d
    },{
        a: '小时',
        b: obj.h
    },{
        a: '分钟',
        b: obj.m
    },{
        a: '秒',
        b: obj.s
    }]
    for (let i=0; i<arr.length; i++) {
        if (arr[i].b === 0) {
            arr[i].c = true;
        } else {
            break;
        }
    }
    for (let i=arr.length-1; i>=0; i--) {
        if (arr[i].b === 0) {
            arr[i].c = true;
        } else {
            break;
        }
    }
    let res = ''
    arr.each(function (item) {
        if (!item.c) {
            res += (item.b + item.a)
        }
    })
    return res;
}

//生成唯一随机数
const _existingRandomNumbers = {}
const _random = function () {
    return String(Math.random()).substr(2, 8)
}
const _unique = function () {
    let res = _random()
    if (_existingRandomNumbers[res]) {
        _unique()
    } else {
        _existingRandomNumbers[res] = true;
        return res
    }
};
__.unique = _unique


// 浮点数计算有问题，整数计算是没问题的，
// 原理就是将浮点数转化为整数来计算
// 那么将浮点转化成正数运算，之后再切回浮点就可以保证没有偏差了


const _add = function (a, b) {
    var c, d, e;
    try {
        c = String(a).toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = String(b).toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (_mul(a, e) + _mul(b, e)) / e;
}

const _sub = function (a, b) {
    var c, d, e;
    try {
        c = String(a).toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = String(b).toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (_mul(a, e) - _mul(b, e)) / e;
}

const _mul = function (a, b) {
    var c = 0,
        d = String(a).toString(),
        e = String(b).toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

const _div = function (a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = String(a).toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = String(b).toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), _mul(c / d, Math.pow(10, f - e));
}

__.add = _add;// 浮点数求和
__.sub = _sub;// 浮点数相减
__.mul = _mul;// 浮点数相乘
__.div = _div;// 浮点数相除

// 禁止滚动
const _bodyScroll = function (event){
    event.preventDefault();  
}
__.bodyScroll = {
  disable: function () {
    document.body.addEventListener('touchmove', _bodyScroll, false)
    document.body.style = 'position: fixed; width: 100%'
  },
  enable: function () {
    document.body.removeEventListener('touchmove', _bodyScroll, false)
    document.body.style = 'position: initial; width: initial'
  }
}

export default __
