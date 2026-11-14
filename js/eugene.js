// ========== MODAL THINGS ==========
const modal = document.querySelector(".modal");

function getRandomFacts(){
    const randomIndex = Math.floor(Math.random() * factsData.length);
    return factsData[randomIndex];
}

function getRandomColor(){
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
}

const generateFactsBtn = document.querySelector("#generete-facts");
generateFactsBtn.addEventListener("click", () => {
    modal.classList.add("active");
    const { id, category, text } = getRandomFacts();
    const catSpan = modal.querySelector("h4 span");
    catSpan.textContent = category;

    const yapping = modal.querySelector("p");
    yapping.textContent = text;    

    const card = modal.querySelector(".card");
    card.style.backgroundColor = getRandomColor();
});

const closeFacts = document.querySelector("#close");
closeFacts.addEventListener("click", () => {
    modal.classList.remove("active");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show"); 
        }
    })
}, { threshold: 0.15 });

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
});