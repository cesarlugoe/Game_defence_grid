'use strict';

function buildDom (html){
  const div = document.createElement('div');
  div.innerHTML= html;
  return div.children[0];
}

function main() {
   let mainContainerElement = document.querySelector('#main-container');

  //-- Splash 

  let splashElement = null;
  let splashButton = null;

  let handleSplashClick = () => {
    destroySplash();
    buildGame();
  }

  function buildSplash(){
    splashElement = buildDom(`
      <main class="splash container">
       <div class="splash_content">
        <h1 class="splash_title">DEFENSE GRID</h1>
        <p>Instructions: Use your 'a' (<span class="red">Red</span>), 's' (<span class="green">Green</span>), 'd' (<span class="blue">Blue</span>) keys to active each laser and defend the Earth from incoming colored asteroids.</p>
        <button>Start</button>
      </div> 
        <iframe src="Audio/silence.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
        <audio class="intro" src="Audio/06 Requiem Mass： Lacrimosa.mp3" autoplay="true" loop="true"></audio>
      </main>
    `)

    mainContainerElement.appendChild(splashElement);

    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick);
  }

  function destroySplash(){
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  //-- Game

  let game = null;

  const handleGameOver = () => {
    destroyGame();
    buildGameOver(game.score);
  }

  function buildGame() {
    game = new Game (mainContainerElement);
    game.onOver(handleGameOver);
  }

  function destroyGame(){
    game.destroy();
  }

  //-- Game Over

   let gameOverElement = null;
   let gameOverButton = null;
   let gameOverScore = null;

   const handleGameOverClick = () => {
     destroyGameOver();
     buildSplash();
   }

  function buildGameOver (score, userName){
    gameOverElement = buildDom(`
    <main class="gameover container">
      <div class="gameover_content">
        <h1>Game Over</h1>
        <p>Your score:<span class="score"></span></p>
        <button>Play Again</button>
      </div>
      <div class="video container">
        <video autoplay id="gameover_video">
          <source src="Audio/Discovery Channel - Large Asteroid Impact Simulation.mp4" type="video/mp4">
        </video>
      </div>  
    </main>
    `)
     mainContainerElement.appendChild(gameOverElement);

     gameOverScore = document.querySelector('.score');
     gameOverScore.innerText = " " + game.score;
     gameOverButton = document.querySelector('button');

     gameOverButton.addEventListener('click', handleGameOverClick);

  }

  function destroyGameOver(){
    gameOverButton.removeEventListener('click', handleGameOverClick);
    gameOverElement.remove();
  }

buildSplash();
}
//load
document.addEventListener('DOMContentLoaded', main);