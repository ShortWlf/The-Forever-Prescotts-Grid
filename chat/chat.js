// chat.js
let currentChannel = "#foreverprescotts";

function getStoredNick() {
    return localStorage.getItem('fpNick') || '';
}

function saveNick(nick) {
    localStorage.setItem('fpNick', nick);
}

// Handle sidebar channel buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.channel-btn');
    const channelInput = document.getElementById('channel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            buttons.forEach(b => b.classList.remove('active'));
            // Activate clicked
            btn.classList.add('active');

            currentChannel = btn.getAttribute('data-channel');
            channelInput.value = currentChannel;
        });
    });

    // Set initial channel
    channelInput.value = currentChannel;

    // Load saved nickname
    const savedNick = getStoredNick();
    if (savedNick) document.getElementById('nick').value = savedNick;
});

function startChat() {
    const nickInput = document.getElementById('nick');
    let nick = nickInput.value.trim();

    if (!nick) {
        nick = "Angler" + Math.floor(1000 + Math.random() * 9000);
        nickInput.value = nick;
    }

    saveNick(nick);

    const encodedNick = encodeURIComponent(nick);
    const encodedChannel = encodeURIComponent(currentChannel);

    const url = `https://web.libera.chat/?nick=${encodedNick}&channels=${encodedChannel}`;

    // Show iframe
    const wrapper = document.getElementById('iframeWrapper');
    wrapper.style.display = 'block';
    wrapper.innerHTML = `
        <iframe src="${url}" allow="clipboard-write"></iframe>
    `;

    // Scroll to iframe
    wrapper.scrollIntoView({ behavior: "smooth" });
}
