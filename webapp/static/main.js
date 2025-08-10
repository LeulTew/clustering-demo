// Updated testData with a balanced east/west distribution and sufficient capacity.
// This data is a sample and can be replaced with dynamic input.
const testData = {
    locations: {
        HQ: [9.0222, 38.7468],
        employees: [
            // East side employees (15 total)
            { "id": "c8a73881-56cc-4a73-a52c-b0fd2ef6d04e", "latitude": 9.03287202200085, "longitude": 38.76343705089629 },
            { "id": "15cf3b4f-aaed-44d3-bd4d-0375a5a1af77", "latitude": 9.04293879926999, "longitude": 38.76907066992139 },
            { "id": "41ffa805-7b34-42ac-9418-9418-891563aaa175", "latitude": 9.03369509386297, "longitude": 38.75478508606945 },
            { "id": "aaef05ed-cec8-4b0a-a9d1-ec688e4d7df6", "latitude": 9.012204294628887, "longitude": 38.74679027085802 },
            { "id": "4de64863-fe56-4190-9d13-5e9254edba11", "latitude": 9.044270542583565, "longitude": 38.76023426541653 },
            { "id": "91b4aad9-a30f-4f79-bd48-62060eb1c05b", "latitude": 9.03457270903528, "longitude": 38.84610715018231 },
            { "id": "53db866e-e554-43c2-a5c3-f312b6a03778", "latitude": 9.034572932288537, "longitude": 38.84613217184764 },
            { "id": "7f1d424b-da16-45c6-be8b-6075c71b95d5", "latitude": 9.046267720531768, "longitude": 38.88009541881031 },
            { "id": "0f40778a-61f0-49ea-9aff-362294e3d429", "latitude": 9.017882290414272, "longitude": 38.79562470479321 },
            { "id": "d9621528-9038-42ce-81fd-077bbda6f6eb", "latitude": 9.010779787674236, "longitude": 38.89456335992595 },
            { "id": "83359cd9-c476-4c2f-a7ba-ec05f86d612b", "latitude": 9.028523332591963, "longitude": 38.87593296009408 },
            { "id": "04a7ed4e-76d2-4b31-9db8-795d3348c901", "latitude": 9.001489969659858, "longitude": 38.7819725340372 },
            { "id": "4db8852f-1513-400e-8e58-4337e878a8d1", "latitude": 8.986746249254816, "longitude": 38.79336889463149 },
            { "id": "57960072-ecc4-4e48-9c86-3fa9f6c17227", "latitude": 8.967152184362995, "longitude": 38.78025356978782 },
            { "id": "95872ef3-aa24-4afe-916e-fd4056515616", "latitude": 9.002833836117155, "longitude": 38.79971092620778 },

            // West side employees (14 total)
            { "id": "e_west_1", "latitude": 9.035, "longitude": 38.730 },
            { "id": "e_west_2", "latitude": 9.040, "longitude": 38.725 },
            { "id": "e_west_3", "latitude": 9.025, "longitude": 38.710 },
            { "id": "e_west_4", "latitude": 9.015, "longitude": 38.705 },
            { "id": "e_west_5", "latitude": 9.050, "longitude": 38.690 },
            { "id": "e_west_6", "latitude": 9.030, "longitude": 38.685 },
            { "id": "e_west_7", "latitude": 9.045, "longitude": 38.680 },
            { "id": "e_west_8", "latitude": 9.010, "longitude": 38.700 },
            { "id": "e_west_9", "latitude": 9.005, "longitude": 38.720 },
            { "id": "e_west_10", "latitude": 8.990, "longitude": 38.715 },
            { "id": "e_west_11", "latitude": 8.995, "longitude": 38.735 },
            { "id": "e_west_12", "latitude": 9.000, "longitude": 38.708 },
            { "id": "e_west_13", "latitude": 9.020, "longitude": 38.740 },
            { "id": "e_west_14", "latitude": 9.018, "longitude": 38.738 }
        ]
    },
    shuttles: [
        { "id": 1, "capacity": 5 },
        { "id": 2, "capacity": 5 },
        { "id": 3, "capacity": 4 },
        { "id": 4, "capacity": 4 },
        { "id": 5, "capacity": 4 },
        { "id": 6, "capacity": 4 },
        { "id": 7, "capacity": 4 }
    ]
};

/* ----------------------------
 Utilities: color palette, helpers
-------------------------------*/
const PALETTE = [
    '#7DD3FC', '#A7F3D0', '#FBCFE8', '#FDE68A', '#C7B2FF', '#FBC7A4', '#93C5FD', '#FCA5A5'
];
function getColor(i) { return PALETTE[i % PALETTE.length]; }
function colorWithAlpha(hex, alpha = 0.18) {
    // hex -> rgba
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

/* ----------------------------
 Map initialization
-------------------------------*/
const map = L.map('map', {
    center: testData.locations?.HQ,
    zoom: 13,
    zoomControl: true,
    preferCanvas: true,
    worldCopyJump: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Remove the default "Leaflet" prefix
map.attributionControl.setPrefix(false);

/* containers */
window.clusterLayers = []; // polygons + route controls
const markers = {};          // employee markers keyed by id

/* HQ marker (modern small icon) */
const hqIcon = L.divIcon({
    className: '',
    html: `<div style="
            width:40px;height:40px;border-radius:10px;
            display:flex;align-items:center;justify-content:center;
            font-weight:700;background:linear-gradient(180deg,#0ea5e9,#0369a1);
            color:white;border:1px solid rgba(255,255,255,0.06);
            box-shadow: 0 6px 20px rgba(2,6,23,0.45);
        ">HQ</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});
L.marker(testData.locations.HQ, { icon: hqIcon }).addTo(map).bindPopup('HQ');

/* employee markers */
testData.locations.employees.forEach(emp => {
    const m = L.circleMarker([emp.latitude, emp.longitude], {
        radius: 7,
        weight: 1.6,
        color: 'rgba(255,255,255,0.12)',
        fillColor: '#94a3b8',
        fillOpacity: 0.9
    }).addTo(map).bindTooltip(`ID: ${emp.id}`, { permanent: false, direction: 'top', offset: [0, -10] });
    markers[emp.id] = m;
});

/* zoom map to bounds of HQ + employees */
(function fitAll() {
    const coords = [testData.locations.HQ].concat(testData.locations.employees.map(e => [e.latitude, e.longitude]));
    map.fitBounds(coords, { padding: [80, 80] });
})();

/* ----------------------------
 DOM helpers (sidebar)
-------------------------------*/
const runBtn = document.getElementById('runBtn');
const runText = document.getElementById('runText');
const clearBtn = document.getElementById('clearBtn');
const messageBox = document.getElementById('messageBox');
const clusterListEl = document.getElementById('clusterList');
const clusterCountEl = document.getElementById('clusterCount');

function setMessage(text, type = 'info') {
    messageBox.textContent = text;
    messageBox.className = 'muted'; // reset classes
    if (type === 'error') {
        messageBox.style.color = '#fb7185';
    } else {
        messageBox.style.color = '#94a3b8';
    }
}

/* ----------------------------
 Clear previous cluster layers & UI
-------------------------------*/
function clearClusters() {
    if (window.clusterLayers) {
        window.clusterLayers.forEach(l => {
            try { map.removeLayer(l); } catch (e) { }
            // some layers may be L.Routing.Control objects with .remove()
            if (l && l.remove) { try { l.remove(); } catch (e) { } }
        });
    }
    window.clusterLayers = [];
    clusterListEl.innerHTML = '';
    clusterCountEl.textContent = '0';
    // Reset markers visually
    Object.values(markers).forEach(m => m.setStyle({ fillColor: '#94a3b8', color: 'rgba(255,255,255,0.12)' }));
}

/* ----------------------------
 Draw clusters & routes (road-following)
 routes: expected from backend as array of:
  { shuttle_id: 'S1', employees: ['E2','E5', ...] }
-------------------------------*/
async function showClusters(routes) {
    clearClusters();

    clusterCountEl.textContent = String(routes.length || 0);

    // build lookup for employees
    const empLookup = {};
    testData.locations.employees.forEach(e => empLookup[e.id] = e);

    // For each route/cluster:
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const color = getColor(i);
        const fill = colorWithAlpha(color, 0.18);

        // Build waypoints: HQ -> employee points in order
        const empIds = route.employees || [];
        const waypoints = [];
        waypoints.push(L.latLng(testData.locations.HQ[0], testData.locations.HQ[1]));
        for (const id of empIds) {
            const e = empLookup[id];
            if (e) waypoints.push(L.latLng(e.latitude, e.longitude));
            // update marker color immediately (visual)
            if (markers[id]) markers[id].setStyle({ fillColor: color, color });
        }

        // If only HQ + one employee: we still draw a small route
        if (waypoints.length < 2) {
            continue;
        }

        // Use Leaflet Routing Machine to draw road-following path.
        // Using default OSRM demo server (suitable for prototype)
        // I have added a timeout to handle slow responses from the server
        const router = L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            timeout: 30 * 1000 // Set timeout to 30 seconds
        });
        const control = L.Routing.control({
            waypoints: waypoints,
            router: router,
            lineOptions: { styles: [{ color: color, weight: 4.2, opacity: 0.95 }] },
            createMarker: () => null,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            show: false,
            routeWhileDragging: false
        }).addTo(map);

        // store it so we can clear later
        window.clusterLayers.push(control);

        // Also create a soft polygon shading (convex hull-like)
        const latlngs = waypoints.map(w => [w.lat, w.lng]);
        try {
            const poly = L.polygon(latlngs, {
                color: color,
                weight: 0,
                fillColor: fill,
                fillOpacity: 0.26,
                interactive: false
            }).addTo(map);
            // add subtle pulse via CSS class
            const el = poly.getElement && poly.getElement();
            if (el) el.classList.add('leaflet-shaded-pulse');
            window.clusterLayers.push(poly);
        } catch (e) { /* ignore */ }

        // Add cluster card to sidebar
        const card = document.createElement('button');
        card.className = 'cluster';
        card.type = 'button';
        card.innerHTML = `
            <div class="color-pill" style="background:${color}"></div>
            <div style="flex:1; text-align:left">
                <h3>Shuttle ${route.shuttle_id}</h3>
                <p class="muted">${empIds.length} employees · Capacity ${getShuttleCapacity(route.shuttle_id)}</p>
                <div class="bar" aria-hidden="true"><i style="width:${Math.min(100, (empIds.length / getShuttleCapacity(route.shuttle_id)) * 100)}%; background:${color};"></i></div>
            </div>
        `;
        // zoom to cluster when clicked: fit route bounds
        card.addEventListener('click', () => {
            // try to fit the routing control's route bounds (if available)
            const routesFromControl = control.getRouter && control._routes;
            if (routesFromControl && routesFromControl.length) {
                // compute bounds of first route coordinates
                const coords = [];
                routesFromControl[0].coordinates.forEach(c => coords.push([c.lat, c.lng]));
                map.fitBounds(coords, { padding: [80, 80] });
            } else {
                // fallback: fit HQ + employees
                const fallback = latlngs;
                map.fitBounds(fallback, { padding: [80, 80] });
            }
        });

        clusterListEl.appendChild(card);
    }
    setMessage('Clusters rendered. Click a card to zoom.', 'info');
}

/* ----------------------------
 Helpers: capacity lookup
-------------------------------*/
function getShuttleCapacity(id) {
    const s = testData.shuttles.find(x => x.id === id);
    return s ? s.capacity : 8;
}

/* ----------------------------
 Wire up Run & Clear buttons
-------------------------------*/
runBtn.addEventListener('click', async () => {
    runBtn.setAttribute('disabled', '');
    runText.textContent = 'Running…';
    setMessage('Sending data to clustering service...', 'info');

    try {
        const resp = await fetch('/run_clustering', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });
        const data = await resp.json();

        if (resp.ok) {
            await showClusters(data.routes);
        } else {
            setMessage(`Error: ${data.detail}`, 'error');
        }

    } catch (err) {
        console.error(err);
        setMessage('Error running clustering. See console.', 'error');
    } finally {
        runBtn.removeAttribute('disabled');
        runText.textContent = 'Run Clustering';
    }
});

clearBtn.addEventListener('click', () => {
    clearClusters();
    setMessage('Cleared', 'info');
});

/* ----------------------------
 Clean start: show message & placeholder cluster
-------------------------------*/
setMessage('Ready. Press "Run Clustering".', 'info');

// Populate the overlay counts on page load
document.getElementById('empCount').textContent = testData.locations.employees.length;
document.getElementById('shuttleCount').textContent = testData.shuttles.length;
