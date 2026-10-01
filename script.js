function sendWhats(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    const phone = "5531995552992";

    if (!name || !message) {
        alert("Please fill in your name and message.");
        return;
    }

    const text = `Hello, my name is ${name}.

${message}`;

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
}


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null,
    radius: 150
};


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();
    createParticles();

});



window.addEventListener("mousemove", (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


window.addEventListener("mouseleave", () => {

    mouse.x = null;
    mouse.y = null;

});


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 768 ? 55 : 110;


    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 2 + 0.5,

            speedX:
                (Math.random() - 0.5) * 0.35,

            speedY:
                (Math.random() - 0.5) * 0.35,

            opacity:
                Math.random() * 0.6 + 0.2

        });

    }

}

createParticles();


function drawParticle(particle) {

    ctx.beginPath();

    ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        `rgba(139, 92, 246, ${particle.opacity})`;

    ctx.fill();

}


function connectParticles() {

    const connectionDistance = 130;


    for (let i = 0; i < particles.length; i++) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x - particles[j].x;

            const dy =
                particles[i].y - particles[j].y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);


            if (distance < connectionDistance) {

                const opacity =
                    1 - distance / connectionDistance;


                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(99, 102, 241, ${opacity * 0.25})`;

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();

            }

        }

    }

}


function mouseInteraction(particle) {

    if (mouse.x === null || mouse.y === null) {
        return;
    }


    const dx =
        particle.x - mouse.x;

    const dy =
        particle.y - mouse.y;

    const distance =
        Math.sqrt(dx * dx + dy * dy);


    if (distance < mouse.radius) {

        const force =
            (mouse.radius - distance) /
            mouse.radius;


        const angle =
            Math.atan2(dy, dx);


        particle.x +=
            Math.cos(angle) * force * 0.8;

        particle.y +=
            Math.sin(angle) * force * 0.8;

    }

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;


        /* Screen boundaries */

        if (particle.x < 0) {
            particle.x = canvas.width;
        }

        if (particle.x > canvas.width) {
            particle.x = 0;
        }

        if (particle.y < 0) {
            particle.y = canvas.height;
        }

        if (particle.y > canvas.height) {
            particle.y = 0;
        }


        mouseInteraction(particle);

        drawParticle(particle);

    });


    connectParticles();


    requestAnimationFrame(animateParticles);

}


animateParticles();


const navigation = document.querySelector("nav");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navigation.style.background =
            "rgba(5, 8, 22, 0.85)";

        navigation.style.boxShadow =
            "0 10px 40px rgba(0, 0, 0, 0.25)";

    } else {

        navigation.style.background =
            "rgba(255, 255, 255, 0.08)";

        navigation.style.boxShadow =
            "none";

    }

});



const revealElements =
    document.querySelectorAll(
        "section, .experience-card, .card, .glass"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    element.classList.add("hidden");

    observer.observe(element);

});