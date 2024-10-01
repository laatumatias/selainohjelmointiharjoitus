const url = 'https://api-web.nhle.com/v1/standings/2024-04-18'; // API:n URL, josta haetaan sarjataulukon tiedot

// Tehdään HTTP GET -pyyntö API:lle
fetch(url)
  .then(response => response.json()) // Muutetaan vastaus JSON-muotoon
  .then(data => {
    console.log(data); // Tulostetaan saatu data konsoliin

    const teamContainer = document.getElementById('team-container'); // Haetaan elementti, johon joukkueiden tiedot lisätään
    if (data.standings && data.standings.length > 0) { // Tarkistetaan, että standings on olemassa ja ei tyhjennetty
      data.standings.forEach(standing => { // Käydään läpi jokainen joukkueen sijoitus
        const teamName = standing.teamName.default; // Haetaan joukkueen nimi
        const points = standing.points; // Haetaan joukkueen pisteet
        const wins = standing.wins; // Haetaan voitot
        const losses = standing.losses; // Haetaan häviöt
        const teamLogo = standing.teamLogo; // Haetaan joukkueen logo

        const teamCard = document.createElement('div'); // Luodaan uusi div-elementti joukkueen tiedoille
        teamCard.classList.add('team-card'); // Lisätään luokka 'team-card' uudelle diville

        // HTML-elementti merkkijonona
        teamCard.innerHTML = `
          <img src="${teamLogo}" alt="${teamName} logo" class="team-logo"> <!-- Lisätään joukkueen logo -->
          <div class="team-name">${teamName}</div> <!-- Lisätään joukkueen nimi -->
          <div class="team-points">Pisteet: ${points}</div> <!-- Lisätään joukkueen pisteet -->
          <div class="team-wins">Voitot: ${wins}</div> <!-- Lisätään voitot -->
          <div class="team-losses">Häviöt: ${losses}</div> <!-- Lisätään häviöt -->
        `;

        teamContainer.appendChild(teamCard); // Lisätään joukkueen kortti DOM:iin
      });
    } else {
      console.error('Ei joukkueita löytynyt tai standings on tyhjennetty'); // Virhe ilmoitus, jos joukkueita ei löydy
    }
  })
  .catch(error => {
    console.error('Virhe:', error); // Käsitellään mahdolliset virheet ja tulostetaan virhe konsoliin
  });
