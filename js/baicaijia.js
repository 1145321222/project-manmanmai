$(function () {
    mui('.nav>.mui-scroll-wrapper').scroll({
        scrollY: false, //是否竖向滚动
        scrollX: true, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: false //是否启用回弹
    });
    //渲染导航 
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
        success: function (info) {
            $('.nav .mui-scroll').html(template('tpl_nav', info));
        }
    });
    var id = getSearch('titleId') || 0;
    tapRender(id)
    //点击动态渲染的a 根据a的id 跳转 在根据id 发送ajax
    $('.nav .mui-scroll').on('tap', '.mui-scroll .mui-control-item', function () {
        var id = $(this).data('id');
        var url = location.href;
        url = url + "?titleId=" + id;
        // console.log(length);
        //导航栏滚动  获取到每一个a自己的宽度 在点击到那个a的时候 获取到他的自定义属性id 来循环他让 他之前的a的距离累加起来 滚动到 点击到a的地方    还要进行判断 当导航栏的长度 减去  屏幕的宽度 <=  点击a所在的长度  就是可以滚动的返回
        //1. 获取屏幕的宽度
        var width = $(window).width();
        //2. 获取导航栏的总长度
            //这是a的的长度 还要获取导航栏中所有的a元素
            //先获取到a的所有兄弟元素 的长度 在加1
        var a = $(this).parent().children().attr();
        var length = $(this).data('length');
        //遍历 这个 导航栏 a  这个是点击a的长度
        var aWidth = 0;
        //总长度
        var allWidth = 0;
        for( var i = 0; i < length; i++) {
            
            if(i < id) {
                // console.log($(a[i]).width());
                var w = $(a[i]).width();
                aWidth += w;
            }
            //在里面求出 总长度
            allWidth += $(a[i]).width();
        }
         console.log(allWidth);
        if(allWidth - width >= aWidth) {
            
            $(this).offsetX(aWidth);
        }
        tapRender(id);
    });
    //渲染列表
    function tapRender(id) {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
            data: {
                titleid: id
            },
            success: function (info) {
                // console.log(info);
                $('.content ul').html(template('tpl_list', info))
            }
        })
    }
    // 监听tap事件，解决 a标签 不能跳转页面问题
    mui('body').on('tap', 'a', function () {
        document.location.href = this.href;
    });


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