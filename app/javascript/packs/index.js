import { data } from "jquery";

function toHalfNumber(str) {
    return str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}


function graph(){
	let labels = [];
	let $label = document.getElementsByClassName('label');
    let $array = document.getElementById('title').textContent;
    $array = String($array)
    $array = $array.replace("[", "");
    $array = $array.replace("]", "");
    $array = $array.split(",");

    // console.log($array);
    // console.log($array[0]);

	for(let i = 0; i < $label.length; i++){
		labels.push($label[i].textContent);
	}
	
	let data = [
		{ label: labels[0], y: Number($array[0]) },
		{ label: labels[1], y: Number($array[1]) },
		{ label: labels[2], y: Number($array[2]) },
		{ label: labels[3], y: Number($array[3]) },
		{ label: labels[4], y: Number($array[4]) }
	];
	
	let stage = document.getElementById('stage');
	let chart = new CanvasJS.Chart(stage, {
		title: {
			text: "グラフ描画中"  //グラフタイトル
		},
		theme: "theme4",  //テーマ設定
		data: [{
			type: 'line',  //グラフの種類
			dataPoints: data  //表示するデータ
		}]
	});
	chart.render();
}







document.addEventListener('DOMContentLoaded', () => {
    const fanButton = document.getElementById("fanButton");
    fanButton.addEventListener("click", () => { postSettingData() });
});
//parcomsendの方にデータをpost
function postSettingData(){
    let fan_data = document.getElementsByName('FAN');
    let checkValue;
    for (let i = 0; i < fan_data.length; i++){
        if (fan_data.item(i).checked){
            checkValue = fan_data.item(i).value;
        }
    }

    console.log("選択されているのは" + checkValue + "です");
    data_to_send = String(checkValue);

	$.ajax({
		url: 'https://parcomsend.herokuapp.com/send_data/index',
        //url: 'connect/index',
		type: 'GET',
		dataType: 'text',
		async: true,
		data: {
			os_data: data_to_send
		},
	});
}








//ーーーーーーーーーーーーーーーーこれより下はラズパイサーバ(仮想)ーーーーーーーーーーーーーーーーー


//データをどの方法で渡すか？DBなしで表示できるのか？
//グラフのデータを乱数で作成（送信されてきたデータの擬似的なやつ。setIntervalで１秒おきに変わる）->これをRailsに渡すところまではOK、問題はDBなしでの表示
// function makeData(){
//     let data_to_send = [];
//     for (var i = 0; i < 5; i++){
//         var shuffledNumber = Math.floor(Math.random() * 30);
//         data_to_send.push(shuffledNumber);
//     }
//     data_to_send = String(data_to_send);
//     console.log(data_to_send);
// }

//-> ajaxで毎秒送る
//sendするデータは配列から文字列に変えておく
let data_to_send = '1,2,3,4,5';

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", () => { postData() });
});
//parcomsendの方にデータをpost
function postData(){
    let data_to_send = [];
    for (var i = 0; i < 5; i++){
        var shuffledNumber = Math.floor(Math.random() * 30);
        data_to_send.push(shuffledNumber);
    }
    data_to_send = String(data_to_send);
    console.log(data_to_send);

	$.ajax({
		url: 'https://parcomsend.herokuapp.com/send_data/index',
		type: 'GET',
		dataType: 'text',
		async: true,
		data: {
			json_data: data_to_send
		},
	});
}

//$('#line_chart').html("<div id="chart-1" style="height: 300px; width: 100%; text-align: center; color: #999; line-height: 300px; font-size: 14px; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif;">Loading...</div>


// $.ajax({
//     // オプション指定
//    })
//    .then(function(data) {
//      // 通信が成功したときの処理
//    }, function() {
//      // 通信が失敗したときの処理
//    });

//１秒おきにRailsDBから文字列を受信するためのリクエスト
function submit(){
    const submitButton = document.getElementById("submitButton");
    submitButton.click();
}

setInterval(postData, 1000);
setInterval(submit, 1000);
setInterval(graph, 1000);