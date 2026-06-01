// chat.js
let currentChannel = "#foreverprescotts";

function getStoredNick() {
    return localStorage.getItem('fpNick') || '';
}

function saveNick(nick) {
    localStorage.setItem('fpNick', nick);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load saved nickname
    const savedNick = getStoredNick();
    if (savedNick) {
        document.getElementById('nick').value = savedNick;
    }

    // Channel selector
    const channelSelect = document.getElementById('channel-select');
    channelSelect.addEventListener('change', () => {
        currentChannel = channelSelect.value;
    });

    // Optional: Auto join with saved nick on first load
    // setTimeout(joinChat, 600);
});

function joinChat() {
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

    const wrapper = document.getElementById('iframeWrapper');
    wrapper.innerHTML = `
        <iframe src="${url}" 
                style="width:100%; height:100%; border:none;" 
                allowfullscreen>
        </iframe>
    `;
}
