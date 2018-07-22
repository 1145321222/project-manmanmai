$(function () {
    var pageId = getSearch("pageid") || 0;
    console.log(pageId);
    
    pageId = parseInt(pageId);
    var numPage;
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        data: {
            pageid: pageId
        },
        success: function (info) {
            // console.log(info);
            $('#product_list').html(template('tpl_content', info));
            //渲染页面的select
            numPage = Math.ceil(info.totalCount / info.pagesize);
            info.numPage = numPage;
            info.pageid = pageId + 1;
            $("#page").html(template('template_page', info));
            console.log(numPage,info.pageid);
            
        }
    })

//    上一页的按钮
//  这里不能写location.href  因为每次跳转后面都会有id 写了location.href 每次跳转后面会都加一个pageid  
    var url = "moneyctrl.html";
    $('#prev').on('click', function(){
        console.log(2);
        console.log(url);
        //判断 如果 pageid 要大于0 且小于等于 最大页数 numpage才可以跳转
        if(pageId > 0 && pageId <= numPage){
            var newUrl = url +"?pageid="+(pageId-1);
            location.href = newUrl;
        }
    })
    //下一页
    $('#next').on('click', function(){
        if(pageId >=0 && pageId < numPage) {
            var newUrl = url +"?pageid="+(pageId+1);
            location.href = newUrl;
        }
    })
    //下拉菜单 要注册change事件
    $('#page').on("change", function(){
        //获取到 里面option的value的值来动态的改变
        var id = $(this).val();
        console.log(id);
        var newUrl = url+"?pageid="+id;
        location.href = newUrl;
    })

    function getSearchObj() {
        //1. 获取地址栏的参数
        var search = location.search;
        //2. 对地址进行解码
        search = decodeURI(search);
        //3. 干掉? slice sutstr substring
        search = search.slice(1); //支持负数
        //search = search.substr(1, search.length -1);
        //search = search.substring(1);//不支持负数
        //search = search.slice(0, -1);//支持负数
        //4. 字符串切割
        var arr = search.split("&");
        //5. 把数据变成对象
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var value = arr[i].split("=")[1];
            obj[key] = value;
        }
        return obj;
    }

    /*获取地址栏指定的参数，返回值*/
    function getSearch(key) {
        return +getSearchObj()[key];
    }

})