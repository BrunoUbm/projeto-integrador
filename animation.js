function Access_Content () {
        let access_buttom = document.querySelectorAll('.nav_content')
    access_buttom.forEach((a) => {
        a.addEventListener("click", () => {
            let transition_page = document.querySelector('.initial_page')
            let scroll_header = document.querySelector('.main_opitions')
            let sections = document.querySelector('.sections')

            transition_page.classList.add('add_transition')
            scroll_header.classList.add('transition_opitions')
            sections.classList.add('transition_main')
        })
    }
    )
}
Access_Content()

function Return_InitialPage () {
    let initial_page = document.querySelector('.opition_home')

    initial_page.addEventListener("click", () => {
        let page_one = document.querySelector('.initial_page')
        let remove_header = document.querySelector('.main_opitions')
        let remove_sections = document.querySelector('.sections')

        page_one.classList.add('transition_opitions')
        page_one.classList.remove('add_transition')
        remove_header.classList.remove('transition_opitions')
        remove_sections.classList.remove('transition_main')
    })

}
Return_InitialPage()