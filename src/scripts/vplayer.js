
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