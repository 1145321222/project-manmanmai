$(function () {
    $('.first').on('tap', 'li', function () {
        var a = $(this).index();
        $(this).find('a').find('span').toggleClass('mui-icon-arrowdown').toggleClass('mui-icon-arrowup');
        console.log($(this).find('a').find('span'));
        //获取到下标后显示对应的 ul
        $('.box-info').children().eq(a).toggleClass('hidden').siblings().addClass('hidden');;
    });




    //发送ajax渲染 区域的xinxi
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getgsshop',
        success: function (info) {
            console.log(info);
            $('.second').html(template('tpl_one', info));
        }
    });
    //渲染 地区
    $.ajax({
        url: "http://127.0.0.1:9090/api/getgsshoparea",
        success: function(info){
            console.log(info);
            $('.third').html(template('tpl_two', info));
        }
    });

    var shopId = 0;
    var areaId = 0;
    //渲染列表首先获取 shopid 和areaid 
    //点击事件获取到区域id 和 areaid
    $('.second').on('tap', 'li', function(){
        $(this).find('span').toggleClass('mui-icon mui-icon-checkmarkempty');
        $(this).siblings().find('span').removeClass('mui-icon mui-icon-checkmarkempty');
        
        //$(this).siblings().find('span').removeClass('hidden');
        shopId = $(this).data('id');
        render(shopId,areaId);
    });
    $('.third').on('tap', 'li', function(){
        $(this).find('span').toggleClass('mui-icon mui-icon-checkmarkempty');
        $(this).siblings().find('span').removeClass('mui-icon mui-icon-checkmarkempty');
        areaId = $(this).data('id');
        render(shopId,areaId);
    });
    

    render(shopId,areaId);
    function render(shopId, areaId) {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getgsproduct',
            data: {
                shopid: shopId,
                areaid: areaId
            },
            success: function(info){
                console.log(info);
                $('.main ul').html(template('tpl_product', info));
            }
        })
    }
})