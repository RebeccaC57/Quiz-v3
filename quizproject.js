
let currentQuestion = 0;
let score = 0; //# of correct answer
let numHintsLeft =2; //allow user to use hint 2
let timeLeft = -1;
let timer;


//question is a array
//Things inside of {} are objects
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
	"d": "Revolver",
	"image":"quizimages/q5.jpg",
	"answer": "d"
   },
   {
	"question": "How many documentaries were made after them?",
	"a": "2",
	"b": "8",
	"c": "7",
	"d": "11",
	"image":"quizimages/q6.jpg",
	"answer": "b"
   }, 
   {
	"question": "Which of the following is their song?",
	"a": "Here Comes the Star",
	"b": "Love Me Do",
	"c": "Under Pressure",
	"d": "Burning Love",
	"image":"quizimages/q7.jpg",
	"answer": "b"
   },
   {
	"question": "The Beatles are a _______ ?",
	"a": "Country band",
	"b": "Rock band",
	"c": "Pop band",
	"d": "Jazz band",
	"image":"quizimages/q8.jpg",
	"answer": "b"
   },
   {
	"question": "What is the last album made?",
	"a": "Let It Be",
	"b": "The Beatles",
	"c": "Abbey Road",
	"d": "Help!",
	"image":"quizimages/q9.jpg",
	"answer": "c"
   },
  {
	"question": "How many band members are there in the Beatles?",
	"a": "3",
	"b": "4",
	"c": "5",
	"d": "7",
	"image":"quizimages/q10.jpg",
	"answer": "b"
   }
   ];
 
 
    function loadQuestions() {
     
	//if a timer is running from the previous question clear
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
    if(timeLeft >=0){
      clearInterval(timer);
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
    
    if (ans == questions[currentQuestion].answer) {
        
       // add 1 to score
       score++;
       
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "Correct!!!! Your score is " + score + " / " + questions.length;
    } else {
       message = "Incorrect : :( Your score is " + score + " / " + questions.length; 
    } // else
        
   
    
    // move to the next question
    currentQuestion++;
    if (currentQuestion >= questions.length) {
       // create a special message
       message = "Thank you for joining me! To restart, press the icon at the top left";
    } else {
       loadQuestions();
    }
    	
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  
 }  // markIt
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
	
	if(currentQuestion <= questions.length -1){
		startTimer();
	}
 } // closeLightbox
 
 function showHint(){

	if(numHintsLeft > 0){
		message = questions[currentQuestion].hint;
		numHintsLeft--;
	}
	
	else{
		message ="Sorry, all your hints are used";
	}
	document.getElementById("lightbox").style.display = "block";
	document.getElementById("message").innerHTML = message;
 }//showHint
 
 
 function startTimer(){
	 
		timeLeft = 10;// in second
		timer = setInterval(function(){
			document.getElementById("countdown").innerHTML = timeLeft;
			timeLeft--;

		if (timeLeft < 0){
			clearInterval(timer);
	//show lightbox
			let message = "Time over";
			document.getElementById("lightbox").style.display = "block";
			document.getElementById("message").innerHTML = message;
			currentQuestion++;
			loadQuestions();
			}//if
		},1000);
 	}//start timer

 
 
 
 
 
   
