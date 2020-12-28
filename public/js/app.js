

const weatherform = document.querySelector('form')

const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    message1.textContent = 'Loading'
    message2.textContent = ''
    // console.log(location)
    fetch('http://localhost:8000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return message1.textContent = data.error
            }
            message1.textContent = data.location
            message2.textContent = data.forecast
        })
    })
})

