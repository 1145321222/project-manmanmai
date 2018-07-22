$(function () {
    //渲染一级类表
    $.ajax({
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        success: function (info) {
            // console.log(info);
            $('.first_ul').html(template('tpl', info));

        }
    });
    //点击li的时候再次发送ajax 渲染二级liebaio
    //click 事件不能触发 必须使用tap事件
    mui('.content .first_ul').on('tap', '.first_a', function () {
        //获取到titleId 
        var id = $(this).data('id');
        // console.log(id);
        //渲染二级列表
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getcategory',
            data: {
                titleid: id,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.mui-collapse-content').html(template('tpl2', info));
                $('.mui-collapse-content a').on('tap', function(){
                    //attr 获取属性
                    var a = $(this).attr('href');
                    console.log(a);
                    location.href = a;
                })
                
            }
        })

    })
})