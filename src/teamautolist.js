// takes array of team strings
function TeamAutoList(teams) {
    this.teams = teams
    this.channelList = [] // [{channel: '', team: ''}]
}

TeamAutoList.prototype.load = async function load() {
    
    _this = this
    const promises = []
    
    for (const t of this.teams) {
        const p = getTeamChannels(t).then(function(channels) {
            _this.channelList.push(...channels)
        })
        promises.push(p)
    }

    return Promise.all(promises)
}

TeamAutoList.prototype.get = function get(channel) {
    const filtered = this.channelList.filter(function(c) {
        return c.channel === channel
    })

    return filtered[0]
}

function getTeamChannels(teamname) {
    return new Promise(function(resolve, reject) {
        function httpCallback() {
            const data = JSON.parse(this.responseText)
    
            const teamChannels = data.users.map(function (user) {
                return {
                    channel: user.name, 
                    channel_display_name: user.display_name, 
                    team: teamname, 
                    team_display_name: data.display_name
                }
            })
    
            resolve(teamChannels)
        }
    
        // The endpoint used here is deprecated
        // and will eventually be shutdown by Twitch
        const httpRequest = new XMLHttpRequest()
    
        httpRequest.addEventListener('load', httpCallback)
        httpRequest.open('GET', `https://api.twitch.tv/kraken/teams/${teamname}`)
        httpRequest.setRequestHeader('Client-ID', config['Client-ID'])
        httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
        httpRequest.send()
    })
}