const startBtn = document.querySelector(".start-btn");
const guideContainer = document.querySelector(".quiz-guide");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSec = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgain = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

startBtn.addEventListener("click", () => {
  guideContainer.classList.add("active");
  main.classList.add("active");
});

exitBtn.addEventListener("click", () => {
  guideContainer.classList.remove("active");
  main.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  quizSec.classList.add("active");
  guideContainer.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  showQuestions(0);
  showQuestions(0);
  headerScore();
});

tryAgain.addEventListener("click", () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNum = 1;
  userScore = 0;

  showQuestions(questionCount);
  questionCounter(questionNum);

  headerScore()
});

goHomeBtn.addEventListener("click", () => {
  quizSec.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNum = 1;
  userScore = 0;

  showQuestions(questionCount);
  questionCounter(questionNum);
});

let questionCount = 0;
let questionNum = 1;
let userScore = 0;

// next btn
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNum++;
    showQuestions(questionCount);
    questionCounter(questionNum);
    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
});

// OptionList
const optionList = document.querySelector(".option-list");

// getting queston and option from array
function showQuestions(index) {
  const questionsText = document.querySelector(".question-text");

  questionsText.textContent = `${questions[index].num}. ${questions[index].question}`;

  let optionTag = "";
  questions[index].options.forEach((option) => {
    optionTag += `<div class="option"><span>${option}</span></div>`;
  });

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
function optionSelected(answer) {
  let userAnswer = answer.textContent.trim();
  let currectAns = questions[questionCount].answer.trim();
  let allOptions = optionList.children.length;

  if (userAnswer.toLowerCase() === currectAns.toLowerCase()) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("wrong");
    // if answer wrong auto selected correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == currectAns) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  // if user has selected, disabled all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Question`;
}
function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");

  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(var(--theme-colo) ${
      progressStartValue * 3.6
    }deg, rgba(225,225,225,.1) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
