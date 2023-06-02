
const cards = document.querySelectorAll(".memory-card");
const refresh = document.querySelector(".refresh img");
const final = document.querySelector(".final");
const congrats = document.querySelector("#congratsSection");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const again = document.querySelector(".again");
const totalTime = document.querySelector("#totalTime");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; //ard arda 4 tıklamaya izin vermemek icin
let totalSeconds = 0;
let interval;
let finalTime;
let click = -1;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    startTime();
    return;
  }
  //second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  //When cards match
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  gameWon();
}

function unFlipCards() {
  lockBoard = true;
  //not match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//refresh butonuna basildiginda
refresh.addEventListener("click", function () {
  confirm("確定要重新開始嗎？");
  location.reload();
});

//zaman göstergesi
function startTime() {
  if (click === -1) {
    interval = setInterval(function () {
      final.innerHTML = "You won in " + finalTime + " time!";
      finalTime = minute.innerHTML + ":" + second.innerHTML;
      totalSeconds++;
      second.innerHTML = pad(totalSeconds % 60);
      minute.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
  }
  click = 1;
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//game won
function gameWon() {
  if (click < 1) {
    firstCard = e.target;
  }

  if (document.getElementsByClassName("flip").length === 18) {//偵測是否完成
    congratsSection.classList.replace("hidden", "show");
    clearInterval(interval);
    finalTime = minute.innerHTML + ":" + second.innerHTML;
    final.innerHTML = "本次挑戰時間: " + finalTime + "!";
    totalTime.innerHTML = finalTime;
  }
  click = 0;
}


//結算頁面
again.addEventListener("click", function () {
  congratsSection.classList.replace("show", "hidden");
  location.reload();
});

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

//結算畫面隨機顯示資料
var information = [
  {
    imageSrc: "./assets/g1_images/square_pic_owl.png",
    text: "草鴞是臺灣特有亞種，中型貓頭鷹，臉盤呈心形且灰白色，背面暗褐色，胸部以下白色。夜行性猛禽，主要食物為小動物，棲息於闊葉林，分布有限且瀕臨絕種。保育現況堪憂，面臨棲息地減少、食物減少及獵補壓力等威脅。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_turtle.png",
    text: "斑龜是臺灣淡水龜，外觀有黃綠線條，幼體背甲有3條淡褐色稜脊。最大淡水龜，雌龜背甲可達27公分。繁殖季節4-6月，雌龜上岸產卵。因生活區域與人類活動區域重疊，易受路殺威脅。食物多樣，分布範圍廣，但幼龜存活率低，族群成長緩慢。台江國家公園內最常被路殺的爬蟲類。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_crab.png",
    text: "奧氏後相手蟹在綠島和墾丁都有蹤跡，被當地人稱為「白眉毛」，主要棲息在海岸灌木叢至海岸林底層間。每年農曆5~9月期間，每月月底的23至29日會有大量聚集降海釋幼行為。母蟹會抱著許多卵橫跨馬路，從山邊走向海岸「釋幼」。由於體積小，又在夜晚出沒，遊客一不注意便會壓死這些陸蟹。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_tree_frog.png",
    text: "梭德氏樹蛙呈灰褐色，大小約4至6公分，棲息於山區森林的溪流中。廣泛分布在海拔2500公尺以下山區，最高可達海拔3300公尺。雄蛙沒有外鳴囊，採用主動搜索的方式，抱住身旁大小看起來像雌蛙的個體。每年10月梭德氏赤蛙繁殖期，必須從山壁到溪底交配產卵。根據路殺社統計，有97.4%的梭德氏樹蛙路殺事件發生在秋季。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_butterfly.png",
    text: "小紫斑蝶是茂林最常見的蝴蝶，主要分布在南台灣低海拔山區，展翅約5~7公分。台灣的紫斑蝶與墨西哥帝王斑蝶並列世界兩大越冬型蝶種，當發生多種斑蝶群聚越冬的現象時，便會被稱為「紫蝶幽谷」。每年紫斑蝶會依循固定路線離開越冬棲地，從茂林開始，經過寶來、月世界、台南曾文水庫、台南關子嶺、茶山、達娜伊谷、石桌、雲林林內鄉、彰化八卦山、台中大肚山、再到苗栗竹南海邊。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_grass_owl.png",
    text: "領角鴞是一種小型鳥類，身長23-25厘米，具有像貓咪耳朵的耳羽簇。牠們的活動環境和都市重疊，但隨著都市宜居的樹洞和樹屋漸少，可能會居住到房子的排油煙管。牠們的起飛角度較低，無法垂直起飛，因此在飛越馬路時容易被車撞死。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_mountain.png",
    text: "台灣穿山甲是台灣特有亞種，體長約44~56公分，體重約3~6.5公斤。以螞蟻及白蟻為主食，善挖洞，夜晚覓食。過去穿山甲經常入藥使用，其外皮質地堅韌，可以製成奢侈品。傳統的迷信與錯誤的迷思，讓穿山甲承受龐大的獵捕壓力。不只獵捕和流浪貓狗的啃咬引發滅絕問題，夜間行動的穿山甲同樣是遭路殺的常客。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_Paguma_larvata.png",
    text: "白鼻心，又稱為白鼻貓、果子狸、烏腳香、茅尾黑腳貓，肛門附近具臭腺，遇敵時會釋出異味驅之。外觀和鼬、貂相似，身體呈現黑灰色。雖屬於食肉目動物卻偏食果性動物，多以核果、漿果為食。主要棲息在中低海拔常綠闊葉林或森林邊緣，頗能適應人為干擾。"
  },
  {
    imageSrc: "./assets/g1_images/square_pic_rock_tiger.png",
    text: "石虎是台灣最後的野生貓科動物，曾普遍分布於全島低海拔山區，但隨著開發逐漸減少。石虎耳後為黑底白紋，兩眼間有白色條紋，身上具有類似豹紋的塊狀斑點。由於道路開入淺山地區，石虎有機會進入路面並遭到車輛撞擊。僅剩不到500隻的族群數量，專家預估會在百年內滅絕。"
  }
];


var randomIndex1 = Math.floor(Math.random() * information.length);
var randomIndex2 = Math.floor(Math.random() * information.length);

while (randomIndex1 === randomIndex2) {
  randomIndex2 = Math.floor(Math.random() * information.length);
}

var randomInformation1 = information[randomIndex1];
var randomInformation2 = information[randomIndex2];

var imgElement1 = document.querySelector("#random-information .final_img");
var textElement1 = document.querySelector("#random-information .final_text p");
imgElement1.src = randomInformation1.imageSrc;
textElement1.innerText = randomInformation1.text;

var imgElement2 = document.querySelector("#random-information + div .final_img");
var textElement2 = document.querySelector("#random-information + div .final_text p");
imgElement2.src = randomInformation2.imageSrc;
textElement2.innerText = randomInformation2.text;
var displayElement = document.getElementById("random-information");

//儲存名字、時間

const addTask = (name) => {
  axios
    .post('http://localhost:4000/api_game1/save', {
      name: name,
      score: totalSeconds,
    })
    .then((res) => {
      console.log(res.data);
    });
};

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // 防止表單的默認提交行為
  
  // 獲取表單元素
  var form = document.getElementById("myForm");
  
  // 獲取表單中的值
  var name = form.elements["username"].value;
  
  // 發送表單數據到後端
  addTask(name);
  alert("提交成功");

});
