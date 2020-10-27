let client = false
let shoutouts = false
let teamAutoList = false

let spokenUsers = {}

function init() {

    setColours()

    shoutouts = new Shoutouts({
        contentElementId: 'content', 
        textElementId: 'text',
        pauseDuration: pauseDuration, 
        rollInOutDuration: rollInOutDuration,
        animationEasing: animationEasing,
        messageTemplate: chatMessageTemplate
    })

    teamAutoList = new TeamAutoList(teams)
    teamAutoList.load(function() {
        connectTMIClient()
    })
}

function connectTMIClient() {

    const tmiConfig = {
        "channels": [
            channel
        ]
    }

    if (chatPassword !== undefined && chatPassword !== '') {
        tmiConfig["identity"] = {
            "username": channel,
            "password": chatPassword
        }
    }

    client = new tmi.client(tmiConfig)

    client.on('message', onMessageHandler)
    client.on('connected', onConnectedHandler)

    client.connect()
}

function onMessageHandler(target, context, msg, self) {

    // Manual Shoutout
    if (context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))) {

        if (msg.startsWith('!so')) {
            var username = msg.split(' ')[1]

            if (username.startsWith('@')) {
                username = username.substring(1)
            }

            shoutout(username)
        }
    }

    // Team Auto List Shoutout
    if (teamAutoList.isOnList(context.username) && spokenUsers[context.username] === undefined) {
        shoutout(context['display-name'])
    }

    // Track users who have spoken
    spokenUsers[context.username] = true
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

function setColours() {
    text.style.backgroundColor = userBackgroundColour
    text.style.color = userTextColour
}

function say(msg) {
    client.say(channel, msg)
}

function shoutout(twitchUsername) {
    getProfileImageURL(twitchUsername, function (username, imageURL) {
        shoutouts.push({
            username: username, 
            imageURL: imageURL,
            chatCallback: say
        })
    })
}

// Network 

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