const questions = [
  {
    image: './images/石虎.jpeg',
    answer: '石虎',
  },
  {
    image: './images/穿山甲.jpeg',
    answer: '穿山甲',
  },
  {
    image: './images/梭德氏樹蛙.jpeg',
    answer: '梭德氏樹蛙',
  },
  {
    image: './images/奧氏後相手蟹.jpeg',
    answer: '奧氏後相手蟹',
  },
  {
    image: './images/領角鴞.jpeg',
    answer: '領角鴞',
  },
  {
    image: './images/龜殼花.jpeg',
    answer: '龜殼花',
  },
];

let currentQuestion = 0;
let correctAnswers = 0;

// 顯示問題
function showQuestion() {
  document.getElementById('images').src = questions[currentQuestion].image;
}

let btn3 = document.querySelector('#show_ml');
let infoModal3 = document.querySelector('#infoModal_ml');
let close3 = document.querySelector('#close_ml');

close3.addEventListener('click', function () {
  infoModal3.close();
});


// 檢查答案是否正確
function checkAnswer(answer) {
  const title = document.querySelector('#title');
  const answerIs = document.querySelector('#answerIs');
  if (answer === questions[currentQuestion].answer) {
    correctAnswers++;
    
    title.innerHTML = "回答正確!!";
    answerIs.innerHTML =""
    if(currentQuestion == questions.length - 1){
      const close_ml = document.querySelector('#close_ml');
      close_ml.innerHTML = "查看分數";
    }
  } 
  else {
    title.innerHTML = "回答錯誤!!"
    answerIs.innerHTML = "答案是："+questions[currentQuestion].answer;
    if (currentQuestion == questions.length - 1) {
      const close_ml = document.querySelector('#close_ml');
      close_ml.innerHTML = '查看分數';
    }
  }

  currentQuestion++;

  infoModal3.showModal();
  close3.addEventListener('click', function () {
    infoModal3.close();
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  

  
}

// 顯示最終得分
function showScore() {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <h1>測試結果</h1>
    <p>你的得分是 ${correctAnswers} / ${questions.length}。分！</p>
    <button type="button" onclick="location.reload()">重新開始</button>
  `;
}

// 啟動測驗
showQuestion();

// 監聽答案提交事件
const formElement = document.createElement('form');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputElement = document.querySelector('#answer-input');
  const answer = inputElement.value;
  checkAnswer(answer);
  inputElement.value = '';
});
const answerElement = document.querySelector('#answer');
answerElement.appendChild(formElement);

// 在表單中添加輸入框和提交按鈕
const inputElement = document.createElement('input');
inputElement.setAttribute('type', 'text');
inputElement.setAttribute('id', 'answer-input');
inputElement.setAttribute('placeholder', '請輸入你的回答');
formElement.appendChild(inputElement);

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = '提交';
formElement.appendChild(submitButton);



