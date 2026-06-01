// chat.js
let currentChannel = "#foreverprescotts";

function getStoredNick() {
    return localStorage.getItem('fpNick') || '';
}

function saveNick(nick) {
    localStorage.setItem('fpNick', nick);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedNick = getStoredNick();
    if (savedNick) {
        document.getElementById('nick').value = savedNick;
    }

    // Channel selector change handler
    document.getElementById('channel-select').addEventListener('change', function() {
        currentChannel = this.value;
    });
});

function joinChat() {
    const nickInput = document.getElementById('nick');
    let nick = nickInput.value.trim();

    if (!nick) {
        nick = "Angler" + Math.floor(Math.random() * 9000);
        nickInput.value = nick;
    }

    saveNick(nick);

    const encodedNick = encodeURIComponent(nick);
    const encodedChannel = encodeURIComponent(currentChannel);

    const url = `https://web.libera.chat/?nick=${encodedNick}&channels=${encodedChannel}`;

    const wrapper = document.getElementById('iframeWrapper');
    wrapper.innerHTML = `<iframe src="${url}" allow="clipboard-write"></iframe>`;
}
