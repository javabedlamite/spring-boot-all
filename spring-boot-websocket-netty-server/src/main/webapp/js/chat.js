// 创建socket
var websocket;

var img_index = 0;// 图片序号
var img_src = "";// 图片src
var img_ids = ".RightCont img:odd";

/*******************************************************************************
 * 创建Websocket连接
 */
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
	var cur = obj.from;
	if (!!obj.message && cur.username != token) {// 如果空消息不予处理
	    console.log("cur.username: " + cur.username + ",obj.message:" + obj.message);
	    answers(obj);
	}
	initUsers();

	$.each($(img_ids), function(i, obj) {
	    $(obj).on("dblclick", function() {
		$(".photo-mask").show();
		$(".photo-panel").show();
		img_src = $(this).attr("src");
		img_index = i;
		photoView($(this));
	    });
	});

    };

    websocket.onerror = function(event) {
	console.log("WebSocket:发生错误 ");
    };

    websocket.onclose = function(event) {
	console.log("WebSocket:已关闭");
    }
}

/*******************************************************************************
 * 初始化表情
 * 
 * @returns
 ******************************************************************************/
function initEmjon() {
    var emjon = "";
    for (var i = 1; i <= 60; i++) {
	var cnt = (i + '').length == 1 ? "0" + i : i;
	emjon += '<li><img src="../img/emo/emo_' + cnt + '.gif"></li>';
    }
    $('.emjon ul').html("").append(emjon);
    $('.emjon li').on(
	    'click',
	    function() {
		var imgSrc = $(this).children('img').attr('src');
		var str = "";
		str += '<li>' + '<div class="nesHead"><img src="' + $('#headImg').val() + '"/></div>'
			+ '<div class="news"><img class="Expr" src="' + imgSrc + '"></div>' + '</li>';
		$('.newsList').append(str);
		websocket.send(str);
		$('.emjon').hide();
		$('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
	    });
}

// 初始化用户列表
function initUsers() {
    var token = $('#Token').val();
    $.get("/chat/users?token=" + token, function(result) {
	$('#curName').html(result.curName);
	var userList = "";
	$.each(result.users, function(key, obj) {
	    if (token == obj.username) {
		$('#headImg').val(obj.headImg);
	    }
	    userList += '<li>' + '          <div class="liLeft">' + '<img src="' + obj.headImg + '">' + '  </div>'
		    + '  <div class="liRight">' + '      <span class="intername">' + obj.username + '</span>'
		    + '      <span class="infor"></span>' + '  </div>' + '</li>';
	});
	$('.conLeft ul').html("<br/>").append(userList);
    });
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
    $('.newsList').append(answerstr);
    $('.RightCont').scrollTop($('.RightCont')[0].scrollHeight);
}

$('.ExP').on('mouseenter', function() {
    $('.emjon').show();
});

$('.emjon').on('mouseleave', function() {
    $('.emjon').hide();
});

/*******************************************************************************
 * 自适应预览图片
 * 
 * @param obj
 * @returns
 */
function photoView(obj) {
    if ($(obj).width() >= $(obj).height()) {
	$(".photo-panel .photo-div .photo-img .photo-view-h").attr("class", "photo-view-w");
	$(".photo-panel .photo-div .photo-img .photo-view-w img").attr("src", img_src);
    } else {
	$(".photo-panel .photo-div .photo-img .photo-view-w").attr("class", "photo-view-h");
	$(".photo-panel .photo-div .photo-img .photo-view-h img").attr("src", img_src);
    }
}

$(document).ready(
	function() {

	    createWebsocket();
	    initEmjon();

	    // 计算居中位置
	    var mg_top = ((parseInt($(window).height()) - parseInt($(".photo-div").height())) / 2);

	    $(".photo-div").css({
		"margin-top" : "" + mg_top + "px"
	    });
	    // 关闭
	    $(".photo-close").click(function() {
		$(".photo-mask").hide();
		$(".photo-panel").hide();
	    });
	    // 下一张
	    $(".photo-panel .photo-div .arrow-next").click(function() {
		img_index++;
		if (img_index >= $(img_ids).length) {
		    img_index = 0;
		}
		img_src = $(img_ids).eq(img_index).attr("src");
		photoView($(img_ids));
	    });
	    // 上一张
	    $(".photo-panel .photo-div .arrow-prv").click(function() {
		img_index--;
		if (img_index < 0) {
		    img_index = $(img_ids).length - 1;
		}
		img_src = $(img_ids).eq(img_index).attr("src");
		photoView($(img_ids));
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
			if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string"
				&& cbd.items[1].kind === "file" && cbd.types && cbd.types.length === 2
				&& cbd.types[0] === "text/plain" && cbd.types[1] === "Files" && ua.match(/Macintosh/i)
				&& Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
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
				var reader = new FileReader();
				var imgs = new Image(80, 30);
				imgs.file = blob;
				reader.onload = (function(aImg) {
				    return function(e) {
					aImg.src = e.target.result;
				    };
				})(imgs);
				reader.readAsDataURL(blob);

				$(imgs).on("dblclick", function() {
				    $(".photo-mask").show();
				    $(".photo-panel").show();
				    img_src = $(this).attr("src");
				    photoView($(this));
				});
				document.querySelector('#dope').append(imgs);
			    }
			}
		    }, false);
	});
