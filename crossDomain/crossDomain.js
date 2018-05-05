var jsonp = {
    exec: function() {
        var script = document.getElementById('jsonp');
        if(script) {
            script.parentElement.removeChild(script);
        }
        script = document.createElement('script');
        script.id = 'jsonp';
        script.src = 'http://localhost:8080/getusermsg?callback=jsonp.jsonpcallback';
        document.head.appendChild(script);        
    },
    jsonpcallback: function (userdata) { 
        alert('姓名:' + userdata.data.username);
        alert('年龄:'+ userdata.data.userAge);
        alert('性别:' + userdata.data.userSex);
    }
}

var cors = function() {
    $.ajax(
        {
            url: 'http://localhost:8080/getusermsg',
            type: 'GET',
            dataType: 'json',
            success: function(userdata) {
                alert('姓名:' + userdata.data.username);
                alert('年龄:'+ userdata.data.userAge);
                alert('性别:' + userdata.data.userSex);
            },
            error: function(error) {
                alert(JSON.stringify(error));
            }
        }
    )
}

var jquery = function() {
    $.ajax(
        {
            url: 'http://localhost:8080/getusermsg',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpcallback',
            success: function(userdata) {
                alert('姓名:' + userdata.data.username);
                alert('年龄:'+ userdata.data.userAge);
                alert('性别:' + userdata.data.userSex);
            }
        }
    )
}


var postUser = function() {
    $.ajax({
        url: 'http://localhost:8080/postusermsg',
        type: 'POST',
        //发送json数据触发预检preflight，option请求
        contentType: 'application/json',  
        data: {username: 'jjp', userAge: 22, userSex: '男'},
        dataType: 'json',
        success: function(data) {
            if(data.code === 1000) {
                alert('添加用户成功')
            }
        },
        error: function(err) {
            alert(JSON.stringify(err));
        }
    })
}

//window.postMessage
var openWin = function() {
    var sonWin = window.open('https://www.baidu.com','百度');
    //参数：要发送的信息、接受信息的窗口的源
    sonWin.postMessage('你好，百度', 'https://www.baidu.com');
}

$('#btn1').click(jsonp.exec);
$('#btn2').click(cors);
$('#btn3').click(jquery);
$('#btn4').click(postUser);
$('#btn5').click(openWin);