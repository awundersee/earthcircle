---
layout: default
title: CO2 Emissionen
permalink: co2-emissionen
---

<section class="hero-banner hero-emissionen d-flex">
    <div class="c-banner d-none d-lg-block z-1 position-absolute top-0 bottom-0 start-0 end-0"></div>
    <div class="bg-banner position-absolute top-0 bottom-0 start-0 end-0 bg-black bg-opacity-50 z-0"></div>
    <div class="container text-white position-relative align-items-center justify-content-end z-2">
        <div class="row">
            <div class="col-lg-7 offset-lg-4">
                <h1 class="display-3 fw-bold">Es ist noch ein weiter Weg zum Kreislauf</h1>
                <p class="lead mb-4">Wir wollen nicht mit dem Finger auf die Wirtschaft zeigen, sondern Potentiale für eine Kreislaufwirschaft aufzeigen.</p>
                <a href="{{ site.baseurl }}/ueber-uns" class="btn btn-primary btn-lg">Was Du tun kannst</a>
            </div>
        </div>
    </div>
</section>

<section class="bg-dark text-white pt-4 pb-4 mb-5">
    <div class="container-fluid pb-4">
        <div class="row d-flex align-items-end pb-4">
            <div class="col-sm-6">
                <div class="m-4">
                    <h2 class="fw-bold mb-5">Ist eine Kreislaufwirtschaft überhaupt realisierbar?</h2>
                    <p class="lead"><span class="fw-bold">Ja – wenn Daten genutzt werden und wir Wissen teilen,</span> schaffen wir die Grundlage dafür, dass Wirtschaft, Politik und Gesellschaft gemeinsam den Schritt in Richtung Kreislaufwirtschaft gehen.</p>
                    <p>Nachhaltige Transformation gelingt nur, wenn die Wirtschaft aktiv eingebunden ist. Genau hier setzt unsere NGO an: Wir werten Daten aus, um Potenziale sichtbar zu machen und Entscheidungsgrundlagen für Unternehmen zu schaffen.</p>
                    <p>Die 36 größten Emittenten stoßen deshalb so enorme Mengen CO₂ aus, weil sie in erster Linie für die weltweite Nachfrage nach Energie, Rohstoffen und Materialien produzieren. <strong>Ihre Emissionen spiegeln somit nicht nur ihr eigenes Handeln wider, sondern den globalen Bedarf, den sie bedienen.</strong> Daher sollten sie nicht isoliert betrachtet werden, sondern vielmehr als exemplarische Stellvertreter für ganze Wertschöpfungsketten und Konsummuster verstanden werden.</p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="m-4">
                    <span class="overshoot-date fw-bold"><span class="fw-light fs-1">~</span><span class="counter" data-number="40">0</span>%</span>
                    <p class="mt-3">der globalen CO₂-Emissionen<br/>stammen von 36 Unternehmen.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<script>

async function loadData() {
    const response = await fetch('../assets/data/data.json');
    const data = await response.json();
    return data;
}

// Funktion um braune Farbvarianten zu generieren
function generateBrownColors(n) {
    const colors = [];
    for (let i = 0; i < n; i++) {
    // Basisfarbe #ce7a00 -> HSL: 33°, 100%, 40%
    // Wir variieren Helligkeit 35%-60% und Sättigung 80%-100%
    const hue = 33; // braun
    const saturation = 80 + Math.random() * 20;
    const lightness = 35 + Math.random() * 25;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
}

async function createCharts() {
    const data = await loadData();

    // --- Unternehmen ---
    const companyLabels = data.map(d => d.company);
    const companyPercentages = data.map(d => d.percentage);

    // Rest der Welt hinzufügen
    const sumCompany = companyPercentages.reduce((a,b) => a+b, 0);
    companyLabels.push("Rest der Welt");
    companyPercentages.push(100 - sumCompany);

    const companyColors = [...generateBrownColors(companyLabels.length - 1), 'lightgray'];

    const ctx1 = document.getElementById('companyChart').getContext('2d');
    new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: companyLabels,
        datasets: [{
        label: 'Anteil an globalen CO₂-Emissionen',
        data: companyPercentages,
        backgroundColor: companyColors
        }]
    },
    options: {
        responsive: true,
        plugins: { 
        legend: { display: false },
        tooltip: { enabled: false }
        }
    }
    });

    // --- Länder ---
    const countryData = {};
    data.forEach(d => {
    if (!countryData[d.country]) countryData[d.country] = 0;
    countryData[d.country] += d.percentage;
    });

    const countryLabels = Object.keys(countryData);
    const countryPercentages = Object.values(countryData);

    // Rest der Welt hinzufügen
    const sumCountry = countryPercentages.reduce((a,b) => a+b, 0);
    countryLabels.push("Rest der Welt");
    countryPercentages.push(100 - sumCountry);

    const countryColors = [...generateBrownColors(countryLabels.length - 1), 'lightgray'];

    const ctx2 = document.getElementById('countryChart').getContext('2d');
    new Chart(ctx2, {
    type: 'doughnut',
        data: {
          labels: countryLabels,
          datasets: [{
            label: 'Anteil an globalen CO₂-Emissionen nach Land',
            data: countryPercentages,
            backgroundColor: countryColors
          }]
        },
        options: {
          responsive: true,
          plugins: { 
            legend: { display: false },
            tooltip: { enabled: false }
           }
        }
      });
    }

    createCharts();   

</script>

<section class="container-fluid pt-4 mb-4 pb-4">
    <div class="m-4">
        <div class="row mb-3 align-items-center">
            <div class="col-md-12"><h2 class="fw-bold">CO₂-Emissionen globaler Unternehmen</h2></div>
            <div class="col-sm-6 pt-4 pb-4">
                <p class="lead">Die folgenden Daten stammen aus dem <span class="fw-bold">Carbon Majors Report 2023</span> und beziehen sich ausschließlich auf die 36 größten globalen Unternehmen, da diese zusammen fast 40 % der weltweiten CO₂-Emissionen verursachen.</p>
                <p>Die Daten verdeutlichen die global vernetzte Produktion und machen sichtbar, dass die Emissionen nicht allein den produzierenden Ländern zugerechnet werden können. Vielmehr zeigt die Statistik, wie groß unser gemeinsamer Energie- und Ressourcenbedarf weltweit ist und welche Rolle die internationalen Wertschöpfungsketten dabei spielen.</p>
            </div>    
        </div>
        <div class="row mb-5">
            <div class="col-sm-6 col-md-3 offset-md-2">
                <canvas id="companyChart"></canvas>
            </div>
            <div class="col-sm-6 col-md-3 offset-md-2">
                <canvas id="countryChart"></canvas>
            </div>
        </div>      
        <div class="row">
            <div class="col-lg-10 offset-lg-1">
                <div class="row mb-3 align-items-center pt-5">  
                    <div class="col-md-9">
                    <label for="searchInput" class="form-label visually-hidden">Suche nach Firma oder Land</label>
                    <input
                        id="searchInput"
                        type="text"
                        class="form-control"
                        placeholder="Nach Firma oder Land suchen"
                    />
                    </div>
                    <div class="col-md-2 offset-md-1 col-lg-3 offset-lg-0">
                    <div class="dropdown">
                        <button 
                        class="btn btn-primary dropdown-toggle w-100" 
                        type="button" 
                        id="sortDropdownButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                        Sortierung ändern
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="sortDropdownButton">
                        <li><button class="dropdown-item" data-key="country" data-dir="asc" type="button">Land aufsteigend</button></li>
                        <li><button class="dropdown-item" data-key="country" data-dir="desc" type="button">Land absteigend</button></li>
                        <li><button class="dropdown-item" data-key="company" data-dir="asc" type="button">Unternehmen aufsteigend</button></li>
                        <li><button class="dropdown-item" data-key="company" data-dir="desc" type="button">Unternehmen absteigend</button></li>
                        <li><button class="dropdown-item" data-key="emissions" data-dir="asc" type="button">CO₂-Emissionen aufsteigend</button></li>
                        <li><button class="dropdown-item" data-key="emissions" data-dir="desc" type="button">CO₂-Emissionen absteigend</button></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div id="table" class="table-responsive"></div>
            </div>
        </div>
    </div>
</section>

<section class="hero-banner hero-support d-flex mt-5 align-items-center">
    <div class="c-banner d-none d-lg-block z-1 position-absolute top-0 bottom-0 start-0 end-0"></div>
    <div class="bg-banner position-absolute top-0 bottom-0 start-0 end-0 bg-black bg-opacity-50 z-0"></div>
    <div class="container text-white position-relative z-2">
        <div class="row">
        <div class="col-lg-7 offset-lg-4">
            <h1 class="display-3 fw-bold">Wir wollen eine Symbiose mit der Natur</h1>
            <p class="lead mb-4">Wir wollen die globalen Ressourcen nutzen und nicht ausnutzen: mit einer funktionierenden Kreislaufwirtschaft.</p>
            <a href="{{ site.baseurl }}/ueber-uns" class="btn btn-dark btn-lg">Unterstütze uns dabei</a>
        </div>
        </div>
    </div>
</section>