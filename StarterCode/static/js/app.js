
function dashboard() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

// Use the D3 library to read in `samples.json`.
d3.json("static/js/samples.json").then((importedData) => {
  var data = importedData;
  console.log(data);
  data.names.forEach(d =>{
      dropdownMenu.append("option").text(d).property("value");
  });
  optionChanged(data.names[0])
});   
};
dashboard() 

function optionChanged(userID) {
  d3.json("static/js/samples.json").then((data) => {
    console.log(data.metadata)

    var metaBox = d3.select("#sample-metadata");
    filterData = data.metadata.filter(md => md.id == userID);

//fetch the first element
element1 = filterData[0]
metaBox.html("")
console.log(element1)
Object.entries(element1).forEach(([key, value]) =>{
  metaBox.append("p").text(`${key}${value}`);
});


// Creating bar chart
sampleFilter = data.samples.filter(samplesD => samplesD.id == userID);
element2 = sampleFilter[0]

otuID = element2.otu_ids.map(ids => (`otu-ids ${ids}`)).slice(0, 10).reverse()
otuLabels = element2.otu_labels.slice(0, 10).reverse()
sampleValues = element2.sample_values.slice(0, 10).reverse()

trace1 = [{
  x:sampleValues, y:otuID,
  type: "bar",
  orientation: "h",
  text: otuLabels
}]
layout = {title: "Bar Chart", xaxis: {title: "Sample Values"}}

Plotly.newPlot("bar", trace1, layout)

//Creating bubble chart

trace2 = [{
  x: element2.otu_ids, y: element2.sample_values,
  text: element2.otu_labels,
  mode: "markers", 
  marker: {color: element2.otu_ids,
  size: element2.sample_values
}


}]

layout2 = {title: "Bubble Chart", xaxis: {title: "OTU ID's"}, yaxis: {title: "Sample Values"}}
Plotly.newPlot("bubble", trace2, layout2)

})}

