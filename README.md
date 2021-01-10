---
permalink: /index.html
---

## Genetic Algorithm TODO

> each time user clicks the start button it changes the variable that is used to iterate through every rocket, which ends
> up causing OOB error, so either change it so it loops through population.length or find another fix later

> make it so the fitness algorithm takes into account the time it takes for the rocket to reach the goal as well

> start with simple crossover and mutation algorithms but then make them more complicated as development progresses

> might have to change the init function to use constructors instead so that i can use the genes generated by crossover functions and mutation

> possibly change it so that each time init() is called, the board object is deleted and recreated so that frames are not lost over time?

> add in functionality for changing the size of the asteroids and where they are placed on the screen
> and more customizability

> make the fitness algorithm more random and not always the top 4

> create a workaround for the fact that once they get through all their moves, they die, but this shouldn't be the case

> overwrite the same variables so that no new memory is used

> change allDead to instead rely on if the rocket is dead or if the rocket is done with its moves

> add in a line chart for the generational average fitness with d3.js

> make it so they can drag the obstacles onto the screen and have several obstacles

> make it so that instead of always setting the velocity to random when the object is constructed, it instead uses its first gene when the first generation is undone

> if all of the rockets are "finished" then it refuses to continue execution for some reason

> convergence happens way too damn fast

### Known Bugs

- when the new generations are created, throws errors when calculating direction, the fix i have implemented right now makes the first gen look funny

# Links for Later

[React JS Tutorial](https://www.youtube.com/watch?v=DLX62G4lc44&ab_channel=freeCodeCamp.org)
[Dev Ed React Tutorial](https://www.youtube.com/watch?v=dGcsHMXbSOA&ab_channel=DevEd)

### Regarding The Day of Birth

- currently working on step two, have to figure out a way to reveal the link to the next page