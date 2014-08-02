var gameOptions = {};
gameOptions.width = window.innerWidth * 0.8;
gameOptions.height = window.innerHeight * 0.8;
gameOptions.padding = 20;
gameOptions.nEnemies = 30;

var gameStats = {};
gameStats.score = 0;
gameStats.bestScore = 0;
gameStats.collisions = 0;

var axes = {};
axes.x = d3.scale.linear().domain([0,100]).range([0,gameOptions.width]);
axes.y = d3.scale.linear().domain([0,100]).range([0,gameOptions.height]);

var gameBoard = d3.select('.container').append('svg:svg')
                .attr('id', 'gameBoard')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

var updateScore = function () {
  d3.select('.currentscore').text(gameStats.score.toString());

};

var updateBestScore = function () {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  d3.select('.highscore').text(gameStats.bestScore.toString());
};

var players = [];
var p = new Player(gameOptions).render(gameBoard);
players.push(p);


var createEnemies = function() {
  return _.range(0, gameOptions.nEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
};

var render = function(enemy_data) {

  var enemies = gameBoard.selectAll('.enemy').data(enemy_data, function(d) {
    return d.id;
  });

  enemies.enter()
         .append('image')
         .attr('xlink:href', 'src/img/asteroid.svg')
         .attr('width', 50)
         .attr('height', 50)
         .attr('class', 'enemy')
         .attr('x', function(enemy) { return axes.x(enemy.x); })
         .attr('y', function(enemy) { return axes.y(enemy.y); });


  enemies.exit().remove();

  var checkCollision = function(enemy, collidedCallback) {
    _(players).each(function(player) {

      var radiusSum = parseFloat(25) + player._r;
      var xDiff = parseFloat(enemy.attr('x')) - player._x;
      var yDiff = parseFloat(enemy.attr('y')) - player._y;
      var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

      if (separation < radiusSum)
        collidedCallback(player, enemy);

    });
  };

  var onCollision = function() {
    updateBestScore();

    gameStats.score = 0;
    updateScore();
  };

  var tweenWithCollisionDetection = function(endData) {
    var enemy = d3.select(this);

    var startPos = {};
    var endPos = {};

    startPos.x = parseFloat(enemy.attr('x'));
    startPos.y = parseFloat(enemy.attr('y'));

    endPos.x = axes.x(endData.x);
    endPos.y = axes.y(endData.y);

    return function(t) {

      var enemyNextPos = {};

      enemyNextPos.x = startPos.x + (endPos.x - startPos.x) * t;
      enemyNextPos.y = startPos.y + (endPos.y - startPos.y) * t;

      checkCollision(enemy, onCollision);
      enemy.attr('x', enemyNextPos.x).attr('y', enemyNextPos.y);
    };
  };

  enemies.transition()
           .duration(2000)
           .tween('custom', tweenWithCollisionDetection);
};
// .transition()
//            .duration(500)
//            .attr('', function() { return Math.random() * 16; })


var play = function() {
var gameTurn = function() {
  var newEnemyPositions;
  newEnemyPositions = createEnemies();
  render(newEnemyPositions);
};
var increaseScore = function() {
  gameStats.score += 1;
  updateScore();
};

gameTurn();

setInterval(gameTurn, 2000);
setInterval(increaseScore, 50);
};

play();
