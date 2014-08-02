var Enemy = function(options){
  this.gameOptions = options;
  console.log('constructed', this.axes)
};

Enemy.prototype.generateCoordinates = function(){
  var coords = [];
  var randX;
  var randY;
  for (var i = 0; i < this.gameOptions.enemies; i++){
    randX = Math.random()*this.gameOptions.width;
    randY = Math.random()*this.gameOptions.height;
    coords.push({x: randX, y: randY, id: i});
  }

  return coords;
};


Enemy.prototype.render = function(gameBoard){
  var self = this;
  var coordinates = this.generateCoordinates();
  console.log(coordinates);
  var enemies = gameBoard.selectAll('circle.enemy')
                         .data(coordinates, function(d) {
                            return d.id;
                         });

  enemies.enter()
         .append('svg:circle')
         .attr('class', 'enemy')
         .attr('cx', function(enemy){
            return axes.x(enemy.x);
          })
         .attr('cy',function(enemy){
            return axes.y(enemy.y);
          })
         .attr('r', 0);


  enemies.exit().remove();

  enemies
    .transition()
      .duration(500)
      .attr('r', 10)
    .transition()
      .duration(2000)
      .attr('cx', function(enemy){ return enemy.x;})
      .attr('cy', function(enemy){ return enemy.y;})
      //.tween('custom', tweenWithCollisionDetection);

};


var checkCollision = function(enemy, collidedCallback) {

  console.log(players)

  for (var i = 0; i < players.length; i++) {
    var radiusSum =  parseFloat(enemy.attr('r')) + players[i].r;
    var xDiff = parseFloat(enemy.attr('cx')) - players[i].x;
    var yDiff = parseFloat(enemy.attr('cy')) - players[i].y;
    var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );

    if (separation < radiusSum) {
      collidedCallback(players[i], enemy);
    }
  }
};



var onCollision = function() {
  Watchout.updateBestScore();
  Watchout.gameStats.score = 0;
  Watchout.updateScore();
};

var tweenWithCollisionDetection = function (endData) {
  var enemy = d3.select(this);

  var startPos = {};
  startPos.x = parseFloat(enemy.attr('cx'));
  startPos.y = parseFloat(enemy.attr('cy'));

  var endPos = {};
  endPos.x = axes.x(endData.x);
  endPos.y = axes.y(endData.y);

  return function(t) {
    checkCollision(enemy, onCollision);

    var enemyNextPos = {};
    enemyNextPos.x = startPos.x + (endPos.x - startPos.x) * t;
    enemyNextPos.y = startPos.x + (endPos.y - startPos.y) * t;

    enemy.attr('cx', enemyNextPos.x)
         .attr('cy', enemyNextPos.y);
  };
};


// Enemy.prototype.checkCollision = function(enemy, collidedCallback) {
//   console.log(Watchout.players)
//   var players = Watchout.players;

//   for (var i = 0; i < players.length; i++) {
//     var radiusSum =  parseFloat(enemy.attr('r')) + players[i].r;
//     var xDiff = parseFloat(enemy.attr('cx')) - players[i].x;
//     var yDiff = parseFloat(enemy.attr('cy')) - players[i].y;
//     var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );

//     if (separation < radiusSum) {
//       collidedCallback(players[i], enemy);
//     }
//   }
// };





// Enemy.prototype.onCollision = function() {
//   Watchout.updateBestScore();
//   Watchout.gameStats.score = 0;
//   Watchout.updateScore();
// };
//




// Enemy.prototype.tweenWithCollisionDetection = function(endData) {
//   var axes = {};
//   axes.x = d3.scale.linear().domain([0,100]).range([0,700]);
//   axes.y = d3.scale.linear().domain([0,100]).range([0,1000]);

//   var enemy = d3.select(this);
//   var self = this;

//   var startPos = {};
//   startPos.x = parseFloat(enemy.attr('cx'));
//   startPos.y = parseFloat(enemy.attr('cy'));

//   var endPos = {};
//   endPos.x = axes.x(endData.x);
//   endPos.y = axes.y(endData.y);

//   return function(t) {
//     Enemy.prototype.checkCollision(enemy, self.onCollision);

//     var enemyNextPos = {};
//     enemyNextPos.x = startPos.x + (endPos.x - startPos.x) * t;
//     enemyNextPos.y = startPos.x + (endPos.y - startPos.y) * t;

//     enemy.attr('cx', enemyNextPos.x)
//          .attr('cy', enemyNextPos.y);
//   };

// };
