---
permalink: /index.html
---

## Genetic Algorithm TODO

> the longer the simulation is running, the lower the framerate becomes so figure out some way to fight this

> basically have each chromosome be an x and y and have a setInterval function running in the background
> that updates their velocities every couple of seconds

> each time user clicks the start button it changes the variable that is used to iterate through every rocket, which ends
> up causing OOB error, so either change it so it loops through population.length or find another fix later

> change up the way the chromosome iteration works because that function will be running forever and the timing might be off since its not connected
> to when the actual frames are updated because its a setInterval, so this might make it inconsistent