(() => {
    const jumpscareBtn = document.querySelector("button");

    jumpscareBtn.addEventListener("click", fnafJumpscare);

})();


function fnafJumpscare() {
    // 1. Flashing background
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '999999';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.backgroundColor = 'black';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    // 2. Add Freddy GIF 
    const img = document.createElement('img');
    img.src = './assets/Freddy_Image.gif';
    img.style.width = '300px';  
    img.style.height = '300px'; 
    img.style.objectFit = 'contain';
    img.style.transform = 'scale(1)';
    img.style.transition = 'transform 0.1s ease-in-out';
    container.appendChild(img);

    // 3. Audio Playback
    const jumpscareAudio = new Audio('./assets/Fnaf Jumpscare Sound Effect.mp3');
    jumpscareAudio.play().catch(error => {
        console.log("Playback blocked or failed:", error);
    });

    // 4. Strobe background colors and shake the small image
    let flashes = 0;
    const flashInterval = setInterval(() => {
        const colors = ['#ff0000', '#000000', '#3b0000', '#ffffff', '#550000'];
        container.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Shake effect around the center
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        const randomScale = 1 + Math.random() * 0.2;
        img.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;

        flashes++;
        if (flashes > 25) { // Stop after ~2.5 seconds
            clearInterval(flashInterval);
            container.remove();
        }
    }, 100);
}