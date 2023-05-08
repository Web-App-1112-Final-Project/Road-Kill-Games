const questions = [
  {
    image: './images/石虎.jpeg',
    answer: '石虎',
    info: '你知道石虎被路殺的原因通常是因為...',
  },
  {
    image: './images/穿山甲.jpeg',
    answer: '穿山甲',
    info: '你知道穿山甲被路殺的原因通常是因為...',
  },
  // {
  //   image: './images/梭德氏樹蛙.jpeg',
  //   answer: '梭德氏樹蛙',
  //   info: '你知道梭德氏樹蛙被路殺的原因通常是因為...',
  // },
  // {
  //   image: './images/奧氏後相手蟹.jpeg',
  //   answer: '奧氏後相手蟹',
  //   info: '你知道奧氏後相手蟹被路殺的原因通常是因為...',
  // },
  // {
  //   image: './images/領角鴞.jpeg',
  //   answer: '領角鴞',
  //   info: '你知道領角鴞被路殺的原因通常是因為...',
  // },
  // {
  //   image: './images/龜殼花.jpeg',
  //   answer: '龜殼花',
  //   info: '你知道龜殼花被路殺的原因通常是因為...',
  // },
];

const showInfos = [
  {
    image: './images/info1.png',
    title: '怎麼回報路殺',
  },
  {
    image: './images/info2.png',
    title: '為什麼要回報路殺'
  },
]

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

function startGame() {
  document.getElementById("start").classList.add("hide");
  document.getElementById("quiz").classList.remove("hide");
}

// 檢查答案是否正確
function checkAnswer(answer) {
  const title = document.querySelector('#title');
  const ansInfo = document.querySelector('#ansInfo');
  const answerIs = document.querySelector('#answerIs');
  if (answer === questions[currentQuestion].answer) {
    correctAnswers++;
    title.innerHTML = "回答正確!!";
    answerIs.innerHTML =""
    ansInfo.innerHTML = questions[currentQuestion].info;
    if(currentQuestion == questions.length - 1){
      const close_ml = document.querySelector('#close_ml');
      close_ml.innerHTML = "查看分數";
    }
  } 
  else {
    title.innerHTML = "回答錯誤!!"
    answerIs.innerHTML = "答案是："+questions[currentQuestion].answer;
    ansInfo.innerHTML = questions[currentQuestion].info;
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
  const info_id = correctAnswers % showInfos.length;
  // console.log(info_id);
  container.innerHTML = `
    <h1>測試結果</h1>
    <p>你的鑑定正確率為 ${(correctAnswers / questions.length) * 100}%！</p>
    <h4>關於路殺，你必須要知道的是：</h4>
    <img src = ${showInfos[info_id].image} class="pic_identify"></img>
    <h3></h4>
    <button type="button" onclick="location.reload()" class="accept">重新開始</button>
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



