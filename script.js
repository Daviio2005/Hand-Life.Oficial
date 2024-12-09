document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const registerScreen = document.getElementById('register-screen');
    const medicalFormScreen = document.getElementById('medical-form-screen');
    const nosotrosScreen = document.getElementById('nosotros-screen');
    const contactoScreen = document.getElementById('contacto-screen');
    const header = document.getElementById('header');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const medicalForm = document.getElementById('medical-form');

    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const logoutButton = document.getElementById('logout-button');
    const saveMessage = document.getElementById('save-message');

    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    const navLinks = document.querySelectorAll('.nav-link');
    const allScreens = document.querySelectorAll('.screen');

    const loginError = document.getElementById('login-error');
    const registerSuccess = document.getElementById('register-success');

    // Función para mostrar una sección específica
    function showSection(sectionId) {
        allScreens.forEach(screen => screen.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    }

    // Mostrar pantalla de registro
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('register-screen');
    });

    // Mostrar pantalla de login
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('login-screen');
    });

    // Manejar el registro de usuarios
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        // Obtener usuarios almacenados o inicializar un arreglo vacío
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el usuario ya existe
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('El nombre de usuario ya existe.');
            return;
        }

        // Guardar el nuevo usuario
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));

        registerSuccess.style.display = 'block';
        setTimeout(() => {
            registerSuccess.style.display = 'none';
            showSection('login-screen');
        }, 2000);
    });

    // Manejar el inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            showSection('medical-form-screen');
        } else {
            loginError.style.display = 'block';
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        }
    });

    // Permitir edición del formulario
    editButton.addEventListener('click', () => {
        const fields = medicalForm.querySelectorAll('input, textarea');
        fields.forEach(field => field.disabled = false);
        saveButton.style.display = 'block';
        editButton.style.display = 'none';
    });

    // Guardar datos médicos
    medicalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = medicalForm.querySelectorAll('input, textarea');
        fields.forEach(field => field.disabled = true);
        saveButton.style.display = 'none';
        editButton.style.display = 'block';
        saveMessage.style.display = 'block';
        setTimeout(() => {
            saveMessage.style.display = 'none';
        }, 3000);
    });

    // Cerrar sesión
    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        showSection('login-screen');
    });

    // Mostrar secciones del menú
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            if (section === 'medical-form-screen' && !localStorage.getItem('isLoggedIn')) {
                showSection('login-screen');
            } else {
                showSection(section);
            }
        });
    });

    // Mostrar el header siempre
    header.style.display = 'flex';

    // Mostrar la sección adecuada al cargar la página
    if (localStorage.getItem('isLoggedIn')) {
        showSection('medical-form-screen');
    } else {
        showSection('login-screen');
    }
});