var Enemy = function() {
  Player.call(this);
};

Enemy.prototype = Object.create(Player.prototype);
Enemy.prototype.constructor = Enemy;
