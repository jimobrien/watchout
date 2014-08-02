
var Watchout = function() {
  this.players = [];

  this.gameOptions = {};
  this.gameOptions.height = window.innerHeight * 0.8;
  this.gameOptions.width = window.innerWidth * 0.8;
  this.gameOptions.enemies = 30;
  this.gameOptions.padding = 20;

  this.gameStats = {};
  this.gameStats.score = 0;
  this.gameStats.bestScore = 0;

  this.axes = {};
  this.gameBoard = d3.select('.container')
                     .append('svg:svg')
                     .attr('width', this.gameOptions.width)
                     .attr('height', this.gameOptions.height);


  //
};

// watchout.play ()
 // create a player instance
 // push it to this.players
 //
 // create enemies
 //
 // invoke gameTurn()
 // loop gameTurn every 2000ms
 //
 // loop increaseScore every 50ms
 //

Watchout.prototype.play = function(){
  var context = this;
  this.players.push(new Player(this.gameOptions).render(this.gameBoard));

  var enemies = new Enemy(this.gameOptions);

  enemies.render(this.gameBoard);

  setInterval(function() {
    enemies.render(context.gameBoard);
  }, 2000);

  setInterval(function() {
    context.increaseScore();
  }, 50);

  //looping increaseScore
};


Watchout.prototype.increaseScore = function(){
  this.gameStats.score += 1;
  this.updateScore();
};

Watchout.prototype.updateScore = function(){
  d3.select('#current-score')
    .text(this.gameStats.score.toString());
};

Watchout.prototype.updateBestScore = function(){
  this.gameStats.bestScore = Math.max(this.gameStats.bestScore, this.gameStats.score);

  d3.select('#best-score').text(this.gameStats.bestScore.toString());
};
