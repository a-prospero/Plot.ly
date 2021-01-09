
function dashboard() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

// Use the D3 library to read in `samples.json`.
d3.json("data/samples.json").then((importedData) => {
  var data = importedData;
  console.log(data);
  data.names.forEach(d =>{
      dropdownMenu.append("option").text(d).property("value");
  });
  optionChanged(data.names[0])
});   
};
dashboard() 

