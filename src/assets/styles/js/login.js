



function entrar(){
  let email = document.querySelector('#login-email')
  let emailLabel = document.querySelector('#emailLabel')
  
  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')
  
  let msgError = document.querySelector('#msgError')
  let listaEmail = []
  
  let emailValid = {
    email: '',
    senha: ''
  }
  
  listaEmail = JSON.parse(localStorage.getItem('listaEmail'))
  
  listaEmail.forEach((item) => {
    if(email.value == item.emailCad && senha.value == item.senhaCad){
       
      emailValid = {
         email: item.emailCad,
         senha: item.senhaCad
       }
      
    }
  })

  
   
  if(email.value == emailValid.email && senha.value == emailValid.senha){
    window.location.href = '../pages/diario.html'
    
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom
    
    localStorage.setItem('token', token)
  } else {
    emailLabel.setAttribute('style', 'color: red')
    email.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    email.focus()
  }
  
}

