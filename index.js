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
            "grade 1": {
              "0": [
                "一",
                "yī"
              ],
              "1": [
                "人",
                "rén"
              ],
              "2": [
                "下",
                "xià"
              ],
              "3": [
                "上",
                "shàng"
              ],
              "4": [
                "大",
                "dà"
              ],
              "5": [
                "子",
                "zǐ"
              ],
              "6": [
                "小",
                "xiǎo"
              ],
              "7": [
                "不",
                "bù"
              ],
              "8": [
                "中",
                "zhōng"
              ],
              "9": [
                "天",
                "tiān"
              ],
              "10": [
                "心",
                "xīn"
              ],
              "11": [
                "水",
                "shuǐ"
              ],
              "12": [
                "出",
                "chū"
              ],
              "13": [
                "生",
                "shēng"
              ],
              "14": [
                "地",
                "dì"
              ],
              "15": [
                "如",
                "rú"
              ],
              "16": [
                "年",
                "nián"
              ],
              "17": [
                "有",
                "yǒu"
              ],
              "18": [
                "自",
                "zì"
              ],
              "19": [
                "事",
                "shì"
              ],
              "20": [
                "来",
                "lái"
              ],
              "21": [
                "长",
                "cháng"
              ],
              "22": [
                "为",
                "wèi"
              ],
              "23": [
                "面",
                "miàn"
              ],
              "24": [
                "家",
                "jiā"
              ],
              "25": [
                "气",
                "qì"
              ],
              "26": [
                "起",
                "qǐ"
              ],
              "27": [
                "高",
                "gāo"
              ],
              "28": [
                "动",
                "dòng"
              ],
              "29": [
                "国",
                "guó"
              ],
              "30": [
                "得",
                "dé"
              ],
              "31": [
                "开",
                "kāi"
              ],
              "32": [
                "道",
                "dào"
              ],
              "33": [
                "学",
                "xué"
              ],
              "34": [
                "以",
                "yǐ"
              ],
              "35": [
                "可",
                "kě"
              ],
              "36": [
                "用",
                "yòng"
              ],
              "37": [
                "多",
                "duō"
              ],
              "38": [
                "好",
                "hǎo"
              ],
              "39": [
                "和",
                "hé"
              ],
              "40": [
                "所",
                "suǒ"
              ],
              "41": [
                "后",
                "hòu"
              ],
              "42": [
                "是",
                "shì"
              ],
              "43": [
                "时",
                "shí"
              ],
              "44": [
                "着",
                "zháo"
              ],
              "45": [
                "过",
                "guò"
              ],
              "46": [
                "说",
                "shuō"
              ],
              "47": [
                "了",
                "le"
              ],
              "48": [
                "去",
                "qù"
              ],
              "49": [
                "在",
                "zài"
              ],
              "50": [
                "没",
                "méi"
              ],
              "51": [
                "到",
                "dào"
              ],
              "52": [
                "要",
                "yào"
              ],
              "53": [
                "能",
                "néng"
              ],
              "54": [
                "做",
                "zuò"
              ],
              "55": [
                "常",
                "cháng"
              ],
              "56": [
                "就",
                "jiù"
              ],
              "57": [
                "样",
                "yáng"
              ],
              "58": [
                "个",
                "gè"
              ],
              "59": [
                "又",
                "yòu"
              ],
              "60": [
                "他",
                "tā"
              ],
              "61": [
                "的",
                "de"
              ],
              "62": [
                "这",
                "zhè"
              ],
              "63": [
                "也",
                "yě"
              ],
              "64": [
                "很",
                "hěn"
              ],
              "65": [
                "外",
                "wài"
              ],
              "66": [
                "同",
                "tóng"
              ],
              "67": [
                "成",
                "chéng"
              ],
              "68": [
                "作",
                "zuò"
              ],
              "69": [
                "发",
                "fā"
              ],
              "70": [
                "会",
                "huì"
              ],
              "71": [
                "知",
                "zhī"
              ],
              "72": [
                "对",
                "duì"
              ],
              "73": [
                "点",
                "diǎn"
              ],
              "74": [
                "看",
                "kàn"
              ],
              "75": [
                "等",
                "děng"
              ],
              "76": [
                "想",
                "xiǎng"
              ],
              "77": [
                "我",
                "wǒ"
              ],
              "78": [
                "候",
                "hòu"
              ],
              "79": [
                "都",
                "dū"
              ],
              "80": [
                "最",
                "zuì"
              ],
              "81": [
                "花",
                "huā"
              ],
              "82": [
                "那",
                "nà"
              ],
              "83": [
                "还",
                "huán"
              ],
              "84": [
                "么",
                "yāo"
              ],
              "85": [
                "你",
                "nǐ"
              ],
              "86": [
                "三",
                "sān"
              ],
              "87": [
                "分",
                "fēn"
              ],
              "88": [
                "方",
                "fāng"
              ],
              "89": [
                "日",
                "rì"
              ],
              "90": [
                "打",
                "dǎ"
              ],
              "91": [
                "老",
                "lǎo"
              ],
              "92": [
                "物",
                "wù"
              ],
              "93": [
                "书",
                "shū"
              ],
              "94": [
                "然",
                "rán"
              ],
              "95": [
                "二",
                "èr"
              ],
              "96": [
                "而",
                "ér"
              ],
              "97": [
                "定",
                "dìng"
              ],
              "98": [
                "果",
                "guǒ"
              ],
              "99": [
                "前",
                "qián"
              ],
              "100": [
                "间",
                "jiān"
              ],
              "101": [
                "当",
                "dāng"
              ],
              "102": [
                "十",
                "shí"
              ],
              "103": [
                "叫",
                "jiào"
              ],
              "104": [
                "因",
                "yīn"
              ],
              "105": [
                "从",
                "cóng"
              ],
              "106": [
                "现",
                "xiàn"
              ],
              "107": [
                "像",
                "xiàng"
              ],
              "108": [
                "种",
                "zhǒng"
              ],
              "109": [
                "里",
                "lǐ"
              ],
              "110": [
                "们",
                "men"
              ],
              "111": [
                "意",
                "yì"
              ],
              "112": [
                "回",
                "huí"
              ],
              "113": [
                "些",
                "xiē"
              ],
              "114": [
                "力",
                "lì"
              ],
              "115": [
                "公",
                "gōng"
              ],
              "116": [
                "手",
                "shǒu"
              ],
              "117": [
                "西",
                "xī"
              ],
              "118": [
                "车",
                "chē"
              ],
              "119": [
                "明",
                "míng"
              ],
              "120": [
                "情",
                "qíng"
              ],
              "121": [
                "头",
                "tóu"
              ],
              "122": [
                "见",
                "jiàn"
              ],
              "123": [
                "走",
                "zǒu"
              ],
              "124": [
                "东",
                "dōng"
              ],
              "125": [
                "经",
                "jīng"
              ],
              "126": [
                "话",
                "huà"
              ],
              "127": [
                "乐",
                "lè"
              ],
              "128": [
                "比",
                "bǐ"
              ],
              "129": [
                "把",
                "bǎ"
              ],
              "130": [
                "体",
                "tǐ"
              ],
              "131": [
                "两",
                "liǎng"
              ],
              "132": [
                "快",
                "kuài"
              ],
              "133": [
                "正",
                "zhèng"
              ],
              "134": [
                "才",
                "cái"
              ],
              "135": [
                "太",
                "tài"
              ],
              "136": [
                "吃",
                "chī"
              ],
              "137": [
                "真",
                "zhēn"
              ],
              "138": [
                "给",
                "gěi"
              ],
              "139": [
                "第",
                "dì"
              ],
              "140": [
                "觉",
                "jué"
              ],
              "141": [
                "只",
                "zhǐ"
              ],
              "142": [
                "每",
                "měi"
              ],
              "143": [
                "山",
                "shān"
              ],
              "144": [
                "白",
                "bái"
              ],
              "145": [
                "儿",
                "ér"
              ],
              "146": [
                "声",
                "shēng"
              ],
              "147": [
                "本",
                "běn"
              ],
              "148": [
                "美",
                "měi"
              ],
              "149": [
                "带",
                "dài"
              ],
              "150": [
                "进",
                "jìn"
              ],
              "151": [
                "位",
                "wèi"
              ],
              "152": [
                "使",
                "shǐ"
              ],
              "153": [
                "之",
                "zhī"
              ],
              "154": [
                "行",
                "xíng"
              ],
              "155": [
                "法",
                "fǎ"
              ],
              "156": [
                "次",
                "cì"
              ],
              "157": [
                "弟",
                "dì"
              ],
              "158": [
                "写",
                "xiě"
              ],
              "159": [
                "跟",
                "gēn"
              ],
              "160": [
                "色",
                "sè"
              ],
              "161": [
                "电",
                "diàn"
              ],
              "162": [
                "字",
                "zì"
              ],
              "163": [
                "于",
                "yú"
              ],
              "164": [
                "表",
                "biǎo"
              ],
              "165": [
                "爱",
                "ài"
              ],
              "166": [
                "问",
                "wèn"
              ],
              "167": [
                "钱",
                "qián"
              ],
              "168": [
                "边",
                "biān"
              ],
              "169": [
                "听",
                "tīng"
              ],
              "170": [
                "再",
                "zài"
              ],
              "171": [
                "完",
                "wán"
              ],
              "172": [
                "几",
                "jī"
              ],
              "173": [
                "但",
                "dàn"
              ],
              "174": [
                "名",
                "míng"
              ],
              "175": [
                "身",
                "shēn"
              ],
              "176": [
                "风",
                "fēng"
              ],
              "177": [
                "月",
                "yuè"
              ],
              "178": [
                "全",
                "quán"
              ],
              "179": [
                "放",
                "fàng"
              ],
              "180": [
                "路",
                "lù"
              ],
              "181": [
                "别",
                "bié"
              ],
              "182": [
                "己",
                "jǐ"
              ],
              "183": [
                "相",
                "xiāng"
              ],
              "184": [
                "什",
                "shí"
              ],
              "185": [
                "早",
                "zǎo"
              ],
              "186": [
                "文",
                "wén"
              ],
              "187": [
                "合",
                "hé"
              ],
              "188": [
                "重",
                "zhòng"
              ],
              "189": [
                "理",
                "lǐ"
              ],
              "190": [
                "喜",
                "xǐ"
              ],
              "191": [
                "或",
                "huò"
              ],
              "192": [
                "工",
                "gōng"
              ],
              "193": [
                "四",
                "sì"
              ],
              "194": [
                "被",
                "bèi"
              ],
              "195": [
                "妈",
                "mā"
              ],
              "196": [
                "爸",
                "bà"
              ],
              "197": [
                "部",
                "bù"
              ]
            }
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
  const username = document.getElementById('username').value.toLowerCase();
  const password = document.getElementById('password').value;


  if (hasAccount === false){
    handleCreateUser(username, password)

  }else{
    e.preventDefault()
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
      unplayed = {...users[username].studyLists[list]}
      playGame(unplayed)
    })
    document.getElementById('studyListContainer').appendChild(listButton);
  }
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
  const newListItems = document.getElementById('listItems').value.replaceAll(',', '').replaceAll(' ', '');

  users[loggedInUser].studyLists[newListName] = {}
  users[loggedInUser].studyLists[newListName].contents = [...newListItems]


  for (i=0; i < newListItems.length; i++){
    listNumber = i
    users[loggedInUser].studyLists[newListName][listNumber] = [newListItems[listNumber]]
  }

  const myPromise = new Promise(()=>{
    setUpReadings(newListName)
  });

  myPromise.then((position)=>{
    for (let i=0; i<position.length; i++){
      users[loggedInUser].studyLists[newListName][i].push(position[i])
    }
    updateDb(loggedInUser);
    newListForm.reset();
    document.getElementById('newListForm').style.display = 'none'
    document.getElementById('studyListContainer').innerHTML = ''
    showStudyLists(loggedInUser)
  })
});



function setUpReadings(list) {
  position = []
  for (let i = 0; i <=list.length; i++){
    const elem = list[i]

    if (i !== list.length){
      fetch(`https://api.ctext.org/getcharacter?char=${elem}`)
      .then(res => res.json())
      .then(data => {
        position.push(data.readings.mandarinpinyin[0])
      })
    }else{
      // Promise.resolve()
      return position
      }
  }
}


function playGame(list){
  const keys = Object.keys(list)
  gameWindow.innerHTML = ''
  correct = 0
  incorrect = 0
  points = 0
  if (keys.length > 0) {
    let randomNum = Math.floor(Math.random() * keys.length)

    createGameCard(randomNum, keys)
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

function createGameCard(num, keys){
  
  gameWindow.innerHTML = ''
  const answers = []
  answers.push(num)

  while(answers.length !== 4){
    let randNum = Math.floor(Math.random() * keys.length)
    if (answers.indexOf(randNum) === -1 && randNum % 2 ===0){
      answers.push(randNum)
    }else if (answers.indexOf(randNum) === -1 && randNum % 2 ===1){
      answers.unshift(randNum)
    }
  }

  const card = document.createElement('div')
  card.id = 'card'
  const target = document.createElement('h1')
  target.className = 'target'
  target.textContent = unplayed[num][0]
  card.appendChild(target)

  for (i=0; i<4; i++){
    const choice = document.createElement('button')
    choice.className = 'choice'
    choice.id = `choice${i}`

    choice.textContent = `${unplayed[answers[i]][1]}`

  
    choice.addEventListener('click', ()=>{
      const correctness = document.getElementById('correctness')
      if (choice.textContent === unplayed[num][1]){
        correct++
        points++
        updatePoints(loggedInUser, 1)
        updateLeaderboard()
        updateDb(loggedInUser)
        correctness.textContent = "Correct"
        correctness.style.color = 'green'
        delete unplayed[num]
      }else{
        incorrect++
        correctness.textContent = "Incorrect"
        correctness.style.color = 'red'
      }
      const nextButton = document.createElement('button')
      nextButton.id = 'nextButton'
      nextButton.textContent = 'Next'
      nextButton.addEventListener('click', ()=>{
        correctness.innerHTML = '';
        gameWindow.innerHTML = ''
        playGame(unplayed)
      })

      card.appendChild(nextButton)
    })

    card.appendChild(choice)
  }

  const remaining = document.createElement('p')
  remaining.id = 'remaining'
  remaining.textContent = `${Object.keys(unplayed).length} cards remaining`
  card.insertBefore(remaining, card.firstChild)

  gameWindow.appendChild(card)

}

function updatePoints(username, pointsEarned){
  points += pointsEarned;
  users[username].points += pointsEarned

  updateDb(username)
  updateLeaderboard()

  document.getElementById('points').textContent = `You have ${users[username].points} points`

  points = 0
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
}
 
function updateLeaderboard(){
  document.getElementById('leaderboard').innerHTML = ''
  const userArray = [...Object.keys(users)]
  const scoreOrder = []

  scoreOrder.push(userArray[0])

  for (i = 1; i < userArray.length; i++){
    
    for(j = 0; j < scoreOrder.length; j++){
      
      if (users[userArray[i]].points >= users[scoreOrder[j]].points){
        scoreOrder.splice(j, 0, userArray[i])
        break
      }else if (users[userArray[i]].points < users[scoreOrder[scoreOrder.length-1]].points){
        scoreOrder.push(userArray[i])
      }
    }

  }
  for (i=0; i<11; i++){
    if (scoreOrder[i]){
      const person = scoreOrder[i]
    const entry = document.createElement('li');
    entry.className = 'leaderboardEntry';
    entry.textContent = `${users[person].points}..........${person}`

    document.getElementById('leaderboard').appendChild(entry)}
  }
  if (loggedInUser){
    document.getElementById('points').textContent = `You have ${users[loggedInUser].points} points`
  }
}

setTimeout(updateLeaderboard, 100)
