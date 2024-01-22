console.log('INICIO')



document.addEventListener('DOMContentLoaded',async()=>{

try {
    const resp = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    const data = await resp.json()
    console.log('Bien Fetch')
    console.log(data)
    console.log(data[0].Time)
    console.log(data[0].Year)

// Configuración del gráfico
const width = 900;
const height = 400;
const padding = 40;


// Crear escala para ejes x e y
const xScale = d3.scaleLinear()
  .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
  .range([padding, width - padding]);

// const yScale = d3.scaleTime()
//   .domain([d3.max(data, d => new Date(d.Seconds * 1000)), 0])
//   .range([padding, height - padding]);
const parseTime = d3.timeParse('%M:%S');
const maxTime = d3.max(data, d => parseTime(d.Time));
const minTime = d3.min(data, d => parseTime(d.Time));

const yScale = d3.scaleTime()
  .domain([maxTime, minTime])
  .range([padding, height - padding]);

  
// Crear ejes x e y
const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));



// Crear contenedor SVG
const svg = d3.select('#scatter-plot')
  .attr('width', width)
  .attr('height', height);

// Añadir ejes x e y al SVG
svg.append('g')
  .attr('id', 'x-axis')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(xAxis);

svg.append('g')
  .attr('id', 'y-axis')
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis);


  // Añadir puntos al gráfico
  svg.selectAll('.dot')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot')
  .attr('cx', d => xScale(d.Year))
  .attr('cy', d => yScale(parseTime(d.Time)))
  .attr('r', 5)
  .style('border','1px solid black')
  .attr('fill',d=>d.Doping===''?'orange':'skyblue')
  .attr('data-xvalue', d => d.Year)
  .attr('data-yvalue', d => parseTime(d.Time).toISOString())
  
// Añadir tooltip
const tooltip = d3.select('#tooltip');
svg.selectAll('.dot')
  .on('mouseover', function (event, d) {
    tooltip.style('display', 'block')
      .attr('data-year', d.Year)
      .html(`<strong>${d.Name}</strong><br>Year: ${d.Year}<br>Time: ${d.Time}`);
  })
  .on('mouseout', () => {
    tooltip.style('display', 'none');
  });

  svg.append('text')
  .attr('x',width/2)
  .attr('y',height-2)
  .text('AÑOS')



// ...
  
//   const tooltip = d3.select('#tooltip');
// .on('mouseover', d => 
//   tooltip.style('display', 'block')
//     .attr('data-year', d.Year)
//     .html(`<strong>${d.Name}</strong><br>Year: ${d.Year}<br>Time: ${d.Time}`)
// )
// .on('mouseout', () => {
//   tooltip.style('display', 'none');
// });
// Añadir tooltip

// svg.selectAll('.dot')
















    
} catch (error) {
    console.log(error)
}

})



