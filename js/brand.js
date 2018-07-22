$(function () {

    var brandtitleid = getSearch('brandtitleid');

    $.ajax({
        url: 'http://127.0.0.1:9090/api/getbrand',
        data: {
            brandtitleid: brandtitleid
        },
        success: function (info) {
            console.log(info);
            $('.brand').html(template('tpl', info))
        }
    })


    //渲染列表
    //渲染 页面商品列表
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getbrandproductlist',
        data: {
            brandtitleid: brandtitleid,
            pageid: 4
        },
        success: function (info) {
            console.log(info);

            $('#product_list').html(template('tpl_content', info));

            //在渲染完商品列表是在地址中加入第一个商品的productid 在在下面获取它
            
                var productid = info.result[0].productId;
                console.log(productid);
                
                //渲染评论
                //需要页面中第一个商品的id 
                $.ajax({
                    url: 'http://127.0.0.1:9090/api/getproductcom',
                    data: {
                        productid: productid
                    },
                    success: function(info){
                        console.log(info);
                        $('.common').html(template('tpl_common', info))
                    }
                })
            
        }
    });



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