// variables

// game components
var dino = document.querySelector(".game-dino");
var obstacle = document.querySelector(".game-obstacle");
var gameOver = document.querySelector(".game-over");
var scoreContainer = document.querySelector(".game-score__container");

// audio
var gameAudio = new Audio("../assets/music.mp3");
var gameOverAudio = new Audio("../assets/death.mp3");

// splash screen
var playButton = document.querySelector(".splash-play__button");
var splash = document.querySelector(".splash");

// game values
var score = 0;
// score of the player
var cross = true;
// whether the obstacle has crossed the dragor
// whether the dragon has jumped over the obstacle
  // if cross is false it means that the obstacle is under the dino or just passing the dino
  // if cross is true it means that the obstacle is not very near the dino and is not passing the dino and is somewhere else on the playground

// game component position values
dinoX = parseInt(
  window.getComputedStyle(dino, null)
  .getPropertyValue("left")
);
// X axis value of dino

dinoY = parseInt(
  window.getComputedStyle(dino, null)
  .getPropertyValue("top")
);
// Y axis value of dino

obstacleX = parseInt(
  window.getComputedStyle(obstacle, null).getPropertyValue("left")
);
// X axis value of obstacle

obstacleY = parseInt(
  window.getComputedStyle(obstacle, null).getPropertyValue("top")
);
// Y axis value of obstacle

distanceX = Math.abs(dinoX - obstacleX);
// X axis distance between the dino and the obstacle

distanceY = Math.abs(dinoY - obstacleY);
// Y axis distance between the dino and the obstacle

animationDuration = parseFloat(
  window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration")
);
// the duration of the obstacle animation AKA the obstacle speed
// default value = 3s

var newDuration;
// the new animation duration of the obstacle AKA the new obstacle speed

// variables declared without let or var keyword become global and can be accessed anywhere

// splash screen
playButton.addEventListener("click", hideSplash);
// the hideSplash function is started on the play button click

splash.classList.add("visible");
// makes the splash screen visible
obstacle.classList.add("hidden");
// hides the obstacle so that it is not visible behind the splash screen

// function to hide the splash screen
function hideSplash() {
  splash.classList.remove("visible");
  // removes the visible class
  splash.classList.add("hidden");
  // hides the splash screen
  setTimeout(() => {
    startGame();
  }, 1500);
  // starts the game in 1500ms, so that the player can set himself to the environment
}


// starts the main game
function startGame() {
  setTimeout(() => {
    gameAudio.play();
  }, 300);
  // audio is turned on, 300ms after the play button click
  // audio is played after a delay so that the user can see the environment and then get into the play mode

  obstacle.classList.remove("hidden");
  obstacle.classList.add("visible");
  // makes the obstacle visible
  // the obstacle is hidden due to splash screen

  obstacle.style.right = -3 + "vw";
  // takes the obstacle out of the screen to prevent random spawning of the obstacle
  gameOver.classList.add("hidden");
  // hides the game over message(default)


  // PLAYER CONTROLS 
  // onkeydown is triggered when a key is pressed
  // e.keycode will give the key code of the key pressed
  document.onkeydown = function (e) {
    if (e.keyCode == 87 || e.keyCode == 38 || e.keyCode == 32) {
      // JUMP
      // 87 is w
      // 38 is up arrow key
      // 32 is space bar
      dino.classList.add("animateDino");
      // animates the dino(player) to jump when specific key is pressed, see _game.scss
      setTimeout(() => {
        dino.classList.remove("animateDino");
        // stops the dino animation after 800 ms, thus stopping the dino jump
      }, 800);
    } 
    else if (e.keyCode == 68 || e.keyCode == 39) {
      // RIGHT
      // 68 is d
      // 39 is right arrow key
      dino.style.transform = "scaleX(1)";
      // makes the dino look towards the right
      dino.style.left = dinoX + 8.75 + "vw";
      // makes the dino walk towards the right
    } 
    else if (e.keyCode == 65 || e.keyCode == 37) {
      // LEFT
      // 65 is a
      // 37 is left arrow key
      dino.style.transform = "scaleX(-1)";
      // makes the dino look towards right
      dino.style.left = dinoX - 8.75 + "vw";
      // makes the dino move towards left
    }
  };

  setInterval(() => {
    // every 100ms check the following:
    if (distanceX < 120 && distanceY < 30) {
      // if the distance between the dino and obstacle on the X axis is less than 120px
      // if the distance between the dino and obstacle on the Y axis is less than 30px
      // it just acts like `is touching` function
      // if the distance between the dino and obstacle on X axis is less than 120px, they both are touching each other
      // if the distance between the dino and obstacle on X axis is less than 120px as well as the distance between the both on the Y axis is less than 30px, they are touching each other
      obstacle.classList.remove("obstacleAnimation");
      // stops the obstacle movement AKA the obstacle animation
      gameOver.classList.remove("hidden");
      gameOver.classList.add("visible");
      // makes the Game Over visible

      gameAudio.pause();
      // pauses the game audio

      // death audio
      gameOverAudio.play();
      // plays the death audio

      setTimeout(() => {
        gameOverAudio.pause();
      }, 1500);
      // stops the death audio after 1.5s

    } 
    else if (distanceX > 180 && distanceX < 250 && cross) {
      // if the distance between the dino and obstacle on the X axis is in between 180px and 250px
      // if cross is true
      score += 1;
      // increment the score by 1
      updateScore(score);
      // calls the updateScore function with the score variable as the parameter

      // cross varaible defines whether the variable is passing the dino or not
      // if cross is false it means that the obstacle is under the dino or just passing the dino
      // if cross is true it means that the obstacle is not very near the dino and is not passing the dino and is somewhere else on the playground
      cross = false;
      // sets cross to false

      setTimeout(() => {
        cross = true;
      }, 1000);
      // sets cross to true after 1s, when the obstacle has passed the dino

      setTimeout(() => {
        if (newDuration >= 1.2) {
          // if the value of aniation Duration is greater than 1.2s
          // default value of animationDuration = 3s;
          newDuration = animationDuration - 0.05;
          // everytime the dino passes the obstacle the speed of the obstacle increases
          // the animation duration of the obstacle is decreased by 0.05s so it appears to move faster everytime the dino crosses it
          obstacle.style.animationDuration = newDuration + "s";
          // sets the animation duration to the calculated new duration of the animation and adds a 's' at the end of the value, depicting seconds
        } 
        else if (newDuration <= 1.2) {
          // if the animation duration is less than 1.2s
          // the animation duration doesnt increase if the animation duration is lesser or equal to 1.2
          // the speed of the obstacle doesnt increase after it has reached 1.2s because it would be extremely difficult for the player to handle such high speed
          // console.log("top speed reached");
        }
      }, 340);
      // this is done 340ms after the obstacle has passed the dino because if we increase the speed while the obstacle is passing the dino, it would cause a jerk, distracting the player at the crucial moment
    }
  }, 100)
  // this all is checked every 100ms
  // every 100ms it is checked whether the obstacle is touching the dino
}

function updateScore(score) {
  // this function updates the score in the DOM
  scoreContainer.innerHTML = "Your Score: " + score;
  // the parameter supplied is set as the score
}