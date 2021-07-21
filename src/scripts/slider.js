
const slider= $(".products").bxSlider({
        pager: false,
        controls: false
    })

    $(".arrow--left").on("click", e => {
        e.preventDefault()
        
        slider.goToPrevSlide()
    })
    $(".arrow--right").on("click", e => {
        e.preventDefault()
        
        slider.goToNextSlide()
    })