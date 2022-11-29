function accessContent() {
    const accessButtom = document.querySelectorAll('.nav_content');

    accessButtom.forEach((elem) => {
        elem.addEventListener("click", () => {
            const transitionPage = document.querySelector('.initial_page');
            const scrollHeader = document.querySelector('.main_opitions');
            const sections = document.querySelector('.sections');

            transitionPage.classList.add('add_transition');
            scrollHeader.classList.add('transition_opitions');
            sections.classList.add('transition_main');
        });

        elem.addEventListener("mouseout", () => {
            elem.style.transition = "0.75s";
        });
    });
}

accessContent();

function returnInitialPage() {
    const initialPage = document.querySelector('.opition_home');

    initialPage.addEventListener("click", () => {
        const pageOne = document.querySelector('.initial_page');
        const removeHeader = document.querySelector('.main_opitions');
        const removeSections = document.querySelector('.sections');

        pageOne.classList.add('transition_opitions');
        pageOne.classList.remove('add_transition');
        removeHeader.classList.remove('transition_opitions');
        removeSections.classList.remove('transition_main');
    });
}

returnInitialPage();