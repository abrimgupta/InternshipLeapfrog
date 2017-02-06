var container=document.getElementById('container');
var a=0;

function run(){
	container.style.backgroundPosition=a+'px 0';
	a--;
}
	


function letTheGameBegin(){
	var a=document.getElementById('welcome');
	a.style.display='none';
	setInterval(run,10);
	new startGame();
}



	//start.........................................................................


	var containerHeight=document.getElementById('container').offsetHeight;
//	console.log(containerHeight);

	function getRandom(min, max) {
	  return Math.floor(Math.random()*(max-min+1)+min);
	}

	var flyingBird=function(){
		this.element=document.getElementById('bird');
		this.x=100;
		this.y=100;
		this.element.style.top=this.y+'px';
		this.element.style.left=this.x+'px';

		this.setBirdPosition=function(){
			this.element.style.top=this.y+'px';
		//	this.element.style.left=this.x+'px';
		}

	}

	var movingPipe=function(){
		this.gap=0;
		this.x=600;
		this.y=0;
		this.img="url('../images/pipeGap100.png')";
		this.init=function(){
			this.element=document.createElement('div');
			this.element.setAttribute('class','pipe');
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
			this.element.style.background=this.img;
			container.appendChild(this.element);
		}
		this.updatePipe=function(){
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}
	}


	function startGame(){
		var bird=new flyingBird();
		var pipes=[];
		var currentPipes=[];
		var gameOver=false;		//if 1 game is over
		var gameScore=0;
		//creating pipes
		window.addEventListener('keydown', function (event) {
		 //   console.log(event.keyCode);
		    var key=event.keyCode;
		  if(key==32 && bird.y!=0 && gameOver==false){		//space
		  	bird.y-=25;
		//  	console.log(bird.y);
		  	bird.setBirdPosition();
		  }
		  if(gameOver==true){
		  	
		  	location.reload();
		  }
		});

		var pipe1=new movingPipe();
		pipe1.x=500;
		pipe1.y=0;
		pipe1.img="url('images/pipeGap100.png')";
		pipe1.gap=100;
		pipe1.init();
		pipes.push(pipe1);

		var pipe2=new movingPipe();
		pipe2.x=800;
		pipe2.y=0;
		pipe2.img="url('images/pipeGap200.png')";
		pipe2.gap=200;
		pipe2.init();
		pipes.push(pipe2);

		var pipe3=new movingPipe();
		pipe3.x=1100;
		pipe3.y=0;
		pipe3.img="url('images/pipeGap300.png')";
		pipe3.gap=300;
		pipe3.init();
		pipes.push(pipe3);

//		currentPipes.push(pipes[getRandom(0,2)]);	//selecting first random pipe
//		currentPipes[0].init();		

		var birdMotion=function(){
				if(bird.y+50>=containerHeight || bird.y<=0){
				//	alert('out');
					//bird.y=0;
					gameOver=true;
					document.getElementById('info').style.display='block';
					clearInterval(moveBird);
					clearInterval(movePipe);
				}
				else
				{								
					for(var i=0;i<3;i++)		//check pipe collision with bird
					{
					//	console.log('distance'+(pipes[0].x-bird.x));
						if(bird.x+50>pipes[i].x && bird.x < (pipes[i].x+100)
							&& (bird.y<=pipes[i].gap || bird.y+50 >=pipes[i].gap+100))
						{
						//	alert('collision');
							gameOver=true;
							document.getElementById('info').style.display='block';
							clearInterval(movePipe);
							clearInterval(moveBird);
						}
						else{
							bird.y+=1;
							bird.setBirdPosition();
						}
					}
					
				}


		}

		var pipeMotion=function(){
			for(var i=0;i<3;i++){
				if(pipes[i].x+100===0){
					pipes[i].x+=900;
					gameScore++;
					document.getElementById('score').innerHTML=gameScore;
				}
				else
				{
					pipes[i].x-=1;
				}
				
				pipes[i].updatePipe();
			}

		}

			
		

		var moveBird=setInterval(birdMotion,40);
		var movePipe=setInterval(pipeMotion,20);


	}



