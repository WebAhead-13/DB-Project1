// const { response } = require("express");

const item = document.querySelectorAll('.item')
const btn= document.querySelectorAll('.btn');
const comments= document.querySelectorAll('comments');
let cookie;

itemArray = Array.from(item)
commentsArray = Array.from(comments)

fetch('/viewComments')
.then(res=>
  // if (!res.ok) throw new Error(res.status);
   res.json()
)
.then(data => {
  let i=0;
  data.forEach(comment => {
    const commentElement =  document.createElement('div')
    commentElement.classList.add('comment')
    const image = document.createElement('img')
    image.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const cntent = document.createElement('div')
    const userName = document.createElement('h4')
    const commentContent = document.createElement('div')
    cntent.appendChild(userName)
    cntent.appendChild(commentContent)
    commentContent.innerHTML=comment.text_content;
    userName.innerHTML =comment.username;
    commentElement.appendChild(image)
    commentElement.appendChild(cntent)
    console.log(commentElement.nodeName)
     // in case if they not in order the index here should changed using 
    // comment.post_id and button.id(post.id)
    commentsArray[comment.post_id-1].appendChild(commentElement)
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
        if (lastChild.nodeType == 3 || lastChild.nodeName=='COMMENT' ) {
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
             if(lastChild.nodeName!='COMMENT') {
            b.parentElement.removeChild(lastChild)
           }
          }
         
      });
})









  
