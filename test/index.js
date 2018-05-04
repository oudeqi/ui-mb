import 'src/ui-mb.css'
import __ from 'src/lib.js'
import {
    alert,
    toast,
    loading,
    getLoadingInstance,
    confirm,
    checkbox
} from 'src/ui-mb.js'

$('#alert').click(function () {
    alert('title', 'content', '取消', function () {
        console.log('cb')
    })
})

$('#toast').click(function () {
    toast('msg 333', 5000)
})

$('#loading').click(function () {
    let xx = loading('zxczxczxc', 3)
    //
    // let yy = loading('加载中...yy')
    //
    // let zz = loading('加载中...zz')

    let loading_y = getLoadingInstance({
        msg: 'laod',
        type: 3
    })

    loading_y.show()

    setTimeout(function () {
        xx.close()
        loading_y.close()
    }, 2000)
})


$('#confirm').click(function () {
    confirm('tit', 'content').then(function (msg) {
        window.alert(msg)
    }).catch(function (msg) {
        window.alert(msg)
    })
})


let mycheckbox = checkbox('#xxx', {
    checked: true,
    appearance: 'switch',//switch checkbox
    // beforeChecked: function () {
    //     return new Promise((resolve, reject) => {
    //         confirm('tit', '开？').then(function (msg) {
    //             resolve()
    //         }).catch(function (msg) {
    //             reject()
    //         })
    //     })
    // },
    // beforeUnChecked: function () {
    //     return new Promise((resolve, reject) => {
    //         confirm('tit', '关？').then(function (msg) {
    //             resolve()
    //         }).catch(function (msg) {
    //             reject()
    //         })
    //     })
    // },
    // after: function () {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             reject()
    //         }, 1000)
    //     })
    // }
});

mycheckbox.on('change', (res) => {
    console.log('change', res)
})

mycheckbox.on('error', (res) => {
    console.log('error', res)
})

let sendCode = new __.countDown(5, $('#send-code')[0], function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve('reject')
        }, 3000)
    })
});
sendCode.start(function (p) {
    p.then(function (data) {
        console.log('发送验证码成功', data)
    }).catch(function (err) {
        console.log('发送验证码出错', err)
    })
})

let category = [
        {
            label: '喵喵',
            value: 'mm',
            variety: [
                {
                    label: '英短',
                    value: 'yd'
                },
                {
                    label: '美短',
                    value: 'md',
                    active: true
                },
                {
                    label: '布偶',
                    value: 'bo'
                },
                {
                    label: '中华田园',
                    value: 'tm'
                },
                {
                    label: '串串',
                    value: 'cc'
                }
            ]
        }, 
        {
            label: '汪汪',
            value: 'ww',
            active: true,
            variety: [
                {
                    label: '柯基',
                    value: 'kj'
                },
                {
                    label: '泰迪',
                    value: 'td',
                    active: true
                },
                {
                    label: '金毛',
                    value: 'jm'
                },
                {
                    label: '中华田园',
                    value: 'tg'
                },
                {
                    label: '串串',
                    value: 'cc'
                }
            ]
        }
    ]
__.replaceSelectOptions($('#category')[0], category)
__.replaceSelectOptionsAccordingToParent($('#varieties')[0], $('#category')[0])
$('#category').bind('change', function(){
    __.replaceSelectOptionsAccordingToParent($('#varieties')[0], this)
})