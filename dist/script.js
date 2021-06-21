score = 0;
cross = true;
// variables declared without let or var keyword become global and can be accessed anywhere

function startGame() {
  // onkeydown is triggered when a key is pressed
  // e.keycode will give the key code of the key pressed
  document.onkeydown = function (e) {
    dino = document.querySelector(".game-dino");
    // console.log(e.keyCode);
    if (e.keyCode == 87 || e.keyCode == 38 || e.keyCode == 32) {
      // JUMP
      // 87 is w
      // 38 is up arrow key
      // 32 is space bar
      dino.classList.add("animateDino");
      setTimeout(() => {
        dino.classList.remove("animateDino");
      }, 1100);
    } else if (e.keyCode == 68 || e.keyCode == 39) {
      // RIGHT
      // 68 is d
      // 39 is right arrow key
      dinoX = parseInt(
        window.getComputedStyle(dino, null).getPropertyValue("left")
      );
      dino.style.left = dinoX + 112 + "px";
    } else if (e.keyCode == 65 || e.keyCode == 37) {
      // LEFT
      // 65 is a
      // 37 is left arrow key
      dinoX = parseInt(
        window.getComputedStyle(dino, null).getPropertyValue("left")
      );
      dino.style.left = dinoX - 112 + "px";
    }
  };

  setInterval(() => {
    dino = document.querySelector(".game-dino");
    gameOver = document.querySelector(".game-over");
    obstacle = document.querySelector(".game-obstacle");

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    ox = parseInt(
      window.getComputedStyle(obstacle, null).getPropertyValue("left")
    );
    oy = parseInt(
      window.getComputedStyle(obstacle, null).getPropertyValue("top")
    );

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 120 && offsetY < 30) {
      obstacle.classList.remove("obstacleAnimation");
      gameOver.style.visibility = "visible";
    } else if (offsetX > 180 && offsetX < 250 && cross) {
      score += 1;
      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 1000);
      setTimeout(() => {
        animationDuration = parseFloat(
          window
            .getComputedStyle(obstacle, null)
            .getPropertyValue("animation-duration")
        );
        console.log(animationDuration);
        if (animationDuration >= 1.2) {
          newDuration = animationDuration - 0.05;
          console.log(newDuration);
          obstacle.style.animationDuration = newDuration + "s";
        } else if (newDuration <= 1.2) {
          console.log("topspeed reached");
        }
      }, 345);
    }
  }, 100);

}

function updateScore(score) {
  scoreContainer = document.querySelector(".game-score__container");
  scoreContainer.innerHTML = "Your Score: " + score;
}

document.addEventListener('DOMContentLoaded', startGame);