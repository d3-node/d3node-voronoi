const D3Node = require('d3-node');

const defaultContainer = `
<div id="container">
  <h2>Voronoi Tessellation</h2>
  <div id="chart"></div>
</div>`;

const defaultStyle = `.polygons {stroke: #000;}`;

function voronoi (data, selector = '#chart', container = defaultContainer, svgStyles = defaultStyle/*, options*/) {
  var d3n = new D3Node({
    selector,
    container,
    svgStyles
  });

  const d3 = d3n.d3;

  // adapted from: http://bl.ocks.org/mbostock/4060366 - Voronoi Tessellation
  ///-- start D3 code

  const width = 960;
  const height = 500;
  const siteCount = data.length;
  const colorScheme = d3.scaleOrdinal(d3.schemeCategory20);

  const svg = d3n.createSVG(width, height);

  const sites = d3.range(siteCount)
    .map((d) => [Math.random() * width, Math.random() * height]);

  const voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);

  // draw polygons
  svg.append('g')
    .attr('class', 'polygons')
    .selectAll('path')
    .data(voronoi.polygons(sites))
    .enter().append('path')
    .attr('d', (d) => d ? 'M' + d.join('L') + 'Z' : null)
    .style('fill', (d,i) => colorScheme(i));

  // draw site point
  svg.append('g')
    .selectAll('circle')
    .data(sites)
    .enter().append('circle')
    .attr('r', 2.5)
    .attr('cx', (d) => d[0])
    .attr('cy', (d) => d[1]);

  /// -- end D3 code

  return d3n;
}

module.exports = voronoi;
