var time,content,money,head ,portrait;
var zanNum,commentNum;
zanNum = 0;
commentNum = 0;
/*弹出评论框操作*/
$('.commentValue').bind('focus',function(){
    $('.hide').css('display','block');
    $('.hide').css('margin-left','0');
    $('#iptComment').focus();
});
$('#cancle').bind('click',function(){
    $('.hide').css('margin-left','10rem');
});
$('#publish').bind('click',function(){
    var name = nickname;
    var text = $('.commentValue').val();
    var textJson = {nowname:name,nowtext:text};
    $('.commentDetail').append("<span class='blockComment'><a 'href='"+nowhref+">"+nickname+':'+"</a><span>"+$('.commentValue').val()+"</span></span>");
    $.ajax({
        type:'POST',
        url: 'http://www.itargets.cn/itarget/targetOpt/handleTargetOpt',
        data:JSON.stringify(textJson),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data){
            $('.hide').css('margin-left','10rem');
        },
        error: function(e){
            alert('发生错误：'+e.status);
        }
    });
});
//获取内容
$.ajax({
    type:'GET',
    url: 'http://www.itargets.cn/itarget/target/showTargetById/targetId=42',
    dataType: 'json',
    success: function(data){
        console.log(data);
        for (var i = 0; i < data.length; i++) {
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
        }
        
        
    },
    error: function(e){
        alert('发生错误：'+e.status);
    }
});
//点赞相关
$('.zanzan').bind('click',function(){
    if ($(this).attr('src')=='images/zantwo.png') {
        console.log('此id已经点过赞了');
    }
    else{
        $(this).attr('src','images/zantwo.png');
        if ($('.addone').css('bottom')<'') {
            $('.addone').css('display','block');
            $('.addone').css('animation','move 2s');
        }
        else{
            $('.addone').css('display','none');
        }
        var dataJson={'targetId':42,'opt':"praise"};
        //传输当前点赞人的姓名到后台和至下方点赞详情处
        $.ajax({
            type:'POST',
            url: 'http://www.itargets.cn/itarget/targetOpt/handleTargetOpt',
            data:JSON.stringify(dataJson),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                $('#zanDetail').prepend('<span>'+data.nickname+'</span>');
            },
            error: function(e){
                alert('发生错误：'+e.status);
            }
        });
    }
});
//评论相关
/*$('.submitText').bind('click',function(){
    var name = nickname;
    var text = $('.commentValue').val();
    var textJson = {nowname:name,nowtext:text};
    $('.commentDetail').append("<span class='blockComment'><a 'href='"+nowhref+">"+nickname+':'+"</a><span>"+$('.commentValue').val()+"</span></span>");
    $.ajax({
        type:'POST',
        url: 'http://www.itargets.cn/itarget/targetOpt/handleTargetOpt',
        data:JSON.stringify(textJson),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data){
        },
        error: function(e){
            alert('发生错误：'+e.status);
        }
    });
    
});
*/



