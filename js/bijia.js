$(function () {
    //获取到地址栏中的productid
    var obj = getSearchObj();
    var productid = parseInt(obj.productid);
    console.log(productid);
    //渲染商品详情
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproduct',
        data: {
            productid: productid
        },
        success: function (info) {
            //渲染 商品 
            $('.product').html(template('tpl_product', info));
            //渲染 后台传来的数据 table
            $('.get').html(template('tpl_table', info))
            var name = info.result[0].productName;
            //截取字符串 将每段字符串以空格截开
            var newName = name.split(" ")[0];
            console.log( newName);
            // info.result[0].name = newName;
            // console.log(info);
            categoryId = info.result[0].categoryId;
            //渲染面包屑导航
            $.ajax({
                url: "http://127.0.0.1:9090/api/getcategorybyid",
                data: {
                    categoryid: categoryId
                },
                success: function(info) {
                    console.log(info);
                    //把newName这个属性添加到这个info
                    info.result[0].newName = newName;
                    $('.nav .left').html(template('tpl', info));
                }
            })
        }
    })

    //渲染评论
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getproductcom',
        data: {
            productid: productid
        },
        success: function(info) {
            console.log(info);
            $('.comment_list').html(template('tpl_comment', info))
        }
    })
    //获取地址栏 
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