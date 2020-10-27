function SpokenUsers() {
    this.spoken = {}
}

SpokenUsers.prototype.add = function add(user) {
    this.spoken[user] = true
}

SpokenUsers.prototype.hasSpoken = function hasSpoken(user) {
    return this.spoken[user] === true
}