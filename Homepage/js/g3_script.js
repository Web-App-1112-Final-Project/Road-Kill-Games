const questions = [
  {
    image: './assets/g3_images/石虎.jpeg',
    answer: '石虎',
    info: '你知道石虎被路殺的原因，通常是因為由於道路開入淺山地區，使得石虎有機會進入路面並遭到車輛撞擊。在遍布丘陵地、石虎數量較多的苗栗縣，就經常發生石虎車禍致死事件。公路單位已在高速公路特定路段設置隔離網和生態廊道，但在一般道路上，石虎路死事件仍層出不窮。',
  },
  {
    image: './assets/g3_images/穿山甲.jpeg',
    answer: '穿山甲',
    info: '你知道穿山甲被路殺的原因通常是因為，不只是獵捕和流浪貓狗的啃咬引發滅絕問題，夜間行動的穿山甲同樣是遭路殺的常客，使得族群繁衍雪上加霜。',
  },
  {
    image: './assets/g3_images/梭德氏樹蛙.jpeg',
    answer: '梭德氏樹蛙',
    info: '你知道梭德氏樹蛙被路殺的原因通常是因為，每年10月梭德氏赤蛙繁殖期，必須從山壁到溪底交配產卵。因為其體型較小，顏色不明顯，駕駛往往難以看見牠們，往往造成梭德氏赤蛙橫死輪下。根據路殺社統計，有97.4%的梭德氏樹蛙路殺事件發生在秋季。',
  },
  {
    image: './assets/g3_images/奧氏後相手蟹.jpeg',
    answer: '奧氏後相手蟹',
    info: '你知道奧氏後相手蟹被路殺的原因通常是因為，母蟹待卵成熟時，依著月亮潮汐決定釋幼時間，此時，母蟹會抱著許多卵橫跨馬路，從山邊走向海岸「釋幼」，但由於奧氏後相手蟹體積小，又在夜晚出沒，遊客一不注意便會壓死這些陸蟹，',
  },
  {
    image: './assets/g3_images/領角鴞.jpeg',
    answer: '領角鴞',
    info: '你知道領角鴞被路殺的原因通常是因為，領角鴞的起飛角度較低，無法垂直起飛，因此在飛越馬路時，還沒飛到很高的高度就被車撞死了；另一方面，牠們的幼鳥在學飛階段很容易掉落在地上，又因飛行能力不佳，於是成為車下亡魂。',
  },
  {
    image: './assets/g3_images/龜殼花.jpeg',
    answer: '龜殼花',
    info: '你知道龜殼花被路殺的原因通常是因為，龜殼花分布在人口密度高的低海拔地區，幾乎可能出現在民眾的生活當中，道路，自行車道都能見到他的身影，容易不小心就碾到他。',
  },
  {
    image: './assets/g3_images/小紫斑蝶.jpeg',
    answer: '小紫斑蝶',
    info: '你知道小紫斑蝶被路殺的原因通常是因為，每年紫斑蝶會依循固定路線離開越冬棲地，路線卻正好與國道三號垂直相交，北徙季節又恰逢清明連假，為引導紫斑蝶安全過馬路，高公局和台灣紫斑蝶生態保育協會聯手推出「紫斑蝶輸運計畫」，以「車道讓蝶道」的作法，保護紫斑蝶的遷徙。',
  },
  {
    image: './assets/g3_images/斑龜.jpeg',
    answer: '斑龜',
    info: '你知道斑龜被路殺的原因通常是因為，繁殖季雌龜在產卵時才會上岸。交配後的雌龜會爬上岸尋找適合產卵的鬆軟沙地，從挖坑、產卵、埋卵，要花好幾個鐘頭。雌龜產完卵常會在岸上停留一段時間，再回到池中。因為斑龜生活區域常與人類活動區域重疊，很容易受到人類活動影響，讓母龜停留岸上的時間更長，增加路殺的風險。',
  },
];

const showInfos = [
  {
    image: './assets/g3_images/info1.png',
    title: '怎麼回報路殺',
  },
  {
    image: './assets/g3_images/info2.png',
    title: '為什麼要回報路殺'
  },
]

let currentQuestion = 0;
let correctAnswers = 0;

// 顯示問題
function showQuestion() {
  document.getElementById('images').src = questions[currentQuestion].image;
  document.getElementById('infoModal_ml').classList.add('hide');
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
  document.getElementById('infoModal_ml').classList.remove('hide');
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
  const addTask = (name) => {
    axios
      .post('http://localhost:5000/api_game3/save', {
        name: name,
        score: (correctAnswers / questions.length) * 100,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

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
    <h3></h3>
    <h4>若想參與排名競爭，請輸入你的大名：</h4>
  `;

  const formElement = document.createElement('form');
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputElement = document.querySelector('#name-input');
    const name = inputElement.value;
    addTask(name);
    inputElement.value = '';
    alert("提交成功");
    inputElement.setAttribute('disabled', "disabled");
    submitButton.setAttribute('disabled', 'disabled');
    
  });
  const answerElement = document.querySelector('.container');
  answerElement.appendChild(formElement);

  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('id', 'name-input');
  inputElement.setAttribute('placeholder', '請輸入名字');
  formElement.appendChild(inputElement);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = '提交';
  formElement.appendChild(submitButton);


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
inputElement.setAttribute('placeholder', '請輸入物種的名稱');
formElement.appendChild(inputElement);

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = '提交';
formElement.appendChild(submitButton);



