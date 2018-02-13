<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IMQQ</title>

<link rel="stylesheet" type="text/css" href="../css/qq.css" />
<link rel="stylesheet" type="text/css" href="../css/photo-panel.css" />

</head>
<body>

    <div class="qqBox">
        <div class="BoxHead">
            <div class="headImg">
                <img src="../img/6.jpg">
            </div>
            <div class="internetName">Home</div>
        </div>
        <div class="context">
            <div class="conLeft">
                <ul>
                    <!-- 
                    <li>
                        <div class="liLeft">
                            <img src="../img/20170926103645_04.jpg">
                        </div>
                        <div class="liRight">
                            <span class="intername">前端交流群</span>
                            <span class="infor">厉害了</span>
                        </div>
                    </li>
                    <li class="bg">
                        <div class="liLeft">
                            <img src="../img/20170926103645_19.jpg">
                        </div>
                        <div class="liRight">
                            <span class="intername">赵鹏</span>
                            <span class="infor">[流泪]</span>
                        </div>
                    </li> -->
                </ul>
            </div>
            <div class="conRight">
                <div class="Righthead">
                    <div class="headName"></div>
                    <div class="headConfig">
                        <ul>
                            <li>
                                <img src="../img/20170926103645_06.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_08.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_10.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_12.jpg">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="RightCont">
                    <ul class="newsList">

                    </ul>
                </div>
                <div class="RightFoot">
                    <div class="emjon">
                        <ul>
                            <li>
                                <img src="../img/emo/emo_02.gif">
                            </li>
                        </ul>
                    </div>
                    <div class="footTop">
                        <ul>
                            <li>
                                <img src="../img/20170926103645_31.jpg">
                            </li>
                            <li class="ExP">
                                <img src="../img/20170926103645_33.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_35.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_37.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_39.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_41.jpg" alt="" />
                            </li>
                            <li>
                                <img src="../img/20170926103645_43.jpg">
                            </li>
                            <li>
                                <img src="../img/20170926103645_45.jpg">
                            </li>
                        </ul>
                    </div>
                    <div class="inputBox">
                        <!-- 
                        <textarea id="dope" style="width: 99%; height: 75px; border: none; outline: none;" name="" rows="" cols=""></textarea>
                         -->
                        <div id="dope" style="width: 99%; height: 75px; border: none; outline: none;" contenteditable="true"></div>
                        <button class="sendBtn">发送(s)</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="photo-mask"></div>
    <div class="photo-panel">
        <div class="photo-div">
            <div class="photo-left">
                <div class="arrow-prv"></div>
            </div>
            <div class="photo-img">
                <div class="photo-bar">
                    <div class="photo-close"></div>
                </div>
                <div class="photo-view-h">
                    <img src="" />
                </div>
            </div>
            <div class="photo-right">
                <div class="arrow-next"></div>
            </div>
        </div>
    </div>

    <input type="hidden" id="Token" value="${token}">
    <input type="hidden" id="headImg" value="${headImg}">
    <input type="hidden" id="curName" value="${curName}">

    <script type="text/javascript" src="../js/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="../js/chat.js"></script>

</body>
</html>
