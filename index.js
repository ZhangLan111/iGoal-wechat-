var imgpath;
var Name_bool,studentId_bool,major_bool,number_bool,qq_bool,content_bool,img_bool;
$.ajax({
    type: "POST",
    url:　"http://www.itargets.cn/itarget/jssdk/signatureJSSDK",
    data:{url:'http://www.itargets.cn/itarget/static/index.html'},
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

function checkSignUp() {
    alert("x1");
    $.ajax({
        type: "POST",
        url:　"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcf83522971a86101&redirect_uri=http%3a%2f%2fwww.itargets.cn%2fitarget%2fuser%2fsignUp&response_type=code&scope=snsapi_base&state=1#wechat_redirect",
        success: function(data){
            if(data.status=='100005'){
                location.href="tishi.html";
            }
        },
        error: function(e){

        }
    });
}
/*表单验证*/

function check(title,tip,bool){
    if ($(title).val() == '') {
        alert(tip+'不能为空');
        bool = false;
    }
    else{
        bool = true;
    }
};
/*验证姓名*/
$('#concent input:eq(0)').blur(function(){
    check('#concent input:eq(0)','姓名',Name_bool);
});
/*验证学号*/
$('#concent input:eq(1)').blur(function(){
    check('#concent input:eq(1)','学号',studentId_bool);
});
/*验证专业*/
$('#concent input:eq(2)').blur(function(){
    check('#concent input:eq(2)','专业',major_bool);
});
/*验证qq*/
$('#concent input:eq(4)').blur(function(){
    check('#concent input:eq(4)','qq',qq_bool);
});
/*验证描述*/
$('#en').blur(function(){
    check('#en','描述',content_bool);
});
/*验证电话号码*/
$('#concent input:eq(3)').blur(function(){
    checkTel();
});
function checkTel(){
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    var value=document.getElementById("ss").value.trim();
    if(isMob.test($('#concent input:eq(3)').val())||isPhone.test($('#concent input:eq(3)').val())){
        number_bool = true;
    }
    else{
        alert('电话号码格式有误');
        number_bool = false;
    }
}
/*/!*与微信建立联系失败后执行的函数*!/
wx.error(function(res){
    console.log('config配置失败');
});*/

/**报名**/
$(document).ready(function() {
    alert("x2");
    /*上传图片接口*/
    var images = {
        localId: [],
        serverId: []
    };
    var picPath;//图片地址
    /*选择图片*/
    $('#chooseImage').bind('click',function(){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                localIds = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var uploadCount = 0;
                function upload(){
                    wx.uploadImage({
                        localId:images.localId[uploadCount],
                        success: function(res) {
                            images.serverId.push(res.serverId);
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
                                            $('.add').html("<img src='images/load.gif'/>");
                                            uploadBase64(picPath);
                                        }
                                    });
                                }
                            });
                        }
                    });
                    //将base64数据传给后台
                    function uploadBase64(baseStr) {
                        $.ajax({
                            url: 'http://www.itargets.cn/itarget/target/getImgByBase64',//后台路径
                            type: 'POST',
                            data: {'base64Str': baseStr},
                            dataType: 'json',
                            success: function (data) {
                                console.log('交互成功');
                                /*判断是否返回图片路径*/
                                if (data.imgPath) {
                                    img_bool = true;
                                }
                                else{
                                    img_bool = false;
                                }
                                imgpath=data.imgPath;
                                $('.add').html("<img src=" + imgpath + ">");
                            },
                            error: function (e) {
                                alert("发生错误：" + e.status);
                            }
                        });
                    };
                };
                upload();
            },
            error: function(e){
                alert('发生错误：'+ e.status);
            }
        });

    });
    var workData = {'name': $('#concent input:eq(0)').val(),'studentId': $('#concent input:eq(1)').val(), 'major': $('#concent input:eq(2)').val(),'phonenumber': $('#concent input:eq(3)').val(),'qq': $('#concent input:eq(4)').val(), 'content': $('#en').val(),'imageUrl':imgpath};
    var url = "http://www.itargets.cn/itarget/signUp/commit";
    $('#submit').click(function() {
        if (Name_bool&&studentId_bool&&major_bool&&number_bool&&qq_bool&&content_bool&&img_bool) {
            $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(workData),
                dataType: "json",
                contentType: 'application/json',
                success: function (data) {
                   if(data.status=="100010"){
                       alert("图片还上传中请耐心等待");
                   }else if(data.status=="100002"){
                       alert("上传作品失败");
                   }else{
                        location.href="success.html";
                   }
                },
                error: function (e) {
                    alert("请求失败！");
                }
            });
        }
        else{

            function tip(type，msg){
                if(type){
                    alert('请正确填写'+msg)
                }

            };
            tip(Name_bool,'姓名');
            tip(studentId_bool,'学号');
            tip(major_bool,'专业');
            tip(number_bool,'电话号码');
            tip(qq_bool,'qq');
            tip(content_bool,'描述');
        }
        
    });

});