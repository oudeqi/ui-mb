
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

__.replaceSelectOptions = _replaceSelectOptions
__.replaceSelectOptionsAccordingToParent = _replaceSelectOptionsAccordingToParent

__.andFn = function (aFn, bFn) {
    let aFnRunable = true
    let changeAFnRunable = function () {
        aFnRunable = true
    }
    let bFnRunable = true
    let changeBFnRunable = function () {
        bFnRunable = true
    }
    return function () {
        if (aFnRunable && bFnRunable) {
            aFnRunable = false
            bFnRunable = false
            aFn(changeAFnRunable)
            bFn(changeBFnRunable)
        }
    }
}

export default __
