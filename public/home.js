// const { response } = require("express");


const item = document.querySelectorAll('.item')
const btn= document.querySelectorAll('.btn');
let cookie;

fetch('/viewComments')
.then(response=>{
  if (!response.ok) throw new Error(response.status);
  
  return response.json()
})
.then(data => {
  console.log(data.id)
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
          let lastChild =   b.parentElement.lastChild; 
          console.log(lastChild.nodeType)

           if (lastChild.nodeType == 3) {
            if(cookie.loggedIn) 
            {
             const form=document.createElement('form')
             form.style.display ='flex';
             form.style.justifyContent='start'
             const comment = document.createElement('textarea');
             const btn = document.createElement('input')
             btn.classList.add("btnQues")
             btn.background='pink';
             btn.type = 'submit'
             btn.style.margin = '55px 0px 5px 20px';
             btn.style.width ='100px';
             btn.style.fontWeight='500px'
             b.parentElement.appendChild(form);
             form.appendChild(comment)
             form.appendChild(btn)

             btn.addEventListener(('click') ,(event)=>{
              event.preventDefault();
              console.log('submit comment')
           
          })
            }
             else {
             const message = document.createElement('h4')
             message.textContent = "you sholud log in"
             b.parentElement.appendChild(message);
             }
           }
           else {
            b.parentElement.removeChild(lastChild)
           }
         
      });
})









  
