var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1EtC5F4J_xr1rQl7MU4U2onxywXujQfbDnwDplWxrnik/edit?usp=sharing';
var mostRecentSortBy = 'Date';
var globaldata;

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true,
        orderby: 'Order',
        reverse: false
    })


}

function showInfo(data, tabletop) {
    data.forEach(addTournamentRow);
}

window.addEventListener('DOMContentLoaded', init)

function addTournamentRow(tournamentdata) {
    var table = document.getElementById("UpcomingEvents");
        if (table) {
            var row = table.insertRow(-1);
            var tournamentNameCell = row.insertCell(0);
            var dateCell = row.insertCell(1);
            var locationCell = row.insertCell(2);
            var statusCell = row.insertCell(3);
            var notesCell = row.insertCell(4);
            if (tournamentdata.Link === "") {
                tournamentNameCell.innerHTML = tournamentdata.Tournament;
            }
            else {
                tournamentNameCell.innerHTML = "<a target=_blank href=" + tournamentdata.Link + ">" + tournamentdata.Tournament + "</a>";
            }
            dateCell.innerHTML = tournamentdata.Dates;
            locationCell.innerHTML = tournamentdata.Location;
            if (tournamentdata.Going === "Yes") {
                statusCell.innerHTML = "Attending";
                statusCell.style.color = "lightgreen";
            }
            else if (tournamentdata.Going === "No") {
                statusCell.innerHTML = "Missing";
            }
            else {
                statusCell.innerHTML = "Pending";
            }
            notesCell.innerHTML = tournamentdata.Other;
        }
}
