const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function evaluateAnswer(incrementScore) {
    setTimeout(function () {
        if (incrementScore === true) {
            score++;
        }
        flagCount++;
        changeCounters();
        renderNextQuestion();
    }, 2000);
}

const questions = [
  {
    question: 'who won the 2019 f1 Drivers Championship',
    answers: [
      { text: 'lewis hamilton', correct: true },
      { text: 'max verstappen', correct: false },
      { text: 'George Russel', correct: false },
      { text: 'Jenson Button', correct: false },
    ]
},
  {
    question: 'Who is the Team Principle of Red Bull F1 Team?',
    answers: [
      { text: 'Toto Worlf', correct: true },
      { text: 'Rob Smedley', correct: true },
      { text: 'Christian Horner', correct: true },
      { text: 'Franz Tost', correct: true }
    ]
  },
  {
    question: 'Who designed the Brawn f1 car?',
    answers: [
      { text: 'Jenson Button', correct: false },
      { text: 'Ross Brawn', correct: true },
      { text: 'Mattia Binotto', correct: false },
      { text: 'James Allison', correct: false }
    ]
  },
  {
    question: 'How Many Constructor championships have Renult won?',
    answers: [
      { text: '1', correct: false },
      { text: '2', correct: true }
    ]
  },
    {
    question: 'Who was the 2 drivers to win 7 constructors?',
    answers: [
      { text: 'Lewis Hamilton & Michael Schumacher', correct: true },
      { text: 'Kimi Räikkönen & Fernando Alonso ', correct: false },
    { text: 'David Coulthard & Niki Lauda ', correct: false },
    ]
  },
    {
    question: 'Name the one driver that has not been team mates with Lewis Hamilton?',
    answers: [
      { text: 'Jenson Button', correct: true },
      { text: 'Fernando Alonso', correct: false },
    { text: 'George Russell', correct: false },
    ]
  }
]
