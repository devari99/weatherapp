console.log('Client side js script')

 const weartherF = document.querySelector('form');
 const search = document.querySelector('input');
 const messageOne = document.querySelector('#message-1');
 const messageTwo = document.querySelector('#message-2');
 const messageThree = document.querySelector('#message-3');


 weartherF.addEventListener('submit', (e) => {
     e.preventDefault()
     const location = search.value;
     if(!location){
         return console.log('Location not given');
     }

     messageOne.textContent = 'Loading...';
     messageTwo.textContent ='';
     messageThree.textContent ='';

     fetch(`/weather?address=${location}`)
     .then((response) => {
        // onrejected('Ok')//pass to catch block
          response.json().then((data) =>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                messageThree.textContent = data.description;
                
                //console.log(data.location);
                //console.log(data.forecast);
            }
        })           
             
 }).catch((er) => {
     //console.log(`Somthing wrote wrong ${er}`);
 })
 })
