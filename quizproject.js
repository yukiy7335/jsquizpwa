
var currentQuestion = 0; //the question we are currently on
var score = 0; //a numbers of correct questions
var num = 1;
//set the timer
var timeleft = 180;
var downloadTimer;
 
  
function startTimer() {
	 console.log("Starting new timer ");
	 num = 0;
	 //timeleft = 180;
     downloadTimer	 = setInterval(function(){
		document.getElementById("countdown").innerHTML = timeleft + "s";
		timeleft -= 1;
		if(timeleft <= 0){
			//clearInterval(downloadTimer);
			document.getElementById("countdown").innerHTML = "*Finished*";
		
			//timer finished and the feedback
			message="You should finish all work! Your score is "+ score +" / " + questions.length + ". Click to start again!";
			document.getElementById("lightbox").style.display="block";
			document.getElementById("message").innerHTML = message;
		
			//restart timer and questions from begining
			clearInterval(downloadTimer);
			num = 1;
			timeleft = 180;
			currentQuestion = 0;
			score = 0;
			//location.reload();
			loadQuestion();
			}
	}, 1000);
 } // starttimer//end of timer js
 
 

//question is an array of question objects
var questions = [
   {
	"question": "Who was the father of the computer?",
	"a": "Charlie Babbage",
	"b": "Dennis Ritchie",
	"c": "Charles Babbage",
	"d": "Ken Thompson",
	"image":"quizimages/question1.jpg",
	"answer": "c"
   },
   {
	"question": "What is the full form of CPU?",
	"a": "Central Process Unit",
	"b": "Central Processing Unit",
	"c": "Central Programming Unit",
	"d": "Central Progressive Unit",
	"image":"quizimages/question2.jpg",
	"answer": "b"
   },
   {
	"question": " What is the full form of CU?",
	"a": "Compound Unit",
	"b": "Communication Unit",
	"c": "Computer Unit",
	"d": "Control Unit",
	"image":"quizimages/question3.jpg",
	"answer": "d"
   },
   {
	"question": "What is the full form of ALU?",
	"a": "Arithmetic Logic Unit",
	"b": "Arithmetic Local Unit",
	"c": "Advance Logical Unit",
	"d": "None of these",
	"image":"quizimages/question4.jpg",
	"answer": "a"
   },
   {
	"question": "What is the full form of MU?",
	"a": "Management Unit",
	"b": "Masked Unit",
	"c": "Main Unit",
	"d": "Memory Unit",
	"image":"quizimages/question5.jpg",
	"answer": "d"
   },
   {
	"question": "What is the full form of EEPROM?",
	"a": "Electrically Erasable Read Access Memory",
	"b": "Electrically Erasable Read Only Memory",
	"c": "Ethical Electrically Read Only Memory",
	"d": "None of these",
	"image":"quizimages/question6.jpg",
	"answer": "b"
   },
   {
	"question": "What is the full form of SDRAM?",
	"a": "Special Dynamic Read Access Memory",
	"b": "Synchronous Dynamic Read Access Memory",
	"c": "Special Dynamic Random Access Memory",
	"d": "Synchronous Dynamic Random Access Memory",
	"image":"quizimages/question7.jpg",
	"answer": "d"
   },
   {
	"question": "Which electronics component is used in first generation computers?",
	"a": "Transistors",
	"b": "ULSI Chips",
	"c": "Vacuum Tubes",
	"d": "LSI Chips",
	"image":"quizimages/question8.jpg",
	"answer": "c"
   },
    {
	"question": "Which is not the correct type of computer?",
	"a": "Mini Frame Computer",
	"b": "Supercomputer",
	"c": "Workstations",
	"d": "Personal Computer",
	"image":"quizimages/question9.jpg",
	"answer": "a"
   },
   {
	"question": "Which part of the computer is considered the Brain of the Computer?",
	"a": "Random Access Memory",
	"b": "Central Process Unit",
	"c": "Read Only Memory",
	"d": "Hard Disk",
	"image":"quizimages/question10.jpg",
	"answer": "b"
   },
 ];
 
 //register the service worker when the js loads
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
 
 //run code when the body loads
function initialize(){
	 document.getElementById("lightbox").style.display="none";
	 document.getElementById("countdown").innerHTML = timeleft + "s";
	 loadQuestion();
 };
 
 
 //load the current question on the page
function loadQuestion() {
	 
	 //check for last question
	 if(currentQuestion== questions.length){
		 message = "Congratulation! You have finished. Your score is " + score +" / " + questions.length + ". Click to start again!";
		 
		 //show the lightbox with feedback
		 document.getElementById("lightbox").style.display="block";
		 document.getElementById("message").innerHTML = message;
		 clearInterval(downloadTimer);
		 num = 1;
		 timeleft = 180;
		 currentQuestion = 0;
		 score = 0;
	 }
   
	//preload the image
	var height = 0;
	var width = 0;
	var img = document.getElementById("image");
	var preLoadImg = new Image();
	preLoadImg.src = questions[currentQuestion].image;
	
	preLoadImg.onload = function(){
		img.width = this.width;
	}
	img.style.maxWidth = "500px";
	img.style.margin = "10px";
	img.src = preLoadImg.src;
   
   //load the question
   document.getElementById("question").innerHTML = questions[currentQuestion].question;
   document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
   document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
   document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
   document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
   
   document.getElementById("image").src = questions[currentQuestion].image;
 } // loadQuestion
 
 //mark the current question
function markIt(ans) {
	 let message = "";
	//if the answer correct add to score and move to next question
	if(ans == questions[currentQuestion].answer){
		//alert("Correct");//don't use alert in real web design..too 1995
		//add to score and move to next question
		score = score + 1;//or score ++  or score+=1
		document.getElementById("score").innerHTML = score + "/" + questions.length;
		
		//show the lightbox with feedback
		message = "Correct Answer! Your score is " + score + " / " + questions.length;
		
	}
	//otherwise notify user the answer is incorrect
	else{
		message = "Incorrect Answer! Your score is " + score + " / " + questions.length;
	} //else
	

	//show the light box with feedback
	document.getElementById("lightbox").style.display="block";
	document.getElementById("message").innerHTML = message;
	
	//move to the next question
	currentQuestion++;//add 1 to currentQuestion
	loadQuestion();
	
 }  // markIt
 
 //close the lightbox
function closeLightBox(){
		console.log("num is " + num);
		if (num == 1) {
			 // start the timer
			 num = 0;
			 //timeleft = 180;
			 startTimer();
		} 
		
		document.getElementById("lightbox").style.display="none";
	}