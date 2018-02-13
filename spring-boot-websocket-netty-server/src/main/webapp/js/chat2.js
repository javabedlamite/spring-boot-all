// 创建socket
var websocket;

$(document).ready(function() {

    function createWebsocket() {
	var token = $('#Token').val();
	if ('WebSocket' in window) {
	    websocket = new WebSocket("ws://127.0.0.1:9090/ws?token=" + token);
	} else if ('MozWebSocket' in window) {
	    websocket = new MozWebSocket("ws://127.0.0.1:9090/ws?token=" + token);
	} else {
	    websocket = new SockJS("http://127.0.0.1:9090/ws?token=" + token);
	}

	console.log("token:" + token);
	websocket.onopen = function(event) {
	    initUsers();
	    console.log("WebSocket:已连接");
	};

	websocket.onmessage = function(ev) {
	    var obj = JSON.parse(ev.data);
	    if (!obj || obj == undefined) {
		return false;
	    }
<<<<<<< HEAD
	    // var users = obj.to;
=======
	    //var users = obj.to;
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
	    var cur = obj.from;
	    if (!!obj.message && cur.username != token) {// 如果空消息不予处理
		console.log("cur.username: " + cur.username + ",obj.message:" + obj.message);
		answers(obj);
	    }
	    initUsers();
<<<<<<< HEAD
	    
	    $.each($('.RightCont img'), function(key, obj) {
	            if(obj.width==80 && obj.height==30){
	        	obj.ondblclick = function() {
				alert(this.src);
			    }
	            }
		});
=======
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
	};

	websocket.onerror = function(event) {
	    console.log("WebSocket:发生错误 ");
	};

	websocket.onclose = function(event) {
	    console.log("WebSocket:已关闭");
	}
    }

    createWebsocket();
    initEmjon();

});

/*******************************************************************************
 * 初始化表情
 * 
 * @returns
 ******************************************************************************/
function initEmjon() {
    var emjon = "";
    for (var i = 1; i <= 60; i++) {
	var cnt = (i + '').length == 1 ? "0" + i : i;
	emjon += '<li><img src="../img/emo_' + cnt + '.gif"></li>';
    }
    $('.emjon ul').html("").append(emjon);
    $('.emjon li').on(
	    'click',
	    function() {
		var imgSrc = $(this).children('img').attr('src');
		var str = "";
<<<<<<< HEAD
		str += '<li>' + '<div class="nesHead"><img src="' + $('#headImg').val() + '"/></div>'
			+ '<div class="news"><img class="Expr" src="' + imgSrc + '"></div>' + '</li>';
		$('.newsList').append(str);
		websocket.send(str);
=======
		str += '<li>' + '<div class="nesHead"><img src="../img/6.jpg"/></div>'
			+ '<div class="news"><img class="Expr" src="' + imgSrc + '"></div>' + '</li>';
		$('.newsList').append(str);
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
		$('.emjon').hide();
		$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
	    });
}

// 初始化用户列表
function initUsers() {
    var token = $('#Token').val();
    $.get("/chat/users?token=" + token, function(result) {
	$('#curName').html(result.curName);
<<<<<<< HEAD
	var userList = "";
	$.each(result.users, function(key, obj) {
	    if (token == obj.username) {
		$('#headImg').val(obj.headImg);
=======
	var h = "";
	$.each(result.users, function(key, obj) {
	    if (token == obj.username) {
		$('#headImg').val(obj.headImg);
	    }
	    h += '<li>' + '          <div class="liLeft">' + '<img src="' + obj.headImg + '">' + '  </div>'
		    + '  <div class="liRight">' + '      <span class="intername">' + obj.username + '</span>'
		    + '      <span class="infor">厉害了</span>' + '  </div>' + '</li>';
	});
	$('.conLeft ul').html("").append(h);
    });
}

function refresh(data, msg) {
}

$('.sendBtn').on(
	'click',
	function() {
	    var news = $('#dope').val();
	    if (news == '') {
		alert('不能为空');
	    } else {
		$('#dope').val('');
		var str = '';
		str += '<li>' + '<div class="nesHead"><img src="' + $('#headImg').val() + '"/></div>'
			+ '<div class="news">' + news + '</div>' + '</li>';
		$('.newsList').append(str);
		websocket.send(str);
		// $('.conLeft').find('li.bg').children('.liRight').children('.infor').text(news);
		// $('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
	    }
	    userList += '<li>' + '          <div class="liLeft">' + '<img src="' + obj.headImg + '">' + '  </div>'
		    + '  <div class="liRight">' + '      <span class="intername">' + obj.username + '</span>'
		    + '      <span class="infor"></span>' + '  </div>' + '</li>';
	});
	$('.conLeft ul').html("<br/>").append(userList);
    });
}

<<<<<<< HEAD
function refresh(data, msg) {
}

$('.sendBtn').on('click', send);

function send() {
    var news = $('#dope').html();
    if (news == '') {
	alert('不能为空');
    } else {
	$('#dope').html('');
	var str = '';
	str += '<li>' + '<div class="nesHead"><img src="' + $('#headImg').val() + '"/></div>' + '<div class="news">'
		+ news + '</div>' + '</li>';
	$('.newsList').append(str);
	websocket.send(str);
	$('.conLeft').find('li.bg').children('.liRight').children('.infor').text(news);
	$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
    }

}

function answers(obj) {
    var cur = obj.from;
    var answerstr = obj.message;
    answerstr = answerstr.replace('nesHead', 'answerHead');
    answerstr = answerstr.replace('news', 'answers');
    // answerstr += '<li>' + '<div class="answerHead"><img src="' + cur.headImg
    // + '"/></div>' + '<div class="answers">'
    // + obj.message + '</div>' + '</li>';
    $('.newsList').append(answerstr);
    $('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
=======
function answers(obj) {
    var cur = obj.from;
    var answerstr = obj.message;
    //answerstr += '<li>' + '<div class="answerHead"><img src="' + cur.headImg + '"/></div>' + '<div class="answers">'
	    //+ obj.message + '</div>' + '</li>';
    $('.newsList').append(answerstr);
    //$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
}

$('.ExP').on('mouseenter', function() {
    $('.emjon').show();
});

$('.emjon').on('mouseleave', function() {
    $('.emjon').hide();
});

// 监听Ctrl+Enter 发送消息
document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.ctrlKey && e.keyCode == 13) {
	send();
    }
};

document.querySelector('#dope').addEventListener(
	'paste',
	function(e) {
	    var cbd = e.clipboardData;
	    var ua = window.navigator.userAgent;
	    // 如果是 Safari 直接 return
	    if (!(e.clipboardData && e.clipboardData.items)) {
		return;
	    }
	    // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
	    if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file"
		    && cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files"
		    && ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
		return;
	    }
	    for (var i = 0; i < cbd.items.length; i++) {
		var item = cbd.items[i];
		if (item.kind == "file") {

		    var blob = item.getAsFile();
		    if (blob.size === 0) {
			return;
		    }
		    // blob 就是从剪切板获得的文件 可以进行上传或其他操作
		    /*-----------------------与后台进行交互 start-----------------------*/
		    /*
		     * var data = new FormData(); data.append('discoverPics',
		     * blob); $.ajax({ url: '/discover/addDiscoverPicjson.htm',
		     * type: 'POST', cache: false, data: data, processData:
		     * false, contentType: false, success:function(res){ var obj =
		     * JSON.parse(res); var wrap = $('#editDiv'); var file =
		     * obj.data.toString(); var img =
		     * document.createElement("img"); img.src = file;
		     * wrap.appendChild(img); },error:function(){ } })
		     */
		    /*-----------------------与后台进行交互 end-----------------------*/
		    /*-----------------------不与后台进行交互 直接预览start-----------------------*/
		    var reader = new FileReader();
		    var imgs = new Image(80, 30);
		    imgs.file = blob;
		    reader.onload = (function(aImg) {
			return function(e) {
			    aImg.src = e.target.result;
			};
		    })(imgs);
		    reader.readAsDataURL(blob);
		    imgs.ondblclick = function() {
			alert(this.src);
		    }
		    // var sendimg = '<img width="80" height="30"
		    // src="'+imgs.src+'"
		    // ondblclick="javascript:alert(this.src)">';
		    imgs.class='sendimgs';
		    document.querySelector('#cnt').append(imgs);
		    // $('#cnt').append(sendimg);
		    /*-----------------------不与后台进行交互 直接预览end-----------------------*/
		}
	    }
	}, false);
