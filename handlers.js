
const db = require("./database/connection");
const fs = require('fs')
// const homePage = require("./public/home");

function home(re, res) {
    db.query("SELECT users.username , question_posts.text_title, question_posts.text_content, question_posts.anonymous_flag FROM users INNER JOIN question_posts ON users.id = question_posts.user_id;")
    .then((result) =>{
        const data = result.rows;
        console.log(data)
        const userList = data.map((question) => {
           if(question.anonymous_flag == 1)
           {
             return `<li class="item">  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""> <span>Anonymous</span> <h3>${question.text_title}</h3>  <br> ${question.text_content} <br> <a class="btn"> add a comment</a> </li>`;
           }
           return `<li class="item"> <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""> <span>${question.username}</span> <h3>${question.text_title}</h3> <br> ${question.text_content} <br> <a class="btn"> add a comment</a> </li>`;
       
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
                  <li> <a href="">HOME</a></li>
                  <li> <a href="">LOG IN </a></li>
                  <li> <a href="">ASK A QUESTION</a></li>
                  <li> <a href="">ABOUT US</a></li>
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

  module.exports ={home}