const modeToggle = document.getElementById("mode-toggle");
const body = document.body;
const lightModeClass = "light-mode";

function setTheme(theme) {
    if (theme === "light") {
        body.classList.add(lightModeClass);
        modeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove(lightModeClass);
        modeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
}

const storedTheme = localStorage.getItem("theme") || "dark";
setTheme(storedTheme);

modeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains(lightModeClass) ? "dark" : "light";
    setTheme(nextTheme);
});

function activateNavLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("header nav a");
    links.forEach((link) => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath || (linkPath === "home.html" && currentPath === "") || (linkPath === "home.html" && currentPath === "index.html")) {
            link.classList.add("active");
        }
    });
}

function revealOnScroll() {
    const revealElements = document.querySelectorAll(".hero, .hero-text, .about-content, .hero-image, .project-card, .skill-box, .skills-heading, .page, .footer-content, form");
    const triggerBottom = window.innerHeight * 0.9;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0px)";
        }
    });
}

function initRevealStyles() {
    const revealElements = document.querySelectorAll(".hero, .hero-text, .about-content, .hero-image, .project-card, .skill-box, .skills-heading, .page, .footer-content, form");
    revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });
}

function createWave(event) {
    const target = event.currentTarget;
    const wave = document.createElement("span");
    wave.className = "ripple-effect";
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    wave.style.width = `${size}px`;
    wave.style.height = `${size}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    target.appendChild(wave);

    wave.addEventListener("animationend", () => {
        wave.remove();
    });
}

function addWaveEffect() {
    const actionElements = document.querySelectorAll(".btn, .btn2, button, header nav a, .project-card, .skill-box, a[href]");
    actionElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            createWave(event);
            const anchor = event.currentTarget;
            if (anchor.tagName === "A") {
                const href = anchor.getAttribute("href");
                const target = anchor.getAttribute("target");
                if (href && !href.startsWith("#") && target !== "_blank" && !href.startsWith("http")) {
                    event.preventDefault();
                    setTimeout(() => {
                        window.location.href = href;
                    }, 120);
                }
            }
        });
    });
}

function handleContactForm() {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Thanks for your message! I will get back to you soon.");
        form.reset();
    });
}

activateNavLink();
initRevealStyles();
revealOnScroll();
window.addEventListener("scroll", revealOnScroll);
handleContactForm();
addWaveEffect();
