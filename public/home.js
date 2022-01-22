const item = document.querySelectorAll('.item')
const btn= document.querySelectorAll('.btn');

Array.from(btn).forEach(b => { 
      b.addEventListener('click', function () {
          let lastChild =   b.parentElement.lastChild; 
          console.log(lastChild.nodeType)
          if (lastChild.nodeType == 3) {
          const comment = document.createElement('textarea');
          b.parentElement.appendChild(comment);
          }
          else {
            b.parentElement.removeChild(lastChild)
          }
      

      });

})




  
