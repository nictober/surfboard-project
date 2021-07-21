//team - аккордеон вертикальный
    const openItem = clickedItem => {
        const container = clickedItem.closest(".team-member")
        const blockToOpen = container.find(".team-member__text-wrap")
        const content = blockToOpen.find(".team-member__text")
        const reqHeight = content.height()

        blockToOpen.height(reqHeight)
        container.addClass("active")
    }

    const closeAllMembers = container => {
        const wrapsToClose = container.find(".team-member__text-wrap")
        
        wrapsToClose.height(0)
    }

    $(".team-member__name").on("click", e => {
        const $this = $(e.currentTarget)
        const memberContainer = $this.closest(".team-list")
        const elemContainer = $this.closest(".team-member")

        if (elemContainer.hasClass("active")) {
            $(".team-member__text-wrap").height(0)
            elemContainer.removeClass("active")
        }
        else {
            // closeAllMembers(memberContainer)
            $(".team-member__text-wrap").height(0)
            openItem($this)
        }
    })