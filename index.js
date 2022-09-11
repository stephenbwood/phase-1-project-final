const users = {};
let hasAccount = false;
let isLoggedIn = false;
let loggedInUser
let points = 0

const gameWindow = document.getElementById('game')

// Create an object stored locally with user information to use for logging in, tracking points, and updating study lists
fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
})
.then(res => res.json())
.then(data => {
  for (const user of data){
    users[user.username] = {
      password: user.password,
      points: user.points,
      id: user.id,
      studyLists: user.studyLists,
    }
  }
})

//create user, checking if username already exists. Adds to db.json
function handleCreateUser(username, password){
  if (username === '' || password === '') {
    alert('Please choose a username and password to continue.')
  }else if (users[`${username}`] === undefined){
    fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "points": 0,
          "password": password,
          "studyLists": {
            "grade 1": ["一", "人", "下", "上", "大", "子", "小", "不", "中", "天", "心", "水", "出", "生", "地", "如", "年", "有", "自", "事", "来", "长", "为", "面", "家", "气", "起", "高", "动", "国", "得", "开", "道", "学", "以", "可", "用", "多", "好", "和", "所", "后", "是", "时", "着", "过", "说", "了", "去", "在", "没", "到", "要", "能", "做", "常", "就", "样", "个", "又", "他", "的", "这", "也", "很", "外", "同", "成", "作", "发", "会", "知", "对", "点", "看", "等", "想", "我", "候", "都", "最", "花", "那", "还", "么", "你", "三", "分", "方", "日", "打", "老", "物", "书", "然", "二", "而", "定", "果", "前", "间", "当", "十", "叫", "因", "从", "现", "像", "种", "里", "们", "意", "回", "些", "力", "公", "手", "西", "车", "明", "情", "头", "见", "走", "东", "经", "话", "乐", "比", "把", "体", "两", "快", "正", "才", "太", "吃", "真", "给", "第", "觉", "只", "每", "山", "白", "儿", "声", "本", "美", "带", "进", "位", "使", "之", "行", "法", "次", "弟", "写", "跟", "色", "电", "字", "于", "表", "爱", "问", "钱", "边", "听", "再", "完", "几", "但", "名", "身", "风", "月", "全", "放", "路", "别", "己", "相", "什", "早", "文", "合", "重", "理", "喜", "或", "工", "四", "被", "妈", "爸", "部"],
          }
        })
      })
    .then(() => alert(`Account successfully created`))
    .catch(() => alert(`An error occurred. Please try again.`))
  }else{
    alert('Username already exists. Please try another name or log in if you already have an account')
  }
}

//Changes form between create account and log in
function handleLogInForm(){
  if (hasAccount === false){
    document.getElementById('signInHeading').textContent = 'Sign in';
    hasAccount=true;
    haveAccountLink.textContent = 'No account? Sign up here!';
  }else{
    document.getElementById('signInHeading').textContent = 'Create an account';
    hasAccount=false;
    haveAccountLink.textContent = 'Already have an account? Sign in here.';
  } 
}

const haveAccountLink = document.getElementById('haveAccount')

haveAccountLink.addEventListener('click', () => {
  handleLogInForm();
});

//checks username password combo. On successful login removes login form, and updates welcome with username and points
function handleLogIn(username, password){
  if (users[`${username}`] !== undefined && users[`${username}`].password === password){
    isLoggedIn = true;
    loggedInUser = username;
    document.getElementById('createAccount').style.display = 'none'
    points = users[username].points
    document.getElementById('welcome').textContent = `Welcome, ${username}`
    document.getElementById('points').textContent = `You have ${users[username].points} points`
  }else{
    alert('This username and password combination is not recognized. Please try again or create an account.')
  }
}

//implements functions checking login info on form submit
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value.toLowerCase();
  const password = document.getElementById('password').value;


  if (hasAccount === false){
    handleCreateUser(username, password)

  }else{
    handleLogIn(username, password)
    showStudyLists(username)
  }
})

//creates buttons listing available study lists for the user
function showStudyLists(username){
  for (const list in users[username].studyLists){
    const listButton = document.createElement('button');
    listButton.className = 'listButton'; 
    listButton.textContent = `${list}`;
    listButton.addEventListener('click', () => {
      gameWindow.innerHTML = ''
      playGame(users[username].studyLists[list])
    })
    document.getElementById('studyListContainer').appendChild(listButton);
  }
  const listButton = document.createElement('button');
  listButton.className = 'listButton'; 
  listButton.textContent = `Create new`
  document.getElementById('studyListContainer').appendChild(listButton);
  listButton.addEventListener('click', () => {
    gameWindow.innerHTML = ''
    document.getElementById('newListForm').style.display = 'contents'
  })
}

//creates new list on submit updating local user object and db.json object
const submitNewListButton = document.getElementById('submitNewList')

submitNewListButton.addEventListener('submit', e => {
  e.preventDefault();
  const newList = [];
  const newListName = document.getElementById('listName').value;
  const newListItems = document.getElementById('listItems').value.replaceAll(',', '').replaceAll(' ', '');

  for (const character of newListItems){

    newList.push(character)
  }

  users[loggedInUser].studyLists[newListName] = newList
  updateDb(loggedInUser);
  document.getElementById('newListForm').style.display = 'none'
});


function playGame(list){
  debugger;
  const unplayed = [...list]
  const readings = []

  
  for (const item of unplayed){
    fetch(`https://api.ctext.org/getcharacter?char=${item}`)
    .then(res => res.json())
    .then(data => readings.push(data.readings.mandarinpinyin[0]))
  }

  if (unplayed.length > 0) {
    let randomNum = Math.floor(Math.random() * unplayed.length)
    const currentCharacter = list[randomNum]
    const correctAnswer = readings[randomNum]

    createGameCard(currentCharacter)


    unplayed.splice(randomNum, 1)
    readings.splice(randomNum, 1)
    console.log(readings)
  }
}

function createGameCard(character){
  gameWindow.innerHTML = ''

  const card = document.createElement('div')
  card.className = 'card'

  const target = document.createElement('h1')
  target.className = 'target'
  target.textContent = character
  card.appendChild(target)

  for (i=0; i<4; i++){
    const choice = document.createElement('button')
    choice.className = 'choice'
    choice.id = `choice${i}`
  }

  gameWindow.appendChild(card)

}

function updatePoints(username, pointsEarned){
  points += pointsEarned;
  fetch(`http://localhost:3000/users/${users[username].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "points": points,
        })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function updateDb(username){
  fetch(`http://localhost:3000/users/${users[username].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(users[username])
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

// character pronunciation: https://api.ctext.org/getcharacter?char= + character

//  {
//   "char": "仁",
//   "radical": "人",
//   "radicalstrokes": "2",
//   "readings": {
//     "cantonese": [
//       "jan4"
//     ],
//     "mandarinpinyin": [
//       "rén"
//     ],
//     "mandarinzhuyin": [
//       "ㄖㄣˊ"
//     ],
//     "tang": [
//       "njin"
//     ]
//   },
//   "totalstrokes": "4",
//   "url": "https://ctext.org/dictionary.pl?if=en&char=仁",
//   "variants": [
//     {
//       "character": "忈",
//       "relation": "kZVariant"
//     },
//     {
//       "character": "忎",
//       "relation": "kSemanticVariant"
//     },
//     {
//       "character": "𡰥",
//       "relation": "kSemanticVariant"
//     }
//   ]
// }