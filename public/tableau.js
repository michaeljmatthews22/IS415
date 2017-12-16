var workbook, activeSheet;

function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
    //url = "https://YOUR-SERVER/views/YOUR-VISUALIZATION";
    url = "https://public.tableau.com/views/Auction415/MedianCostvs_Color?:embed=y&:display_count=yes&publish=yes";
    var options = {
    width: 1000,
    height: 600,
    hideTabs: false,
    hideToolbar: true,
    onFirstInteractive: function () {
      workbook = viz.getWorkbook();
      activeSheet = workbook.getActiveSheet();
    }
};
    var viz = new tableau.Viz(containerDiv, url, options);

}

//Filter by Wheel Type where wheel type like "Alloy"
function filterSingleValue() {
    activeSheet.applyFilterAsync(
        "Wheel Type",
        "Alloy",
        tableau.FilterUpdateType.ADD);
}

function filterState() {
    workbook.getActiveSheet().applyFilterAsync(
        "Vnst",
        "TX",
        tableau.FilterUpdateType.REPLACE);
}

//Clear all Filters
function clearFilters() {
  activeSheet.clearFilterAsync("Wheel Type");
  activeSheet.clearFilterAsync("Make");
  activeSheet.clearFilterAsync("Size");
  activeSheet.clearFilterAsync("Trim");
  activeSheet.clearFilterAsync("Vnst");
  activeSheet.clearFilterAsync("Color");
  activeSheet.clearFilterAsync("Auction");
}

//Switch to the Net vs. Odo tab
function switchToTab1() {
  workbook.activateSheetAsync("Net vs. Odo");
}

function switchToTab2() {
  workbook.activateSheetAsync("Size Cost MMR");
}

function switchToTab3() {
  workbook.activateSheetAsync("Net vs. Age");
}

function switchToTab4() {
  workbook.activateSheetAsync("Wheel vs. Cost");
}

function switchToTab5() {
  workbook.activateSheetAsync("Median Cost vs. Color");
}

function switchToTab6() {
  workbook.activateSheetAsync("Net vs State vs Color");
}

function switchToTab7() {
  workbook.activateSheetAsync("Sales by Make in Each State");
}

function selectNYCars() {
  workbook.getActiveSheet().selectMarksAsync(
    "Vnst",
    "NY",
    tableau.SelectionUpdateType.REPLACE);
}
