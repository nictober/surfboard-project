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