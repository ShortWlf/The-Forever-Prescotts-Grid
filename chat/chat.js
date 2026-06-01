// chat.js - Forever Prescotts Grid Chat Enhancer

const defaultChannel = "%23foreverprescotts"; // #foreverprescotts URL encoded

function getStoredNick() {
    return localStorage.getItem('fpNick') || '';
}

function saveNick(nick) {
    localStorage.setItem('fpNick', nick);
}

function joinChat() {
    const nickInput = document.getElementById('nick');
    let nick = nickInput.value.trim();

    // If user didn't enter anything, generate a random one
    if (!nick) {
        nick = "Angler" + Math.floor(Math.random() * 9999);
        nickInput.value = nick;
    }

    // Save for next time
    saveNick(nick);

    // Build Libera webchat URL
    const url = `https://web.libera.chat/?nick=${encodeURIComponent(nick)}&channels=${defaultChannel}`;

    // Create and insert iframe
    const wrapper = document.getElementById('iframeWrapper');
    wrapper.innerHTML = `
        <iframe src="${url}" 
                style="width: 100%; height: 100%; flex-grow: 1; border: none;" 
                allow="clipboard-write">
        </iframe>
    `;
}

// Auto-fill nickname from localStorage when page loads
window.addEventListener('load', () => {
    const savedNick = getStoredNick();
    if (savedNick) {
        document.getElementById('nick').value = savedNick;
    }
    
    // Optional: Auto-join with saved nick after 800ms
    // Uncomment if you want instant load:
    // setTimeout(() => {
    //     if (savedNick) joinChat();
    // }, 800);
});
