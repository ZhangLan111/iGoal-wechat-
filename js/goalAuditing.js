/*获取页面内容*/
$.ajax({
    type: "GET",
    url:　"",//目标监督页面url
    datatype: 'json',
    success: function(data){
        for (var i = 0; i < data.length; i++) {
        	$('.superviseCon').append("<img class='superviseCon' src='"+data[i].src+"'/>");
        	$('.superviseCon').append("<div class='detailCon'></div>");
        	$('.detailCon').append("<span class='personCon'>"+data[i].name+"</span>");
        	$('.detailCon').append("<a class='apply'>申请目标</a>");
        	$('.detailCon').append("<span class='applyCon'>"+data[i].content+"</span>");
        	$('.superviseCon').append("<a class='waiting'>等待审核</a>");
        }
    },
    error: function(e){
        alert("发生错误："+e.status);
    } 
});


/*$('.waiting').bind('click',function(){
	$('.waiting').html('过期未审核');
	$('.waiting').css('color','#838383');
});*/