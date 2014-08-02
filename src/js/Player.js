var Player = function (opts) {
  this.options = opts || OPTIONS;
  this._path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
  this._fill = '#ff6600';
  this._x = 0;
  this._y = 0;
  this._angle = 8;
  this._r = 5;
};

Player.prototype.render = function(node) {
  var self = this;

  this._el = node.append('svg:path')
               .attr('d', self._path)
               .attr('fill', self._fill);
  this._transform = {};
  this._transform.x = this.options.width * 0.6;
  this._transform.y = this.options.height * 0.6;

  this.setupDragging();
};

Player.prototype.getX = function() {
  return this._x;
};

Player.prototype.setX = function(x) {
  var minX = this.options.padding;
  var maxX = this.options.width - this.options.padding;

  x = x <= minX ? minX : x;
  x = x >= maxX ? maxX : x;

  this._x = x;
};

Player.prototype.getY = function(first_argument) {
  return this._y;
};

Player.prototype.setY = function(y) {
  var minY = this.options.padding;
  var maxY = this.options.height - this.options.padding;

  y = y <= minY ? minY : y;
  y = y >= maxY ? maxY : y;

  this._y = y;
};

Player.prototype.transform = function(opts) {
  opts = opts || OPTIONS;

  var x, y;
  var rotate = 'rotate({ANGLE},{X},{Y})';
  var translate = 'translate({X},{Y})';
  var transformstr;

  this.setX(opts.x || this._x);
  this.setY(opts.y || this._y);

  x = this.getX();
  y = this.getY();
  this._angle = opts.angle || this._angle;

  transformstr = rotate.replace('{ANGLE}', this._angle)
                       .replace('{X}', x)
                       .replace('{Y}', y);

  transformstr += ' ' + translate.replace('{X}', x)
                           .replace('{Y}', y);

  console.log(transformstr);
  this._el.attr('transform', transformstr);
};

Player.prototype.moveAbsolute = function(x, y) {
  this._transform.x = x;
  this._transform.y = y;
};

Player.prototype.moveRelative = function(dx, dy) {
  this._transform.x = this.getX() + dx;
  this._transform.y = this.getY() + dy;
  this._angle = 360 * (Math.atan2(dy,dx)/(Math.PI*2));
  this.transform({x: this._transform.x, y: this._transform.y, angle: this._angle});
};

Player.prototype.setupDragging = function() {
  var self = this;

  var dragMove = function () {
    self.moveRelative(d3.event.dx, d3.event.dy);
  };

  var drag = d3.behavior.drag()
               .on('drag', dragMove);

  this._el.call(drag);
};
