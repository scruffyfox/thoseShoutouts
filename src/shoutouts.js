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
    console.log(`* Connected to ${addr}:${port}`)
}

function shoutout(twitchUsername) {
    getProfileImageURL(twitchUsername, function (username, imageURL) {
        const shoutoutModel = {username: username, imageURL: imageURL}
        pushShoutout(shoutoutModel)
    })
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

    const listener = {onShoutoutStart: onShoutoutStart, onShoutoutEnd: onShoutoutEnd}
    const config = {pauseDuration: pauseDuration, rollInOutDuration: rollInOutDuration}
    doAnimation(nextShoutout, listener, config)
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