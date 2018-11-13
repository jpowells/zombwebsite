var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Y9FSrIkOx4KxDy7-ZYpx75hyHkqYgKS1vA1yCyU8rTs/edit?usp=sharing';
var mostRecentSortBy = 'Date';
var globaldata;

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true,
        orderby: 'Date',
        reverse: true
    })


}

function showInfo(data, tabletop) {
    data.forEach(addTournamentRow);
    globaldata = data;
}

window.addEventListener('DOMContentLoaded', init)

function addTournamentRow(tournamentdata) {
    if (tournamentdata.Placement) {
        var table = document.getElementById(tournamentdata.Size);
        if (table) {
            var row = table.insertRow(-1);
            row.tagName = tournamentdata.Size;
            var tournamentNameCell = row.insertCell(0);
            var gameNameCell = row.insertCell(1);
            var placementCell = row.insertCell(2);
            var dateCell = row.insertCell(3);
            tournamentNameCell.innerHTML = "<a target=_blank href=" + tournamentdata.Link + ">" + tournamentdata.Tournament + "</a>";
            gameNameCell.innerHTML = tournamentdata.Game;
            placementCell.innerHTML = tournamentdata.Placement + " of " + tournamentdata.Entrants;
            dateCell.innerHTML = tournamentdata.Date;
        }
    }
}

function sortTournamentTable(sortByValue, tournamentSize, sortType) {
    var table = document.getElementById(tournamentSize);
    table.innerHTML = "";
    if (sortByValue === mostRecentSortBy) {
        sortByValue = "-" + sortByValue;
    }
    mostRecentSortBy = sortByValue;
    globaldata = globaldata.sort(dynamicSort(sortByValue,sortType));
    console.log(globaldata);
    globaldata.filter(x => { return x.Size === tournamentSize }).forEach(addTournamentRow);
}


function dynamicSort(property, sortType) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result;
        if (sortType === "number") {
            result = (a[property] - b[property]);
        }
        else if (sortType === "date") {
            datea = new Date(a[property]);
            dateb = new Date(b[property]);
            result = datea > dateb ? -1 : datea < dateb ? 1 : 0;
        }
        else {
            result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
        return result * sortOrder;
    }
}