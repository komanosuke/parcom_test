console.log('ok');
function toHalfNumber(str) {
    return str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function graph(){
	let labels = [];
	let scores = [];
	let $label = document.getElementsByClassName('label');
	let $score = document.getElementsByClassName('numbers');

	for(let i = 0; i < $label.length; i++){
		labels.push($label[i].textContent);
		scores.push(Number(toHalfNumber($score[i].value)));
	}
	
	let data = [
		{ label: labels[0], y: scores[0] },
		{ label: labels[1], y: scores[1] },
		{ label: labels[2], y: scores[2] },
		{ label: labels[3], y: scores[3] },
		{ label: labels[4], y: scores[4] }
	];
	let avg = 0;
	for(let i = 0; i < scores.length; i++){
		avg += scores[i];
	}
	avg = avg/5;
	
	let stage = document.getElementById('stage');
	let chart = new CanvasJS.Chart(stage, {
		title: {
			text: "テストの点数 平均点は" + avg + "点"  //グラフタイトル
		},
		theme: "theme4",  //テーマ設定
		data: [{
			type: 'column',  //グラフの種類
			dataPoints: data  //表示するデータ
		}]
	});
	chart.render();
}