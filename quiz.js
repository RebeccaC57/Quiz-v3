let currentQuestion = 0;
let score = 0;
let timeleft = -1;
let timer; //this will be the timer function
let numHintsLeft = 2; 
let questions = [
   {
	"question": "Who were the beatles?",
	"a": "Mick Jagger, Keith Richards, Ronnie Wood, Brian Jones",
	"b": "John Lennon, Paul McCartney, George Harrison, Ringo Starr",
	"c": "Freddie Mercury, Brian May, Roger Taylor, John Deacon",
	"d": "Nick Mason, Roger Waters, Bob Klose, Richard Wright",
	"image":"quizimages/q1.png",
	"answer": "b",
	"hint": "P.M , G.H , R.S, J.L"
   },
   {
	"question": "Where is the origin of the Beatles?",
	"a": "Liverpool, U.K.",
	"b": "Kingston upon Thames, U.K.",
	"c": "London, U.K.",
	"d": "Perth, U.K.",
	"image":"quizimages/q2.jpg",
	"answer": "a",
	"hint": "It is a maritime city"
   },
   {
	"question": "What year was the band formed?",
	"a": "1950",
	"b": "1980",
	"c": "1960",
	"d": "1920",
	"image":"quizimages/q3.jpg",
	"answer": "c",
	"hint": "The oldest band member is borned in 1940"
   },
  {
	"question": "How long were they together?",
	"a": "17",
	"b": "10",
	"c": "7",
	"d": "5",
	"image":"quizimages/q4.jpg",
	"answer": "b",
	"hint": "They are in their 30s when this happened"
   },
   {
	"question": "Which one of these was their album?",
	"a": "Thriller",
	"b": "Their Greatest Hits",
	"c": "Innuendo",
	"d": "The Beatles",
	"image":"quizimages/q5.jpg",
	"answer": "d",
	"hint": "Its name after them"
   },
   {
	"question": "How many documentaries were made after them?",
	"a": "2",
	"b": "8",
	"c": "7",
	"d": "11",
	"image":"quizimages/q6.jpg",
	"answer": "b",
	"hint": "4x2=?"
   }, 
   {
	"question": "Which of the following is their song?",
	"a": "Here Comes the Star",
	"b": "Love Me Do",
	"c": "Under Pressure",
	"d": "Burning Love",
	"image":"quizimages/q7.jpg",
	"answer": "b",
	"hint": "Love, ____ __ __"
   },
   {
	"question": "The Beatles are a _______ ?",
	"a": "Country band",
	"b": "Rock band",
	"c": "Pop band",
	"d": "Jazz band",
	"image":"quizimages/q8.jpg",
	"answer": "b",
	"hint": "____ & roll"
   },
   {
	"question": "What is the last album made?",
	"a": "Let It Be",
	"b": "The Beatles",
	"c": "Abbey Road",
	"d": "Help!",
	"image":"quizimages/q9.jpg",
	"answer": "c",
	"hint": "The cover of this album was the four of them crossing the road"
   },
  {
	"question": "How many band members are there in the Beatles?",
	"a": "3",
	"b": "4",
	"c": "5",
	"d": "7",
	"image":"quizimages/q10.jpg",
	"answer": "b",
	"hint": "Its literally in every photo I put in...."
   }
   ];

//load service worker
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

 function loadQuestion() {
     document.getElementById("score").innerHTML = score + " / " + questions.length;
	 //if timer is running from previous question, stop it
	 if (timeleft >= 0 ){
		 clearInterval(timer);
	 }
	 
	 
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
     
	
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;

 } // loadQuestion
 
 
 function markIt(ans) {
     
   let message = "";

	if (ans == questions[currentQuestion].answer){
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       message = "Correct!! Keep up the good work";
       score++;
    } 
	else {
       message = "Incorrect... :( don't worry just do better on the next one" + score + " / " + questions.length; 
    } // else
        
   
    
    // move to the next question
   currentQuestion++;
	timeleft = 10;

    if (currentQuestion >= questions.length) {
       // create a special message
       message = "Thank you for joining me, to restart press the icon at the upper left corner :) else, have a great day!";
    } 
    else {
		timeleft = 0;
       loadQuestion();
    }
    
    // show the lightbox
	if (currentQuestion<questions.length){
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
	}
  
 }  // markIt
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
	
	//if a new question is loaded, start the timer when lightbox closes
	if ((currentQuestion<=questions.length - 1) && (timeleft<=0) ) {
		startTimer();
	}
	

	
 } // closeLightbox
 
 //start the timer for th ecurrent question
 function startTimer(){
	 timeleft= 10;
	 timer = setInterval ( function(){
		 document.getElementById("countdown").innerHTML = timeleft;
		 timeleft--;
		 
		 if (timeleft < 0){
			 clearInterval(timer);
			 
			 //unhide the light box with hint
			 let message= "Time over, don't worry just do better on the next one"
			 document.getElementById("lightbox").style.display = "block";
			 document.getElementById("message").innerHTML = message;  			 
			 currentQuestion++;
			 
			 if (currentQuestion< questions.length){
			 loadQuestion();
			} 
		 }
	 }, 1000 );
	 
 } //startTimer
 
 
  function showHint(){
	  
	  //get hint from currentQuestion
	  let message = questions[currentQuestion].hint;
	  
	  if (numHintsLeft > 0){
		  message = questions[currentQuestion].hint;
		  numHintsLeft--;
	  } 
	  else{
		  message = "Sorry, there are no hints left.";
	  }
	  
	  
	  //unhide the light box with hint
	  document.getElementById("lightbox").style.display = "block";
	  document.getElementById("message").innerHTML = message;
	  
	
  }  //showHint

