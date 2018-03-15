/*已成功支付模块*/
$.ajax({
    type:'GET',
    url: '',
    success: function(data){
        $('#payMoney').attr('class','payMoney');
        $('#payMoney').html('￥'+data.+"<img src='images/complish.png'/>")
    },
    error: function(e){
        alert('发生错误：'+e.status);
    }
});
/*交互*/
var appid;
$.ajax({
	type: "POST",
	url:　"http://www.itargets.cn/itarget/jssdk/signatureJSSDK",
    data:{url:'http://www.itargets.cn/itarget/static/publishGoal.html'},
	success: function(data){
		  console.log(data);
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.jssdkParams.appId, // 必填，公众号的唯一标识
          timestamp: data.jssdkParams.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.jssdkParams.nonceStr, // 必填，生成签名的随机串
          signature: data.jssdkParams.signature,// 必填，签名，见附录1
          jsApiList: ['chooseImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
	},
  error: function(e){
    alert("发生错误："+e.status);
  }
});
/*与微信建立联系成功后执行的函数*/
wx.ready(function(){
    console.log('config配置成功');
    /*分享到qq*/
    $('#qqFriend').bind('click',function(){
        wx.onMenuShareQQ({
            title: '我的小目标', // 分享标题
            desc: '123456789', // 分享描述
            link: 'www.baidu.com', // 分享链接
            imgUrl: 'images/touxiang.png', // 分享图标
            success: function () { 
               // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
               // 用户取消分享后执行的回调函数
            }
        });
    });
    /*分享到微信好友*/
    $('#wechatFriend').bind('click',function(){
        wx.onMenuShareAppMessage({
            title: '123213213213213', // 分享标题
            desc: '2321321321321', // 分享描述
            link: 'www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'images/touxiang.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
    });
    /*分享到朋友圈*/
    $('#friendCircle').bind('click',function(){
        wx.onMenuShareTimeline({
            title: 'e2312312312', // 分享标题
            link: 'www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'images/touxiang.png', // 分享图标
            success: function () { 
                alert('分享成功');
            },
            cancel: function () { 
                alert('分享失败');
            }
        });
    });
});
/*与微信建立联系失败后执行的函数*/
wx.error(function(res){
    console.log('config配置失败');
});
