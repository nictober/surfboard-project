$(document).ready(function(){
    // гамбургер меню
    const hamburger = document.querySelector(".hamburger");
    const hamburgerOpen = document.querySelector(".hamburger-icon");
    const hamburgerClose = document.querySelector(
        ".hamburger-icon--close"
    );

    hamburgerOpen.addEventListener("click", (e) => {
        hamburger.style.display = "block";
    });

    hamburgerClose.addEventListener("click", (e) => {
        hamburger.style.display = "none";
    });

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

    //team - аккордеон
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

    //products -слайдер

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

    //modal - модальное окно в форме
    

    $(".app-submit-btn").on("click", e => {
        e.preventDefault()

        Fancybox.close()
       
    })

    //form - валидация формы
    $(".form").on("submit", e => {
        e.preventDefault()

        const form = $(e.currentTarget)
        const name = form.find("[name= 'name']")
        const phone = form.find("[name= 'phone']")
        const comment = form.find("[name= 'comment']")
        const to = form.find("[name= 'to']")

        const modal = $("#modal")
        const content = modal.find(".modal__content")

        modal.removeClass("error-modal")

        const valArr = [name, phone, comment, to] //?

        valArr.forEach((element) => {
            element.removeClass("input-error")

            if (element.val().trim() === "") {
                element.addClass("input-error")
            }
        });

        const errorFields = form.find(".input-error")

        if (errorFields.length === 0) {
            $.ajax({
                url: "https://webdev-api.loftschool.com/sendmail",
                method: "post",
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    comment: comment.val(),
                    to: to.val()
                },
                success: data => {
                    content.text(data.message)

                    const fancybox = new Fancybox([
                        {
                        src: "#modal",
                        type: "inline",
                        },
                    ]);
                },
                error: data => {
                    const message = data.responseJSON.message
                    content.text(message)
                    modal.addClass("error-modal")

                    const fancybox = new Fancybox([
                        {
                        src: "#modal",
                        type: "inline",
                        },
                    ]);
                }

            })
        } 
    })

    //menu - меню аккордеон 

    const mesureWidth = item => {
        const windowWidth = $(window).width()
        const container = item.closest(".main-menu")
        const listItems = container.find(".main-menu__item")
        const itemWidth = item.width()

        const widthOfItems = itemWidth * listItems.length

        const isMobile = window.matchMedia("(max-width: 768px)").matches

        // const textContainer = item.find(".")
        // const paddingLeft = css()

        // let reqTextWidth = 0
        const textBlock = item.find(".main-menu__text")
        const paddingLeft = parseInt(textBlock.css("padding-left"))
        const paddingRight = parseInt(textBlock.css("padding-right"))


        
        
        if (isMobile) {
            reqItemWidth = windowWidth - widthOfItems
        } else {
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
        item.addClass("active")

        textBlock.width(reqTextBlockWidth.textBlock)

    }

    const closeEveryItems = container => {
        const listItems = container.find(".main-menu__item")

        const content = container.find(".main-menu__content")

        listItems.removeClass("active")
        content.removeClass("active")
        content.width(0)
    }

    $(".main-menu__title").on("click", e => {
        e.preventDefault()

        const $this = $(e.currentTarget)
        const item = $this.closest(".main-menu__item")
        const container = $this.closest(".main-menu")
        const itemOpened = item.hasClass("active")


        if (itemOpened) {
            closeEveryItems(container)
        } else {
            closeEveryItems(container)
            releaseItem(item)
        }

    })

    // ______________________________________________________OPS start

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

    $("body").swipe({
        swipe: function (event,direction,) {
            const scroller = sectionTransition()
            let scrollDirection = ""

            if (scrollDirection === "up") scrollDirection = "next"
            if (scrollDirection === "down") scrollDirection = "prev"

            scroller[scrollDirection]()

            // alert(direction)
        },
    })

    // ______________________________________________________OPS end


    // map

    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.751123, 37.612779],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15,
            controls: []
        });

        var myPlacemark = new ymaps.Placemark([55.751123, 37.612779], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pin.png',
            iconImageSize: [58, 73],
            iconImageOffset: [-3, -42]
        });

        myMap.geoObjects.add(myPlacemark)

        myMap.behaviors.disable("scrollZoom")
    }

    ymaps.ready(init)

    // video player

    let video 
    let durationControl
    let intervalId
    let soundStatus 

    // const playBtn = document.querySelector(".duration__play-btn")
    const windowPlayBtn = document.querySelector(".player__button")

    video = document.getElementById("player")

        
    

    durationControl = document.getElementById("durationLevel")
    durationControl.min = 0
    durationControl.value = 0
    durationControl.max = video.duration

    soundControl = document.getElementById("soundLevel")
    soundControl.min = 0
    soundControl.max = 10
    soundControl.value = soundControl.max

    

    durationControl.addEventListener("input", setVideoDuration)

    const soundBtn = document.getElementById("volume")
    soundBtn.addEventListener("click", soundOff)

    soundControl.addEventListener("input", changeSoundBar)

    video.addEventListener("click", playStop)
    let playButtons = document.querySelectorAll(".js-play")
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener("click", playStop)
    }
    
    video.addEventListener("ended", function(){
        windowPlayBtn.classList.toggle("player__button--active")
        video.currentTime = 0
    })

    function playStop() {
        windowPlayBtn.classList.toggle("player__button--active")

        if (video.paused) {
            video.play()
            updateVideoDuration()
            intervalId = setInterval(updateVideoDuration, 1000 / 60)
        } else {
            video.pause()
            clearInterval(intervalId)
        }
    }

    function setVideoDuration() {
        video.currentTime = durationControl.value
        updateVideoDuration()
    }

    function updateVideoDuration() {
        durationControl.value = video.currentTime
        const step = video.duration / 100
        const percent = video.currentTime / step

        durationControl.style.background = `linear-gradient(90deg, #FEDB3F ${percent}%, #626262 ${percent}%)`
    }

    function soundOff() {
        if (video.volume === 0) {
            video.volume = soundStatus
            soundControl.value = soundStatus * 10 
            soundBtn.classList.remove("active")
        } else {
            soundStatus = video.volume
            video.volume = 0
            soundControl.value = 0
            soundBtn.classList.add("active")
        }
    }

    function changeSoundBar() {
        video.volume = soundControl.value / 10

        if (video.volume === 0) {
            soundBtn.classList.add("active")

        } else {
            soundBtn.classList.remove("active")
        }
        console.log(video.volume)
        console.log(soundControl.value / 10)
    }


})

