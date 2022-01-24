// const { response } = require("express");

const item = document.querySelectorAll('.item')
const btn= document.querySelectorAll('.btn');
let cookie;

itemArray= Array.from(item)

fetch('/viewComments')
.then(res=>
  // if (!res.ok) throw new Error(res.status);
   res.json()
)
.then(data => {
  data.forEach(comment => {
    const userName = document.createElement('div')
    const commentContent = document.createElement('div')
    commentContent.style.background='pink'
    commentContent.innerHTML=comment.text_content;
    userName.innerHTML =comment.username
    itemArray[comment.post_id-1].appendChild(userName)
    itemArray[comment.post_id-1].appendChild(commentContent)
  });
})


fetch('/getCookies')
.then (response => {
  if (!response.ok) throw new Error(response.status);
  return response.json()
})
.then(data => {
  cookie=data;
  // console.log("data"+data)
})
.catch(error => {
   console.log(error);
})


Array.from(btn).forEach(b => { 
      b.addEventListener('click', function () {
        // console.log("posid",b.id);
        let lastChild =b.parentElement.lastChild; 
        if (lastChild.nodeType == 3 || lastChild.nodeName=='DIV' ) {
            if(cookie.loggedIn) {
             const form=document.createElement('form')
             form.style.display ='flex';
             form.style.justifyContent='start'
             form.action='/addComment';
             form.method='POST'

             const postId = document.createElement('input');
             postId.name='postId';
             postId.id='postId';
             postId.value=b.id;
             postId.style.display = 'none';

             const userEmail = document.createElement('input');
             userEmail.name='userEmail';
             userEmail.id='userEmail';
             userEmail.value=cookie.email.email;
             userEmail.style.display = 'none';
           
             const comment = document.createElement('textarea');
             comment.name='comment';
             comment.id='comment';

             const btn = document.createElement('input')
             btn.type='submit'
             btn.classList.add("btnQues")
             btn.background='gray';
             btn.style.margin = '55px 0px 5px 20px';
             btn.style.width ='100px';
             btn.style.fontWeight='500px'

             form.appendChild(comment)
             form.appendChild(btn)
             form.appendChild(postId)
             form.appendChild(userEmail)
            
             b.parentElement.appendChild(form);
            }
            else {
               const message = document.createElement('h4')
               message.textContent = "you sholud log in"
               b.parentElement.appendChild(message);
             }
         }
           else {
             if(lastChild.nodeName!='DIV') {
            b.parentElement.removeChild(lastChild)
           }
          }
         
      });
})









  
