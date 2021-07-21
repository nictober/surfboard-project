
    const mesureWidth = item => {
        const windowWidth = $(window).width()
        const container = item.closest(".main-menu")
        const listItems = container.find(".main-menu__item")
        const itemWidth = item.width()

        const widthOfItems = itemWidth * listItems.length

        const isTablet = window.matchMedia("(max-width: 768px)").matches
        const isMobile = window.matchMedia("(max-width: 480px)").matches

        // const textContainer = item.find(".")
        // const paddingLeft = css()

        // let reqTextWidth = 0
        const textBlock = item.find(".main-menu__text")
        const paddingLeft = parseInt(textBlock.css("padding-left"))
        const paddingRight = parseInt(textBlock.css("padding-right"))

        
        
        
        if (isTablet && !isMobile) {
            reqItemWidth = windowWidth - widthOfItems
        } else if (isMobile) {
            reqItemWidth = windowWidth
        }
        else {
            reqItemWidth = 524
        }

        return {
            container: reqItemWidth,
            textBlock: reqItemWidth - paddingLeft - paddingRight
        }

        
    }

    const releaseItem = item => {
        const hiddenContent = item.find(".main-menu__content")
        // const contentContainer = item.siblings(".main-menu__content")
        // const textBlock = contentContainer.find(".")

        const reqContentWidth = mesureWidth(item)
        const reqTextBlockWidth = mesureWidth (item)
        // const reqTextBlockWidth = mesureWidth(item).textBlock
        const textBlock = item.find(".main-menu__text")

        hiddenContent.width(reqContentWidth.container)
        item.addClass("main-menu__item--active")

        textBlock.width(reqTextBlockWidth.textBlock)

    }

    const closeEveryItems = container => {
        const listItems = container.find(".main-menu__item")

        const content = container.find(".main-menu__content")

        listItems.removeClass("main-menu__item--active")
        content.removeClass("active")
        content.width(0)
    }

    $(".main-menu__title").on("click", e => {
        e.preventDefault()

        const $this = $(e.currentTarget)
        const item = $this.closest(".main-menu__item")
        const container = $this.closest(".main-menu")
        const itemOpened = item.hasClass("main-menu__item--active")


        if (itemOpened) {
            closeEveryItems(container)
        } else {
            closeEveryItems(container)
            releaseItem(item)
        }

    })
