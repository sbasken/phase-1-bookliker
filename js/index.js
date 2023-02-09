const ul = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")
const user = {"id":101 , "username": "koko"}


document.addEventListener("DOMContentLoaded", function() {
    
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => books.forEach(renderBookList))
    
})

const renderBookList = (book) => {
    const li = document.createElement('li')
    li.innerText = book.title
    ul.append(li)
    
    li.addEventListener('click', () => {
        showPanel.innerHTML = ""
        
        const img = document.createElement('img')
        img.src = book.img_url
        img.alt = `${book.title} cover`

        const title = document.createElement('h2')
        title.innerText = book.title

        const subtitle = document.createElement('h2')
        subtitle.innerText = book.subtitle

        const description = document.createElement('p')
        description.innerText = book.description

        const ul = document.createElement('ul')

        showPanel.append(img, title, subtitle, description, ul)

        for (let user of book.users) {
            const userName = document.createElement('li')
            userName.innerText = user.username
            ul.append(userName)
        }
        
        const button = document.createElement("button")
        button.type = "button"
        button.innerText = "LIKE"
        showPanel.append(button)

        button.addEventListener('click', () => {
            console.log(user)
            book.users = [...book.users, user]
            ul.innerHTML = ""

            for (let user of book.users) {
                const userName = document.createElement('li')
                userName.innerText = user.username
                ul.append(userName)
            }
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })

        })

    })
}

