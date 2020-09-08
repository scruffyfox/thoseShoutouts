function doAnimation(animationData) {

    animationData.onShoutoutStart()

    const imgAnimIn = anime({
        targets: animationData.contentElementId,
        translateX: 1110,
        rotate: '1turn',
        autoplay: false,
        duration: animationData.rollInOutDuration,
        endDelay: animationData.pauseDuration
    })

    imgAnimIn.finished.then(function () {
        imgAnimIn.reverse()
        imgAnimIn.play()
        imgAnimIn.finished.then(animationData.onShoutoutEnd)
    })

    const textAnimIn = anime({
        targets: animationData.textElementId,
        translateX: -1310,
        autoplay: false,
        duration: animationData.rollInOutDuration,
        endDelay: animationData.pauseDuration
    })

    textAnimIn.finished.then(function () {
        textAnimIn.reverse()
        textAnimIn.play()
    })

    imgAnimIn.play()
    textAnimIn.play()
}