function accessContent() {
    const accessButtom = document.querySelectorAll('.nav_content');

    accessButtom.forEach((elem) => {
        elem.addEventListener("click", () => {
            const transitionPage = document.querySelector('.initial_page');
            const scrollHeader = document.querySelector('.main_opitions');
            
            const sections = document.querySelector('.sections');

            const btnToSectionList = {
                page1Btn: 'page_fisica',
                page2Btn: 'page_estrutura',
                page3Btn: 'page_quimica'
            }

            transitionPage.classList.add('add_transition');
            scrollHeader.classList.add('transition_opitions');

            sections.classList.add('transition_main');

            switch(elem.transition) {
                case 'page1Btn':
                    break;
                case 'page2Btn':
                    break;
                case 'page3Btn':
                    break;
            }

            const elemSectionContent = document.getElementById(btnToSectionList[elem.id]);

            elemSectionContent.classList.add('transition_section');
        });

        elem.addEventListener("mouseout", () => {
            elem.style.transition = "0.75s";
        });
    });
}

accessContent();

function returnInitialPage() {
    const initialPage = document.querySelector('.option_home');

    initialPage.addEventListener("click", () => {
        const pageOne = document.querySelector('.initial_page');

        const removeHeader = document.querySelector('.main_opitions');
        const removeSections = document.querySelector('.sections');

        pageOne.classList.add('transition_opitions');

        pageOne.classList.remove('add_transition');
        removeHeader.classList.remove('transition_opitions');
        removeSections.classList.remove('transition_main');

        const sectionsContent = removeSections.getElementsByTagName(`section`);

        for(const section of sectionsContent) {
            section.classList.remove('transition_section');
        }
    });
}

returnInitialPage();