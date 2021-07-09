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

   
})