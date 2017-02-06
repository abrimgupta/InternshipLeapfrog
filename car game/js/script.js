var playstate=0;			//for initial checking if game has been started
	
(function(){
	window.addEventListener('keydown', function (event) {
	 //   console.log(event.keyCode);
	    var key=event.keyCode;
	  if( key==39 && playstate==0 ){		//left and right
	  	//location.reload();
	  	new play();
	  }
	 
	});

})();
	

	function play(){
		playstate=1;
		var player;
		var enemyCars=[];
		var carMotion;
		var score=0;
		var backPosition=0;		//for background movement
		console.log('initialized');

		function getRandom(min, max) {

		  return Math.floor(Math.random()*(max-min+1)+min);
		}

		function car(){
			this.x=0;
			this.y=0;
			this.img="url('images/blueCar.png')";
			this.element;
			this.lane=0;

			this.init=function(){
				this.element = document.createElement('div');
				this.element.setAttribute('class', 'carDiv');
				this.element.style.top = this.y + 'px';
				this.element.style.left = this.x + 'px';
				this.element.style.background=this.img;
				document.getElementById('playArea').appendChild(this.element);
			}

			this.reDrawCar = function() {
			  this.element.style.top = this.y + 'px';
			  this.element.style.left = this.x + 'px';
			}
		}

		function startGame(){
			//...........CREATING PLAYER CAR
			 player=new car();			
			 player.x=0;
			 player.y=400;
			 player.img="url('images/redCar.png')";

			 player.init();
		//	 console.log(player.x+' '+player.y);

			 this.start=function(){

			 	window.addEventListener('keydown', function (event) {
			 	 //   console.log(event.keyCode);
			 	    var key=event.keyCode;
			 	  if(key==37 && player.x!=0){		//left
			 	  	player.x-=100;
			 	  	player.reDrawCar();

			 	  }
			 	  if(key==39 && player.x!=200){		//right
			 	  	player.x+=100;
			 	  	player.reDrawCar();
			 	  }
			 	});
			 				//drawing enemy car 

			 	var car1=new car();
			 	car1.x=getRandom(0,2)*100;
			 	car1.y=0;
			 	car1.init();
			 	console.log('new car'+car1.x+'   '+car1.y);

			 	enemyCars.push(car1);


				carMotion=setInterval(this.moveCar.bind(null,car1),20);		 

			 }

			 this.moveCar=function(carX){
			 	
			 	carX.y+=10;

			 	if(carX.y+200>=415 && player.x==carX.x){		//reading car collision
			 		console.log("end reached");

			 		clearInterval(carMotion);			
			 		score=0;

			 		new startGame().start();			 		
			 		alert('GAME OVER!!!!');
			 		location.reload();

			 	}
			 	
			 	if(carX.y==600){
			 		score++;
			 		carX.x=getRandom(0,2)*100;
			 		carX.y=-100;
			 	}
			 	else{
			 		carX.reDrawCar();
			 	}
			 	
			 	document.getElementById('score').innerHTML=score;

			 }
			 

		}
		
		var playGame=new startGame().start();

		setInterval(function(){
			console.log('background move');
			document.getElementById('playArea').style.backgroundPosition='0 '+backPosition+'px';
			backPosition++;
		},20);

	}