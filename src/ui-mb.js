const _prefix = 'ui-mb'
const _delimiter = '__'

const _random = function () {
    return String(Math.random()).substr(2, 8)
}

const _randomID = function () {
    return _prefix + _delimiter + _random()
}

/* alert */
let _alert = {
    el: null
}
const alert = function (title, content, btnTxt, cb) {
    if (_alert.el) {
        $('#' + _alert.el.id).remove()
        _toast.el = null
    }
    let _id = _randomID()
    $('body').append(`
        <div class="modal fade-in" id="${_id}">
            <div class="alert">
                <div class="header">${title}</div>
                <div class="content">${content}</div>
                <div class="footer">
                    <a href="javascript:void(0);">${btnTxt}</a>
                </div>
            </div>
        </div>
    `)
    $('#' + _id).find('a').click(function () {
        $('#' + _id).remove()
        _toast.el = null
        if (cb) cb()
    })
}

/* toast */
let _toast = {
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
        <div class="modal" id="${id}"><div class="toast">${msg}</div></div>
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
const loading = function (msg='loading', type=1) {
    if (_loading.el) {
        $('#' + _loading.el.id).remove()
        _loading.el = null
    }
    let _id = _randomID()
    if (type === 1 || type === '1') {
        $('body').append(`
            <div class="modal" id="${_id}"><div class="loading">${msg}</div></div>
        `)
    } else if (type === 2 || type === '2') {
        $('body').append(`
            <div class="modal" id="${_id}">
                <div class="loading-icon">
                    <span class="icon">...</span>
                </div>    
            </div>
        `)
    } else {
        $('body').append(`
            <div class="modal" id="${_id}">
                <div class="loading-icon-text">
                    <span class="icon">...</span>
                    <span class="text">${msg}</span>
                </div>    
            </div>
        `)
    }
    _loading.el = $('#' + _id)[0]
    return {
        el: _loading.el,
        close: function () {
            $('#' + _loading.el.id).remove()
            _loading.el = null
        }
    }
}

const _getLoadingInstance = function ({msg='loading', type=1}={}) {
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
function getLoadingInstance (opts) {
    let instance = _getLoadingInstance(opts)
    instance.show = function () {
        let _id = _randomID()
        if (instance.opts.type === 1 || instance.opts.type === '1') {
            $('body').append(`
                <div class="modal" id="${_id}"><div class="loading-text">${instance.opts.msg}</div></div>
            `)
        } else if (instance.opts.type === 2 || instance.opts.type === '2') {
            $('body').append(`
                <div class="modal" id="${_id}">
                    <div class="loading-icon">
                        <span class="icon">...</span>
                    </div>    
                </div>
            `)
        } else {
            $('body').append(`
                <div class="modal" id="${_id}">
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
        $('#' + instance.el.id).remove()
        instance.el = null
    }
    return {
        show: instance.show,
        close: instance.close
    }
}


/* confirm */
let _confirm = {
    el: null
}
const confirm = function (title, content) {
    if (_confirm.el) {
        $('#' + _confirm.el.id).remove()
        _confirm.el = null
    }
    let _id = _randomID()
    $('body').append(`
        <div class="modal fade-in" id="${_id}">
            <div class="confirm">
                <div class="header">${title}</div>
                <div class="content">${content}</div>
                <div class="footer">
                    <a href="javascript:void(0);" data-role="ok">确认</a>
                    <a href="javascript:void(0);" data-role="cancle">取消</a>
                </div>
            </div>
        </div>
    `)
    _confirm.el = $('#' + _id)[0]
    return new Promise(function (resolve, reject) {
        $('#' + _id).find('[data-role="ok"]').click(function () {
            $('#' + _id).remove()
            _confirm.el = null
            resolve('ok')
        })
        $('#' + _id).find('[data-role="cancle"]').click(function () {
            $('#' + _id).remove()
            _confirm.el = null
            reject('cancle')
        })
    })
}


/* checkbox */
const checkbox = function (id, {checked=false, appearance='checkbox', beforeChecked, beforeUnChecked, after}) {

    if (appearance === 'switch') {
        $(id).replaceWith(`
            <label class="btn-switch">
                <input type="checkbox" ${checked?'checked':''} id="${id.substring(1)}">
                <span class="switch"></span>
            </label>
        `)
    } else {
        $(id).replaceWith(`
            <label class="btn-checkbox">
                <input type="checkbox" ${checked?'checked':''} id="${id.substring(1)}">
                <span class="icon"></span>
            </label>
        `)
    }
    let _clicked = false
    let _event = {}
    const _bindEvent = function (eName, fn) {
        _event[eName] = fn
    }
    const _unBindEvent = function (eName) {
        _event[eName] = null
    }
    const _triggerEvent = function (eName, data) {
        if (_event[eName]) {
            _event[eName](data)
        }
    }
    let _nextTick = function (fn) {
        setTimeout(() => {
            fn()
        }, 0)
    };
    const _handlerAfter = function (el) {
        if (after) {
            after().then(() => {
                _clicked = false
            }).catch(() => {
                el.checked = !el.checked
                _clicked = false
                _triggerEvent('error', el.checked)
            })
        } else {
            _clicked = false
        }
    }
    $(id).click(function (e) {
        e.preventDefault()
        if (_clicked) {
            return false
        }
        _clicked = true
        let old = $(this).prop('checked')
        if (old) { // 选中
            if (beforeChecked) {
                if (beforeChecked() === false) {
                    // e.preventDefault() 之后 checkbox需要在下一次事件循环才能设置是否选中
                    _nextTick(() => {
                        $(this).prop('checked', false)
                        _clicked = false
                    })
                    return
                }
                if (beforeChecked() === true) {
                    _nextTick(() => {
                        $(this).prop('checked', true)
                        _triggerEvent('change', $(this).prop('checked'))
                        _handlerAfter($(this)[0])
                    })
                    return
                }
                beforeChecked().then(() => {
                    $(this).prop('checked', true)
                    _triggerEvent('change', $(this).prop('checked'))
                    _handlerAfter($(this)[0])
                }).catch(() => {
                    $(this).prop('checked', false)
                    _clicked = false
                })
            } else {
                _nextTick(() => {
                    $(this).prop('checked', !$(this).prop('checked'))
                    _triggerEvent('change', $(this).prop('checked'))
                    _handlerAfter($(this)[0])
                })
            }
        } else { // 取消选中
            if (beforeUnChecked) {
                if (beforeUnChecked() === false) {
                    _nextTick(() => {
                        $(this).prop('checked', true)
                        _clicked = false
                    })
                    return
                }
                if (beforeUnChecked() === true) {
                    _nextTick(() => {
                        $(this).prop('checked', false)
                        _triggerEvent('change', $(this).prop('checked'))
                        _handlerAfter($(this)[0])
                    })
                    return
                }
                beforeUnChecked().then(() => {
                    $(this).prop('checked', false)
                    _triggerEvent('change', $(this).prop('checked'))
                    _handlerAfter($(this)[0])
                }).catch(() => {
                    $(this).prop('checked', true)
                    _clicked = false
                })
            } else {
                _nextTick(() => {
                    $(this).prop('checked', !$(this).prop('checked'))
                    _triggerEvent('change', $(this).prop('checked'))
                    _handlerAfter($(this)[0])
                })
            }
        }
    })
    return {
        on: function (eName, fn) {
            _bindEvent(eName, fn);
        },
        off: function (eName) {
            _unBindEvent(eName)
        }
    }
}



export {
    alert,
    toast,
    loading,
    getLoadingInstance,
    confirm,
    checkbox
}