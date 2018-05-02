const _prefix = 'ui-mb'
const _delimiter = '__'

const _random = function () {
    return String(Math.random()).substr(2, 8)
}

const _randomID = function () {
    return _prefix + _delimiter + _random()
}

/* alert */
const alert = function (title, content, btnTxt, cb) {
    let id = _randomID()
    $('body').append(`
        <div class="modal fade-in" id="${id}">
            <div class="alert">
                <div class="header">${title}</div>
                <div class="content">${content}</div>
                <div class="footer">
                    <a href="javascript:void(0);">${btnTxt}</a>
                </div>
            </div>
        </div>
    `)
    $('#' + id).find('a').click(function () {
        $('#' + id).remove()
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





export {
    alert,
    toast,
    loading,
    getLoadingInstance
}