var time,content,money,head portrait;
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
	},
	error: function(e){
		alert('发生错误：'+e.status);
	}
});
//