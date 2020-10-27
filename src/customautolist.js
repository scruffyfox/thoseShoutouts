// takes array of channel name strings
function CustomAutoList(channels) {
    this.channels = channels
}

CustomAutoList.prototype.isOnList = function isOnList(channel) {
    const filtered = this.channels.filter(function(c) {
        return c.toLowerCase() === channel.toLowerCase()
    })

    return filtered.length > 0
}