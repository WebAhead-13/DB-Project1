
const db = require("./database/connection");
const fs = require('fs')
const jwt = require("jsonwebtoken");
const { query } = require("express");
const SECRET = "nkA$SD89&&282hd";
// const homePage = require("./public/home");

function home(req, res) {
  
  const user = req.user;
  if(user) {
    db.query("SELECT users.username , question_posts.id, question_posts.text_title, question_posts.text_content, question_posts.anonymous_flag FROM users INNER JOIN question_posts ON users.id = question_posts.user_id;")
    .then((result) =>{
        const data = result.rows;
        // console.log(data)
        const userList = data.map((question) => {
           if(question.anonymous_flag == 1)
           {
             return `<li class="item">  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""> <span>Anonymous</span> <h3>${question.text_title}</h3>  <br> ${question.text_content} <br> <a id=${question.id} class="btn"> add a comment</a> <comments> </comments> </li>`;
           }
           return `<li class="item"> <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""> <span>${question.username}</span> <h3>${question.text_title}</h3> <br> ${question.text_content} <br> <a id=${question.id} class="btn"> add a comment</a> <comments> </comments> </li>`;
       
        })

        res.status(200).send( `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="home.css">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;600;700&display=swap" rel="stylesheet">
                <script src="https://use.fontawesome.com/3e91bde4aa.js"></script>

            </head>
            <body>
          
            <nav>
            <div class="logo">
            <div class="text-box">
              <h1> Q & A</h1>
              <h1> Q & A</h1>
            </div>
           </div>

              <div class="nav-links">        
                <ul>
                  <li class="link"> <a  href="/">HOME</a></li>
                  <li class="link"> <a href="/log-out">LOG OUT </a></li>
                  <li class="link"> <a href="">ABOUT US</a></li>
                  <li> <a class="btnQues" href="/askQuestion">ADD QUESTION</a></li>
                </ul>
               </div>
            </nav>
           
            <div class="row">
                <ul>${userList.join("")}</ul>
            </div>
       
            <script src="./home.js" ></script> 
            </body>
            
            </html>`);
      
            //res.sendFile('public/home.html', {root: __dirname })
    });
  }
  else {
    db.query("SELECT users.username, question_posts.id , question_posts.text_title, question_posts.text_content, question_posts.anonymous_flag FROM users INNER JOIN question_posts ON users.id = question_posts.user_id;")
    .then((result) =>{
        const data = result.rows;
        // console.log(data)
        const userList = data.map((question) => {
           if(question.anonymous_flag == 1)
           {
             return `<li class="item">  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""> <span>Anonymous</span> <h3>${question.text_title}</h3>  <br> ${question.text_content} <br> <a id=${question.id} class="btn"> add a comment</a> <comments> </comments> </li>`;
           }
           return `<li class="item"> <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""> <span>${question.username}</span> <h3>${question.text_title}</h3> <br> ${question.text_content} <br> <a id=${question.id} class="btn"> add a comment</a>  <comments> </comments> </li>`;
       
        })
        res.status(200).send( `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="home.css">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;600;700&display=swap" rel="stylesheet">
                <script src="https://use.fontawesome.com/3e91bde4aa.js"></script>

            </head>
            <body>
          
            <nav>
            <div class="logo">
            <div class="text-box">
              <h1> Q & A</h1>
              <h1> Q & A</h1>
            </div>
           </div>

              <div class="nav-links">        
                <ul>
                  <li class="link"> <a  href="/">HOME</a></li>
                  <li class="link"> <a href="/log-in">LOG IN </a></li>
                  <li class="link"> <a href="">ABOUT US</a></li>
                  <li> <a class="btnQues" href="/askQuestion">ADD QUESTION</a></li>
                </ul>
               </div>
            </nav>
           
            <div class="row">
                <ul>${userList.join("")}</ul>
            </div>
             
            <script src="./home.js" ></script> 
            </body>
            
            </html>`);
    });
  

  }

  }



   //login get
function login(req,res){ 
  const user = req.user;
  if(!user)
  res.sendFile('public/login.html', {root: __dirname })
  else
  res.redirect("/");

}

//login post 
function loginSubmit(req,res){
  // console.log(req.body.email)
  const email = req.body.email;
  const token = jwt.sign({ email }, SECRET);
  res.cookie("user", token, { maxAge: 600000 });
  res.redirect('/');
  
}


function askQuestion(req,res){
  res.sendFile('public/askQuestion.html', {root: __dirname })
}

function logout(req,res){
  res.clearCookie("user");
  res.redirect("/");

}

function getCookies(req,res){
// console.log(req.user)
res.send({loggedIn:!!req.user , email:req.user});
}

async function addComment(req,res){
  const textContent= req.body.comment;
  const postId=req.body.postId;
  const userEmail=req.body.userEmail;
  const user = await getUser(userEmail);
  const userId= user.rows[0].id;
  db.query("INSERT INTO post_answers (text_content, post_id , user_id) VALUES ($1,$2,$3)",[textContent,postId,userId])
  res.redirect("/");

}
function viewComments(req,res){
db.query("SELECT * , users.username FROM post_answers INNER JOIN users ON users.id = post_answers.user_id ")
.then(({rows})=>{
  // console.log(rows)
  res.send(rows)
})
.catch(error=>{
  res.send(error);
})
}

function getUser(email) {
  return  db.query(`SELECT id,username FROM users WHERE email='${email}'`)
}


async function addPost(req,res){
  const data= req.body;
  let anonymous_flag=0;
  if(data.anonymous=='on')
  anonymous_flag=1;
  const userEmail=req.user.email;
  const user = await getUser(userEmail)
  db.query("INSERT INTO question_posts (user_id, text_title, text_content, anonymous_flag) VALUES($1,$2,$3,$4)", [user.rows[0].id,data.title, data.content,anonymous_flag])
  .then((result)=>
  {
    res.redirect("/")
  })
}

function addUser(req,res){
  const newUser = req.body;
  console.log(req.body)
  db.query("INSERT INTO users (username, email ,password, admin_flag) VALUES($1,$2,$3,$4)", [newUser.name, newUser.email, newUser.passsword,0])
  res.redirect("/")

}
function registration(req,res){
  res.sendFile('public/registration.html', {root: __dirname })
}
module.exports ={home, login, askQuestion,loginSubmit,logout,getCookies,addComment,viewComments,addPost,addUser,registration}