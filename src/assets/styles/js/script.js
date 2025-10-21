


$(document).ready(function () {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-bars fa-xmark');
    });






    // const sections = $('section');
    // const navItems = $('.nav-item');

    // $(window).on('scroll', function () {
    //     const header = $('header');
    //     const scrollPosition = $(window).scrollTop() - header.outerHeight();

    //     let activeSectionIndex = 0;

    //     if (scrollPosition <= 0) {
    //         header.css('box-shadow', 'none');
    //     } else {
    //         header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
    //     }

    //     sections.each(function (i) {
    //         const section = $(this);
    //         const sectionTop = section.offset().top - 96;
    //         const sectionBottom = sectionTop + section.outerHeight();

    //         if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
    //             activeSectionIndex = i;
    //             return false;
    //         }
    //     })

    //     navItems.removeClass('active');
    //     $(navItems[activeSectionIndex]).addClass('active');
    // });



    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#br', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#nos', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#contato', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('#sorteio', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })






    const participantes = [
        " Adailton Arcanjo Dos Santos",
        "Amarilis Da Silva Soares",
        "Ana Carollyna Rodrigues Santana",
        "Ana Luiza Fontes Franco",
        "Arthur De Aro Ramos",
        "Arthur Viana Belarmino",
        "Beatriz Raika De Oliveira Teixeira",
        "Brenda Borges Diniz",
        "Brenda De Carvalho Lima",
        "Brenno Ferreira Cunha",
        "Bruna Gomes Fogaca",
        "Caio Agostinho Ramos",
        "Caroline Aparecida Tavares Ferreira",
        "Caua Dos Santos Farias",
        "Cecilia De Souza",
        "Daniel Carvalho Dos Anjos",
        "Eduarda Coelho De Almeida",
        "Felipe Santana Da Silva De Morais",
        "Gabriel Araujo Lima",
        "Gabriel Lima Parmagnani",
        "Gabriel Rodrigues De Oliveira",
        "Gabriely Pereira Serafim",
        "Giovanna Sa Fajardo",
        "Gisela Deodata De Almeida",
        "Guilherme Alves Mauricio",
        "Guilherme Figueira Emiliano Da Silva",
        "Guilherme Messa Cazarini",
        "Igor Da Silva Stempliuc",
        "Isaias Batista Maciel",
        "Joice Da Silva Martins Correa",
        "Jose Alvaro Ferreira Dos Santos",
        "Julia Dos Santos Tito",
        "Juliana Nunes Braz Da Silva",
        "Jullya Passos Maldonado",
        "Leonardo Carvalho Alves De Lima",
        "Marina Bispo Dos Santos",
        "Matheus Oliveira Amorim",
        "Matheus Oliveira De Moraes",
        "Matheus Rodrigues Crispim",
        "Miguel Ferreira Oliveira",
        "Pablo Enrique Gualberto Paiao",
        "Pedro Henrique Nascimento Teodozio",
        "Rafaela Sousa Dos Santos",
        "Samyra Vitoria Duarte Furlan Da Silva",
        "Suyane De Oliveira Santos",
        "Taina Ferreira Melo De Oliveir"
    ];

    let participantesDisponiveis = [];
    let participantesSorteados = [];

    const sorterCard = document.getElementById('sorterCard');
    const btnSortear = document.getElementById('btnSortear');
    const btnReiniciar = document.getElementById('btnReiniciar');
    const listaParticipantesUl = document.getElementById('listaParticipantes');
    const listaSorteadosUl = document.getElementById('listaSorteados');
    const numParticipantesSpan = document.getElementById('numParticipantes');

    let sorteando = false;
    let intervalId;
    let currentIndex = 0;


    function salvarEstadoSorteio() {
        localStorage.setItem('participantesDisponiveis', JSON.stringify(participantesDisponiveis));
        localStorage.setItem('participantesSorteados', JSON.stringify(participantesSorteados));

    }


    function carregarEstadoSorteio() {
        const salvosDisponiveis = localStorage.getItem('participantesDisponiveis');
        const salvosSorteados = localStorage.getItem('participantesSorteados');

        if (salvosDisponiveis && salvosSorteados) {
            participantesDisponiveis = JSON.parse(salvosDisponiveis);
            participantesSorteados = JSON.parse(salvosSorteados);

        } else {

            participantesDisponiveis = [...participantes];
            participantesSorteados = [];
        }
        atualizarListas();
    }



    function atualizarListas() {
        listaParticipantesUl.innerHTML = '';
        participantesDisponiveis.forEach(nome => {
            const li = document.createElement('li');
            li.textContent = nome;
            listaParticipantesUl.appendChild(li);
        });

        listaSorteadosUl.innerHTML = '';
        participantesSorteados.forEach(nome => {
            const li = document.createElement('li');
            li.textContent = nome;
            listaSorteadosUl.appendChild(li);
        });

        numParticipantesSpan.textContent = participantesDisponiveis.length;

        if (participantesDisponiveis.length === 0) {
            btnSortear.disabled = true;
            if (sorterCard.textContent !== 'Sem participantes!') {
                sorterCard.textContent = 'Sem participantes!';
                sorterCard.classList.remove('revealed');
                sorterCard.style.setProperty('--revealed-name', '""');
            }
        } else {
            btnSortear.disabled = false;
        }

        if (!sorteando && participantesDisponiveis.length > 0 && !sorterCard.classList.contains('revealed')) {
            sorterCard.textContent = 'SORTEIO!';
        } else if (!sorteando && participantesDisponiveis.length === 0) {
            sorterCard.textContent = 'Sem participantes!';
        }
    }

    function criarConfete() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * -20 + 'vh';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }


    function iniciarSorteio() {
        if (sorteando || participantesDisponiveis.length === 0) return;

        sorteando = true;
        btnSortear.disabled = true;
        btnReiniciar.disabled = true;

        sorterCard.classList.remove('revealed');
        sorterCard.style.setProperty('--revealed-name', '""');
        sorterCard.textContent = 'Sorteando...';

        const nomeVencedor = participantesDisponiveis[Math.floor(Math.random() * participantesDisponiveis.length)];
        console.log("O vencedor será: ", nomeVencedor);

        let startTime = Date.now();
        let duration = 6000;
        let baseInterval = 50;
        currentIndex = Math.floor(Math.random() * participantesDisponiveis.length);

        function animateRoll() {
            const elapsed = Date.now() - startTime;

            if (elapsed >= duration) {
                finalizarSorteio(nomeVencedor);
                return;
            }

            if (participantesDisponiveis.length > 0) {
                currentIndex = (currentIndex + 1) % participantesDisponiveis.length;
                sorterCard.textContent = participantesDisponiveis[currentIndex];
            }


            let currentDelay = baseInterval + Math.pow((elapsed / duration), 2) * 400;

            intervalId = setTimeout(animateRoll, currentDelay);
        }

        animateRoll();
    }

    function finalizarSorteio(nomeSorteado) {

        clearInterval(intervalId);
        sorteando = false;
        btnSortear.disabled = false;
        btnReiniciar.disabled = false;


        sorterCard.textContent = '';


        const indexParaRemover = participantesDisponiveis.indexOf(nomeSorteado);
        if (indexParaRemover > -1) {
            participantesDisponiveis.splice(indexParaRemover, 1);
            participantesSorteados.push(nomeSorteado);
        }

        sorterCard.classList.add('revealed');
        sorterCard.style.setProperty('--revealed-name', `'${nomeSorteado}'`);

        criarConfete();
        salvarEstadoSorteio();
        atualizarListas();
    }

    function reiniciarSorteio() {
        if (sorteando) return;

        participantesDisponiveis = [...participantes];
        participantesSorteados = [];
        localStorage.removeItem('participantesDisponiveis');
        localStorage.removeItem('participantesSorteados');

        sorterCard.classList.remove('revealed');
        sorterCard.style.setProperty('--revealed-name', '""');
        sorterCard.textContent = 'SORTEIO!';
        atualizarListas();
    }


    btnSortear.addEventListener('click', iniciarSorteio);
    btnReiniciar.addEventListener('click', reiniciarSorteio);

    carregarEstadoSorteio();

});


function instagram() {
    window.location.href = 'https://www.instagram.com/brasilincena_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
}

function tiktok() {
    window.location.href = 'https://www.tiktok.com/@brasilincena_?is_from_webapp=1&sender_device=pc';
}


function gmail() {
    window.location.href = 'https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrgClgrtQBgPlqbFkdxhKqFgHLVzdbWpdZXmWZtBMCzKzFMsCSLjJpgqQQVBNNLgklsnhL';
}








