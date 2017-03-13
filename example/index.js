const output = require('d3node-output');
const voronoi = require('../');
const data = new Array(99);

// create output files
output('./example/output', voronoi(data));
