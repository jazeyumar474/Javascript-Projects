const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [
    { question: "Q. Which of the following is not a CSS box model property?", choices: ["margin", "padding", "border-radius", "border-collapse"], answer: "border-collapse" },
    { question: "Q. Which is not a valid way to declare a function in JavaScript?", choices: ["function myFunction() {}", "let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"], answer: "myFunction: function() {}" },
    { question: "Q. Which of the following is not a JavaScript data type?", choices: ["string", "boolean", "object", "float"], answer: "float" },
    { question: "Q. What is the purpose of the this keyword in JavaScript?", choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", "It is used for comments."], answer: "It refers to the current object." },
    { question: "Q. What does HTML stand for?", choices: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Q. Which of these is not a JavaScript framework?", choices: ["React", "Vue", "Laravel", "Angular"], answer: "Laravel" },
    { question: "Q. What is the correct syntax for an arrow function?", choices: ["(param) => { return value; }", "function(param) { return value; }", "def function(param): return value", "param => { return value; }"], answer: "(param) => { return value; }" },
    { question: "Q. What is the default flex direction in CSS Flexbox?", choices: ["row", "column", "row-reverse", "column-reverse"], answer: "row" },
    { question: "Q. Which of the following is not a valid HTTP request method?", choices: ["GET", "POST", "SEND", "DELETE"], answer: "SEND" },
    { question: "Q. Which property is used to change text color in CSS?", choices: ["text-color", "font-color", "color", "background-color"], answer: "color" },
    { question: "Q. What does SQL stand for?", choices: ["Structured Query Language", "Sequential Query Language", "Server Query Language", "Standard Query Language"], answer: "Structured Query Language" },
    { question: "Q. What does PHP stand for?", choices: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Programming Hyper Processor", "Preprocessor Hypertext Programming"], answer: "PHP: Hypertext Preprocessor" },
    { question: "Q. Which JavaScript method is used to convert a string to an integer?", choices: ["parseInt()", "toInteger()", "stringToInt()", "convertToInt()"], answer: "parseInt()" },
    { question: "Q. What is the correct syntax to declare a JavaScript array?", choices: ["let arr = [1,2,3]", "let arr = (1,2,3)", "let arr = {1,2,3}", "let arr = <1,2,3>"], answer: "let arr = [1,2,3]" },
    { question: "Q. What is the purpose of the localStorage API in JavaScript?", choices: ["Store data temporarily", "Store data persistently", "Store session-specific data", "Store data in a database"], answer: "Store data persistently" }
];


// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = `${questionDetails.question} (Marks: 6.67)`;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
};


// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
    prevBtn.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--; // Move to the previous question
        showQuestions();
    } else {
        displayAlert("This is the first question!");
    }
});