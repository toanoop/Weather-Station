console.log('Client Side Javascript is running')


const weatherForm = document.querySelector('form')
const searchField = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {

    e.preventDefault()
    //console.log('testing')
    const searchValue = searchField.value
    const url = 'http://localhost:3000/weather?address='+searchValue
    messageOne.textContent = 'LOADING....'
    messageTwo.textContent = ' '
    fetch(url)
    .then((response) => {
      response.json().then((data) => {
            //console.log('is it here?')
           // console.log(data.location + ',' + data.geodata)
           messageOne.textContent = data.location
           messageTwo.textContent = data.geodata
      })
    })


})
