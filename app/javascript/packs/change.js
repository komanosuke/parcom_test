window.addEventListener('load', function () {
    setInterval(function () {
        Do_repetition();
    }, 1000);
});
//毎秒Do_repetitionを実行する

function Do_repetition() {

    // urlを加工し、キャッシュされないurlにする。
    url = "connect/index"
 
    // ajaxオブジェクト生成
    let ajax = new XMLHttpRequest;
 
    // ajax通信open
    ajax.open('GET', url, true);
 
    // ajax返信時の処理
    ajax.onload = function (data) {
       var res = data.currentTarget.response;
        // ここにgetレスポンス受け取り時の処理を記載
    };
 
    // ajax開始
    ajax.send(null);
}

var res = data.currentTarget.response;

//レスポンスに応じてDOMを変更
var div = document.getElementById('testA');

if(res == "0"){
    div.src = "makewani.png";
}else if(res == "1"){
    div.src="hamstar.png";
}else{
    div.src="mogura.png";
}