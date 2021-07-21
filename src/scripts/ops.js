    const sections = $(".section")
    const display = $(".main-content")

    let inScroll = false

    sections.first().addClass("active")

    const sectionTransition = sectionIndex => {
        if (inScroll === false) {
            inScroll = true

            const position = sectionIndex * -100

            const currentSection = sections.eq(sectionIndex)
            const menuTheme = currentSection.attr("data-sidemenu-theme")
            const sideMenu = $(".fixed-menu")
            const fixedMenuLinks = $(".fixed-menu__link")

            if (menuTheme === "black") {
                sideMenu.addClass("fixed-menu--shadow")
            } else {
                sideMenu.removeClass("fixed-menu--shadow")
            }

            display.css({
                transform: `translateY(${position}%)`
            })

            sections.eq(sectionIndex).addClass("active").siblings().removeClass("active")

            fixedMenuLinks.removeClass("fixed-menu__link--active")

            sideMenu.find(".fixed-menu__link").eq(sectionIndex)
            .addClass("fixed-menu__link--active")

            setTimeout(() => {
                inScroll = false

            }, 1300)

        }
    } 

    const nextOrPrev = direction => {
        const activeSection = sections.filter(".active")
        const nextSection = activeSection.next()
        const prevSection = activeSection.prev()

        if (direction === "next" && nextSection.length) {
            sectionTransition(nextSection.index())
        }

        if (direction === "prev" && prevSection.length) {
            sectionTransition(prevSection.index())
        }
    }
    

    $(window).on("wheel", e => {
        const deltaY = e.originalEvent.deltaY


        if (deltaY > 0) {
            nextOrPrev("next")
        }

        if (deltaY < 0) {
            nextOrPrev("prev")
        }


    })

    $(window).on("keydown", e => {

        const keyCode = e.originalEvent.keyCode
        const currentTag = e.target.tagName.toLowerCase()

        if (currentTag !== "input" && currentTag !== "textarea") {
           switch (keyCode) {
            case 38:
                nextOrPrev("prev")

                break

            case 40:
                nextOrPrev("next")

                break

            } 
        }

        
    })

    $("[data-scroll-to]").on("click", e => {
        e.preventDefault()

        const $this = $(e.currentTarget)
        const target = $this.attr("data-scroll-to")
        const reqSection = $(`[data-section-id=${target}]`)

        sectionTransition(reqSection.index())
    })