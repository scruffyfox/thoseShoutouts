# Animated Shoutouts by [thoseEyes](https://twitch.tv/thoseeyes) 
A simple animation that responds to the `!so` command in Twitch chat. It shows a streamers profile image and username.

NEW: Streamers can now be shouted out automatically as they enter chat by adding them to a custom list! Entire teams can also be added with ease. Check `starthere.htm` for details!

To get started, download the the code and double-click `starthere.htm` for full instructions on how to set this up.

### [Download Here](https://github.com/thoseEyes/thoseShoutouts/archive/main.zip)

## Updates
- FEATURE ([PR#8](https://github.com/thoseEyes/thoseShoutouts/pull/8)): Auto Shoutout and Team Shoutout Support! Check `starthere.htm` to set this up! Requested by [HollisTheSatisfactory](https://twitch.tv/HollisTheSatisfactory)
- IMPROVEMENT ([PR#7](https://github.com/thoseEyes/thoseShoutouts/pull/7)): Animation easing type can now be changed in config.js
- BUG FIX ([PR#4](https://github.com/thoseEyes/thoseShoutouts/pull/4)): Quick consecutive !so calls no longer stall (in wonky positions)
- BUG FIX ([PR#4](https://github.com/thoseEyes/thoseShoutouts/pull/4)): Quick consecutive !so calls no longer cause profile images to be replaced mid-animation

## Customisation

Open up **autoShoutoutList.txt** and **teamList.txt** to add channels and teams respectively for your auto shoutouts. You will need to setup a **Chat Password** for this also. Full details in `starthere.htm`.

Open up **config.js** and inside you can change the following variables:
- autoShoutoutChatMessage - template for the auto shoutout message sent to chat, variables: {user} {link}
- teamShoutoutChatMessage - template for the team shoutout message sent to chat, variables: {user} {link} {team} {teamlink}
- pauseDuration - the length of time the shoutout will pause in the centre of the screen (in milliseconds)
- rollInOutDuration - time taken for the image and text to roll in to the centre of the screen (in milliseconds)
- userBackgroundColour - background color of the label
- userTextColour - text color of the label
- animationEasing - easing used by anime.js, full list [here](https://animejs.com/documentation/#linearEasing)

## Limitations
Currently this code has the following shortcomings:

- Support only for 1920px by 350px sized source
- Fixed size animation
- Only one type of animation (roll in and out)
- Manual steps to setup config.js for authorisation

## Dependencies 
This code makes use of the following libraries

- [tmi.js](https://github.com/tmijs/tmi.js)
- [anime.js](https://github.com/juliangarnier/anime)
- [jQuery](http://jquery.com/)


## Credit
A credit and link back to this page [https://github.com/thoseEyes/thoseShoutouts](https://github.com/thoseEyes/thoseShoutouts) would be highly appreciated!
