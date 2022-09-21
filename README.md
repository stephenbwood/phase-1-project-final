# Phase 1 Project Final
This project is intended to demonstrate the skills I have gained during phase 1 of Flatiron. The main components of the 
application are:  

- A form where users can create an account or log in. User data is stored in the db.json file, and is accessed when 
submitting the form to check login information.  

- A form which takes input as a list of Chinese characters to create a new custom study list. It finds each character's 
pinyin pronunciation from [ctext.org](https://ctext.org), and stores the character/pronunciation pair as a new list for the user.

- A Chinese character recognition game where points are earned for choosing the correct character pronunciation.

- A leaderboard which lists the top 10 users and their scores  

## Installation
To set up the project run `npm install` from the project root.

## Running
To run the project, use the command `npm run dev` from the project root. 
The command will launch the json-server with the site accessible from [localhost:3000](http://localhost:3000/)

The project runs through the [json-server](https://github.com/typicode/json-server) project as both a
static file server and managing a JSON based database and API.

## References
Built-in list of Chinese characters by grade obtained from:  
https://web.archive.org/web/20111215143140/http://residence.educities.edu.tw/wei3128/currinstruc/wordclause/generwordgrd9.htm

Pinyin pronunciations obtained from api.ctext.org:  
https://api.ctext.org/getcharacter?char= + character