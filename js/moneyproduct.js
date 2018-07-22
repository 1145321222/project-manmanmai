$(function () {
    var id = getSearch("productid");
    console.log(id);
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        data: {
            productid: id
        },
        success: function(info){
            console.log(info);
            $('.container').html(template( 'tpl_container', info));
            $('.area').html(template('tpl_area',info));
            $('.comment').html(template('tpl_comment', info));
        }


    })

    //渲染
    //封装求地址栏参数的方法
    function getSearchObj() {
        //获取地址
        var search = location.href;
        //地址转码
        search = decodeURI(search);
        // search = search.slice(1);

        //字符串切割
        var arr = search.split(".html?");
        search = arr[1];
        arr = search.split("&");
        //arr是一个数组类似于 pageId = 1 的
        // console.log(arr[0],arr[1]  );
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            //进行循环把他们分别取出来
            var key = arr[i].split('=')[0];
            //key就是obj的键
            var value = arr[i].split('=')[1];
            //value就是值
            obj[key] = value;
        }


        return obj;
    }
    /*获取地址栏指定的参数，返回值*/
    function getSearch(key) {
        return +getSearchObj()[key];
    }
})