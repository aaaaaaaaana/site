


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

    ScrollReveal().reveal('#brasil', {
        origin: 'right',
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





    
    const participantes = [ 
        "Amarilis da Silva Soares",
        "Ana Carollyna",
        "Ana Luiza Fontes",
        "Arthur Belarmino",
        "Arthur de Aro Ramos",
        "Beatriz Raika",
        "Brenda Borges Diniz",
        "Brenno Ferreira",
        "Bruna Gomes",
        "Caio Agostinho Ramos",
        "Cecília de Souza",
        "Felipe Santana",
        "Gabriel Araujo Lima",
        "Gisela Deodata",
        "Giovanna Sá Fajardo",
        "Guilherme Alves Mauricio",
        "Guilherme Messa Cazarini",
        "Júlia dos Santos Tito",
        "Juliana Nunes",
        "Jullya Passos Maldonado",
        "Matheus Nunes Fialho",
        "Matheus Oliveira Amorim",
        "Matheus Oliveira de Moraes",
        "Rafaela Sousa",
        "Samyra Vitória Duarte",
        "Suyane de Oliveira"
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







