document.addEventListener('DOMContentLoaded', () => {

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');

    hamburgerMenu.addEventListener('click', () => {
        navUl.classList.toggle('active');
        hamburgerMenu.classList.toggle('active'); 

        if (navUl.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) { 
                navUl.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });


    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });



    
    const listaParticipantes = document.getElementById('listaParticipantes');
    const listaSorteados = document.getElementById('listaSorteados');
    const numParticipantesSpan = document.getElementById('numParticipantes');
    const btnSortear = document.getElementById('btnSortear');
    const btnReiniciar = document.getElementById('btnReiniciar');
    const sorteioResultadoDiv = document.getElementById('sorteioResultado');


    const participantesIniciais = [

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

    let participantesDisponiveis = [];
    let participantesJaSorteados = [];


    function loadData() {
        const storedSorteados = localStorage.getItem('participantesSorteados');

        if (storedSorteados) {
            participantesJaSorteados = JSON.parse(storedSorteados);
        }


        participantesDisponiveis = participantesIniciais.filter(nome =>
            !participantesJaSorteados.includes(nome)
        );

        renderLists();
        updateSorteioButtonState();
    }


    function saveData() {
        localStorage.setItem('participantesSorteados', JSON.stringify(participantesJaSorteados));
    }


    function renderLists() {
        listaParticipantes.innerHTML = '';
        listaSorteados.innerHTML = '';
        numParticipantesSpan.textContent = participantesIniciais.length;


        participantesDisponiveis.forEach(nomeParticipante => {
            const li = document.createElement('li');
            li.textContent = nomeParticipante;
            listaParticipantes.appendChild(li);
        });


        participantesJaSorteados.forEach(nomeParticipante => {
            const li = document.createElement('li');
            li.textContent = nomeParticipante;
            listaSorteados.appendChild(li);
        });
    }


    btnSortear.addEventListener('click', () => {
        if (participantesDisponiveis.length === 0) {
            sorteioResultadoDiv.innerHTML = '<p style="color: red;">Todos os participantes já foram sorteados!</p>';
            btnSortear.disabled = true;
            return;
        }

        const randomIndex = Math.floor(Math.random() * participantesDisponiveis.length);
        const sorteado = participantesDisponiveis[randomIndex];


        participantesDisponiveis.splice(randomIndex, 1);
        participantesJaSorteados.push(sorteado);

        sorteioResultadoDiv.innerHTML = `
            <h3>Parabéns! O sorteado é:</h3>
            <p><strong>${sorteado}</strong> </p>
        `;

        saveData();
        renderLists();
        updateSorteioButtonState();
    });


    btnReiniciar.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja reiniciar o sorteio? Isso limpará a lista de sorteados.')) {
            participantesDisponiveis = [...participantesIniciais];
            participantesJaSorteados = [];
            sorteioResultadoDiv.innerHTML = '<p>Clique em "Sortear" para aparecer o nome!</p>';
            saveData();
            renderLists();
            updateSorteioButtonState();
            alert('Sorteio reiniciado. Todos os participantes estão disponíveis novamente.');
        }
    });


    function updateSorteioButtonState() {
        btnSortear.disabled = participantesDisponiveis.length === 0;
        if (participantesDisponiveis.length === 0 && participantesIniciais.length > 0) {
            sorteioResultadoDiv.innerHTML = '<p style="color: red;">Todos os participantes já foram sorteados!</p>';
        } else if (participantesIniciais.length === 0) {
            sorteioResultadoDiv.innerHTML = '<p>Não há participantes na lista interna para sortear.</p>';
            btnSortear.disabled = true;
        } else {
            if (!sorteioResultadoDiv.innerHTML.includes('Parabéns') && !sorteioResultadoDiv.innerHTML.includes('Todos os participantes')) {
                sorteioResultadoDiv.innerHTML = '<p>Clique em "Sortear" para aparecer o nome!</p>';
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const header = document.querySelector('header');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

    });






    loadData();
});





