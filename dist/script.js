score = 0;
cross = true;
var playButton = document.querySelector('.splash-play__button');
var newDuration;
// variables declared without let or var keyword become global and can be accessed anywhere

gameOver = document.querySelector(".game-over");
gameOver.classList.add("hidden");
gameOver.classList.remove("visible");

function startGame() {
  animationDuration = 3+"s";
  score=0;
  updateScore(score);

  dino = document.querySelector(".game-dino");
  dino.style.left= 3.5 + "vw";
  dino.style.transform = "scaleX(1)";

  gameAudio = new Audio('../assets/music.mp3');
  gameOverAudio = new Audio('../assets/death.mp3');
  obstacle.classList.remove("hidden");
  obstacle.classList.add("visible");
  obstacle.classList.add("obstacleAnimation");
  obstacle.style.right = -10 + "vw";
  gameOver = document.querySelector(".game-over");
  gameOver.classList.add("hidden");
  setTimeout(() => {
    gameAudio.play();
  }, 1200);

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
      dino.style.transform = "scaleX(1)";
      dino.style.left = dinoX + 112 + "px";
    } else if (e.keyCode == 65 || e.keyCode == 37) {
      // LEFT
      // 65 is a
      // 37 is left arrow key
      dinoX = parseInt(
        window.getComputedStyle(dino, null).getPropertyValue("left")
      );
      dino.style.transform = "scaleX(-1)";
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
      gameOver.classList.remove("hidden");
      gameOver.classList.add("visible");

      gameAudio.pause();
      // death audio
      gameOverAudio.play();
      setTimeout(() => {
        gameOverAudio.pause();
      }, 1500);  
      
      // game over score
      scoreContainer = document.querySelector('.game-score__container');
      gameOverScore = document.querySelector('.game-over__score');
      gameOverScore.innerHTML = "Your Score: "+ score;
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
          console.log("top speed reached");
        }
      }, 345);
    }
  }, 100);


}

function updateScore(score) {
  scoreContainer = document.querySelector(".game-score__container");
  scoreContainer.innerHTML = "Your Score: " + score;
}

function hideSplash(){
  let splash = document.querySelector('.splash');
  splash.classList.remove("visible");
  splash.classList.add("hidden");
  setTimeout(() => {
    startGame();
  }, 1500);
}

playButton.addEventListener('click', hideSplash);
let obstacle = document.querySelector('.game-obstacle');
let splash = document.querySelector('.splash');
splash.classList.add("visible");
obstacle.classList.add("hidden");

// retry
let retry = document.querySelector('.game-over__retry-button');
retry.addEventListener('click', startGame);
retry.addEventListener('click', hideGameOver);

function hideGameOver(){
  gameover = document.querySelector('.game-over');
  gameover.classList.add('hidden');
  gameover.classList.remove('visible');
}