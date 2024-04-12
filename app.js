// Bar chart function
function barChart(selectedSample) {

    // Reading JSON file with D3
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      
    // Filter data for selected sample
      let sampleJson = data.samples.find(sample => sample.id == selectedSample);
  
      // Top 10 values
      let topValues = sampleJson.sample_values.slice(0, 10).reverse();
      let topIDs = sampleJson.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
      let topLabels = sampleJson.otu_labels.slice(0, 10).reverse();
  
      // Bar trace
      let trace = {
        x: topValues,
        y: topIDs,
        text: topLabels,
        type: "bar",
        orientation: "h"
      };
  
      // Data array for plot
      let barData = [trace];
  
      // Layout for plot
      let layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
      };
  
      // Plot the bar chart
      Plotly.newPlot("bar", barData, layout);
    });
  }
  


  // Bubble chart function
  function bubbleChart(selectedSample) {

    // Reading JSON file with D3
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      
    // Filter data for selected sample
      let sampleJson = data.samples.find(sample => sample.id == selectedSample);
  
      // Bubble trace
      let trace = {
        x: sampleJson.otu_ids,
        y: sampleJson.sample_values,
        text: sampleJson.otu_labels,
        mode: 'markers',
        marker: {
          size: sampleJson.sample_values,
          color: sampleJson.otu_ids
        }
      };
  
      // Data array for plot
      let bubbleData = [trace];
  
      // Layout
      let layout = {
        title: "OTU Bubble Chart",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" }
      };
  
      // Plot bubble chart
      Plotly.newPlot("bubble", bubbleData, layout);
    });
  }
  


  // Demographic info function
  function demographicInfo(selectedSample) {
      
    // Reading JSON file with D3
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {

      // Filter metadata for selected sample
      let metadata = data.metadata.find(item => item.id == selectedSample);
  
      // Select sample-metadata div and clear out existing content
      let metadataLoc = d3.select("#sample-metadata");
      metadataLoc.html("");
  
      // Add key and value pairs to the metadata location
      Object.entries(metadata).forEach(([key, value]) => {
        metadataLoc.append("p").text(`${key}: ${value}`);
      });
    });
  }
  


  // Initialize the dashboard function
  function init() {

    // Reading the JSON file with D3
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {

      // Populate dropdown with all sample IDs
      let dropDown = d3.select("#selDataset");
      data.names.forEach(sample => {
        dropDown.append("option").property("value", sample).text(sample);
      });
  
      // Initialize dashboard with first sample
      let firstSample = data.names[0];
      barChart(firstSample);
      bubbleChart(firstSample);
      demographicInfo(firstSample);
    });
  }
  


  // Function for changes in dropdown
  function optionChanged(newSample) {

    // Update dashboard based on selected sample
    barChart(newSample);
    bubbleChart(newSample);
    demographicInfo(newSample);
  }
  

  
  // Initialize dashboard
  init();