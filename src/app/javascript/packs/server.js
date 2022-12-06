var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 3000;

//現状未使用
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });




var request_cmd = null;
var received_data = null;
var data_flg = false;

// bodyParserモジュールを読み込む
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//requestでPOSTデータを受け取り
app.post('/request/', (req, res) => {
  // console.log(req.body);
  //受け取ったJSONデータからリクエスト用の文字列を生成
  obj = JSON.parse(JSON.stringify(req.body));

  if(obj.FAN != null){
    request_cmd = "FAN," + obj.FAN;
  } else if(obj.DISPLAY != null){
    request_cmd = "DISPLAY," + obj.DISPLAY;
  } else if(obj.PDF != null){
    request_cmd = "PDF," + obj.PDF;
  } else if(obj.LED != null){
    request_cmd = "LED," + obj.LED;
  } else if(obj.COLOR != null){
    request_cmd = "COLOR," + obj.COLOR;
  } else if(obj.AUDIO != null){
    request_cmd = "AUDIO," + obj.AUDIO;
  } else if(obj.MP3 != null){
    request_cmd = "MP3," + obj.MP3;
  } else if(obj.MP4 != null){
    request_cmd = "MP4," + obj.MP4;
  } else if(obj.VOLUME != null){
    request_cmd = "VOLUME," + obj.VOLUME;
  } else if(obj.LEDONTIME != null){
    request_cmd = "LEDONTIME," + obj.LEDONTIME;
  } else if(obj.USB5V != null){
    request_cmd = "USB5V," + obj.USB5V;
  } else if(obj.LOG != null){
    request_cmd = "LOG," + obj.LOG;
  } else {
    request_cmd = null;
  }

  console.log(obj);
  console.log(request_cmd);

  data_flg = true;

});



//スマートベンチとの通信

 var net = require('net');
 //スマートベンチのIP
 var HOST = '172.31.36.4';
 var PORT = 8000;

 var id = "pi";
 var pwd = "bench";

 // サーバーインスタンスを生成し、リッスンします
 // net.createServer()に渡す関数は、'connection'イベントハンドラーになります。
 // コールバック関数が受け取るsockeオブジェクトは各接続ごとにユニークなものとなります。
 net.createServer(function(sock) {
     // TCPサーバーが接続しました。socketオブジェクトが自動的に割り当てられます。
     console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);


     // https://kazuhira-r.hatenablog.com/entry/20170912/1505227491
     // Stringとしてdataを受け取る
     sock.setEncoding("utf8");
     // 'data' イベントハンドラー
     sock.on('data', function(data) {

         console.log('DATA: ' + data );

         //OSに渡す処理
         received_data = data ;
         data_flg = true;


         var words = data.split(',');
         if (words[0].match('ID?')) {
             // サーバ画面で指定された値”pi”を書き込みます。
             // div要素'text-id'の場合、

             // var id = document.getElementById('text-id');

             // sock.write('pi'); // 固定値でも良いですよ。(“pi”)
             if (id != null) {
                 sock.write(id);
                 id = null; // 初期化します。
             }

         } else if (words[0].match('PWD?')) {
             // サーバ画面で指定された値”bench”を書き込みます。
             // div要素'text-pwd'の場合

             // var pwd = document.getElementById('text-pwd');

             // sock.write('bench'); // 固定値でも良いですよ。(“bench”)
             if (pwd != null) {
                 sock.write(pwd);
                 pwd = null; // 初期化します。
             }

         } else if (words[0].match('TEMPERATURE')) {
             // TEMPERATURE,xx
             if (words[1] != null) {
                 // サーバ画面上に温度を表示します。仮にtempArとすると
                 // var tempAr = document.getElementById("tempAr");
                 // tempAr.innerHTML = temp[1];
             }
         } else if (words[0].match('BATTERY')) {
             // BATTERY,ON or BATTERY,OFF
             if (words[1] != null) {
                 // ONかOFFを表示します。
                 // var bat = document.getElementById("bat");
                 // bat.innerHTML = words[1];
             }
         } else if (words[0].match('FAN')) {
         } else if (words[0].match('INVERTER')) {
         } else if (words[0].match('DISPLAY')) {
         } else if (words[0].match('AUDIO')) {
         } else if (words[0].match('LED')) {
         } else if (words[0].match('COLOR')) {
             // COLOR,R:xxx,G:yyy,B:zzz
         } else if (words[0].match('HUMAN')) {
         } else if (words[0].match('AC1')) {
         } else if (words[0].match('AC2')) {
         } else if (words[0].match('USB5V')) {
         } else if (words[0].match('WIFIUSE')) {
         } else if (words[0].match('POSITION')) {
             // POSITION,LAT:xxx,LON:yyy
         } else if (words[0].match('MESSAGE')) {
         } else if (words[0].match('REQUEST')) {

                 // 初めてここに来た時、緯度、経度情報（真値）を
                 // ラズパイに送って下さい。
                 // ラズパイは、これを受信後、位置の判定を開始します.
                 // POSITION,LAT:画面上の緯度,LON:画面上の経度
                 // ここからは、画面上でユーザが指定したコマンドを作成し、
                 // ラズパイに送信します。
                 // 画面上にリクエスト送信ボタンを作り、押されたら、コマンドを
                 // 作成します。画面上でのやりとりになると思います。
                 if (request_cmd != null) {

                    // console.log(request_cmd +"リクエスト送信前");

                     sock.write(request_cmd);

                     request_cmd = null; // 初期化します。

                     // console.log(request_cmd +"リクエスト送信後");

                 } else {
                     // ユーザからの指定がない場合は、OKを返します。
                     sock.write('OK');
                 }

         } else {
             // ラズパイからのコマンドの為、ここには来ないが念の為。
             sock.write('OK');
         }

         if( words[0].match('REQUEST') == null ){
           sock.write('OK');
         }
      });
     // 'close'イベントハンドラー
     sock.on('close', function(had_error) {
         console.log('CLOSED. Had Error: ' + had_error);
     });
     // 'errer'イベントハンドラー
     sock.on('error', function(err) {
         console.log('ERROR: ' + err.stack);
     });
 }).listen(PORT, HOST);
 console.log('Server listening on ' + HOST +':'+ PORT);


 //ポート番号3000でPARCOM OSとwebsocket通信
 server.listen(port);
 console.log('Server running at http://54.64.49.214:' + port + '/');
 const socketOptions = {
   cors: {
     origins: ['http://54.64.49.214' , 'http://app.parcom.jp'],
  }
 };
 var socketio = require('socket.io');
 var io = socketio(server , socketOptions);

 //以下ソケット通信後のfunction
 io.on('connection', (socket) => {
   socket.on('request', function() {
      //空でない且つ前回送信したものと異なる場合
      if( received_data !== null && data_flg == true ){
        //送信後falseに変更し重複送信制御
        data_flg = false;
        socket.emit('data', received_data);
      }
  	});

 });
