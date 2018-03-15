var appid,imgpath,n;
var money,lookType,continueTime,targetContent;
n=0;
/*谁可以看*/
$("#picker").picker({
    title: "",
    cols: [{
            textAlign: 'center',
            lable:['公开','仅好友','私密'],
            values: ['0','1','2' ]
        }],
    onChange:function(result){
            console.log(result.displayValue[0]);
            lookType= result.displayLable[0];
        },
    onConfirm:function(result){
            console.log('confirm的'+result);
        }
    

});

/*押金*/
$("#money").picker({
    title: "",
    cols: [{
        textAlign: 'center',
        lable:['0','1','2','3','4'],
        values: ['5','10','15','20','其他']
    }],
    onChange:function(result){
        console.log(result);
        money = result.displayLable[0];
    },
    onConfirm: function(result){
        console.log(result);
    }
});
/*持续时间*/
$("#datetime-picker").datetimePicker({
    onChange:function(result){
        console.log(result);
        continueTime = result.displayValue[0]+'-'+result.displayValue[1]+'-'+result.displayValue[2]+' '+result.displayValue[3]+':'+result.displayValue[4];
    },
    onConfirm: function(result){
        console.log(result);
    }
});


/*交互*/

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
          jsApiList: ['chooseImage','uploadImage','downloadImage','getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    },
  error: function(e){
    alert("发生错误："+e.status);
  }
});
/*与微信建立联系成功后执行的函数*/
wx.ready(function(){
    console.log('config配置成功');
    /*上传图片接口*/
    var images = {
        localId: [],
        serverId: []
    };
    var picPath;//图片地址
    /*选择图片*/
    $('#chooseImage').bind('click',function(){
        if (n==1) {
            alert('限定上传一张图片')
        }
        else{

        
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                localIds = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                alert('已选择 ' + res.localIds.length + ' 张图片');
                alert('222');
                var uploadCount = 0;
                var localIdLength = images.localId.length;
                var m = 0;
                function upload(){
                    
                    wx.uploadImage({
                        localId:images.localId[uploadCount],
                        success: function(res) {
                            images.serverId.push(res.serverId);
                            //如果还有照片，继续上传
                            ajaxupload(res.serverId);//这个方法是你需要把所谓的媒体meidaid进行下载到本地的ajax处理如果你需要的话就写一个ajax方法
                            
                            wx.downloadImage({
                                serverId: res.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    console.log(res);
                                    var localId = res.localId; // 返回图片下载后的本地ID
                                    wx.getLocalImgData({
                                        localId: localId, // 图片的localID
                                        success: function (res) {
                                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                                            picPath = localData;//获取到图片路径base64格式
                                            //$('.add').append("<img src="+localData+">");
                                        }
                                    });
                                }
                            });
                        }
                    }); 
                    //将base64数据传给后台   
                    $.ajax({
                        url:'',//后台路径
                        type:'POST',
                        data: {'picPath':picPath},
                        dataType:'json',
                        success: function(){
                            console.log('交互成功');
                        },
                        error: function(e){
                            alert("发生错误："+e.status);
                        }

                    }); 
                    //获取后台传来的图片路径显示图片
                    $.ajax({
                        url:'',//后台路径
                        type:'GET',
                        dataType:'json',
                        success: function(){
                            console.log('交互成功');
                            $('.add').append("<img src="+localData+">");
                            n=n+1;
                            alert("照片上传成功");
                        },
                        error: function(e){
                            alert("发生错误："+e.status);
                        }

                    }); 

                };
                upload();
            },
            error: function(e){
                alert('发生错误：'+ e.status);
            }
        });
            }
                
    });

    function ajaxupload(a){
        $.ajax({  
            url: "http://www.itargets.cn/itarget/target/getMediaId/"+a,
            type: "Get",  
            dataType: "json",
            success: function (data) {
                console.log('媒体id发送成功');  
                
            },  
            error: function (e) {  
                alert("发生错误" + e.status);  
            }  
        });  
    };
});
/*与微信建立联系失败后执行的函数*/
wx.error(function(res){
    console.log('config配置失败');
});



/*点击下一步交互持续时间、金额、谁可以看、目标内容*/

$('#next').bind('click',function(){
    alert(JSON.stringify(datajson));
    targetContent = $('.goalDetail').val();
    var datajson = {'content': targetContent,'money':money,'lookType':lookType,'continueTime': continueTime,'imgPath':imgpath};
    console.log(JSON.stringify(datajson));
    $.ajax({
        url:"http://www.itargets.cn/itarget/target/savaTarget",
        type:'POST',
        dataType: 'json',
        contentType: 'application/json',
        data:JSON.stringify(datajson),
       /*/!* data: datajson,*!/*/
        success: function(data){
            //console.log(data);
            console.log(JSON.stringify(datajson));
            location.href = 'payMoney.html';
        },
        error: function(e){
            console.log(JSON.stringify(datajson));
            alert('发生错误：'+ e.status);
        }
    });
});

