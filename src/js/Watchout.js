var Watchout = function () {
  this.options = OPTIONS;
  this.score = 0;
  this.bestScore = 0;
  
  this.initialize();
};


Watchout.prototype.initialize = function(config) {
  var self = this;

  return d3.select('.container')
           .append('svg:svg')
           .attr('width', this.options.width)
           .attr('height', this.options.height);
};

// var axes = {
//   x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
//   y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
// };
  
  