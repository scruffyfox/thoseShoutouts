function MessageGenerator(customTemplate, teamTemplate, raidTemplate) {
    this.customTemplate = customTemplate
    this.teamTemplate = teamTemplate
    this.raidTemplate = raidTemplate
}

MessageGenerator.prototype.custom = function custom(channel) {
    let message = this.customTemplate
    message = message.replace('{user}', channel)
    message = message.replace('{link}', `https://twitch.tv/${channel}`)
    return message
}

MessageGenerator.prototype.raid = function custom(channel, count) {
    let message = this.raidTemplate
    message = message.replace('{user}', channel)
    message = message.replace('{count}', count)
    message = message.replace('{link}', `https://twitch.tv/${channel}`)
    return message
}

MessageGenerator.prototype.team = function custom(channel) {
    let message = this.teamTemplate
    message = message.replace('{user}', channel.channel_display_name)
    message = message.replace('{link}', `https://twitch.tv/${channel.channel}`)
    message = message.replace('{team}', `${channel.team_display_name}`)
    message = message.replace('{teamlink}', `https://twitch.tv/team/${channel.team}`)
    return message
}