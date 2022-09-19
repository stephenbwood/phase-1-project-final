const users = {};
let hasAccount = true;
let isLoggedIn = false;
let loggedInUser
let points = 0
let unplayed = []
let readings = []
let correct = 0
let incorrect = 0
let ready = false
let position = []
let currentListName

const builtInStudyLists = {
  grade1: [
    [
      "一",
      "yī"
    ],
    [
      "人",
      "rén"
    ],
    [
      "下",
      "xià"
    ],
    [
      "上",
      "shàng"
    ],
    [
      "大",
      "dà"
    ],
    [
      "子",
      "zǐ"
    ],
    [
      "小",
      "xiǎo"
    ],
    [
      "不",
      "bù"
    ],
    [
      "中",
      "zhōng"
    ],
    [
      "天",
      "tiān"
    ],
    [
      "心",
      "xīn"
    ],
    [
      "水",
      "shuǐ"
    ],
    [
      "出",
      "chū"
    ],
    [
      "生",
      "shēng"
    ],
    [
      "地",
      "dì"
    ],
    [
      "如",
      "rú"
    ],
    [
      "年",
      "nián"
    ],
    [
      "有",
      "yǒu"
    ],
    [
      "自",
      "zì"
    ],
    [
      "事",
      "shì"
    ],
    [
      "来",
      "lái"
    ],
    [
      "长",
      "cháng"
    ],
    [
      "为",
      "wèi"
    ],
    [
      "面",
      "miàn"
    ],
    [
      "家",
      "jiā"
    ],
    [
      "气",
      "qì"
    ],
    [
      "起",
      "qǐ"
    ],
    [
      "高",
      "gāo"
    ],
    [
      "动",
      "dòng"
    ],
    [
      "国",
      "guó"
    ],
    [
      "得",
      "dé"
    ],
    [
      "开",
      "kāi"
    ],
    [
      "道",
      "dào"
    ],
    [
      "学",
      "xué"
    ],
    [
      "以",
      "yǐ"
    ],
    [
      "可",
      "kě"
    ],
    [
      "用",
      "yòng"
    ],
    [
      "多",
      "duō"
    ],
    [
      "好",
      "hǎo"
    ],
    [
      "和",
      "hé"
    ],
    [
      "所",
      "suǒ"
    ],
    [
      "后",
      "hòu"
    ],
    [
      "是",
      "shì"
    ],
    [
      "时",
      "shí"
    ],
    [
      "着",
      "zháo"
    ],
    [
      "过",
      "guò"
    ],
    [
      "说",
      "shuō"
    ],
    [
      "了",
      "le"
    ],
    [
      "去",
      "qù"
    ],
    [
      "在",
      "zài"
    ],
    [
      "没",
      "méi"
    ],
    [
      "到",
      "dào"
    ],
    [
      "要",
      "yào"
    ],
    [
      "能",
      "néng"
    ],
    [
      "做",
      "zuò"
    ],
    [
      "常",
      "cháng"
    ],
    [
      "就",
      "jiù"
    ],
    [
      "样",
      "yáng"
    ],
    [
      "个",
      "gè"
    ],
    [
      "又",
      "yòu"
    ],
    [
      "他",
      "tā"
    ],
    [
      "的",
      "de"
    ],
    [
      "这",
      "zhè"
    ],
    [
      "也",
      "yě"
    ],
    [
      "很",
      "hěn"
    ],
    [
      "外",
      "wài"
    ],
    [
      "同",
      "tóng"
    ],
    [
      "成",
      "chéng"
    ],
    [
      "作",
      "zuò"
    ],
    [
      "发",
      "fā"
    ],
    [
      "会",
      "huì"
    ],
    [
      "知",
      "zhī"
    ],
    [
      "对",
      "duì"
    ],
    [
      "点",
      "diǎn"
    ],
    [
      "看",
      "kàn"
    ],
    [
      "等",
      "děng"
    ],
    [
      "想",
      "xiǎng"
    ],
    [
      "我",
      "wǒ"
    ],
    [
      "候",
      "hòu"
    ],
    [
      "都",
      "dū"
    ],
    [
      "最",
      "zuì"
    ],
    [
      "花",
      "huā"
    ],
    [
      "那",
      "nà"
    ],
    [
      "还",
      "huán"
    ],
    [
      "么",
      "yāo"
    ],
    [
      "你",
      "nǐ"
    ],
    [
      "三",
      "sān"
    ],
    [
      "分",
      "fēn"
    ],
    [
      "方",
      "fāng"
    ],
    [
      "日",
      "rì"
    ],
    [
      "打",
      "dǎ"
    ],
    [
      "老",
      "lǎo"
    ],
    [
      "物",
      "wù"
    ],
    [
      "书",
      "shū"
    ],
    [
      "然",
      "rán"
    ],
    [
      "二",
      "èr"
    ],
    [
      "而",
      "ér"
    ],
    [
      "定",
      "dìng"
    ],
    [
      "果",
      "guǒ"
    ],
    [
      "前",
      "qián"
    ],
    [
      "间",
      "jiān"
    ],
    [
      "当",
      "dāng"
    ],
    [
      "十",
      "shí"
    ],
    [
      "叫",
      "jiào"
    ],
    [
      "因",
      "yīn"
    ],
    [
      "从",
      "cóng"
    ],
    [
      "现",
      "xiàn"
    ],
    [
      "像",
      "xiàng"
    ],
    [
      "种",
      "zhǒng"
    ],
    [
      "里",
      "lǐ"
    ],
    [
      "们",
      "men"
    ],
    [
      "意",
      "yì"
    ],
    [
      "回",
      "huí"
    ],
    [
      "些",
      "xiē"
    ],
    [
      "力",
      "lì"
    ],
    [
      "公",
      "gōng"
    ],
    [
      "手",
      "shǒu"
    ],
    [
      "西",
      "xī"
    ],
    [
      "车",
      "chē"
    ],
    [
      "明",
      "míng"
    ],
    [
      "情",
      "qíng"
    ],
    [
      "头",
      "tóu"
    ],
    [
      "见",
      "jiàn"
    ],
    [
      "走",
      "zǒu"
    ],
    [
      "东",
      "dōng"
    ],
    [
      "经",
      "jīng"
    ],
    [
      "话",
      "huà"
    ],
    [
      "乐",
      "lè"
    ],
    [
      "比",
      "bǐ"
    ],
    [
      "把",
      "bǎ"
    ],
    [
      "体",
      "tǐ"
    ],
    [
      "两",
      "liǎng"
    ],
    [
      "快",
      "kuài"
    ],
    [
      "正",
      "zhèng"
    ],
    [
      "才",
      "cái"
    ],
    [
      "太",
      "tài"
    ],
    [
      "吃",
      "chī"
    ],
    [
      "真",
      "zhēn"
    ],
    [
      "给",
      "gěi"
    ],
    [
      "第",
      "dì"
    ],
    [
      "觉",
      "jué"
    ],
    [
      "只",
      "zhǐ"
    ],
    [
      "每",
      "měi"
    ],
    [
      "山",
      "shān"
    ],
    [
      "白",
      "bái"
    ],
    [
      "儿",
      "ér"
    ],
    [
      "声",
      "shēng"
    ],
    [
      "本",
      "běn"
    ],
    [
      "美",
      "měi"
    ],
    [
      "带",
      "dài"
    ],
    [
      "进",
      "jìn"
    ],
    [
      "位",
      "wèi"
    ],
    [
      "使",
      "shǐ"
    ],
    [
      "之",
      "zhī"
    ],
    [
      "行",
      "xíng"
    ],
    [
      "法",
      "fǎ"
    ],
    [
      "次",
      "cì"
    ],
    [
      "弟",
      "dì"
    ],
    [
      "写",
      "xiě"
    ],
    [
      "跟",
      "gēn"
    ],
    [
      "色",
      "sè"
    ],
    [
      "电",
      "diàn"
    ],
    [
      "字",
      "zì"
    ],
    [
      "于",
      "yú"
    ],
    [
      "表",
      "biǎo"
    ],
    [
      "爱",
      "ài"
    ],
    [
      "问",
      "wèn"
    ],
    [
      "钱",
      "qián"
    ],
    [
      "边",
      "biān"
    ],
    [
      "听",
      "tīng"
    ],
    [
      "再",
      "zài"
    ],
    [
      "完",
      "wán"
    ],
    [
      "几",
      "jī"
    ],
    [
      "但",
      "dàn"
    ],
    [
      "名",
      "míng"
    ],
    [
      "身",
      "shēn"
    ],
    [
      "风",
      "fēng"
    ],
    [
      "月",
      "yuè"
    ],
    [
      "全",
      "quán"
    ],
    [
      "放",
      "fàng"
    ],
    [
      "路",
      "lù"
    ],
    [
      "别",
      "bié"
    ],
    [
      "己",
      "jǐ"
    ],
    [
      "相",
      "xiāng"
    ],
    [
      "什",
      "shí"
    ],
    [
      "早",
      "zǎo"
    ],
    [
      "文",
      "wén"
    ],
    [
      "合",
      "hé"
    ],
    [
      "重",
      "zhòng"
    ],
    [
      "理",
      "lǐ"
    ],
    [
      "喜",
      "xǐ"
    ],
    [
      "或",
      "huò"
    ],
    [
      "工",
      "gōng"
    ],
    [
      "四",
      "sì"
    ],
    [
      "被",
      "bèi"
    ],
    [
      "妈",
      "mā"
    ],
    [
      "爸",
      "bà"
    ],
    [
      "部",
      "bù"
    ]
  ]

}

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
      userStudyLists: user.userStudyLists
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
          "userStudyLists": {}
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
    document.getElementById('welcome').textContent = `Welcome, ${username}`
    document.getElementById('points').textContent = `You have ${users[username].points} points`
    document.getElementById('chooseList').style.display = 'inline'
  }else{
    alert('This username and password combination is not recognized. Please try again or create an account.')
  }
}

//implements functions checking login info on form submit
const form = document.querySelector('form');

//passes username password to createUser or logIn depending on isLoggedIn status
form.addEventListener('submit', e => {
  const username = document.getElementById('username').value.toLowerCase();
  const password = document.getElementById('password').value;


  if (hasAccount === false){
    handleCreateUser(username, password)

  }else{
    e.preventDefault()
    handleLogIn(username, password)
    if(isLoggedIn){
    showStudyLists()
    }
  }
})

//creates buttons listing available study lists for the user
function showStudyLists(){
  const userListsLocation = users[loggedInUser].userStudyLists
  const builtInListsLocation = builtInStudyLists
  const studyListContainer = document.getElementById('studyListContainer')

  studyListContainer.innerHTML = ''

  createButtons(builtInListsLocation)
  createButtons(userListsLocation)
  createNewListButton()
}

function createButtons(location){
  const studyListContainer = document.getElementById('studyListContainer')

  for (const list in location){
    const target = location[list]
    const listButton = document.createElement('button');
    listButton.className = 'listButton'; 
    listButton.textContent = `${list}`;
    listButton.addEventListener('click', () => {
      document.getElementById('newListForm').style.display = 'none'
      unplayed = [...target]
      correct = 0
      incorrect = 0
      points = 0
      playGame()
    })
    studyListContainer.appendChild(listButton);
  }
}

function createNewListButton(){
  const listButton = document.createElement('button');
  listButton.className = 'listButton'; 
  listButton.textContent = `Create New`
  listButton.addEventListener('click', () => {
    gameWindow.innerHTML = ''
    document.getElementById('newListForm').style.display = 'contents'
  })
  document.getElementById('studyListContainer').appendChild(listButton);
}


//creates new list on submit updating local user object and db.json object
const newListForm = document.getElementById('newListForm')
newListForm.addEventListener('submit', e => {
  e.preventDefault();

  const newListName = document.getElementById('listName').value;
  const newListItems = document.getElementById('listItems').value.replaceAll(',', '').replaceAll(' ', '').replaceAll('\n', '');
  const newListPath = users[loggedInUser].userStudyLists

  newListPath[newListName] = []
  
  for (const char of newListItems){
    newListPath[newListName].push([char])
  }

  setUpReadings(newListName)


  // const myPromise = new Promise(()=>{
  //   setUpReadings(newListName)
  // });

  // myPromise.then((position)=>{
  //   for (let i=0; i<position.length; i++){
  //     users[loggedInUser].studyLists[newListName][i].push(position[i])
  //   }
  //   updateDb(loggedInUser);
  //   newListForm.reset();
  //   document.getElementById('newListForm').style.display = 'none'
  //   document.getElementById('studyListContainer').innerHTML = ''
  //   showStudyLists(loggedInUser)
  // })
});

function setUpReadings(list){

  const targetList = users[loggedInUser].userStudyLists[list]

  for (const member of targetList){
    fetch(`https://api.ctext.org/getcharacter?char=${member[0]}`)
    .then((res)=> res.json())
    .then((entry) => {
      member.push(entry.readings.mandarinpinyin[0])
    })
    .then(res =>{
      updateDb(loggedInUser);
      newListForm.reset();
      document.getElementById('newListForm').style.display = 'none'
      document.getElementById('studyListContainer').innerHTML = ''
      showStudyLists(loggedInUser)

    })
    
  }
}


function playGame(){
  if (unplayed.length > 0) {
    gameWindow.innerHTML = ''
    let randomNum = Math.ceil(Math.random() * unplayed.length) - 1

    createGameCard(randomNum)
  }else{
    document.getElementById('card').innerHTML = ''
    const correctAnswers = document.createElement('h2')
    correctAnswers.textContent = `Correct: ${correct}`
    const incorrectAnswers = document.createElement('h2')
    incorrectAnswers.textContent = `Incorrect: ${incorrect}`
    const pointsEarned = document.createElement('h2')
    pointsEarned.textContent = `You earned: ${points} points`

    document.getElementById('card').appendChild(correctAnswers)
    document.getElementById('card').appendChild(incorrectAnswers)
    document.getElementById('card').appendChild(pointsEarned)
  }
}

function createGameCard(num){
  
  gameWindow.innerHTML = ''
  const answers = []
  answers.push(num)

  while(answers.length !== 4){
    if(unplayed.length <= 3){
      answers.push('a', 'b')
      answers.unshift('c')
    }else{
    let randNum = Math.floor(Math.random() * unplayed.length)
    if (answers.indexOf(randNum) === -1 && randNum % 2 ===0){
      answers.push(randNum)
    }else if (answers.indexOf(randNum) === -1 && randNum % 2 ===1){
      answers.unshift(randNum)
    }
  }
  }

  const card = document.createElement('div')
  card.id = 'card'

  const remaining = document.createElement('p')
  remaining.id = 'remaining'
  remaining.textContent = `${unplayed.length} cards remaining`
  card.appendChild(remaining)

  const br = document.createElement('br')
  card.appendChild(br)

  const correctness = document.createElement('h2')
  correctness.textContent = ' '
  remaining.id = 'correctness'
  card.appendChild(correctness)

  const target = document.createElement('h1')
  target.className = 'target'
  target.textContent = unplayed[num][0]
  card.appendChild(target)

  for (i=0; i<4; i++){
    const choice = document.createElement('button')
    choice.className = 'choice'
    choice.id = `choice${i}`
    if(answers[i] === 'a'){
      choice.textContent = `bán`
    }else if(answers[i] === 'b'){
      choice.textContent = `lòng`
    }else if(answers[i] === 'c'){
      choice.textContent = `shuà`
    }else{
    choice.textContent = `${unplayed[answers[i]][1]}`
  }

    choice.addEventListener('click', ()=>{
      const correctness = document.getElementById('correctness')
      if (choice.textContent === unplayed[num][1]){
        correct++
        points++
        updatePoints()
        updateLeaderboard()
        updateDb(loggedInUser)
        correctness.textContent = "Correct"
        correctness.style.color = 'green'
        unplayed.splice(num, 1)
      }else{
        incorrect++
        correctness.textContent = `Incorrect (${unplayed[num][1]})`
        correctness.style.color = 'red'
      }
      document.getElementById('choice0').disabled = true
      document.getElementById('choice1').disabled = true
      document.getElementById('choice2').disabled = true
      document.getElementById('choice3').disabled = true

      const div = document.createElement('div')
      div.style.width='100%'
      div.id = 'nextDiv'

      const nextButton = document.createElement('button')
      nextButton.id = 'nextButton'
      nextButton.textContent = 'Next'
      nextButton.addEventListener('click', ()=>{
        correctness.innerHTML = '';
        playGame()
      })

      div.appendChild(nextButton)
      card.appendChild(div)
    })

    card.appendChild(choice)
  }

  gameWindow.appendChild(card)

}

function updatePoints(){
  users[loggedInUser].points++

  updateDb(loggedInUser)
  updateLeaderboard()

  document.getElementById('points').textContent = `You have ${users[loggedInUser].points} points`
}

function updateDb(){
  fetch(`http://localhost:3000/users/${users[loggedInUser].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(users[loggedInUser])
  })
}
 
function updateLeaderboard(){
  document.getElementById('leaderboard').innerHTML = ''
  const userArray = [...Object.keys(users)]
  const scoreOrder = []
  scoreOrder.push(userArray[0])
  let cont = false

  for (i = 1; i < userArray.length; i++){
    cont = false
    for(j = 0; j < scoreOrder.length; j++){
      if (users[userArray[i]].points >= users[scoreOrder[j]].points){
        scoreOrder.splice(j, 0, userArray[i])
        cont = true
        break
      }else if (users[userArray[i]].points < users[scoreOrder[scoreOrder.length-1]].points){
        scoreOrder.push(userArray[i])
        cont = true
        break
      }
      if (cont === true){
        break
      }
      
    }

  }
  for (i=0; i<11; i++){
    if (scoreOrder[i]){
      const person = scoreOrder[i]
    const entry = document.createElement('li');
    entry.className = 'leaderboardEntry';
    entry.textContent = `${person}`
    const dotsNeeded = (25-entry.textContent.length)*2
    let a = 0
    while (a < dotsNeeded){
      entry.textContent += '.'
      a++
    }
    entry.textContent += `${users[person].points}`

    document.getElementById('leaderboard').appendChild(entry)}
  }
  if (loggedInUser){
    document.getElementById('points').textContent = `You have ${users[loggedInUser].points} points`
  }
}

setTimeout(updateLeaderboard, 100)


