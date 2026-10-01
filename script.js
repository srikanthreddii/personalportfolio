/* =========================================================
   SRikanth Reddy Portfolio
   JavaScript
   ========================================================= */


/* ================= ELEMENTS ================= */

const body = document.body;

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const themeToggle =
    document.getElementById("themeToggle");

const typingText =
    document.getElementById("typingText");

const revealElements =
    document.querySelectorAll(".reveal");

const currentYear =
    document.getElementById("currentYear");


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    body.classList.toggle(
        "menu-open",
        navMenu.classList.contains("open")
    );

    const icon =
        menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {

        icon.classList.remove(
            "fa-bars"
        );

        icon.classList.add(
            "fa-xmark"
        );

    } else {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

});


/* Close menu after clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        body.classList.remove("menu-open");

        const icon =
            menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* ================= HEADER SCROLL ================= */

function updateHeader() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* ================= ACTIVE NAV ================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* ================= TYPING EFFECT ================= */

const roles = [
    "Java Full Stack Developer",
    "Java Developer",
    "Backend Developer",
    "Frontend Developer"
];

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    const currentRole =
        roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeRole,
                1700
            );

            return;

        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const speed =
        deleting ? 45 : 85;

    setTimeout(
        typeRole,
        speed
    );

}

typeRole();


/* ================= SCROLL REVEAL ================= */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= THEME ================= */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


function updateThemeIcon() {

    const icon =
        themeToggle.querySelector("i");

    if (body.classList.contains("dark")) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

    }

}


/* Load saved theme */

if (savedTheme === "dark") {

    body.classList.add("dark");

}

updateThemeIcon();


/* Theme toggle */

themeToggle.addEventListener(
    "click",
    () => {

        body.classList.toggle("dark");

        const currentTheme =
            body.classList.contains("dark")
                ? "dark"
                : "light";

        localStorage.setItem(
            "portfolio-theme",
            currentTheme
        );

        updateThemeIcon();

    }
);


/* ================= CURRENT YEAR ================= */

currentYear.textContent =
    new Date().getFullYear();


/* ================= PROJECT LINK WARNING ================= */

/*
    You can replace the "#" links in HTML
    with your actual GitHub/live project URLs.
*/

const emptyProjectLinks =
    document.querySelectorAll(
        '.project-links a[href="#"]'
    );


emptyProjectLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

            alert(
                "Project link will be added soon."
            );

        }
    );

});


/* ================= 3D CARD EFFECT ================= */

const developerCard =
    document.querySelector(
        ".developer-card"
    );


if (
    developerCard &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    developerCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                developerCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) * -3;

            const rotateY =
                ((x - centerX) /
                    centerX) * 4;

            developerCard.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-4px)
                `;

        }
    );


    developerCard.addEventListener(
        "mouseleave",
        () => {

            developerCard.style.transform =
                `
                perspective(1000px)
                rotateY(-4deg)
                rotateX(2deg)
                `;

        }
    );

}


/* ================= EMAIL COPY ================= */

const emailLinks =
    document.querySelectorAll(
        'a[href^="mailto:"]'
    );


emailLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            /*
                The mail client will open normally.
                No extra action is required.
            */

        }
    );

});


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navMenu.classList.remove("open");

            body.classList.remove(
                "menu-open"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }
);


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%cHello, Developer! 👋",
    "font-size: 18px; font-weight: bold; color: #2563eb;"
);

console.log(
    "%cWelcome to Srikanth's portfolio.",
    "font-size: 13px;"
);