import 'src/ui-mb.css'
import 'test/index.css'
import __ from 'src/lib.js'
import {
    alert,
    toast,
    getLoading,
    confirm,
    checkbox
} from 'src/ui-mb.js'

// alert('内容内容内<br>容内容内容内容容')
$('#alert').click(function () {
    alert('内容内容内<br>容内容内容内容容')
})

$('#confirm').click(function () {
    confirm({
    // title:'标题',
    btn1: '取消',
    btn2: '确定？',
    content: '内容内容内<br>容内容内容内容容',
    // created: function (el) {
    //     window.alert('created')
    // }
    }).btn2(function (el, close) {
        // close()
        console.log(el)
    }).btn1(function (el, close) {
        close()
        console.log(el)
    })
})


$('#toast').click(function () {
    toast()
    toast('zxcz')
    toast('13132')
})

let loading = getLoading({
    msg: '加载中...',
    type: 3
})
// loading.show()
setTimeout(function () {
    loading.close()
}, 5000)

checkbox($('#test')[0], false, function(b){
    // console.log(b)
}, function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 2000)
    })
})

// $('#loading').click(function () {
//     let xx = loading('zxczxczxc', 3)
//     //
//     // let yy = loading('加载中...yy')
//     //
//     // let zz = loading('加载中...zz')

//     let loading_y = getLoadingInstance({
//         msg: 'laod',
//         type: 3
//     })

//     loading_y.show()

//     setTimeout(function () {
//         xx.close()
//         loading_y.close()
//     }, 2000)
// })





// let mycheckbox = checkbox('#xxx', {
//     checked: true,
//     appearance: 'switch',//switch checkbox
//     // beforeChecked: function () {
//     //     return new Promise((resolve, reject) => {
//     //         confirm('tit', '开？').then(function (msg) {
//     //             resolve()
//     //         }).catch(function (msg) {
//     //             reject()
//     //         })
//     //     })
//     // },
//     // beforeUnChecked: function () {
//     //     return new Promise((resolve, reject) => {
//     //         confirm('tit', '关？').then(function (msg) {
//     //             resolve()
//     //         }).catch(function (msg) {
//     //             reject()
//     //         })
//     //     })
//     // },
//     // after: function () {
//     //     return new Promise((resolve, reject) => {
//     //         setTimeout(() => {
//     //             reject()
//     //         }, 1000)
//     //     })
//     // }
// });

// mycheckbox.on('change', (res) => {
//     console.log('change', res)
// })

// mycheckbox.on('error', (res) => {
//     console.log('error', res)
// })

// let sendCode = new __.countDown(5, $('#send-code')[0], function () {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             return resolve('reject')
//         }, 3000)
//     })
// });
// sendCode.start(function (p) {
//     p.then(function (data) {
//         console.log('发送验证码成功', data)
//     }).catch(function (err) {
//         console.log('发送验证码出错', err)
//     })
// })

// let category = [
//         {
//             label: '喵喵',
//             value: 'mm',
//             variety: [
//                 {
//                     label: '英短',
//                     value: 'yd'
//                 },
//                 {
//                     label: '美短',
//                     value: 'md',
//                     active: true
//                 },
//                 {
//                     label: '布偶',
//                     value: 'bo'
//                 },
//                 {
//                     label: '中华田园',
//                     value: 'tm'
//                 },
//                 {
//                     label: '串串',
//                     value: 'cc'
//                 }
//             ]
//         }, 
//         {
//             label: '汪汪',
//             value: 'ww',
//             active: true,
//             variety: [
//                 {
//                     label: '柯基',
//                     value: 'kj'
//                 },
//                 {
//                     label: '泰迪',
//                     value: 'td',
//                     active: true
//                 },
//                 {
//                     label: '金毛',
//                     value: 'jm'
//                 },
//                 {
//                     label: '中华田园',
//                     value: 'tg'
//                 },
//                 {
//                     label: '串串',
//                     value: 'cc'
//                 }
//             ]
//         }
//     ]
// __.replaceSelectOptions($('#category')[0], category)
// __.replaceSelectOptionsAccordingToParent($('#varieties')[0], $('#category')[0])
// $('#category').bind('change', function(){
//     __.replaceSelectOptionsAccordingToParent($('#varieties')[0], this)
// })