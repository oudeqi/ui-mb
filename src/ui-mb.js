// 修复iOS系统的移动设备中:active状态
document.body.addEventListener('touchstart', () => {})

const _prefix = 'ui-mb'
const _delimiter = '__'

// 所有实例
const _instance = []

// 生成随机数
const _random = () => String(Math.random()).substr(2, 8)

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
const _randomID = () => _prefix + _delimiter + _unique()

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

// 禁止滚动
const _bodyScrollHandler = function (event){
    event.preventDefault();  
}
const _bodyScroll = {
    disable: function () {
        document.body.addEventListener('touchmove', _bodyScrollHandler, false)
        $('body').css({'position': 'fixed', 'width': '100%'})
    },
    enable: function () {
        document.body.removeEventListener('touchmove', _bodyScrollHandler, false)
        $("body").css({'position': 'initial', 'width': 'initial'})
    }
}

// alert组件
const alert = function (content='字符串或者字符串模板', btnTxt='知道了', title, fn) {
    let _id = _randomID()
    $('body').append(`
        <div class="ui-mb__modal ui-mb__center ui-mb__fade-in" id="${_id}">
            <div class="ui-mb__alert">
                <div class="header">
                    ${
                        (() => {
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
                        (() => {
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
    let _remove = function (cb) {
        setTimeout(() => {
            $('#' + _id).remove()
            _removeInstance(_id)
            if (cb && typeof cb === 'function') cb()
        }, 100)
    }
    $('#' + _id).find('.btn').click(function () {
        _remove(() => { if (fn && typeof fn === 'function') fn() })
    })
    return {
        id: _id,
        el: $('#' + _id)[0],
        close: function () {
            _remove(() => { if (fn && typeof fn === 'function') fn() })
        }
    }
}

// confirm组件
const confirm = function ({title, content='没有内容',btn1='取消',btn2='确认',created=null,btn1Fn=null,btn2Fn=null}) {
    let _id = _randomID();
    $('body').append(`
        <div class="ui-mb__modal ui-mb__center ui-mb__fade-in" id="${_id}">
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
    `)
    _instance.push({
        id: _id
    })
    let _remove = function () {
        setTimeout(() => {
            $('#' + _id).remove()
            _removeInstance(_id)
        }, 100)
    }
    let _el = $('#' + _id)[0]
    let _res = {
        id: _id,
        el: $('#' + _id)[0],
        close: () => { _remove() }
    }
    let _bindEvent = function () {
        $('#' + _id).find('[data-role="btn1"]').click(function () {
            if (btn1Fn) {
                btn1Fn(_res)
            } else {
                _remove()
            }
        })
        $('#' + _id).find('[data-role="btn2"]').click(function () {
            if (btn2Fn) {
                btn2Fn(_res)
            } else {
                _remove()
            }
        })
    }
    if (created) {
        if (typeof created === 'function') {
            let obj = created()
            if (typeof obj === 'object' && obj.then) {
                obj.then(() => {
                    _bindEvent()
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                 _bindEvent()
            }
        } else {
            _bindEvent()
        }
    } else {
        _bindEvent()
    }
    return _res
}

// toast组件
const toast = function (msg='默认消息', type, delay=2000) {
    let _toast = {
        id: _randomID(),
        timer: null
    }
    $('body').append(`
        <div class="ui-mb__modal ui-mb__center" id="${_toast.id}">
            <div class="ui-mb__toast ${
                (() => {
                    if (type === 'success') {
                        return 'ui-mb__toast-success'
                    }
                    if (type === 'error') {
                        return 'ui-mb__toast-error'
                    }
                })()
            }">
                ${
                    (() => {
                        if (type === 'success' || type === 'error') {
                            return `<i class="icon"></i><p>${msg}</p>`
                        } else {
                            return `${msg}`
                        }
                    })()
                }
            </div>
        </div>
    `)
    _instance.push({
        id: _toast.id
    })
    let _remove = function () {
        _removeInstance(_toast.id)
        $('#' + _toast.id).remove()
        clearTimeout(_toast.timer)
        _toast.timer = null
    }
    _toast.timer = setTimeout(() => {
        _remove()
    }, delay)
    $('#' + _toast.id).click(function () {
        _remove()
    })
    return {
        id: _toast.id,
        el: $('#' + _toast.id)[0],
        close: () => { _remove() }
    }
}


let _loading = {
    id: _randomID(),
    loading: false,
    show: null,
    close: null,
    el: null,
}
_instance.push({
    id: _loading.id
})
const getLoading = function (msg='加载中...') {
    if (!_loading.el) {
        $('body').append(`
            <div class="ui-mb__modal ui-mb__center ui-mb__fade-in" id="${_loading.id}"><div class="ui-mb__loading">${msg}</div></div>
        `)
        _loading.el = $('#' + _loading.id)[0]
    }
    $('#' + _loading.id).hide()
    let _timer = null
    _loading.show = function () {
        _loading.loading = true
        clearTimeout(_timer)
        _timer = setTimeout(() => {
            $('#' + _loading.id).show()
            clearTimeout(_timer)
            _timer = null
        }, 300)
        return _loading
    }
    _loading.close = function () {
        _loading.loading = false
        if (_timer) {
            clearTimeout(_timer)
            _timer = null
        } else {
            $('#' + _loading.id).hide()
        }
        return _loading
    }
    return _loading
}

const _nextTick = function (fn) {
    setTimeout(() => {
        fn()
    }, 0)
}

//开关效果 
// before 返回true 会触发change，change之后才会触发after
// before 若返回promise promise resolve之后会触发change，change之后才会触发after
// before 返回false 不会触发change，不会触发after
// before 若返回promise promise reject之后不会触发change，也不会触发after
// change 返回的不是promise，就会执行after，
// change返回promise，after会在promise resolve之后执行，reject则不执行
const checkbox = function (el, {checked, before, change, after}) {
    if (!el) {
        throw new Error('el is require')
    }
    if (before && typeof before !== 'function') {
        throw new Error('before is not a function')
    }
    if (change && typeof change !== 'function') {
        throw new Error('change is not a function')
    }
    if (after && typeof after !== 'function') {
        throw new Error('after is not a function')
    }
    if (checked === true || checked === false) {
        $(el).prop('checked', checked)
    }

    let _clicked = false
    let _handlleChange = function (fn, element, cb) {
        let _change = fn(element)
        if (_change && _change.then) {
            _change.then(() => {
                if (cb) cb(element)
                _clicked = false
            }).catch(() => {
                _clicked = false
            })
        } else {
            if (cb) cb(element)
            _clicked = false
        }
    }
    $(el).click(function (e) {
        e.preventDefault()
        if (_clicked) return
        _clicked = true
        // e.preventDefault()之后 checkbox需要在下一次事件循环才能获取、设置选中状态
        _nextTick(() => {
            let old = $(el).prop('checked')
            if (before) {
                let _before = before(el)
                if (_before && _before.then) {
                    _before.then(() => {
                        $(el).prop('checked', !old)
                        _handlleChange(change, el, after)
                    }).catch(()=>{
                        $(el).prop('checked', old)
                        _clicked = false
                    })
                } else {
                    if (_before === true) {
                        $(el).prop('checked', !old)
                        _handlleChange(change, el, after)
                    } else {
                        _clicked = false
                    }
                }
            } else {
                $(el).prop('checked', !old)
                _handlleChange(change, el, after)
            }
        })        
    });
    return el
}

const tab = function (el, {index=0, change}) {
    let headerItems = $(el).find('[data-role="tab-header-item"]')
    let contentItems = $(el).find('[data-role="tab-content-item"]')
    if (!el) {
        throw new Error('el is require')
    }
    if (change && typeof change !== 'function') {
        throw new Error('change is not function')
    }
    if (index > headerItems.length - 1) {
        throw new Error('index overstep the boundary')
    }
    headerItems.removeClass('active');
    contentItems.hide();
    headerItems.eq(index).addClass('active');
    contentItems.eq(index).show();
    if (change) {
        change($('.active').index());
    }
    const _handlleClick = function () {
        let _target = $(this).attr('data-target')
        if (_target) {
            if ($(this).index() !== $('.active').index()) {
                $(el).find('[data-role="tab-header-item"]').removeClass('active')
                $(this).addClass('active')
                $(el).find('[data-role="tab-content-item"]').hide()
                if ($(el).find(_target).length !== 0) {
                    $(el).find(_target).show()
                } else {
                    throw new Error('没有找到"data-target"对应的原素')
                }
                if (change) {
                    change($('.active').index());
                }
            }
        } else {
            throw new Error('没有添加"data-target"')
        }
    }
    headerItems.bind('click', _handlleClick)
    return {
        el,
        add ({id, header, content}) {
            $(el).find('[data-role="tab-header"]').append(header)
            $(el).find('[data-role="tab-content"]').append(content)
            let _headerItems = $(el).find('[data-role="tab-header-item"]')
            let _contentItems = $(el).find('[data-role="tab-content-item"]')
            let _index = $('.active').index()
            _headerItems.removeClass('active')
            _contentItems.hide()
            _headerItems.eq(_index).addClass('active')
            _contentItems.eq(_index).show()
            _headerItems.unbind('click')
            _headerItems.bind('click', _handlleClick)
            return id
        },
        remove (id) {
            let _removeIndex = $('[data-target="'+id+'"]').index()
            if (_removeIndex >= 0) {
                let _index = $('.active').index()
                if (_removeIndex < _index || (_removeIndex === _index && _index !== 0)) {
                    _index--
                }
                $(el).find('[data-role="tab-header"]').find('[data-target="'+id+'"]').remove()
                $(el).find('[data-role="tab-content"]').find(id).remove()
                let _headerItems = $(el).find('[data-role="tab-header-item"]')
                let _contentItems = $(el).find('[data-role="tab-content-item"]')
                if (_index >= 0 && _index < _headerItems.length && _index < _contentItems.length) {
                    _headerItems.removeClass('active')
                    _contentItems.hide()
                    _headerItems.eq(_index).addClass('active')
                    _contentItems.eq(_index).show()
                    _headerItems.unbind('click')
                    _headerItems.bind('click', _handlleClick)
                }
                return id
            } else {
                return false
            }
        }
    }
}

const select = function ({title, data, mult=false, btn1='取消', btn2='确定', btn1Fn, btn2Fn}) {

    if (!data) { throw new Error('data is require') }
    if (!Array.isArray(data)) { throw new Error('data is not Array') }
    if (btn1Fn && typeof btn1Fn !== 'function') { throw new Error('btn1Fn is not function') }
    if (btn2Fn && typeof btn2Fn !== 'function') { throw new Error('btn2Fn is not function') }
    let _id = _randomID()
    $('body').append(`
        <div class="ui-mb__modal ui-mb__bottom ui-mb__fade-in" id="${_id}">
            <div class="ui-mb__modal-select">
                <div class="ui-mb__modal-select__header">
                    <a class="btn" href="javvascript:void(0);">${btn1}</a>
                    ${
                        ((t) => {
                            if (t) {
                                return `<h3 class="title">${t}</h3>`
                            } else {
                                return ''
                            }
                        })(title)
                    }
                    <a class="btn" href="javvascript:void(0);">${btn2}</a>
                </div>
                <ul class="ui-mb__modal-select__content">
                    ${
                        ((arr) => {
                            let res = []
                            arr.forEach((item) => {
                                res.push(`
                                    <li>
                                        <label>
                                            <span class="text">${item.label}</span>
                                            <input class="${ mult ? 'checkbox' : 'radio' }" data-label="${item.label}" data-value="${item.value}" type="checkbox">
                                            <span class="icon"></span>
                                        </label>
                                    </li>
                                `)
                            })
                            return res.join('')
                        })(data)
                    }
                </ul>
            </div>
        </div>
    `)
    let $allCheckbox = $('#' + _id).find('input[type="checkbox"]')
    if (mult) {
        data.forEach((item, i) => {
            if (item.checked) {
                $allCheckbox.eq(i).prop('checked',true)
            }
        })
    } else {
        let checkedArr = []
        data.forEach((item, i) => {
            if (item.checked) {
                checkedArr.push(i)
            }
        })
        $allCheckbox.eq(checkedArr[checkedArr.length - 1]).prop('checked',true)
        $allCheckbox.on('click', function (e) {
            e.preventDefault()
            _nextTick(() => {
                console.log(this.checked)
                let _oldValue = this.checked
                if (_oldValue) {
                    this.checked = false
                } else {
                    $allCheckbox.prop('checked', false)
                    this.checked = true
                }
            })
            
        })
    }

    const _remove = function () {
        $('#' + _id).remove()
        _removeInstance(_id)
        _bodyScroll.enable()
    }
    const _getChecked = function () {
        let res = []
        $allCheckbox.each((i, item) => {
            if (item.checked) {
                res.push({
                    label: $(item).attr('data-label'),
                    value: $(item).attr('data-value')
                }) 
            }
        })
        return res
    }
    _bodyScroll.disable()
    $('#' + _id).find('a.btn').click(function(){
        if ($(this).index() === 0) {
            btn1Fn(_getChecked())
            _remove()
        }
        if ($(this).index() === 1) {
            btn2Fn(_getChecked())
            _remove()
        }
    })

}

export {
    alert,
    toast,
    getLoading,
    confirm,
    checkbox,
    tab,
    select
}

