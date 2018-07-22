$(function(){
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getsitenav',
        success: function(info){
            console.log(info);
            $('.info ul').html(template('tpl_one', info))
        }
    })
})