var usuarios = [];
var mystorage = window.localStorage
var cadastrar = document.getElementById('cadastrar');
var entrar1 = document.getElementById('entrar')
var userNameC = document.getElementById('usuarioC');
var userPasswordC = document.getElementById('senhaC');
var userName = document.getElementById('usuario')
var userPassword = document.getElementById('senha')
var linkCadastro = document.getElementById('cadastre-se')
var voltar = document.getElementById('voltar')
cadastrar.addEventListener('click', criarUsuario)
entrar1.addEventListener('click', entrar)
linkCadastro.addEventListener('click', () => {
    document.getElementById('login').style.display = 'none';
    document.getElementById('cadastro').style.display = 'flex'
})
voltar.addEventListener('click', fvoltar)


function idGenerator() {
    var timestamp = new Date()

    id = timestamp.getHours().toString() +
        timestamp.getMinutes().toString() +
        timestamp.getSeconds().toString();

    return id

}
loadUsers()

function criarUsuario() {

    if (userNameC.value !== "" && userPasswordC.value !== "") {
        var user = {
            id: idGenerator(),
            data: {
                name: userNameC.value,
                password: userPasswordC.value
            }
        }
        usuarios.push(user)
        updateScreen()
        alert('Cadastrado com sucesso')
        document.getElementById('login').style.display = 'flex';
        document.getElementById('cadastro').style.display = 'none'
        document.getElementById('usuarioC').value = ""
        document.getElementById('senhaC').value = "" 
    } else {
        alert('Preencha os campos necessarios')
    }

    mystorage.setItem('usuarios', JSON.stringify(usuarios))
    
       
}

function validar(res) {
    return ( res.data.name == userName.value  && res.data.password == userPassword.value)
}

function updateScreen() {
    var list = '<ul>';

    usuarios.forEach((user => {
        list += '<li id-data=' + user.id + '>' +
            '<p>Usuário:' + user.data.name + '</p>' +
            '<p>Senha:' + user.data.password + '</p>' +
            '<button onclick = deleteUser(this) id-data=' + user.id + '>' + 'Apagar</button>' + '</li>'
    }))
    list += '</ul>'
    document.getElementById('list').innerHTML = list;
}

function deleteUser(element) {
    usuarios = usuarios.filter(user => user.id != element.getAttribute("id-data"))
    updateScreen()
    mystorage.setItem('usuarios', JSON.stringify(usuarios))
}

function loadUsers() {
    let users_str = mystorage.getItem('usuarios')

    if (users_str) {
        usuarios = JSON.parse(users_str)
    }
    updateScreen()
}

function entrar() {

    if (userName.value == 'admin' && userPassword.value == 'admin') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('cadastro').style.display = 'none'
        document.getElementById('users-title').style.display = 'block'
        document.getElementById('list').style.display = 'flex'

    } else if (userName.value == "" || userPassword.value == "") {
        alert('Preencha os campos necessarios')
    } else if (usuarios.find(validar)) {
        alert('Voce logou')
    } else {
        alert('usuario ou senha invalidos')
    }
}

function fvoltar() {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('users-title').style.display = 'none'
    document.getElementById('list').style.display = 'none'
    document.getElementById('usuario').value = ""
    document.getElementById('senha').value = ""
}