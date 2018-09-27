'use strict';

function buildDom (html){
  var div = document.createElement('div');
  div.innerHTML= html;
  return div.children[0];
}

function main() {
  //  var mainContainerElement = document.querySelector('#main-container');

  // Splash place holders
    var splashElement = null;
    var splashButton = null;

    var handleSplashClick = function (){
      destroySplash();
      buildGame();
    }

    function buildSplash(){
      splashElement = buildDom(`
        <main class="splash container">
          <h1 class="splash_title">Defense Grid</h1>
          <p>Instructions: Use your 'A' key to active the laser and defend the Earth from incoming asteroids</p>
          <button>Start</button>
        </main>
      `)

      mainContainerElement.appendChild(splashElement);

      splashButton = document.querySelector('button');
      splashButton.addEventListener('click', handleSplashClick);
    }

    



}
