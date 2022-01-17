
const weatheForm = document.querySelector('form')
const searchELement = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javascript'


    weatheForm.addEventListener('submit', (event) => {
    event.preventDefault()
        const location = searchELement.value;
        messageOne.textContent = "loading ...."
        messageTwo.textContent = ""
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        }
        else {
             messageOne.textContent = ""
            messageTwo.textContent = ` ${data.address}` + "\n" +
  `It is currently ${data.forecast} degrees out. It feels like ${data.feelslike} degrees out. The weather looks ${data.description}`
        }
        
    })
})
})