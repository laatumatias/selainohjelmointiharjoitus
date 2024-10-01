// Odotetaan, että dokumentti on ladattu
$(document).ready(function() {
  $('#searchButton').click(function() {
      const teamName = $('#teamSearch').val().trim(); // Haetaan joukkueen nimi hakukentästä
      const apiUrl = `https://api.nhle.com/stats/rest/en/team/summary?sort=shotsForPerGame&cayenneExp=seasonId=20232024%20and%20gameTypeId=2`; // API-URL

      fetch(apiUrl) // Haetaan tietoja API:sta
          .then(response => {
              if (!response.ok) {
                  throw new Error('Verkkovirhe: ' + response.statusText); // Virhe, jos vastaus ei ole onnistunut
              }
              return response.json(); // Muutetaan vastaus JSON-muotoon
          })
          .then(data => {
              const teams = data.data; // Joukkueiden tiedot
              const team = teams.find(t => t.teamFullName.toLowerCase() === teamName.toLowerCase()); // Etsitään joukkue

              $('#team-info').empty(); // Tyhjennetään aiemmat tulokset

              if (team) {
                  // Näytetään joukkueen tilastot
                  $('#team-info').html(`
                      <h2>${team.teamFullName}</h2>
                      <p>Maaleja tehty: ${team.goalsFor}</p>
                      <p>Tehtyjä maaleja per peli: ${team.goalsForPerGame}</p>
                      <p>Maaleja päästetty: ${team.goalsAgainst}</p>
                      <p>Päästettyjä maaleja per peli: ${team.goalsAgainstPerGame}</p>
                  `);
                  $('#teamSearch').css('color', 'black'); // Jos joukkue löytyy, palautetaan väri mustaksi
              } else {
                  $('#team-info').html('<p>Joukkuetta ei löytynyt tai sillä ei ole tilastoja. Kokeile uudelleen.</p>');
                  $('#teamSearch').css('color', 'red'); // Jos joukkueita ei löydy, muutetaan teksti punaiseksi
              }
          })
          .catch(error => {
              console.error('Virhe API-haussa:', error);
              $('#team-info').html('<p>Jotain meni pieleen. Yritä uudelleen myöhemmin.</p>');
          });
  });
});






