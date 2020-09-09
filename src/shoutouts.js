function Shoutouts(config) {
    this._config = config
    this._shoutoutQueue = []
    this._isAnimating = false
}

Shoutouts.prototype.push = function push(shoutoutModel) {
    this._shoutoutQueue.push(shoutoutModel)
    this.playNext()
}

Shoutouts.prototype.playNext = function playNext() {

    if (this._shoutoutQueue.length === 0 || this._isAnimating) {
        return
    }

    const nextShoutout = this._shoutoutQueue[0]
    this._shoutoutQueue.shift()

    updateHTML(nextShoutout, this._config)

    const _this = this
    const onShoutoutStart = function() {
        _this._isAnimating = true
    }

    const onShoutoutEnd = function() {
        _this._isAnimating = false
        _this.playNext()
    }

    doAnimation({
        contentElementId: `#${this._config.contentElementId}`, 
        textElementId:  `#${this._config.textElementId}`,
        pauseDuration: this._config.pauseDuration, 
        rollInOutDuration: this._config.rollInOutDuration,
        animationEasing: this._config.animationEasing,
        onShoutoutStart: onShoutoutStart, 
        onShoutoutEnd: onShoutoutEnd
    })
}

function updateHTML(shoutoutModel, config) {
    const img = `<img src="${shoutoutModel.imageURL}"/>`
    document.getElementById(config.contentElementId).innerHTML = img
    document.getElementById(config.textElementId).innerHTML = shoutoutModel.username
}