$(document).ready(
	function() {

	    // 创建socket
	    var websocket;
	    function createWebsocket() {
		var token = $('#Token').val();
		if ('WebSocket' in window) {
		    websocket = new WebSocket("ws://127.0.0.1:9090/ws?token=" + token);
		} else if ('MozWebSocket' in window) {
		    websocket = new MozWebSocket("ws://127.0.0.1:9090/ws?token=" + token);
		} else {
		    websocket = new SockJS("http://127.0.0.1:9090/ws?token=" + token);
		}

		websocket.onopen = function(event) {
		    initUsers();
		    console.log("WebSocket:已连接");
		};

		websocket.onmessage = function(ev) {
		    var obj = JSON.parse(ev.data);
		    if (!obj || obj == undefined) {
			return false;
		    }

		    var users = obj.to;
		    var cur = obj.from;
		    if (!!obj.message) {// 如果空消息不予处理
			var code = cur.phone == token ? 'Me' : cur.code;
		    }

		    refresh(users);
		};

		websocket.onerror = function(event) {
		    console.log("WebSocket:发生错误 ");
		};

		websocket.onclose = function(event) {
		    console.log("WebSocket:已关闭");
		}
	    }

	    // 初始化WebSocket
	    createWebsocket();

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

	});

// 初始化用户列表
function initUsers() {
    var token = $('#Token').val();
    $.get("/chat/users?token=" + token, function(result) {
	$('#curName').html(result.curName);
	refresh(result.users);
    });
}

function refresh(data) {
    var h = "";
    $.each(data, function(key, obj) {
	h += '<li>' + '          <div class="liLeft">' + '<img src="../img/20170926103645_04.jpg">' + '  </div>'
		+ '  <div class="liRight">' + '      <span class="intername">' + obj.code + '</span>'
		+ '      <span class="infor">厉害了</span>' + '  </div>' + '</li>';
    });
    $('.conLeft ul').html("").append(h);
    /*$('.conLeft li').on('click', function() {
	$(this).addClass('bg').siblings().removeClass('bg');
	var intername = $(this).children('.liRight').children('.intername').text();
	$('.headName').text(intername);
	$('.newsList').html('');
    });*/
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
		str += '<li>' + '<div class="nesHead"><img src="../img/6.jpg"/></div>' + '<div class="news">' + news
			+ '</div>' + '</li>';
		$('.newsList').append(str);
		setTimeout(answers, 1000);
		$('.conLeft').find('li.bg').children('.liRight').children('.infor').text(news);
		$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
	    }

	});

function answers() {
    var arr = [ "你好", "今天天气很棒啊", "你吃饭了吗？", "我最美我最美", "我是可爱的僵小鱼", "你们忍心这样子对我吗？", "spring天下无敌，实习工资850",
	    "我不管，我最帅，我是你们的小可爱", "段友出征，寸草不生", "一入段子深似海，从此节操是路人", "馒头：嗷", "突然想开个车", "段子界混的最惨的两个狗：拉斯，普拉达。。。" ];
    var aa = Math.floor((Math.random() * arr.length));
    var answer = '';
    answer += '<li>' + '<div class="answerHead"><img src="../img/20170926103645_19.jpg"/></div>'
	    + '<div class="answers">' + arr[aa] + '</div>' + '</li>';
    $('.newsList').append(answer);
    $('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
}

$('.ExP').on('mouseenter', function() {
    $('.emjon').show();
});

$('.emjon').on('mouseleave', function() {
    $('.emjon').hide();
});
