//reviews - отзывы

    const findSlideByTab = tab => {
        return $(".review").filter(function(ndx, item){
            return $(item).attr("data-linked-with") === tab
        })
    }

    $(".reviews-menu__item").on("click", function(e){
        e.preventDefault()
        
        const currentItem = $(e.currentTarget)
        const currentTab = $(e.currentTarget).attr("data-open")
        const requiredSlide = findSlideByTab(currentTab)
        
        currentItem.addClass("reviews-menu__item--active").siblings("li").removeClass("reviews-menu__item--active")


        requiredSlide.addClass("review--active").siblings().removeClass("review--active")

    })