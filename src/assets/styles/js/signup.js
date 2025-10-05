


let email = document.querySelector('#signup-email')
let labelemail = document.querySelector('#labelemail')
let validemail = false

let senha = document.querySelector('#signup-senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false


let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')



email.addEventListener('keyup', () => {
  if(email.value.length <= 4){
    labelemail.setAttribute('style', 'color: red')
    labelemail.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
    email.setAttribute('style', 'border-color: red')
    validemail = false
  } else {
    labelemail.setAttribute('style', 'color: green')
    labelemail.innerHTML = 'Usuário'
    email.setAttribute('style', 'border-color: green')
    validemail = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})


function cadastrar(){
  if(validemail && validSenha){
    let listaEmail = JSON.parse(localStorage.getItem('listaEmail') || '[]')
    
    listaEmail.push(
    {
      emailCad: email.value,
      senhaCad: senha.value
    }
    )
    
    localStorage.setItem('listaEmail', JSON.stringify(listaEmail))
    
   
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
        alert("Usuário cadastrado!")
    }, 3000)
  
    
  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}




  