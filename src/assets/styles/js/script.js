$(document).ready(function () {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-bars fa-xmark');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});



function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}






const nomes = [
    'Amarilis da Silva Soares',
    'Ana Carollyna',
    'Ana Luiza Fontes',
    'Arthur Belarmino',
    'Arthur de Aro Ramos',
    'Beatriz Raika',
    'Brenda Borges Diniz',
    'Brenno Ferreira',
    'Bruna Gomes',
    ' Caio Agostinho Ramos',
    ' Cecília de Souza',
    ' Felipe Santana',
    ' Gabriel Araujo Lima',
    ' Gisela Deodata',
    ' Giovanna Sá Fajardo',
    ' Guilherme Alves Mauricio',
    ' Guilherme Messa Cazarini',
    ' Júlia dos Santos Tito',
    ' Juliana Nunes',
    ' Jullya Passos Maldonado',
    ' Matheus Nunes Fialho',
    ' Matheus Oliveira Amorim',
    ' Matheus Oliveira de Moraes',
    ' Rafaela Sousa',
    ' Samyra Vitória Duarte',
    ' Suyane de Oliveira'
];

let intervalo;

function comecarSorteio() {
    let count = 0;
    limparIntervalo(intervalo);

    intervalo = setIntervalo(() => {
        const nomeAleatorio = Math.floor(Math.random() * nomes.length);
        document.getElementById("nameDisplay").textContent = nomes[nomeAleatorio];
        count++;

        if (count > 43) {
            limparIntervalo(intervalo);
        }
    }, 100);
}



