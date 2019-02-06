function baseballAPI() {
    var user = config.apiKey;
    var pass = config.pass;
    var endpoint = config.endpoint;
    var encrypted_api_key_credentials = btoa(user + ":" + pass);



    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');


    app.appendChild(container);



    var request = new XMLHttpRequest();
    request.open('GET', endpoint, true);
    request.setRequestHeader("Authorization", "Basic " + encrypted_api_key_credentials);
    request.onload = function () {
        // Begin accessing JSON data here

        var data = JSON.parse(this.response);




        if (request.status >= 200 && request.status < 400) {
            var players = data.playerStatsTotals;
            players.forEach(player => {

                var p1 = {
                    fName: player.player.firstName,
                    lName: player.player.lastName,
                    id: player.player.id,
                    pos: player.player.primaryPosition,
                    team: player.team.abbreviation,
                    fullName: function () {
                        return "" + this.pos + " " + this.fName + " " + this.lName + " " + this.team;
                    },
                    stats: function () {
                        var batting = player["stats"]["batting"];
                        var currentRow = "<tr>";
                        var finalTable = "";
                        var count = 0;
                        for (var key in batting) {
                            count++;
                            if (batting.hasOwnProperty(key)) {
                                currentRow = currentRow + "<td>" + (key + " : " + batting[key]) + "</td>";
                            }
                            if (count % 2 == 0) {
                                finalTable = finalTable + currentRow + "</tr>";
                                currentRow = "<tr>";
                            }
                        }

                        return finalTable;

                    },

                    generalBattingStats: function () {
                        var batting = player["stats"]["batting"];
                        var runs = batting.runs;
                        var homeruns = batting.homeruns;
                        var rbi = batting.runsBattedIn;
                        var sb = batting.stolenBases;
                        var avg = batting.battingAvg;
                        var finalTable = "<tr><td><b>runs:</b></td><td>" + runs + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>homeruns:</b></td><td>" + homeruns + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>rbi:</b></td><td>" + rbi + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>sb:</b></td><td>" + sb + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>avg:</b></td><td>" + avg + "</td></tr>";
                        return finalTable
                    },
                    generalPitchingStats: function () {
                        var pitching = player["stats"]["pitching"];
                        var wins = pitching.wins;
                        var era = pitching.earnedRunAvg;
                        var ks = pitching.pitcherStrikeouts;
                        var whip = pitching.walksAndHitsPerInningPitched;
                        var saves = pitching.saves;
                        var finalTable = "<tr><td><b>wins:</b></td><td>" + wins + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>era:</b></td><td>" + era + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>ks:</b></td><td>" + ks + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>whip:</b></td><td>" + whip + "</td></tr>";
                        finalTable = finalTable + "<tr><td><b>saves:</b></td><td>" + saves + "</td></tr>";

                        return finalTable
                    }

                };


                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const h1 = document.createElement('h1');
                h1.setAttribute('class', p1.team.toLowerCase());
                h1.textContent = p1.fullName();

                const p = document.createElement('table');
                var stats;
                var test = "" + p1.pos;

                if (test == "P") {
                    stats = p1.generalPitchingStats();
                } else {
                    stats = p1.generalBattingStats();
                }

                p.innerHTML = stats;
                container.appendChild(card);
                card.appendChild(h1);
                card.appendChild(p);
            });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }

    request.send();

}
baseballAPI();
