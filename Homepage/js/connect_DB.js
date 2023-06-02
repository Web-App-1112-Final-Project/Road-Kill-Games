

// axios.get('http://localhost:5000/api_game1/get').then((res) => {
//   const datas = res.data;
//   datas.map((data) => {
//     // console.log(data)
//     game1_rank.push(data);
//   });
//   console.log(game1_rank);
// });

function compare(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}
function compare2(a, b) {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }
  return 0;
}

async function getGame1Rank() {
  const rank_datas = [];
  try {
    const response = await axios.get('http://localhost:4000/api_game1/get');
    // console.log(response.data);
    response.data.map((data) => rank_datas.push(data));

  } catch (error) {
    console.error(error);
  }
  const sort = { score: 1 };
  // rank_datas.sort()
  rank_datas.sort(compare2);
  // console.log(rank_datas);

  let names = document.querySelectorAll('.rank_name_game1');
  let score = document.querySelectorAll('.rank_score_game1');
  for(var i = 0; i < 10;i++){
    names[i].textContent = rank_datas[i].name;
    score[i].textContent = `${rank_datas[i].score} 秒鐘`;
  }

}
async function getGame2Rank() {
  const rank_datas = [];
  try {
    const response = await axios.get('http://localhost:4000/api_game2/get');
    // console.log(response.data);
    response.data.map((data) => rank_datas.push(data));
  } catch (error) {
    console.error(error);
  }
  const sort = { score: 1 };
  // rank_datas.sort()
  rank_datas.sort(compare);
  // console.log(rank_datas);

  let names = document.querySelectorAll('.rank_name_game2');
  let score = document.querySelectorAll('.rank_score_game2');
  for (var i = 0; i < 10; i++) {
    if (i >= rank_datas.length){
      continue
    }
    names[i].textContent = rank_datas[i].name;
    score[i].textContent = `${rank_datas[i].score} 分`;
  }
}
async function getGame3Rank() {
  const rank_datas = [];
  try {
    const response = await axios.get('http://localhost:4000/api_game3/get');
    // console.log(response.data);
    response.data.map((data) => rank_datas.push(data));
  } catch (error) {
    console.error(error);
  }
  const sort = { score: 1 };
  // rank_datas.sort()
  rank_datas.sort(compare);
  // console.log(rank_datas);

  let names = document.querySelectorAll('.rank_name_game3');
  let score = document.querySelectorAll('.rank_score_game3');
  for (var i = 0; i < 10; i++) {
    if (i >= rank_datas.length){
      continue
    }
    names[i].textContent = rank_datas[i].name;
    score[i].textContent = `${rank_datas[i].score} 分`;
  }
}

getGame1Rank();
getGame2Rank();
getGame3Rank();
