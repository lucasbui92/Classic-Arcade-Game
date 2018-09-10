// Enemies our player must avoid
var Enemy = function(x_pos, y_pos, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x_pos;
    this.y = y_pos;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    const range = 50;

    this.x += this.speed;
    // Set bugs' locations after passing the screen
    if (this.x > end_wall) {
      this.x = -30;
    }

    // If the player touches the bug, reset the player's position
    if (this.y === player.y) {
      if (player.x >= (this.x - range) && player.x <= (this.x + range)) {
        player.x = x_initial_pos;
        player.y = y_initial_pos;
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x_pos, y_pos) {
    this.x = x_pos;
    this.y = y_pos;

    this.sprite = 'images/char-boy.png';
};

// Calculate player's next location based on user's input keys
// Prevent player from disappearing from the screen
Player.prototype.update = function(move_direction) {
    const x_moves = 100, y_moves = 85;

    if (move_direction === 'left' && this.x != 0) {
      this.x -= x_moves;
    }
    else if (move_direction === 'right' && this.x != 400) {
      this.x += x_moves;
    }
    else if (move_direction === 'up' && this.y != 0) {
      this.y -= y_moves;
    }
    else if (move_direction === 'down' && this.y != 405) {
      this.y += y_moves;
    }
};

// Draw the image of the player at the starting location
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Redirect the user input to determine the player's next location
// Handle the winning condition
Player.prototype.handleInput = function(direction) {
    this.update(direction);

    // Place the player back to the initial position once reaches the river
    if (this.y < 30) {
        this.x = x_initial_pos;
        this.y = y_initial_pos;
        count += 1;
    }
    // Player needs to reach the river three times to win the game
    if (count == 3) {
        winModal.style.display = 'block';
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const end_wall = 500;
var allEnemies = [new Enemy(-30, 65, 3),
                  new Enemy(-60, 65, 5),
                  new Enemy(-100, 150, 4),
                  new Enemy(-150, 150, 2),
                  new Enemy(-230, 235, 3),
                  new Enemy(-270, 235, 4)];

const x_initial_pos = 200, y_initial_pos = 405;
var count = 0;
var player = new Player(x_initial_pos, y_initial_pos);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This enables the player to close the modal and play the game
const winModal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
closeModal.onclick = function() {
  winModal.style.display = "none";
  count = 0;
}
