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