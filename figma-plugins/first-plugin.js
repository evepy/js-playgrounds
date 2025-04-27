function runPlugin() {
    // Get the number of selected elements
    let selectedElements = figma.currentPage.selection.length;
    // Display error message if no elements are selected
    if (selectedElements === 0) { 
        figma.closePlugin("No elements selected");
        return;
    }
    // Display error message if more than one element is selected
    if (selectedElements > 1) {
        figma.closePlugin("Please select only one element");
        return; 
    }
    // Find the name of the selected element
    let selectedName = figma.currentPage.selection[0].name;
    // X console.log("Selected element name: " + selectedName); X
    // Callback function for findAll()
    function hasSameName(node) {
        return node.name === selectedName;
    }
    // Get all the elements with the same name as the selected one
    let withSameName = figma.currentPage.findAll(hasSameName);
    // Select all elements with the same name as the selected one
    figma.currentPage.selection = withSameName;

    figma.closePlugin();
}   
runPlugin();
