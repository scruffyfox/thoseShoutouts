// REQUIRED
// Put your channel name here e.g., 'thoseEyes'
const channel = 'yourChannelNameHere'

// REQUIRED
// Paste the token from the setup here e.g., 'rtyuwusdfghz1wa0lsdfgryvqasd'
const token = 'yourTokenHere'

// OPTIONAL
// Paste Twitch Chat OAuth Password from here: https://twitchapps.com/tmi/
// e.g., 'oath:somethingsomething'
const chatPassword = ''

// Template for the auto shoutout message sent to chat
// Variables: {user} {link}
const autoShoutoutChatMessage = '/me Go follow {user}, we love them! {link}'

// Template for the team shoutout message sent to chat
// Variables: {user} {link} {team} {teamlink}
const teamShoutoutChatMessage = "/me Go follow {user}, we love them! {link} They're part of the {team}! {teamlink}"

// Set how long the shoutout will stay on screen for here
// Value is milliseconds so 1 second = 1000
const pauseDuration = 500

// Set how long it takes for the animation to roll in and out here
// Value is milliseconds so 1 second = 1000
const rollInOutDuration = 1000

// Background color of the label
const userBackgroundColour = '#43cefb'

// Text color of the label
const userTextColour = '#ffffff'

// Easing - Full list here https://animejs.com/documentation/#linearEasing
const animationEasing = 'easeOutElastic(1, .5)'

// Do not touch this stuff x
const config = { 'Client-ID': '9l8ufsalz4hqlzzl1g0mr7e38uxx1m',
                 'Authorization': `Bearer ${token}` }
