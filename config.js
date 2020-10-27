// REQUIRED
// Put your channel name here e.g., 'thoseEyes'
const channel = ''

// REQUIRED
// Paste the token from the setup here e.g., 'rtyuwusdfghz1wa0lsdfgryvqasd'
const token = ''

// OPTIONAL
// Paste Twitch Chat OAuth Password from here: https://twitchapps.com/tmi/
// e.g., 'oath:somethingsomething'
const chatPassword = ''

// OPTIONAL
// Channel names for auto shoutouts i.e., ['AyupRyan', 'yuecake']
const autoShoutouts = []

// OPTIONAL
// Team names for auto shoutouts i.e., CNT Club is ['cntclub']
// Taken from the team URL https://www.twitch.tv/team/cntclub
// Multiple teams are set like this: ['cntclub', 'weesquad']
const teams = []

// Template for the shoutout message in chat use
// Variables: {user} {link}
const chatMessageTemplate = `/me Go follow {user}, we love them! {link}`

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
