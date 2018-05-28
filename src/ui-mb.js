// 修复iOS系统的移动设备中:active状态
document.body.addEventListener('touchstart', function () {})

const _prefix = 'ui-mb'
const _delimiter = '__'

// 所有实例
const _instance = []

// 生成随机数
const _random = function () {
    return String(Math.random()).substr(2, 8)
}

// 生成唯一随机数
const _existingRandomNumbers = {}
const _unique = function () {
    var res = _random()
    if (_existingRandomNumbers[res]) {
        _unique()
    } else {
        _existingRandomNumbers[res] = true;
        return res
    }
}

// 生成唯一id
const _randomID = function () {
    return _prefix + _delimiter + _unique()
}

// 删除实例
const _removeInstance = function (id) {
    _instance.forEach((item, i) => {
        if (id) {
            if (id === item.id) {
                _instance.splice(i, 1)
            }
        } else {
            _instance.splice(i, 1)
        }
    })
}

// alert组件
const alert = function (content='content为字符串或者模板', btnTxt='知道了', title, fn) {
    let _id = _randomID()
    $('body').append(`
        <div class="ui-mb__modal ui-mb__fade-in" id="${_id}">
            <div class="ui-mb__alert">
                <div class="header">
                    ${
                        (()=>{
                            if (title) {
                                return `<div class="inner">${title}</div>`
                            } else {
                                return ''
                            }
                        })()
                    }
                </div>
                <div class="content">
                    ${
                        (()=>{
                            if (content[0] === '<' && content[content.length-1] === '>') {
                                return content
                            } else {
                                return `<div class="inner"><p>${content}</p></div>`
                            }
                        })()
                    }
                </div>
                <div class="footer">
                    <div class="inner">
                        <a class="btn" href="javascript:void(0);">${btnTxt}</a>
                    </div>
                </div>
            </div>
        </div>
    `)
    _instance.push({
        id: _id
    })
    $('#' + _id).find('.btn').click(function () {
        setTimeout(function(){
            $('#' + _id).remove()
            _removeInstance(_id)
        }, 100)
        if (fn && typeof fn === 'function') fn()
    })
    return {
        id: _id,
        close: function () {
            setTimeout(function(){
                $('#' + _id).remove()
                _removeInstance(_id)
            }, 100)
            if (fn && typeof fn === 'function') fn()
        }
    }
}

// confirm组件
const _confirm = {
    el: null
};
const confirm = function ({title, content='没有内容',btn1='取消',btn2='确认',created=null}) {
    if (_confirm.el) {
        $('#' + _confirm.el.id).remove()
        _confirm.el = null
    }
    let _id = _randomID();
    $('body').append(`
        <div class="ui-mb__modal ui-mb__fade-in" id="${_id}">
            <div class="ui-mb__confirm">
                <div class="ui-mb__confirm-header">
                    ${
                        (()=>{
                            if (title) {
                                return `<div class="inner">${title}</div>`
                            } else {
                                return ''
                            }
                        })()
                    }
                </div>
                <div class="ui-mb__confirm-content">
                    ${
                        (()=>{
                            if (content[0] === '<' && content[content.length-1] === '>') {
                                return content
                            } else {
                                return `<div class="inner"><p>${content}</p></div>`
                            }
                        })()
                    }
                </div>
                <div class="ui-mb__confirm-footer">
                    <a href="javascript:void(0);" data-role="btn1">${btn1}</a>
                    <a href="javascript:void(0);" data-role="btn2">${btn2}</a>
                </div>
            </div>
        </div>
    `);
    _confirm.el = $('#' + _id)[0];
    let _res = $('#'+_confirm.el.id)[0];
    if (created && typeof created === 'function') {
        created(_res)
    }
    let _remove = function () {
        $('#' + _id).remove();
        _confirm.el = null;
    }
    let _handler = {
        btn1: null,
        btn2: null
    }
    $('#' + _id).find('[data-role="btn1"]').click(function () {
        if (_handler.btn1) {
            _handler.btn1(_res, _remove)
        } else {
            _remove()
        }
    });
    $('#' + _id).find('[data-role="btn2"]').click(function () {
        if (_handler.btn2) {
            _handler.btn2(_res, _remove)
        } else {
            _remove()
        }
    });
    let res = {
        btn1: function (fn) {
            _handler.btn1 = fn
            return res
        },
        btn2: function (fn) {
            _handler.btn2 = fn
            return res
        }
    }
    return res;
}

// toast组件
const _toast = {
    el: null,
    timer: null
}
const toast = function (msg='默认消息', delay=2000) {
    if (_toast.el) {
        $('#' + _toast.el.id).remove()
        clearTimeout(_toast.timer)
        _toast.el = null
        _toast.timer = null
    }
    let id = _randomID()
    $('body').append(`
        <div class="ui-mb__modal" id="${id}"><div class="ui-mb__toast">${msg}</div></div>
    `)
    _toast.el = $('#' + id)[0]
    _toast.timer = setTimeout(function () {
        $('#' + id).remove()
        clearTimeout(_toast.timer)
        _toast.el = null
        _toast.timer = null
    }, delay)
    $('#' + id).click(function () {
        $(this).remove()
        clearTimeout(_toast.timer)
        _toast.el = null
        _toast.timer = null
    })
}

/* loading */
let _loading = {
    el: null
}
const loading = function (msg='loading...', type=1) {
    if (_loading.el) {
        $('#' + _loading.el.id).remove()
        _loading.el = null
    }
    let _id = _randomID()
    if (parseInt(type) === 1) {
        $('body').append(`
            <div class="ui-mb__modal" id="${_id}"><div class="loading">${msg}</div></div>
        `)
    } else if (parseInt(type) === 2) {
        $('body').append(`
            <div class="ui-mb__modal" id="${_id}">
                <div class="loading-icon">
                    <span class="icon">...</span>
                </div>    
            </div>
        `)
    } else {
        $('body').append(`
            <div class="ui-mb__modal" id="${_id}">
                <div class="loading-icon-text">
                    <span class="icon">...</span>
                    <span class="text">${msg}</span>
                </div>    
            </div>
        `)
    }
    _loading.el = $('#' + _id)[0]
    return {
        close: function () {
            $('#' + _loading.el.id).remove()
            _loading.el = null
        }
    }
}

const _getLoading = function ({msg='loading...', type=1}={}) {
    return {
        opts: {
            msg,
            type
        },
        el: null,
        show:null,
        close: null
    }
}
function getLoading (opts) {
    let instance = _getLoading(opts)
    instance.show = function () {
        if (instance.el) return
        let _id = _randomID()
        if (instance.opts.type === 1 || instance.opts.type === '1') {
            $('body').append(`
                <div class="ui-mb__modal" id="${_id}"><div class="loading-text">${instance.opts.msg}</div></div>
            `)
        } else if (instance.opts.type === 2 || instance.opts.type === '2') {
            $('body').append(`
                <div class="ui-mb__modal" id="${_id}">
                    <div class="loading-icon">
                        <span class="icon">...</span>
                    </div>    
                </div>
            `)
        } else {
            $('body').append(`
                <div class="ui-mb__modal" id="${_id}">
                    <div class="loading-icon-text">
                        <span class="icon">...</span>
                        <span class="text">${instance.opts.msg}</span>
                    </div>    
                </div>
            `)
        }
        instance.el = $('#' + _id)[0]
        return instance.el
    }
    instance.close = function () {
        if (instance.el) {
            $('#' + instance.el.id).remove()
            instance.el = null
        }
    }
    return {
        show: instance.show,
        close: instance.close
    }
}

//开关效果
const checkbox = function (el, b, fn=function(){}, before, after) {
    let _nextTick = function (fn) {
        setTimeout(() => {
            fn()
        }, 0)
    };
    $(el).prop('checked', b)
    fn($(el).prop('checked'), el)
    $(el).click(function (e) {
        e.preventDefault()
        _nextTick(()=>{
            let old = $(el).prop('checked')
            console.log(old)
            if (before && typeof before === 'function') {
                let _before = before()
                if (_before.then) {
                    before().then(()=>{
                        $(el).prop('checked', !old)
                        fn($(el).prop('checked'), el)
                    }).catch(()=>{
                        $(el).prop('checked', old)
                        fn($(el).prop('checked'), el)
                    })
                }
            } else {
                $(this).prop('checked', !old)
                fn($(el).prop('checked'), el)
            }
        })        
    });
    return el
}

const tab = function (el, index, fn) {
    $(el).find('.tab-header-item').removeClass('active');
    $(el).find('.tab-content-item').hide();
    var i = index || 0;
    $(el).find('.tab-header-item').eq(i).addClass('active');
    $(el).find('.tab-content-item').eq(i).show();
    if (typeof fn === 'function') {
        fn($('.active').index());
    }
    $(el).find('.tab-header-item').click(function () {
        var _target = $(this).attr('data-target')
        if (_target) {
            $(el).find('.tab-header-item').removeClass('active');
            $(this).addClass('active');
            $(el).find('.tab-content-item').hide();
            $(el).find(_target).show();
            if (typeof fn === 'function') {
                fn($('.active').index());
            }
        } else {
            console.error('没有添加"data-target"');
        }
    });
    return el
}

// /* checkbox */
// const checkbox = function (id, {checked=false, appearance='checkbox', beforeChecked, beforeUnChecked, after}) {
//     if (appearance === 'switch') {
//         $(id).replaceWith(`
//             <label class="btn-switch">
//                 <input type="checkbox" ${checked?'checked':''} id="${id.substring(1)}">
//                 <span class="switch"></span>
//             </label>
//         `)
//     } else {
//         $(id).replaceWith(`
//             <label class="btn-checkbox">
//                 <input type="checkbox" ${checked?'checked':''} id="${id.substring(1)}">
//                 <span class="icon"></span>
//             </label>
//         `)
//     }
//     let _clicked = false
//     let _event = {}
//     const _bindEvent = function (eName, fn) {
//         _event[eName] = fn
//     }
//     const _unBindEvent = function (eName) {
//         _event[eName] = null
//     }
//     const _triggerEvent = function (eName, data) {
//         if (_event[eName]) {
//             _event[eName](data)
//         }
//     }
//     let _nextTick = function (fn) {
//         setTimeout(() => {
//             fn()
//         }, 0)
//     };
//     const _handlerAfter = function (el) {
//         if (after) {
//             after().then(() => {
//                 _clicked = false
//             }).catch(() => {
//                 el.checked = !el.checked
//                 _clicked = false
//                 _triggerEvent('error', el.checked)
//             })
//         } else {
//             _clicked = false
//         }
//     }
//     $(id).click(function (e) {
//         e.preventDefault()
//         if (_clicked) {
//             return false
//         }
//         _clicked = true
//         let old = $(this).prop('checked')
//         if (old) { // 选中
//             if (beforeChecked) {
//                 if (beforeChecked() === false) {
//                     // e.preventDefault() 之后 checkbox需要在下一次事件循环才能设置是否选中
//                     _nextTick(() => {
//                         $(this).prop('checked', false)
//                         _clicked = false
//                     })
//                     return
//                 }
//                 if (beforeChecked() === true) {
//                     _nextTick(() => {
//                         $(this).prop('checked', true)
//                         _triggerEvent('change', $(this).prop('checked'))
//                         _handlerAfter($(this)[0])
//                     })
//                     return
//                 }
//                 beforeChecked().then(() => {
//                     $(this).prop('checked', true)
//                     _triggerEvent('change', $(this).prop('checked'))
//                     _handlerAfter($(this)[0])
//                 }).catch(() => {
//                     $(this).prop('checked', false)
//                     _clicked = false
//                 })
//             } else {
//                 _nextTick(() => {
//                     $(this).prop('checked', !$(this).prop('checked'))
//                     _triggerEvent('change', $(this).prop('checked'))
//                     _handlerAfter($(this)[0])
//                 })
//             }
//         } else { // 取消选中
//             if (beforeUnChecked) {
//                 if (beforeUnChecked() === false) {
//                     _nextTick(() => {
//                         $(this).prop('checked', true)
//                         _clicked = false
//                     })
//                     return
//                 }
//                 if (beforeUnChecked() === true) {
//                     _nextTick(() => {
//                         $(this).prop('checked', false)
//                         _triggerEvent('change', $(this).prop('checked'))
//                         _handlerAfter($(this)[0])
//                     })
//                     return
//                 }
//                 beforeUnChecked().then(() => {
//                     $(this).prop('checked', false)
//                     _triggerEvent('change', $(this).prop('checked'))
//                     _handlerAfter($(this)[0])
//                 }).catch(() => {
//                     $(this).prop('checked', true)
//                     _clicked = false
//                 })
//             } else {
//                 _nextTick(() => {
//                     $(this).prop('checked', !$(this).prop('checked'))
//                     _triggerEvent('change', $(this).prop('checked'))
//                     _handlerAfter($(this)[0])
//                 })
//             }
//         }
//     })
//     return {
//         on: function (eName, fn) {
//             _bindEvent(eName, fn);
//         },
//         off: function (eName) {
//             _unBindEvent(eName)
//         }
//     }
// }

export {
    alert,
    toast,
    loading,
    getLoading,
    confirm,
    checkbox,
    tab
}


// function countDown (time, el, promise) {
//     this.time = time;
//     this.el = el;
//     this.innerText = el.innerText;
//     this.promise = promise;
// }
// countDown.prototype.start = function (fn) {
//     var _this = this,
//         _time = _this.time,
//         _innerText = _this.innerText,
//         _timer = null;
//     _this.el.addEventListener('click', function () {
//         if (_timer) return;
//         _this.el.innerText = _time + 's'
//         _this.el.setAttribute('disabled', 'disabled')
//         _timer = setInterval(function () {
//             if (_time > 0) {
//                 _time--
//                 _this.el.innerText = _time + 's'
//             } else {
//                 clearInterval(_timer)
//                 _timer = null
//                 _this.el.innerText = _innerText
//                 _time = _this.time
//                 _this.el.removeAttribute('disabled')
//             }
//         }, 1000)
//         fn(_this.promise().then(function (data) {
//             return data
//         }).catch(function (err) {
//             clearInterval(_timer)
//             _timer = null
//             _this.el.innerText = _innerText
//             _time = _this.time
//             _this.el.removeAttribute('disabled')
//             return Promise.reject(err)
//         }))
//     }, false)
// }

// var sendCode = new countDown(5, $('#send-code')[0], function () {
//     return new Promise(function (resolve, reject) {
//         if(!$('#phone').val().trim()) {
//             resolve('请输入电话号码');
//             return false;
//         }
//         if(!$.is_phone_number($('#phone').val().trim())) {
//             resolve('电话号码格式不正确');
//             return false;
//         }
//         $.ajax({
//             type: 'post',
//             url: $.apiDomain + '/message/sms/code',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 templateType: 'MOBILE_SMS',
//                 mobile: $('#phone').val().trim()
//             }),
//             cache: false,
//             dataType: 'json',
//             success: function(res) {
//                 if(res.success) {
//                     resolve('短信发送成功')
//                 } else {
//                     reject('短信发送失败')
//                 }
//             },
//             error: function() {
//                 reject('短信发送失败，请重试！')
//             }
//         });
//     })
// });
// sendCode.start(function (p) {
//     p.then(function (data) {
//         $.toast(data, 1)
//         res.data && res.data.smsCode && $('#code').val(res.data.smsCode)
//     }).catch(function (err) {
//         $.error_toast(err)
//     })
// })