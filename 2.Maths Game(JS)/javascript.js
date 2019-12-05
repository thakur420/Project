var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick=function () {
	if(playing==true){
		location.reload();
	}else{
		playing = true;
		score = 0;
		changeHtml("scorevalue",score);
		show("timeremaining");
		changeHtml("startreset","Reset Game");
		timeremaining = 60;	
		startCounter();
		generateQA();
	}

}

for(var i=1;i<5;i++){
	document.getElementById("box"+i).onclick = function(){
		if(playing==true){
			if(this.innerHTML == correctAnswer){
				score ++;
				changeHtml("scorevalue",score);
				hide("wrong");
				show("correct");
				generateQA();
				// changeHtml("timeleft",60);
				setTimeout(function(){
					hide("correct");
				},1000);
			}else{
				hide("correct");
				show("wrong");
				setTimeout(function(){
					hide("wrong");
				},1000);
			}
		}
	}	
}


function generateQA(){
	var x = Math.round(9*Math.random())+1;
	var y = Math.round(9*Math.random())+1;
	correctAnswer = x*y;
	var correctPosition = Math.round(3*Math.random())+1;
	changeHtml("question",x+"x"+y);
	changeHtml("box"+correctPosition,correctAnswer);
	var options =[correctAnswer];
	for(var i=1;i<5;i++){
		if(i != correctPosition){
			var wrongAnswer;
			do{
				wrongAnswer = (Math.round(9*Math.random())+1)*(Math.round(9*Math.random())+1);
			}while(options.indexOf(wrongAnswer)>-1);
			changeHtml("box"+i,wrongAnswer);
			options.push(wrongAnswer);
		}
	} 
}

function startCounter(){
	action = setInterval(function(){
		timeremaining -= 1;
		changeHtml("timeleft",timeremaining);
		if(timeremaining==0){
			stopCounter(action);
			changeHtml("scoreearned",score);
			hide("timeremaining");
			show("gameover");
			changeHtml("startreset","Start Game");
			hide("correct");
			hide("wong");
			playing=false;
		}

	},1000)
}

function stopCounter(){
	clearInterval(action);
}

function changeHtml(id,str){
	document.getElementById(id).innerHTML=str;
}

function hide(id){
	document.getElementById(id).style.display = "none";
}

function show(id){
	document.getElementById(id).style.display = "block";

}