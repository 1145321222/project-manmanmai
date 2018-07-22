$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: false //是否启用回弹
    });

    //进入页面 直接渲染 h首页菜单栏
    $.ajax({
        type: 'get',
        url: "http://127.0.0.1:9090/api/getindexmenu",
        dataType: 'json',
        success: function (info) {
            // console.log(info);
            $('.hero_nav ul').html(template('tpl', info));
            //给最后四个里添加一个类 hidden
            $('.hero_nav li:nth-child(n+9)').addClass('hidden');
            $('.hero_nav li:nth-child(8)').on('click', function () {
                $('.hero_nav li:nth-child(n+9)').toggleClass('hidden');
            })
        }
    });
    //推荐商品的渲染
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            $('.info').html(template('tpl2', info));
            /**
             * 
             * "productId": "商品id",
                "productName": "商品名称",
                "productPinkage": "商品价格",
                "productFrom": "商品来源",
                "productTime": "商品发布事件",
                "productImgSm": "商品图片小图",
                "productComCount": "商品评论"
             * */
        }
    })





    
})