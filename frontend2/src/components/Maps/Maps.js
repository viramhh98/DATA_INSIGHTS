
// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { feature } from 'topojson-client';
// import gujaratTopoJson from '../Assets/maps/gujarat.json'; // Adjust the path as needed

// const GujaratMap = ({ data }) => {
//   const svgRef = useRef();
//   const tooltipRef = useRef();
//   const [tooltipContent, setTooltipContent] = useState('');
//   const [tooltipVisible, setTooltipVisible] = useState(false); // Track visibility
//   const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 }); // Position state

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const tooltip = d3.select(tooltipRef.current);
//     const width = 800;
//     const height = 600;

//     const geoFeatures = feature(gujaratTopoJson, gujaratTopoJson.objects.gujarat).features;

//     const projection = d3.geoMercator().fitSize([width, height], { type: 'FeatureCollection', features: geoFeatures });
//     const pathGenerator = d3.geoPath().projection(projection);

//     svg.attr('width', width).attr('height', height);

//     const paths = svg.selectAll('path')
//       .data(geoFeatures)
//       .join('path')
//       .attr('d', pathGenerator)
//       .attr('fill', d => {
//         const districtName = d.properties.NAME_2; // Use NAME_2 from your GeoJSON
//         const districtData = data.find(item => item.district === districtName);
//         return districtData ? districtData.color : '#ccc'; // Default color
//       })
//       .attr('stroke', '#000')
//       .attr('stroke-width', 0.5)
//       .on('mouseover', function (event, d) {
//         const districtName = d.properties.NAME_2;
//         const districtData = data.find(item => item.district === districtName);
        
//         // Set tooltip content and position
//         const dropoutCount = districtData ? districtData.count : 0; // Default to 0 if no data
//         setTooltipContent(`<strong>${districtName}</strong><br>Dropout Count: <strong>${dropoutCount}</strong>`); // Update tooltip content

//         setTooltipVisible(true);
        
//         // Set tooltip position near the navbar (example fixed position)
//         setTooltipPosition({ right: 10, top: 70 }); // Adjust these values as needed

//         // Change fill color and scale on hover
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr('fill', 'orange') // Change fill color on hover
//           .attr('transform', 'scale(1.05)') // Scale effect
//           .attr('stroke-width', 1); // Slightly thicker stroke
//       })
//       .on('mouseout', function (event, d) {
//         setTooltipVisible(false); // Hide tooltip
//         const districtName = d.properties.NAME_2;
//         const districtData = data.find(item => item.district === districtName);
        
//         // Restore original color and scale
//         d3.select(this)
//           .transition()
//           .duration(200)
//           .attr('fill', districtData ? districtData.color : '#ccc') // Restore original color
//           .attr('transform', 'scale(1)') // Reset scale
//           .attr('stroke-width', 0.5); // Reset stroke width
//       });

//     // Add district names as labels
//     svg.selectAll('text')
//       .data(geoFeatures)
//       .join('text')
//       .attr('transform', d => `translate(${pathGenerator.centroid(d)})`)
//       .attr('dy', '0.35em')
//       .attr('text-anchor', 'middle')
//       .text(d => d.properties.NAME_2) // Display district names
//       .attr('font-size', '10px')
//       .attr('fill', '#000');

//     // Initialize tooltip styles
//     tooltip
//       .style('position', 'absolute')
//       .style('background-color', 'white')
//       .style('border', '1px solid #ccc')
//       .style('border-radius', '5px')
//       .style('padding', '10px')
//       .style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)')
//       .style('opacity', 0)
//       .style('transition', 'opacity 0.2s ease-in-out');
//   }, [data]);

//   return (
//     <>
//       <svg ref={svgRef}></svg>
//       {tooltipVisible && (
//         <div 
//           ref={tooltipRef} 
//           style={{
//             position: 'absolute',
//             right: `${tooltipPosition.right}px`,
//             top: `${tooltipPosition.top}px`,
//             backgroundColor: 'white',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             padding: '10px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             opacity: 1, // Show tooltip
//             transition: 'opacity 0.2s ease-in-out',
//             pointerEvents: 'none' // Prevent tooltip from interfering with mouse events
//           }} 
//           dangerouslySetInnerHTML={{ __html: tooltipContent }} // Render tooltip content
//         />
//       )}
//     </>
//   );
// };

// export default GujaratMap;


import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import gujaratTopoJson from '../Assets/maps/gujarat.json'; // Adjust the path as needed

const GujaratMap = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false); // Track visibility
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 }); // Position state

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 800;
    const height = 600;

    const geoFeatures = feature(gujaratTopoJson, gujaratTopoJson.objects.gujarat).features;

    const projection = d3.geoMercator().fitSize([width, height], { type: 'FeatureCollection', features: geoFeatures });
    const pathGenerator = d3.geoPath().projection(projection);

    svg.attr('width', width).attr('height', height);

    // Removed the paths variable and directly joined the paths
    svg.selectAll('path')
      .data(geoFeatures)
      .join('path')
      .attr('d', pathGenerator)
      .attr('fill', d => {
        const districtName = d.properties.NAME_2; // Use NAME_2 from your GeoJSON
        const districtData = data.find(item => item.district === districtName);
        return districtData ? districtData.color : '#ccc'; // Default color
      })
      .attr('stroke', '#000')
      .attr('stroke-width', 0.5)
      .on('mouseover', function (event, d) {
        const districtName = d.properties.NAME_2;
        const districtData = data.find(item => item.district === districtName);
        
        // Set tooltip content and position
        const dropoutCount = districtData ? districtData.count : 0; // Default to 0 if no data
        setTooltipContent(`<strong>${districtName}</strong><br>Dropout Count: <strong>${dropoutCount}</strong>`); // Update tooltip content

        setTooltipVisible(true);
        
        // Set tooltip position near the navbar (example fixed position)
        setTooltipPosition({ right: 10, top: 70 }); // Adjust these values as needed

        // Change fill color and scale on hover
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', 'orange') // Change fill color on hover
          .attr('transform', 'scale(1.05)') // Scale effect
          .attr('stroke-width', 1); // Slightly thicker stroke
      })
      .on('mouseout', function (event, d) {
        setTooltipVisible(false); // Hide tooltip
        const districtName = d.properties.NAME_2;
        const districtData = data.find(item => item.district === districtName);
        
        // Restore original color and scale
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', districtData ? districtData.color : '#ccc') // Restore original color
          .attr('transform', 'scale(1)') // Reset scale
          .attr('stroke-width', 0.5); // Reset stroke width
      });

    // Add district names as labels
    svg.selectAll('text')
      .data(geoFeatures)
      .join('text')
      .attr('transform', d => `translate(${pathGenerator.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.properties.NAME_2) // Display district names
      .attr('font-size', '10px')
      .attr('fill', '#000');

    // Initialize tooltip styles
    tooltip
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)')
      .style('opacity', 0)
      .style('transition', 'opacity 0.2s ease-in-out');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      {tooltipVisible && (
        <div 
          ref={tooltipRef} 
          style={{
            position: 'absolute',
            right: `${tooltipPosition.right}px`,
            top: `${tooltipPosition.top}px`,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            opacity: 1, // Show tooltip
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: 'none' // Prevent tooltip from interfering with mouse events
          }} 
          dangerouslySetInnerHTML={{ __html: tooltipContent }} // Render tooltip content
        />
      )}
    </>
  );
};

export default GujaratMap;
