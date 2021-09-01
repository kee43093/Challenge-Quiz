//decrease by one for every second that passes
var timerEl = document.querySelector("#timer");
timerEl.innerText = 0;
var questionIndex = 0; //increase everytime changeQuestion() is called
var score = 0; //increase everytime correct answer selected; 
var startQuiz = document.getElementById('startQuiz')
const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('nextBtn');
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
var initialsBox = document.querySelector("#initials");
const answerButtonEl = document.getElementById ('answer-btn')
let shuffledQuestions, currentQuestionIndex
var submitButton = document.getElementById('sumbit-score')
var gameover
var scoreList = [];



startButton.addEventListener( 'click', startGame);
nextButton.addEventListener ('click', () =>{
    currentQuestionIndex++
    setNextQuestion()

})

function startGame(){
    startButton.classList.add('hide');
    startQuiz.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) 
    questionContainerEl.classList.remove('hide')
    currentQuestionIndex = 0;
    score=0;
    setNextQuestion() 
    setTime() //starts timer
}

function setTime () {
    timeleft = 60;
    var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        clearInterval(timercheck)
        timerEl.innerText = 0
        showScore()
       
    }

    }, 1000)
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    //set question and answer choices in html

}

function showQuestion (question){
questionEl.innerText=question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
        score++
    }
    button.addEventListener('click', selectAnswer)
    answerButtonEl.appendChild(button)
    
});

}

function resetState () {
    nextButton.classList.add('hide')
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild
        (answerButtonEl.firstChild)
    }
}

function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScore"));
    if (storedScore !== null) {
      scoreList = storedScore;
    }
  }

function saveScore() {
    localStorage.setItem("highScore", JSON.stringify(scoreList));
  }

function selectAnswer (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    } else{
       gameover = "true"
        endGame()
        startButton.classList.add('hide')
        
    }
}
   

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var playerInitials = initialsBox.value.trim();
    var newScore = {
      player: playerInitials,
      score: score,
    };
    scoreList.push(newScore);
    saveScore()
  });


function endGame(){
    questionContainerEl.classList.add('hide');
    startButton.classList.add('hide');
    clearInterval(timer)
    console.log(score)
    document.getElementById("highscore").innerHTML = `High Score: ${score}`
    scoreList.push(score);
    localStorage.setItem("highScore",score)
    var endContainer = document.getElementById('end-container')
    endContainer.classList.remove('hide')
    saveScore()
    //show final score, show highscores from local storage
    //show input to enter initials
    //show button to submit score

}


function setStatusClass(element, correct){
clearStatusClass(element)
if(correct) {
    element.classList.add('correct')
} else {
    element.classList.add('wrong')
}
}

function clearStatusClass (element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "what is not a coding language?",
        answers: [ 
            {text: "ABCD", correct: true },
            {text: "HTML", correct: false},
            {text: "CSS", correct: false}
            
        ]
        
    },

    {
        question: "What tag defines an unordered list?",
        answers: [ 
            {text:"<ul>" , correct:true}, 
            {text:"<li>" , correct:false},
            {text:"<hi>" , correct: false}
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text:"Huge Typing Man Lion", correct:false}, 
            {text:"Hyper Text Markup Language", correct:true}, 
            {text:"Hyper Typing Markup Language", correct:false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text:"Cool Shoes Shaggy", correct:false},
            { text:"Create Secure Safety", correct:false},
            {text: "Cascading style sheet", correct: true}
        ]
    },
    { 
          question: "What does || stand for?",
        answers: [
            {text:"Of", correct:false},
            {text: "Or", correct:true},
            {text: "For", correct: false}
        ]
    }
    
]

      

var displayHighScores = function() {
    submitButton.addEventListener('click', function(){
        var score = document.getElementById("highscore").value
        console.log(score)
        localStorage.setItem("highScore", score)
        var initials = document.getElementById('initials')
        console.log(initials.value)
        questionContainerEl.classList.add('hide');
        startButton.classList.add('hide');
    })

 /*   {
        initials:"MM",
        score:79
    }*/

    //make an array for highscores in local storage if one does not exist
    //get stringified array from local storage
    //json.parse on stringified array
    //push new score object into array
    //stringify array
    //set stringified array back into local storage
}