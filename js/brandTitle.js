$(function(){
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getbrandtitle',
        success: function(info){
            console.log(info);
            $('.list ul').html(template('tpl', info));
        }
    })
})