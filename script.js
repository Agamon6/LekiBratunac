// BRATUNAC U BROJKAMA — GRAFIKONI v3


if (typeof Chart === 'undefined') {
    document.body.insertAdjacentHTML(
        'afterbegin',
        '<div style="padding:16px;background:#fff3cd;color:#664d03;text-align:center;font-family:Arial,sans-serif;">Chart.js nije učitan. Proveri internet vezu ili CDN link u index.html.</div>'
    );
} else {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#374151';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 53, 89, 0.92)';
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 10;


    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    boxHeight: 8
                }
            }
        }
    };


    const getCanvas = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Canvas element nije pronađen: ${id}`);
            return null;
        }
        return element.getContext('2d');
    };


    // 1. BUDŽET
    fetch('data/budzet.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Budžet JSON nije pronađen.');
            }
            return response.json();
        })
        .then(data => {
            const ctx = getCanvas('budzetChart');
            if (!ctx) return;


            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.godine,
                    datasets: [{
                        label: 'Budžet (mil. KM)',
                        data: data.iznosi,
                        backgroundColor: 'rgba(44, 124, 184, 0.75)',
                        borderColor: '#1a4d7c',
                        borderWidth: 2,
                        borderRadius: 10
                    }]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Milioni KM' },
                            grid: { color: 'rgba(229,231,235,0.7)' }
                        },
                        x: { grid: { display: false } }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Greška pri učitavanju budžeta:', error);
            const container = document.querySelector('#budzet .chart-container');
            if (container) {
                container.innerHTML = '<p class="chart-error">Ne mogu da učitam data/budzet.json. Proveri da li fajl postoji u folderu data.</p>';
            }
        });


    // 2. STANOVNIŠTVO
    const stanovnistvoCtx = getCanvas('stanovnistvoChart');
    if (stanovnistvoCtx) {
        new Chart(stanovnistvoCtx, {
            type: 'line',
            data: {
                labels: ['1991 (popis)', '2013 (popis)', '2022 (procena)'],
                datasets: [{
                    label: 'Broj stanovnika',
                    data: [33619, 20340, 17668],
                    backgroundColor: 'rgba(231, 76, 60, 0.16)',
                    borderColor: '#e74c3c',
                    borderWidth: 3,
                    tension: 0.35,
                    pointRadius: 6,
                    pointBackgroundColor: '#e74c3c',
                    fill: true
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    title: { display: true, text: 'Pad od preko 47% za 30 godina' }
                },
                scales: {
                    y: {
                        title: { display: true, text: 'Broj stanovnika' },
                        grid: { color: 'rgba(229,231,235,0.7)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }


    // 3. STAROSNA STRUKTURA
    const starostCtx = getCanvas('starostChart');
    if (starostCtx) {
        new Chart(starostCtx, {
            type: 'pie',
            data: {
                labels: ['Deca (0-14)', 'Mladi (15-29)', 'Odrasli (30-64)', 'Stariji (65+)'],
                datasets: [{
                    data: [14, 18, 48, 20],
                    backgroundColor: ['#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                ...commonOptions,
                plugins: { legend: { position: 'right' } }
            }
        });
    }


    // 4. OBRAZOVANJE
    const obrazovanjeCtx = getCanvas('obrazovanjeChart');
    if (obrazovanjeCtx) {
        new Chart(obrazovanjeCtx, {
            type: 'bar',
            data: {
                labels: ['OŠ Branko Radičević', 'OŠ Vuk Karadžić', 'OŠ Petar Kočić (Kravica)'],
                datasets: [{
                    label: 'Broj učenika',
                    data: [709, 545, 280],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.75)',
                        'rgba(46, 204, 113, 0.75)',
                        'rgba(230, 126, 34, 0.75)'
                    ],
                    borderColor: ['#2980b9', '#27ae60', '#d35400'],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...commonOptions,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Broj učenika' },
                        grid: { color: 'rgba(229,231,235,0.7)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }


    // 5. IZBORI 2024
    const izboriCtx = getCanvas('izboriChart');
    if (izboriCtx) {
        new Chart(izboriCtx, {
            type: 'bar',
            data: {
                labels: ['Lazar Prodanović (SNSD)', 'Stefan Bojić (Ujedinjena Srpska)', 'Ostali kandidati'],
                datasets: [{
                    label: 'Procena glasova',
                    data: [3800, 3100, 800],
                    backgroundColor: [
                        'rgba(155, 89, 182, 0.75)',
                        'rgba(52, 152, 219, 0.75)',
                        'rgba(149, 165, 166, 0.75)'
                    ],
                    borderColor: ['#8e44ad', '#2980b9', '#7f8c8d'],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...commonOptions,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Pobednik: Lazar Prodanović — razlika oko 700 glasova' }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: { display: true, text: 'Broj glasova (procena)' },
                        grid: { color: 'rgba(229,231,235,0.7)' }
                    },
                    y: { grid: { display: false } }
                }
            }
        });
    }


    // 6. POLJOPRIVREDA
    const poljoprivredaCtx = getCanvas('poljoprivredaChart');
    if (poljoprivredaCtx) {
        new Chart(poljoprivredaCtx, {
            type: 'line',
            data: {
                labels: ['2010', '2016', '2020', '2023', '2025 (proc.)'],
                datasets: [{
                    label: 'Proizvodnja maline (tona) — regija Birač',
                    data: [2500, 3500, 1500, 800, 300],
                    backgroundColor: 'rgba(231, 76, 60, 0.16)',
                    borderColor: '#c0392b',
                    borderWidth: 3,
                    tension: 0.35,
                    pointRadius: 6,
                    pointBackgroundColor: '#c0392b',
                    fill: true
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    title: { display: true, text: 'Drastičan pad u poslednjih 15 godina' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Tone' },
                        grid: { color: 'rgba(229,231,235,0.7)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }


    // 7. RASHODI
    const rashodiCtx = getCanvas('rashodiChart');
    if (rashodiCtx) {
        new Chart(rashodiCtx, {
            type: 'doughnut',
            data: {
                labels: ['Plate i naknade', 'Infrastruktura', 'Obrazovanje', 'Socijalna zaštita', 'Kultura i sport', 'Komunalne usluge', 'Ostalo'],
                datasets: [{
                    data: [28, 22, 15, 12, 8, 10, 5],
                    backgroundColor: ['#2c7cb8', '#e67e22', '#27ae60', '#9b59b6', '#e74c3c', '#16a085', '#95a5a6'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                ...commonOptions,
                cutout: '62%',
                plugins: { legend: { position: 'right' } }
            }
        });
    }


    // 8. PRIVREDA
    const privredaCtx = getCanvas('privredaChart');
    if (privredaCtx) {
        new Chart(privredaCtx, {
            type: 'doughnut',
            data: {
                labels: ['Poljoprivreda', 'Trgovina', 'Usluge', 'Industrija', 'Ostalo'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: ['#2c7cb8', '#27ae60', '#f39c12', '#e74c3c', '#95a5a6'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                ...commonOptions,
                cutout: '62%',
                plugins: { legend: { position: 'right' } }
            }
        });
    }
}




