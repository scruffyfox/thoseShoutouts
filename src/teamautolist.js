// takes array of team strings
function TeamAutoList(teams) {
    this.teams = teams
    this.channelList = [] // [{channel: '', team: ''}]
}

TeamAutoList.prototype.load = function load(completionCallback) {
    
    if (teams.length === 0) {
        completionCallback()
        return
    }

    const _this = this
    getTeamChannels(teams[0], function(teamChannels) {
        _this.channelList = teamChannels
        completionCallback()
    })
}

TeamAutoList.prototype.isOnList = function isOnList(channel) {
    const filtered = this.channelList.filter(function(c){
        return c.channel.toLowerCase() === channel.toLowerCase()
    })

    return filtered.length > 0
}

function getTeamChannels(teamname, callback) {
    function httpCallback() {
        const data = JSON.parse(this.responseText)

        const teamChannels = data.users.map(function (user) {
            return {channel: user.display_name, team: teamname}
        })

        callback(teamChannels)
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