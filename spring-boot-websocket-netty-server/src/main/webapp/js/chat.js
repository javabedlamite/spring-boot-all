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
	    //var users = obj.to;
	    var cur = obj.from;
	    if (!!obj.message && cur.username != token) {// 如果空消息不予处理
		console.log("cur.username: " + cur.username + ",obj.message:" + obj.message);
		answers(obj);
	    }
	    initUsers();
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
		str += '<li>' + '<div class="nesHead"><img src="../img/6.jpg"/></div>'
			+ '<div class="news"><img class="Expr" src="' + imgSrc + '"></div>' + '</li>';
		$('.newsList').append(str);
		$('.emjon').hide();
		$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
	    });
}

// 初始化用户列表
function initUsers() {
    var token = $('#Token').val();
    $.get("/chat/users?token=" + token, function(result) {
	$('#curName').html(result.curName);
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
	    }

	});

function answers(obj) {
    var cur = obj.from;
    var answerstr = obj.message;
    //answerstr += '<li>' + '<div class="answerHead"><img src="' + cur.headImg + '"/></div>' + '<div class="answers">'
	    //+ obj.message + '</div>' + '</li>';
    $('.newsList').append(answerstr);
    //$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
}

$('.ExP').on('mouseenter', function() {
    $('.emjon').show();
});

$('.emjon').on('mouseleave', function() {
    $('.emjon').hide();
});
