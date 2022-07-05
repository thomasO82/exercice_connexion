let object;
// vas contenir la liste de tout les utilisateurs
if (localStorage.getItem('users')) {
    object = JSON.parse(localStorage.getItem('users'))
} else {
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
        document.location.href = "./login.html"

    }
}

function getUsers() {
    let objectLocalStorage = localStorage.getItem('users')
    if (objectLocalStorage) {
        objectLocalStorage = JSON.parse(objectLocalStorage) // transforme en objet javascript
        return objectLocalStorage.users
    }else{
        return object
    }
   
}

function login() {
    let errorContainer = document.querySelector("#error")
    let succesContainer = document.querySelector("#succes")
    let user;
    let users = getUsers()
    for (let i = 0; i < users.length; i++) {
        console.log(users.length);
        user = users[i]
        if (user.mail == document.querySelector('#mail').value && user.password == document.querySelector('#password').value) {
            succesContainer.innerText = "Vous etes connecté !"
            errorContainer.innerText = ""
            document.location.href = "./listUser.html"
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
    container.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        let article = document.createElement("article") // je créé un article qui fera office de card
        article.classList.add('card')// je lui donne une classe qui lui donnera un style bootstrap

        let cardBody = document.createElement("div") // je créé une div qui contiendra le corps de ma card
        cardBody.classList.add("card-body")//je lui donne une classe qui lui donnera un style bootstrap

        let idContainer = document.createElement("p") // je créé un element <p> qui contiendra l'id de l'utilisateur
        idContainer.innerText = users[i].id //j'affiche a l'interieur l'id de l'utilisateur

        cardBody.appendChild(idContainer) // j'insere mon idContainer dans cardBody 

        let title = document.createElement("H2") // je créé un element <h2>
        title.innerText = `${users[i].name} ${users[i].firstname}` // j'insere le nom et le prenom de l'utilisateur a l'interieur

        let mail = document.createElement("H2") // je créé un element H2
        mail.innerText = users[i].mail // j'insere le mail de l'utilisateur a l'interieur

        let btnDelete = document.createElement("button") // je cree un element de type <button>
        btnDelete.type = "button" // je lui donne le type button
        btnDelete.innerText = "supprimer" //j'insere a l'interieur la chaine "supprimer"
        btnDelete.addEventListener("click", function () { // je lui donne un ecouteur d'evenement de type "click" qui lancera la fonction qui supprimera un user
            deleteUser(users[i].id)
        })
        container.appendChild(btnDelete) // j'inser dans mon container le bouton
        container.appendChild(article)//j'insere dans mon containe l'article
        article.appendChild(cardBody) // j'insere dans l'article le cardBody
        cardBody.appendChild(title) //j'insere dans le cardBody mon title 
        cardBody.appendChild(mail) //j'insere dans mon cardBody mail
    }

}

function deleteUser(userId){
    let users = getUsers()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        if (user.id == userId) {
            users.splice(i,1)
            object.users = users
            localStorage.setItem('users', JSON.stringify(object))
            createUserList()
        } 
    }
}



