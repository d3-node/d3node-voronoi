const output = require('d3node-output');
const voronoi = require('../');

// create output files
output('./example/output', voronoi({ siteCount: 500 }));
