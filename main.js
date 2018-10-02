'use strict';

function buildDom (html){
  var div = document.createElement('div');
  div.innerHTML= html;
  return div.children[0];
}

function main() {
   var mainContainerElement = document.querySelector('#main-container');

  //-- Splash 

  var splashElement = null;
  var splashButton = null;

  var handleSplashClick = function (){
    destroySplash();
    buildGame();
  }

  function buildSplash(){
    splashElement = buildDom(`
      <main class="splash container">
       <div class="splash_content">
        <h1 class="splash_title">Defense Grid</h1>
        <p>Instructions: Use your 'a' (Red), 's' (Green), 'd' (Blue) keys to active each laser and defend the Earth from incoming colored asteroids</p>
        <button>Start</button>
      </div> 
        <iframe src="Audio/silence.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
        <audio class="intro" src="Audio/06 Requiem Mass： Lacrimosa.mp3" autoplay="true" loop="true"></audio>
      </main>
    `)

    mainContainerElement.appendChild(splashElement);

    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick);
    introAudio = document.querySelector('.intro');
    //introAudio.play();
  }

  function destroySplash(){
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  //-- Game

  var game = null;

  var handleGameOver = function(){
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

   var gameOverElement = null;
   var gameOverButton = null;
   var gameOverScore = null;

   var handleGameOverClick = function(){
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