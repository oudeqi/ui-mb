import 'src/ui-mb.css'
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


function next() {
    
}

let res = []
async function yy (...a) {
    for (let i=0; i<a.length; i++) {
        await new Promise((resolve, reject) => {
            a[i](res, next)
        })
    }
}

yy(function (res, next) {
    res.push(1)
    console.log(res)
    next(res)
}, function (res, next) {
    res.push(2)
    console.log(res)
    next(res)
}, function (res, next) {
    res.push(3)
    console.log(res)
    next(res)
})