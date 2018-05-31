import 'src/ui-mb.css'
import 'test/index.css'
import __ from 'src/lib.js'
import {
    alert,
    toast,
    getLoading,
    confirm,
    checkbox,
    tab
} from 'src/ui-mb.js'


$('#alert').click(function () {
    var xx = alert('内容内容内<br>容内容内容内容容')
    console.log(xx)
    setTimeout(function(){
        xx.close()
    },3000)
})

$('#confirm').click(function () {
    var xx = confirm({
        // title:'标题',
        btn1: '取消',
        btn2: '确定？',
        content: '内容内容内<br>容内容内容内容容',
        created: function (el) {
            // return new Promise(function(resolve, reject){
            //     setTimeout(function(){
            //         resolve()
            //     }, 3000)
            // })
        },
        btn1Fn: function (res) {
            console.log(res)
            res.close()
        },
        btn2Fn: function (res) {
            console.log(res)
        }
    })
    console.log(xx)
    // setTimeout(function(){
    //     xx.close()
    // }, 3000)
})

$('#toast').click(function () {
    //速度快解放后死<br>速度快解放后死
    var xxx = toast('速度快解放后死', 'success')
})

let xx = getLoading()
$('#loading').click(function () {
    console.log(xx.loading)
    xx.show()
    console.log(xx.loading)
    setTimeout(() => {
        xx.close()
        console.log(xx.loading)
    },200)
})

var myCheckbox = checkbox(document.querySelector('#test'), {
    // checked: true,
    before: function (el) {
        console.log('before', el.checked)
        // return false
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve()
            }, 300)
        })
    },
    change: function (el) {
        console.log('change', el.checked)
    },
    after: function (el) {
        console.log('after', el.checked)
    }
})

// setTimeout(function(){
//     console.log(myCheckbox.checked)
// },1000)

var myTab = tab(document.querySelector('#tab'), {
    index: 1,
    change: function(index){
        // console.log(index)
    }
})
setTimeout(function(){
    myTab.add({
        id: '#abc',
        header: `<a data-role="tab-header-item" data-target="#abc" href="javascript:void(0);">
                    <span>abc计划</span>
                </a>`,
        content: `<div data-role="tab-content-item" id="abc">
                    <h2 class="head">abc信息...</h2>
                </div>`
    })
}, 2000)

let i = 3
$('#remove').click(function(){
    if (i === 3) {
        myTab.remove('#laliao')
    } else if (i === 2) {
        myTab.remove('#gouyao')
    } else {
        myTab.remove('#abc')
    }
    i--
})

$('#bind').on('click', __.andFn(function(runable){
    let i = 5
    $('#bind').text(i)
    let timer = setInterval(function(){
        i--
        if (i < 0) {
            i = 5
            clearInterval(timer)
            $('#bind').text('bind')
            runable()
        } else {
            $('#bind').text(i)
        }
    }, 1000)
}, function(runable){
    setTimeout(function(){
        console.log(123)
        runable()
    },3000)
}))


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