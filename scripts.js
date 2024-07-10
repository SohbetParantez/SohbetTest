
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if ((username === 'gogo' && password === '898974') || (username === 'tukrkey' && password === '123456789')) {
        localStorage.setItem('username', username);
        window.location.href = 'message.html';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const username = localStorage.getItem('username');
    if (window.location.pathname.endsWith('message.html') && !username) {
        window.location.href = 'index.html';
    } else {
        fetchMessages();
        setInterval(fetchMessages, 3000);
    }
});

function sendMessage() {
    const message = document.getElementById('message').value;
    const username = localStorage.getItem('username');
    if (message.trim() !== '') {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ user: username, text: message });
        localStorage.setItem('messages', JSON.stringify(messages));
        document.getElementById('message').value = '';
        fetchMessages();
    }
}

function fetchMessages() {
    const messagesDiv = document.getElementById('messages');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.user}: ${msg.text}`;
        messagesDiv.appendChild(messageElement);
    });
}
