function Menu_Box () {
    const content_buttom = document.querySelector(".conteudo")

    content_buttom.addEventListener("mouseover", () => {
        let menu_box = document.querySelector(".menu_box")
        menu_box.classList.add("active")
        content_buttom.classList.add("select_opition")
        
    })

    
}
Menu_Box()


function Remove_Box() {
    const body = document.querySelector("body")

    body.addEventListener("click", () => {
    let remove_box = document.querySelector(".menu_box")
    let remove_border = document.querySelector(".conteudo")
    remove_box.classList.remove("active")
    remove_border.classList.remove("select_opition")
    })
}
Remove_Box()



function Main_Opitions () {
    const main_themes = document.querySelectorAll(".themes")

    main_themes.forEach((a) => {
        a.addEventListener("click", () => {
            let home_screen = document.querySelector(".home_screen")
            home_screen.classList.add("transparent")
            let main_menu = document.querySelector(".main_opitions")
            main_menu.classList.add("transition_opitions")
        })
    })
}
Main_Opitions()



function Return_Home () {
    const opition_home = document.querySelector(".opition_home")

    opition_home.addEventListener("click", () => {
        let remove_opitions = document.querySelector(".main_opitions")
        remove_opitions.classList.remove("transition_opitions")

        let add_home_screen = document.querySelector(".home_screen")
        add_home_screen.classList.remove("transparent")
    })
}
Return_Home()