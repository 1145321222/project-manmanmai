$(function () {


    var obj = getSearchObj();
    var id = parseInt(obj.categoryid);
    var pageid = parseInt(obj.pageid);
    var numPage = 0;
    console.log(id, pageid);
    //渲染面包屑导航
    $.ajax({
        type: "get",
        url: 'http://127.0.0.1:9090/api/getcategorybyid',
        data: {
            categoryid: id
        },
        success: function (info) {
            //  console.log(info);
            $('.nav .left').html(template('tpl', info));
        }
    })

    //渲染 页面商品列表
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproductlist',
        data: {
            categoryid: id,
            pageid: pageid
        },
        dataType: 'json',
        success: function (info) {
            $('#product_list').html(template('tpl_content', info))
            //获取商品总数 和 分页数
            //现在需要的数据就是 总页数 和当前页
            //商品总数
            info.pageid = pageid;
            console.log(info);
            //  获取总页数
            numPage = Math.ceil(info.totalCount / info.pagesize);
            info.numPage = numPage;
            //  动态渲染分页按钮
            $('#page').html(template('template_page', info));
        }
    })
    //上一页下一页功能
    $('#prev').on('click', function () {
        // console.log(1);

        var url = location.href;
        console.log(url);

        //如果pageid 大于1 小于等于 numpage 才可以调上一页
        if (pageid > 1 && pageid <= numPage) {
            //字符串截取 截取到最后一位前的所有数字
            url = url.substr(0, url.length - 1) + (pageid - 1);
            location.href = url;
        }

    })
    $('#next').on('click', function () {
        var url = location.href;
        console.log(url);

        //如果pageid 大于1 小于等于 numpage 才可以调上一页
        if (pageid >= 1 && pageid < numPage) {
            //字符串截取 截取到最后一位前的所有数字
            url = url.substr(0, url.length - 1) + (pageid + 1);
            location.href = url;
        }
    })

    //中间选择的options 获取到
    $('#page').on('change', function () {
        var url = location.href;

        var id = $(this).val();

        url = url.substr(0, url.length - 1) + id;
        location.href = url;
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