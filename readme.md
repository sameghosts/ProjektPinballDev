# (CD)Projekt One - SEI Red Dev - sean michael

For project one I really want to implement a game that uses collision and basic game states/logic that allows me to build on it through stretch goals to showcase some of my own assets including sound design and game music, as well as visual assets 

In this case I thought I would go for something simple, and thus I chose to clone a simple game you might not of heard of called Cyberpunk 2077. Should be a cakewalk.
![](https://i.imgur.com/MpiHBNZ.jpg)
![](https://i.imgur.com/l4lZoMn.png)

Ok completely kidding there! But I can imagine its a coin-flip 🤓 🤪 over if my Project 1 or CDPROJEKT RED has more bugs!

I came up with several ideas of project I thought I could implement and used a D20 to roll for which I would prioritize. 


| Game Idea | Game Description | Pros | Cons |
| -------- | -------- | -------- | ------|
| Roguelike     | dungeon cralwer iterative/ procedural level design    | could be really simple design and assets, relatively easy game states | implementing the procedural level design and other elements may be difficult |
| Simple Metroidvania    | Platformer with progression locks / gates; Simple and can be very stripped down assets and textures | game genre i love; wouldn't be that hard. mostly is movement and collision detection / platforming | multiple levels needed for metroidvania progression |
| Bemani / DDR clone    | Rhythm based keyboard clone of stepmania / DDR. arrows scroll up and you hit them in time and in the right pattern  | Would be simple timing and collision and allows for a lot of stretch goals | Worried about scoring / local storage. Win states are a little trickier and more high score. Will I have enought time to make all the music |
| Pinball   | basic 2d pinball with adaptive board and animations. | Allows for both changing looping background music and easy objects for collision and movement. Lots of potential for stretch and further implementation. | Will canvas be enough to handle collison and physics simulation. Will I break the browser without storing my sound files in an API? |

Ultimately both myself and the dice agree, and, I have chosen to go with pinball.
I think it will be the right amount of challenging code elements a. I also think that it will be a game that if implemented correctly will be easily playable by anyone who understands basic rules of pinball. This is opposed to other games I was thinking of which might function but not really allow for someone who hasn't built it to know how to play it / play it well.  Pinball enables a progression toward a clear MVP design, many stretch goals and a good project for my portfolio. 

## Process
- [x] Create Initial Markdown
- [ ] Tech Stack
- [ ] MVP Proposal
- [ ] Wireframing the Game for MVP deliverable
- [ ] Creating base game assets / canvas elements / game function and logic
- [ ] Test and try and break it
- [ ] local score storage
- [ ] MVP deliverable
- [ ] implement design assets (textures and sprites)
- [ ] implementation of sound libraries
- [ ] Retesting
- [ ] Adding multiple level design and stretch goals of a "tilt" mechanic

## Tech Stack
* Basic HTML and CSS for styling site outside of Game Space
* Game Space built using HTML 5 Canvas and Javascript funcitonality
* canvas game board objects and game board physics
* Javascript game logic and functions for play
* Basic sound elements / loop just using html game
* assets images
* assets sound
* reach and stretch: port to mobile / desktop in c#(unity) and or java


## Wire frames
If files do not work use imgur gallery
![](https://imgur.com/5eq8wv3)
![](https://imgur.com/NpvGMjX)
![](https://imgur.com/470Ruwb)
![](https://imgur.com/470Ruwb)

## MVP Goals
My MVP goals are as follows
* Build a functional pinball game with basic shapes and objects
* Have css windows that do game animations that are not in canvas using grid and combination of image and / style tricks
* Have my own physics functions based on collision detection
* movement physics based on collision functions of shape objects
* Score system Internal
* Score system for interaction
* game states like bonuses and goals
* At least one background loop of music 

## Stretch Goals
* cool themes / skins
* Have a second layer of a loop for the ball
* More bonuses and bonus animations (full screen and save game state?)
* dynamic assets and cool skins
* Multiple Levels
* Full sound design integration
* TILT! mechanic
* Local Storage
* multiplayer local

## Super Stretch
* Turn CSS windows into insane grids to become old school orange / red screen pixel art 
* multiplayer networked 
* C# / unity port for app 
* C# port for android / ios 
* Java web console port 

# Roadblocks 
* worried about fetching and APIs but certain I can figure it out
* getting all of my canvas display to work
* getting all of my canvas physics to work
* adding game states and game logic 
* animations may be too much 
* scoring and storage
* Input delay and lag 
* stretch Overburdening browser with sound / image assets 
    *Creating an api / database for my images/sound*
* stretch sound being too complicated with delay and input lag

