function AnimationListener(onShoutoutStart, onShoutoutEnd) {
    this.onShoutoutStart = onShoutoutStart
    this.onShoutoutEnd = onShoutoutEnd
}

function AnimationConfig(pauseDuration, rollInOutDuration) {
    this.pauseDuration = pauseDuration
    this.rollInOutDuration = rollInOutDuration
}

function doAnimation(shoutoutModel, listener, config) {

    listener.onShoutoutStart()

    const img = `<img src="${shoutoutModel.imageURL}"/>`
    document.getElementById('content').innerHTML = img
    document.getElementById('text').innerHTML = shoutoutModel.username

    let imgAnimIn = anime({
        targets: '.imagepos',
        translateX: 1110,
        rotate: '1turn',
        autoplay: false,
        duration: config.rollInOutDuration,
        endDelay: config.pauseDuration
    })

    imgAnimIn.finished.then(function () {
        imgAnimIn.reverse()
        imgAnimIn.play()
        imgAnimIn.finished.then(listener.onShoutoutEnd)
    })

    let textAnimIn = anime({
        targets: '.textpos',
        translateX: -1310,
        autoplay: false,
        duration: config.rollInOutDuration,
        endDelay: config.pauseDuration
    })

    textAnimIn.finished.then(function () {
        textAnimIn.reverse()
        textAnimIn.play()
    })

    imgAnimIn.play()
    textAnimIn.play()
}