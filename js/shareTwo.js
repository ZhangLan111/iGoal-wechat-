var time,content,money,head portrait;
var zanNum,commentNum;
zanNum = 0;
commentNum = 0;
//获取内容
$.ajax({
	type:'GET',
	url: '',
	dataType: 'json',
	success: function(data){
		console.log(data);
		$('.ptime').html('今天'+data.time);
		$('.name').html(data.name);
		$('.touxiang').attr('src',data.src);//头像路径
		$('.mmoney').html('￥'+data.money+'元');
		$('.mainCon span').html(data.content);//发表的内容
		$('.imgCon').html('<img src='+data.src+'>');
		//点赞人姓名
		$('#zanDetail').html('<sapn>'+data.name+"</span>");
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
		//传输当前点赞人的姓名到后台和至下方点赞详情处
		$.ajax({
			type:'POST',
			url: '',
			data:{},
			dataType: 'json',
			success: function(data){
				$('#zanDetail').prepend('<span>'+data.name+'</span>');
			},  
			error: function(e){
				alert('发生错误：'+e.status);
			}
		});
	}
});
//评论相关



