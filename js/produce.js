/*获取页面内容*/
$.ajax({
    type:'GET',
    url: '',
    dataType: 'json',
    success: function(data){
        console.log(data);
        $('.name').html(data.userTarget.nickname);
        $('.touxiang').attr('src',data.userTarget.headimgurl);//头像路径
        $('.mmoney').html('￥'+data.userTarget.target.money+'元');
        $('.mainCon span').html(data.userTarget.target.content);//发表的内容
        $('.imageCon').html('<img src='+data.userTarget.target.imgPath+'>');
        //点赞人姓名
        $('#zanDetail').html('<sapn>'+data.name+"</span>");
        //起初评论内容
        for (var i = 0; i < data.comment.length; i++) {
            $('.commentDetail').append("<sapn class='blockComment'></span>");
            $('.blockComment')[i].append("<a "+"href="+data.comment[i].href+">"+data.comment[i].data+"</a>");
        }
    },
    error: function(e){
        alert('发生错误：'+e.status);
    }
});