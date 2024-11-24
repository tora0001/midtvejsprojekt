Flappy Flap game

updatePlayer:

- Tilføj gravity til spillerens hastighed.
- Opdater spillerens y-position.
- Hvis spilleren rammer toppen eller bunden af skærmen, afslut spillet.

generateObstacle:

- Lav et nyt objekt med en tilfældig højde.
- Placer objektet uden for højre side af skærmen.
- Tilføj objektet til en liste af forhindringer.

updateObstacles:

- Flyt alle forhindringer mod venstre.
- Fjern forhindringer, der er uden for skærmen.

checkCollision:

- For hver forhindring:
  - Hvis spilleren overlapper med forhindringen, afslut spillet.

endGame:

- Stop spil-loopet.
- Vis en "Game Over"-besked.

Algoritmer brugt:

- Tyngdekraft
- Bevægelse af fuglen
- Kollisiondetektion
- Scoreberegning
- Generation af rørene
- Reset af spillet

Datastruktur brugt:

- Fugl vises som et objekt (x, y) og dimensioner (width, height)
- Rørene gemt i array
- velocityY og gravity til at simulere bevægelse
- spil status og score
