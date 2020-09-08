function ShoutoutModel(username, imageURL) {
    this.username = username
    this.imageURL = imageURL
}

let shoutoutQueue
let isAnimating
let client

function init() {

    shoutoutQueue = []
    isAnimating = false

    const tmiConfig = {
        "channels": [
            channel
        ]
    }

    client = new tmi.client(tmiConfig)

    client.on('message', onMessageHandler)
    client.on('connected', onConnectedHandler)

    client.connect()

    setColours()
}

function onMessageHandler(target, context, msg, self) {

    if (context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))) {

        if (msg.startsWith('!so')) {
            var username = msg.split(' ')[1]

            if (username.startsWith('@')) {
                username = username.substring(1)
            }

            shoutout(username)
        }
    }
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

function shoutout(twitchUsername) {
    getProfileImageURL(twitchUsername, function (username, imageURL) {
        const shoutoutModel = new ShoutoutModel(username, imageURL)
        pushShoutout(shoutoutModel)
    })
}

function doAnimation(shoutoutModel) {

    onShoutoutStart()

    const img = `<img src="${shoutoutModel.imageURL}"/>`
    document.getElementById('content').innerHTML = img
    document.getElementById('text').innerHTML = shoutoutModel.username

    let imgAnimIn = anime({
        targets: '.imagepos',
        translateX: 1110,
        rotate: '1turn',
        autoplay: false,
        duration: rollInOutDuration,
        endDelay: pauseDuration
    })

    imgAnimIn.finished.then(function () {
        imgAnimIn.reverse()
        imgAnimIn.play()
        imgAnimIn.finished.then(onShoutoutEnd)
    })

    let textAnimIn = anime({
        targets: '.textpos',
        translateX: -1310,
        autoplay: false,
        duration: rollInOutDuration,
        endDelay: pauseDuration
    })

    textAnimIn.finished.then(function () {
        textAnimIn.reverse()
        textAnimIn.play()
    })

    imgAnimIn.play()
    textAnimIn.play()
}

function onShoutoutStart() {
    isAnimating = true
}

function onShoutoutEnd() {
    isAnimating = false
    playNextShoutout()
}

function pushShoutout(shoutoutModel) {
    shoutoutQueue.push(shoutoutModel)
    playNextShoutout()
}

function playNextShoutout() {

    if (shoutoutQueue.length === 0 || isAnimating) {
        return
    }

    const nextShoutout = shoutoutQueue[0]
    shoutoutQueue.shift()
    doAnimation(nextShoutout)
}

function setColours() {
    text.style.backgroundColor = userBackgroundColour
    text.style.color = userTextColour
}

function getProfileImageURL(username, callback) {
    function httpCallback() {
        const data = JSON.parse(this.responseText)
        const imageURL = data.data[0].profile_image_url

        callback(username, imageURL)
    }

    const httpRequest = new XMLHttpRequest()

    httpRequest.addEventListener('load', httpCallback)
    httpRequest.open('GET', `https://api.twitch.tv/helix/users?login=${username}`)
    httpRequest.setRequestHeader('Client-ID', config['Client-ID'])
    httpRequest.setRequestHeader('Authorization', config['Authorization'])
    httpRequest.send()
}