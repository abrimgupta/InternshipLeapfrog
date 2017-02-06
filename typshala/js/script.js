function makeCharacter(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 3; i++ ){
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	     //   console.log(Math.floor(Math.random() * possible.length));
	   	}
	    return text;
}

function getRandom(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

var textArray=[];
var index1=0;	//for motion each element of textarray sequentially
var containerHeight=document.getElementById('container').offsetHeight;
console.log(containerHeight);
	//var x=makeCharacter();
	//console.log(x);


var playerText='';	

(function(){
	var fallingText=function(){
		this.x=0;
		this.y=0;
		this.text='';
		this.element;
		this.init=function(){
			this.element=document.createElement('div');
			this.element.setAttribute('class','letter');
			this.element.style.top=this.y+'px';
			this.element.style.left=this.x+'px';
			this.element.innerHTML=this.text;
			document.getElementById('container').appendChild(this.element);
		}
		this.upatePosition=function(){
			this.element.style.top=this.y+'px';
			this.element.style.left=this.x+'px';	
		}
		this.updateText=function(){
		var temp=this.text=makeCharacter();
			this.element.innerHTML=temp;
		}
	}
	
	var startGame=function(){

		for(var i=0;i<2;i++){

			var a=new fallingText();
			a.x=getRandom(50,400);
			a.y=-50;
			a.text=makeCharacter();
			a.init();
		//	moveWords(a);
			textArray.push(a);

		}
	//		moveWords(textArray[0]);
	//		moveWords(textArray[1]);
		var interval=setInterval(function(){			//for initially displaying array elements after 5 sec
			moveWords(textArray[index1]);
			index1++;
			if(index1===2){
				clearInterval(interval);
			}

		},5000);


		

		function moveWords(word){

			setInterval(function(){
				if(word.y>=containerHeight-50){
				
			
					word.x=getRandom(50,400);
					word.y=0;
					word.updateText();
					word.upatePosition();
				}
				else{
					word.y+=1;
					word.upatePosition();
				}
				
			},20);
		}



	}
		
	var play=new startGame();
	

})();

var textArea=document.getElementById('textContainer');
window.addEventListener('keydown', function (event) {
		 //   console.log(event.keyCode);
		    var key=event.keyCode;
		    var charStr = event.key;//String.fromCharCode(key); //getting the key character name
	
		 //   console.log(charStr);
		 	var enteredText=textArea.innerHTML;
		 										//for backspace
		    if(key==8){						
		    	textArea.innerHTML='';
		    }
		    if(key==8 || key==16 || key==17 || event.key=='Shift'){
		    	return;
		    }
		    if(key==13){
		    	console.log(textArea.innerHTML+'   '+enteredText);
		    	
		    	for(var i=0;i<2;i++){

		    		if(textArray[i].text===enteredText){
		    			textArray[i].y=-50;
		    			textArray[i].updateText();
						textArray[i].upatePosition();

		    		//	alert('correct');

		    		//	console.log(textArray[i].text+'and '+enteredText);
		    		}
		    	}
		    	textArea.innerHTML='';
		 	}

		 	else{
		 		textArea.innerHTML+=charStr;
		 	}
		 	 
		    
		 
		});