const url = 'https://api-web.nhle.com/v1/playoff-series/carousel/20232024/'; // API-osoite pudotuspelien tietojen hakemiseen

// Sarjan nimet ja niiden suomenkieliset versiot
const seriesNames = {
    "1st-round": "Ensimmäinen kierros", // Ensimmäinen kierros
    "2nd-round": "Toinen kierros",       // Toinen kierros
    "conference-finals": "Konferenssin finaalit", // Konferenssin finaalit
    "stanley-cup-final": "Stanley Cup finaali" // Stanley Cup finaali
};

// Hakee tietoja API:sta
fetch(url)
  .then(response => {
    if (!response.ok) { // Tarkistaa, onko vastaus onnistunut
      throw new Error('Verkkopyyntö epäonnistui: ' + response.status); // Heittää virheen, jos pyyntö epäonnistuu
    }
    return response.json(); // Palauttaa vastauksen JSON-muodossa
  })
  .then(data => {
    const playoffContainer = document.getElementById('playoff-container'); // Etsii elementin, johon pudotuspelit näytetään

    if (data.rounds && data.rounds.length > 0) { // Tarkistaa, että tietoja on saatavilla
      data.rounds.forEach(round => { // Käy läpi jokaisen pudotuspelikierroksen
        const roundDiv = document.createElement('div'); // Luo div-elementin kierrokselle
        roundDiv.classList.add('round');
        
        // Muokataan sarjan nimeä
        const roundLabel = seriesNames[round.roundLabel] || round.roundLabel; // Käytetään suomenkielistä nimeä, jos se löytyy
        roundDiv.innerHTML = `<h2>${roundLabel}</h2>`; // Asettaa kierroksen nimen

        const seriesContainer = document.createElement('div'); // Luo div-elementin sarjoille
        seriesContainer.classList.add('series-container');

        round.series.forEach(series => { // Käy läpi jokaisen sarjan
          const seriesDiv = document.createElement('div'); // Luo div-elementin sarjalle
          seriesDiv.classList.add('series');

          const topSeed = series.topSeed; // Voittajan tiedot
          const bottomSeed = series.bottomSeed; // Häviäjän tiedot

          // Määritetään voittajan tiedot
          const winnerId = series.winningTeamId; // Voittavan joukkueen ID
          const winnerLogo = winnerId === topSeed.id ? topSeed.logo : bottomSeed.logo; // Voittajan logo
          const winnerName = winnerId === topSeed.id ? topSeed.abbrev : bottomSeed.abbrev; // Voittajan nimi

          // Asettaa sarjan tiedot HTML:ään
          seriesDiv.innerHTML = `
            <div class="team">
              <img src="${topSeed.logo}" alt="${topSeed.abbrev} logo" class="team-logo"> <!-- Voittaja joukkueen logo -->
              <div class="team-info">
                <div class="team-name">${topSeed.abbrev}</div> <!-- Voittaja joukkueen nimi -->
                <div class="team-wins">Voitot: ${topSeed.wins}</div> <!-- Voittaja joukkueen voitot -->
              </div>
            </div>
            <div class="vs">VS</div> <!-- Vastakkainolotunnus -->
            <div class="team">
              <img src="${bottomSeed.logo}" alt="${bottomSeed.abbrev} logo" class="team-logo"> <!-- Hävinneen joukkueen logo -->
              <div class="team-info">
                <div class="team-name">${bottomSeed.abbrev}</div> <!-- Hävinneen joukkueen nimi -->
                <div class="team-wins">Voitot: ${bottomSeed.wins}</div> <!-- Hävinneen joukkueen voitot -->
              </div>
            </div>
            <p class="winner"><strong>Voittaja:</strong> ${winnerName}</p> <!-- Voittajan nimi -->
            <img src="${winnerLogo}" alt="Voittaja logo" class="winner-logo"> <!-- Voittajan logo -->
          `;

          seriesContainer.appendChild(seriesDiv); // Lisää sarjan div-sisäiseen säiliöön
        });

        roundDiv.appendChild(seriesContainer); // Lisää sarjat kierroksen div-sisäiseen säiliöön
        playoffContainer.appendChild(roundDiv); // Lisää kierros pudotuspelisäiliöön
      });
    } else {
      console.error('Ei pudotuspelejä löytynyt tai rounds on tyhjennetty'); // Virheviesti, jos tietoja ei ole
    }
  })
  .catch(error => {
    console.error('Virhe:', error); // Virheviesti, jos API-haussa tapahtuu virhe
  });
