const container = document.getElementById('container')
const days_number = 100

// Create 100 days cards
function createDayCard() {
    for(let i = 1; i <= days_number; i++) {
        const dayEl = document.createElement('div')
        dayEl.classList.add('day')
        dayEl.innerText = i 
        container.appendChild(dayEl)
    }
}

createDayCard()

const days = document.querySelectorAll('.day')

days.forEach((day, i) => {
    day.addEventListener('click', () => done(i))
})

// Mark the day as completed or not
function done(i) {
    if(days[i].classList.contains('active') && !days[i].nextElementSibling.classList.contains('active')) {
        i--
    }

    days.forEach((day, j) => {
        if(j <= i) {
            day.classList.add('active')
            updateLS()
        } else {
            day.classList.remove('active')
            updateLS()
        }
    })
}

const daysCompleted = JSON.parse(localStorage.getItem('daysCompleted'))

// Mark the days already completed
if(daysCompleted) {
    daysCompleted.forEach(day => {
        if(day.completed === true) {
            done(+day.text - 1)
        }
    })
}

// Update the Local Storage
function updateLS() {
    const daysCompleted = []

    days.forEach(day => {
        daysCompleted.push({
            text: day.innerText,
            completed: day.classList.contains('active')
        })
    })

    localStorage.setItem('daysCompleted', JSON.stringify(daysCompleted))
}
