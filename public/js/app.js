const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message_1');
const messageTwo = document.querySelector('#message_2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location= search.value;
    messageOne.textContent = "Loading...";

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = "Error";
                messageTwo.textContent = data.error;
            }
            else
            {
                messageOne.textContent=data.location;
                messageTwo.textContent=data.forecast;
            }
        })
    })
});
