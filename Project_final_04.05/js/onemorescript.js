const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const lastPage = document.getElementById('lastpage');

lastPage.addEventListener('click', startGame);

function startGame() {
  lastPage.style.display = 'none';

  startTimer();
}


const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

const backgroundImage = new Image();
backgroundImage.src = '../images/background.jpg';

// const playerImage = new Image();
// playerImage.src = '../images/snake-head.png';

const playerImageWidth = 111;
const playerImageHeight = 105; 

const playerImages = [
  '../images/1.png',
  '../images/2.png',
  '../images/3.png',
  '../images/4.png'
];

let currentFrame = 0; // Frame actuelle de l'animation
let frameCount = 0; // Compteur pour la vitesse de l'animation
const frameSpeed = 11; // Vitesse de l'animation (plus le nombre est faible, plus l'animation sera rapide)

const playerImage = new Image();
playerImage.src = playerImages[currentFrame];

function animateplayerImage() {
  frameCount++;

  if (frameCount % frameSpeed === 0) {
    currentFrame++;
    if (currentFrame >= playerImages.length) {
      currentFrame = 0;
    }

    playerImage.src = playerImages[currentFrame];
  }

  requestAnimationFrame(animateplayerImage);
}

animateplayerImage();



const image1 = new Image();
image1.src = '../images/carton.png';
const image2 = new Image();
image2.src = '../images/butle.png';
const image3 = new Image();
image3.src = '../images/wheel.png';

const player = {
  x: canvas.width / 2 - playerImage.width / 2,
  y: canvas.height / 2 - playerImage.height / 2 + 50,
  width: playerImage.width,
  height: playerImage.height,
  speed: 5,
  direction: null
};

const mapData = {
  squareWidth: 34,
  nbSquareByLine: 41
};

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]];

const images = [
  { image: image1, x: 200, y: 300, width: 65, height: 65, visible: true, timer: 10, remainingAppearances: 3 },
  { image: image2, x: 500, y: 400, visible: true, timer: 10, remainingAppearances: 3 },
  { image: image3, x: 800, y: 200, visible: true, timer: 10, remainingAppearances: 3 }
];

function drawBackground() {
  c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  c.drawImage(playerImage, player.x, player.y);
}

function drawImages() {
  images.forEach((img) => {
    if (img.visible) {
      c.drawImage(img.image, img.x, img.y);
    }
  });
}


//déchets
function repositionImage(img, catchedByPlayer) {

  if (img.remainingAppearances <= 0) return;

  let newX, newY;
  let isColliding = true;
  let isNotOnPath = true;

  while (isColliding && isNotOnPath) {
    newX = Math.floor(Math.random() * 1050) + 170; // max 1220 34 * 41 = 1394
    newY = Math.floor(Math.random() * 620) + 40; // max 660

    isNotOnPath = !foundAFreeMapSquare(newX, newY);

    isColliding = checkCollision(newX, newY);
  }

  newX = Math.floor(newX / mapData.squareWidth) * mapData.squareWidth;
  newY = Math.floor(newY / mapData.squareWidth) * mapData.squareWidth;

  img.x = newX;
  img.y = newY;

  if (catchedByPlayer === true) {
    img.remainingAppearances--;
    if (img.remainingAppearances <= 0) img.visible = false;
  }

  console.log(img);
  img.timer = 10;

}

function foundAFreeMapSquare(x, y) {

  const pos = getPositionOnMap(x, y, 65, 65);
  console.log(pos);
  return map[pos.y][pos.x] == 0;
}

function checkCollision(x, y) {
  if (
    player.x + player.width > x &&
    player.x < x + images[0].image.width &&
    player.y + player.height > y &&
    player.y < y + images[0].image.height
  ) {
    return true;
  }
  return false;
}


let speedIncrement = 0.000001;

function detectCollision() {
  images.forEach((img) => {
    if (img.visible) {
      const distanceX = player.x - img.x;
      const distanceY = player.y - img.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 60) {
        repositionImage(img, true); 
        updateScore(img.image); 
      } else {
        img.timer -= 0.019 + speedIncrement; 
        if (img.timer <= 0) {
          repositionImage(img, false);
        }
      }
    }
  });

  speedIncrement += 0.00001;
}

function updateScore(img) {
  const score1Element = document.querySelector('.score1');
  const score2Element = document.querySelector('.score2');
  const score3Element = document.querySelector('.score3');

  let score1 = parseInt(score1Element.textContent.split('/')[0]);
  let score2 = parseInt(score2Element.textContent.split('/')[0]);
  let score3 = parseInt(score3Element.textContent.split('/')[0]);

  if (img === image1) {
    score1++;
    score1Element.textContent = score1 + '/3';
  } else if (img === image2) {
    score2++;
    score2Element.textContent = score2 + '/3';
  } else if (img === image3) {
    score3++;
    score3Element.textContent = score3 + '/3';
  }
}

function checkAllScoresCollected() {
  const score1Element = document.querySelector('.score1');
  const score2Element = document.querySelector('.score2');
  const score3Element = document.querySelector('.score3');

  const score1 = score1Element.textContent;
  const score2 = score2Element.textContent;
  const score3 = score3Element.textContent;

  return score1 === '3/3' && score2 === '3/3' && score3 === '3/3';
}

function showWinPage() {
  const winPage = document.getElementById('lastpagewin');
  winPage.style.display = 'block';
}

function showLosePage() {
  const losePage = document.getElementById('lastpagelose');
  losePage.style.display = 'block';
}

//MOVEMENT

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  drawPlayer();
  drawImages();
  detectCollision();



  if (player.direction === 'ArrowUp') {
    if (player.y - player.speed >= 40) {
      // if(canPlayerMoveToPosition(pcoord.x, pcoord.y-1)){
      player.y -= player.speed;
      // } 
    }
  } else if (player.direction === 'ArrowDown') {
    if (player.y + player.speed <= 660) {
      // if(canPlayerMoveToPosition(pcoord.x, pcoord.y+1)){
      player.y += player.speed;
      // }
    }
  } else if (player.direction === 'ArrowLeft') {
    if (player.x - player.speed >= 170) {
      // if(canPlayerMoveToPosition(pcoord.x-1, pcoord.y)){
      player.x -= player.speed;
      // }
    }
  } else if (player.direction === 'ArrowRight') {
    if (player.x + player.speed <= 1260) {
      // if(canPlayerMoveToPosition(pcoord.x+1, pcoord.y)){
      player.x += player.speed;
      // }
    }
  }
}

animate();

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      player.direction = event.key; 
      break;
  }
});

document.addEventListener('keyup', (event) => {
  player.direction = null;
});


function startTimer() {
  const startingMinutes = 1;
  let time = startingMinutes * 60;
  const countdownEl = document.getElementById('timer');

  setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if (time <= 0) {
      if (checkAllScoresCollected()) {
        showWinPage(); 
      } else {
        showLosePage(); 
      }

      return; 
    }

    time--;
  }
}

//COLISSION
function getPositionOnMap(x, y, width, height) {
  return {
    x: Math.floor((x + width * 0.5) / mapData.squareWidth),
    y: Math.floor((y + height * 0.5) / mapData.squareWidth)
  }
}

function canPlayerMoveToPosition(x, y) {
  return map[y][x] == 0;
}
