const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const loading = document.querySelector('#message-1')
    const clearMsg = document.querySelector('#message-2')
    loading.textContent = 'Loading...'
    clearMsg.textContent = ''

    const searchURL = '/weather?address=' + location 
    fetch(searchURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                const message1 = document.querySelector('#message-1')
                const message2 = document.querySelector('#message-2')
                message1.textContent = data.error
                message2.textContent = ''
            }
            else {
                const message1 = document.querySelector('#message-1')
                const message2 = document.querySelector('#message-2')
                message1.textContent = data.forecast
                message2.textContent = data.location
            }
        })
    })
})