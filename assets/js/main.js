let object;
// vas contenir la liste de tout les utilisateurs
if (localStorage.getItem('users')) {
     object = JSON.parse(localStorage.getItem('users'))
}else{
     object = {
        users: []
    }
}

function subscribe() {
    let name = document.querySelector("#name").value
    let firstname = document.querySelector("#firstname").value
    let mail = document.querySelector("#mail").value
    let password = document.querySelector("#password").value
    let errorContainer = document.querySelector("#error")
    if (name == "" || firstname == "" || mail == "" || password == "") {
        errorContainer.innerText = "Le formulaire n'est pas valide"
    } else {
        errorContainer.innerText = ""
        let user = {
            id: object.users.length + 1,
            name: name,
            firstname: firstname,
            mail: mail,
            password: password,
        }
        object.users.push(user)
        localStorage.setItem('users', JSON.stringify(object))
        document.location.href="./login.html"

    }
}

function getUsers() {
    let objectLocalStorage = localStorage.getItem('users')
    objectLocalStorage = JSON.parse(objectLocalStorage) // transforme en objet javascript
    return objectLocalStorage.users
}

function login() {
    let errorContainer = document.querySelector("#error")
    let succesContainer = document.querySelector("#succes")
    let user;
    let users = getUsers()
    for (let i = 0; i < users.length; i++) {
        console.log(users.length);
        user = users[i]
        if (user.mail == document.querySelector('#mail').value && user.password == document.querySelector('#password').value ) {
            succesContainer.innerText = "Vous etes connecté !"
            errorContainer.innerText = ""
            document.location.href="./listUser.html"
            break
        }
        if (i == users.length) {
            succesContainer.innerText = ""
            errorContainer.innerText = "aucun utilisateur ne correspond"
        }        
    }
}

function createUserList(params) {
    let users = getUsers()
    let container = document.querySelector("#cardContainer")
    for (let i = 0; i < users.length; i++) {
          let article = document.createElement("article")
          article.classList.add('card') 

          let cardBody = document.createElement("div")
          cardBody.classList.add("card-body")

          let idContainer = document.createElement("p")
          idContainer.classList.add('container-id')
          idContainer.innerText = users[i].id

          cardBody.appendChild(idContainer)

          let title = document.createElement("H2")
          title.innerText = `${users[i].name} ${users[i].firstname}`

          let mail = document.createElement("H2")
          mail.innerText = users[i].mail

          container.appendChild(article)
          article.appendChild(cardBody)
          cardBody.appendChild(title)
          cardBody.appendChild(mail)

    }
    
}



