document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 20,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/10', 'border-white/20');
            nav.classList.remove('border-transparent');
        } else {
            nav.classList.remove('bg-white/10', 'border-white/20');
            nav.classList.add('border-transparent');
        }
    });

    const carousel = document.getElementById('mockup-carousel');
    if (carousel) {
        const dots = document.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        const totalSlides = 3;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.remove('bg-white/40', 'w-1.5');
                    dot.classList.add('bg-white', 'w-5');
                } else {
                    dot.classList.remove('bg-white', 'w-5');
                    dot.classList.add('bg-white/40', 'w-1.5');
                }
            });
        }, 3000);
    }

    const contactURL = 'https://script.google.com/macros/s/AKfycbyyYKvcnOiDhRAuoAotY4yDaV32COBxezAmaMSDGiMopwU7DhzeWSr-tFvY51WYLM--0A/exec';
    const cForm = document.getElementById('contactForm');
    const cBtn = document.getElementById('contactSubmitBtn');
    const cMsg = document.getElementById('contactMsg');

    if(cForm) {
        cForm.addEventListener('submit', e => {
            e.preventDefault();
            cBtn.disabled = true;

            const originalBtnHTML = cBtn.innerHTML;
            cBtn.innerHTML = 'Authenticating...';

            grecaptcha.ready(function() {
                grecaptcha.execute('6Lf04oMsAAAAAOR99MIyUTHZemXtXEVlU6CKhEQN', {action: 'submit'}).then(function(token) {
                    document.getElementById('recaptchaToken').value = token;
                    cBtn.innerHTML = 'Dispatching...';

                    fetch(contactURL, { method: 'POST', body: new FormData(cForm)})
                        .then(response => {
                            cMsg.classList.remove('hidden');
                            cForm.reset();
                            cBtn.disabled = false;
                            cBtn.innerHTML = originalBtnHTML; 
                            setTimeout(() => cMsg.classList.add('hidden'), 5000);
                        })
                        .catch(error => {
                            cBtn.disabled = false;
                            cBtn.innerHTML = 'Error! Try Again';
                            console.error('Error!', error.message);
                        });
                });
            });
        });
    }
});