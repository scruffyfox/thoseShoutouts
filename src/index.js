let client = false
let shoutouts = false

let spokenUsers = {}
let teamUsers = []

function init() {

    const tmiConfig = {
        "channels": [
            channel
        ]
    }

    shoutouts = new Shoutouts({
        contentElementId: 'content', 
        textElementId: 'text',
        pauseDuration: pauseDuration, 
        rollInOutDuration: rollInOutDuration,
        animationEasing: animationEasing
    })

    loadTeam(team)

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

    if (isOnTeam(context.username) && spokenUsers[context.username] === undefined) {
        shoutout(context['display-name'])
    }

    spokenUsers[context.username] = true
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
}

function setColours() {
    text.style.backgroundColor = userBackgroundColour
    text.style.color = userTextColour
}

function shoutout(twitchUsername) {
    getProfileImageURL(twitchUsername, function (username, imageURL) {
        shoutouts.push({
            username: username, 
            imageURL: imageURL
        })
    })
}

function loadTeam(teamName) {

    if (teamName === undefined || teamName === '') {
        return
    }

    getTeamMembers(teamName, function(teamMembers) {
        teamUsers = teamMembers
    })
}

function isOnTeam(username) {
    
    const filtered = teamUsers.filter(function(user){
        return user.name === username
    })

    return filtered.length > 0
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

function getTeamMembers(teamname, callback) {
    function httpCallback() {
        const data = JSON.parse(this.responseText)

        const teamMembers = data.users.map(function (user) {
            return { name: user.name, display_name: user.display_name, url: user.url, game: user.game }
        })

        callback(teamMembers)
    }

    // The endpoint used here is deprecated
    // and will eventually be shutdown by Twitch
    const httpRequest = new XMLHttpRequest()

    httpRequest.addEventListener('load', httpCallback)
    httpRequest.open('GET', `https://api.twitch.tv/kraken/teams/${teamname}`)
    httpRequest.setRequestHeader('Client-ID', config['Client-ID'])
    httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
    httpRequest.send()
}