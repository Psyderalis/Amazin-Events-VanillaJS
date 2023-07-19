async function main() {
    const data = await axios.get('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.data)
        .catch(error => console.log(error))

    const events = data.events


}

main()
