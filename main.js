const filterBar = document.getElementById('filterBar')
const cardContainer = document.getElementById('cardContainer')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

const createCheckbox = (category) => {
  const checkbox = document.createElement('div')

  const label = document.createElement('label')

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.id = category
  input.value = category

  label.htmlFor = category
  label.appendChild(document.createTextNode(category));

  checkbox.appendChild(label)
  checkbox.appendChild(input)

  return checkbox
}

const createCard = (item) => {
  const cardContent = `
  <h3>${item.name}</h1>
  <p>Date: ${item.date}</p>
  <p>Description: ${item.description}</p>
  <p>Category: ${item.category}</p>
  <p>Place: ${item.place}</p>
  <p>Capacity: ${item.capacity}</p>
   ${item.assistance ? '<p>Assistance: ' + item.assistance + '</p>' : ''}
   <button id= ${item._id}>Details</button>
`

  const cardTemplate = document.createElement('div')
  cardTemplate.classList.add('card')
  cardTemplate.innerHTML = cardContent

  return cardTemplate
}

async function main() {
  const data = await axios.get('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.data)
    .catch(error => console.log(error))

  let categories = []

  data.events.forEach(event => {
    if (!categories.includes(event.category)) categories.push(event.category)
  })

  printCheckboxes(categories)

  if (window.location.pathname === '/home.html') {
    printCards(data.events)
  }
  if (window.location.pathname === '/views/upcoming.html') {
    const upcomingEvents = data.events.filter(event => data.currentDate <= event.date)
    printCards(upcomingEvents)
  }
  if (window.location.pathname === '/views/past.html') {
    const pastEvents = data.events.filter(event => data.currentDate > event.date)
    printCards(pastEvents)
  }

  searchBtn.addEventListener('click', () => {
    const searchedEvents = data.events.filter(event => event.name.toLowerCase().includes(search.value.toLowerCase()))
    cardContainer.innerHTML = ''
    printCards(searchedEvents)
  })

  filterBar.addEventListener('change', () => {
    const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked')
    const selectedCategories = Array.from(checkedCheckboxes).map(checkbox => checkbox.value)
    const filteredEvents = data.events.filter(event => selectedCategories.includes(event.category))
    if (selectedCategories.length > 0) {
      cardContainer.innerHTML = ''
      printCards(filteredEvents)
    }
  })

  cardContainer.addEventListener('click', (event) => {
    const element = event.target
    if (element.tagName === 'BUTTON') {
      const id = element.id

      const params = new URLSearchParams(window.location.search)
      params.set('id', id)

      const newURL = window.location.origin + '/views/details.html' + '?' + params.toString()

      window.location.href = newURL
    }
  })

}

function printCheckboxes(categories) {
  categories.forEach(category => {
    const checkbox = createCheckbox(category)
    filterBar.appendChild(checkbox)
  })
}

function printCards(events) {
  events.forEach(event => {
    const card = createCard(event)
    cardContainer.appendChild(card)
  })
}

main()
