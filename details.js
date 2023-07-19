const cardContainer = document.getElementById('cardContainer')

const createCard = (item) => {
  const cardContent = `
    <h3>${item.name}</h1>
    <p>Date: ${item.date}</p>
    <p>Description: ${item.description}</p>
    <p>Category: ${item.category}</p>
    <p>Place: ${item.place}</p>
    <p>Capacity: ${item.capacity}</p>
     ${item.assistance ? '<p>Assistance: ' + item.assistance + '</p>' : ''}
  `

  const cardTemplate = document.createElement('div')
  cardTemplate.classList.add('card')
  cardTemplate.id = item._id
  cardTemplate.innerHTML = cardContent

  return cardTemplate
}

async function main() {
  const data = await axios.get('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.data)
    .catch(error => console.log(error))

  const params = new URLSearchParams(window.location.search)

  const idParam = params.get('id')

  const eventDetailed = data.events.find(event => event._id == idParam)

  const image = document.createElement('img')
  image.src = eventDetailed.image

  const card = createCard(eventDetailed)

  cardContainer.appendChild(image)

  cardContainer.appendChild(card)

}



main()