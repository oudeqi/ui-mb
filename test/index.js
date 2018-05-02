import 'src/ui-mb.css'
import { alert, toast, loading, getLoadingInstance } from 'src/ui-mb.js'

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

    // let loading_y = getLoadingInstance({
    //     msg: 'laod',
    //     type: 3
    // })
    //
    // loading_y.show()

    setTimeout(function () {
        xx.close()
    }, 2000)
})