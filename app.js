

// Targeting article
const articleContent = document.querySelectorAll('.article__container-transition');

// Options for Swiper
const appearOptions = {
    rootMargin: "0px",
    threshold: 1
};


const appearOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove("appear");
            }
            else {
                entry.target.classList.add("appear");
            }
        });
    },
    appearOptions);

articleContent.forEach(section => {
    appearOnScroll.observe(section);
});



const template = document.createElement('template');
template.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.disabled {
    display: none
}

.animated {
    animation: appear 7s;
}

@keyframes appear {
    0% {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.container-paragraph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.article__container-paragraph {
    width: 100%;
    font-size: 18px;
    font-weight: 300;
    line-height: 130%;
    letter-spacing: 0px;
    text-align: center;
}

button {
    margin-top: 30px;
    width: 170px;
    height: 52px;
    background-color: #e3cfcf00;
    border: 1px solid black;
}


@media (max-width: 375px) {
    button {
        width: 110px;
        height: 48px;
        font-size: 12px;
        font-weight: 600;
    }

    .article__container-paragraph {
        font-size: 16px;
        width: 95%;
    }
}

@media (max-width: 991.98px) {
    .article__container-paragraph {
        font-size: 16px;
        width: 95%;
    }
}

@media (max-width: 1199.98px) {
    .article__container-paragraph {
        font-size: 16px;
        width: 95%;
    }
}
</style>

<div class="container-paragraph">
  <p class="disabled article__container-paragraph" id="shy">
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
    demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee
    the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their
    duty through weakness of will, which is the same as saying through shrinking from toil and pain.
  </p>
  <button class="toggle-button">Learn more</button>
</div>
`;


class HiddenParagraph extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.setupToggleButton();
    }

    setupToggleButton() {
        const button = this.shadowRoot.querySelector('.toggle-button');

        button.addEventListener('click', () => {
            if (this.shadowRoot.querySelector('.disabled')) {
                this.shadowRoot.querySelector('.disabled').classList.remove('disabled')
                this.shadowRoot.getElementById("shy").classList.add("animated")
                this.shadowRoot.querySelector('.toggle-button').innerText = "Learn less"
            } else {
                this.shadowRoot.getElementById("shy").classList.add("disabled")
                this.shadowRoot.querySelector('.toggle-button').innerText = "Learn more"

            }

        });
    }

}

customElements.define("hidden-paragraph", HiddenParagraph);

