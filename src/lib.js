
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

__.replaceSelectOptions = function (el, arr, attr) {
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

__.replaceSelectOptionsAccordingToParent = function  (child, parent, attr) {
	let value = $(parent).val()
	let $selected = $(parent).find('option[value="'+ value +'"]')
	let varieties = JSON.parse(decodeURIComponent($selected.attr(attr || 'data-sub')))
	replaceSelectOptions(child, varieties, attr)
}


const countDown = function (time, el, promise) {
    this.time = time;
    this.el = el;
    this.innerText = el.innerText;
    this.promise = promise;
}
countDown.prototype.start = function (fn) {
    let _this = this,
        _time = _this.time,
        _innerText = _this.innerText,
        _timer = null;
    _this.el.addEventListener('click', function () {
        if (_timer) return;
        _this.el.innerText = _time + 's'
        _this.el.setAttribute('disabled', 'disabled')
        _timer = setInterval(function () {
            if (_time > 0) {
                _time--
                _this.el.innerText = _time + 's'
            } else {
                clearInterval(_timer)
                _timer = null
                _this.el.innerText = _innerText
                _time = _this.time
                _this.el.removeAttribute('disabled')
            }
        }, 1000)
        fn(_this.promise().then(function (data) {
            return data
        }).catch(function (err) {
            clearInterval(_timer)
            _timer = null
            _this.el.innerText = _innerText
            _time = _this.time
            _this.el.removeAttribute('disabled')
            return Promise.reject(err)
        }))
    }, false)
}

__.countDown = countDown

export default __
