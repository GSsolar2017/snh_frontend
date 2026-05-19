 const API_BASE =
"https://snh-backend-3tg6.onrender.com/api";

async function fetchLiveData() {

  const response =
   await fetch(`${API_BASE}/site/snh/live`);

 if (!response.ok) {
  throw new Error('API Failed');
}

return await response.json();

}

async function fetchEnergyGraph() {

  const today =
    new Date().toISOString().split('T')[0];

  const response =
    await fetch(
      `${API_BASE}/site/snh/graphs/energy-sources?date=${today}`
    );

  return await response.json();

}

async function fetchInverterGraph() {

  const today =
    new Date().toISOString().split('T')[0];

  const response =
    await fetch(
      `${API_BASE}/site/snh/graphs/inverters?date=${today}`
    );

  return await response.json();

}

async function fetchImportExportGraph() {

  const today =
    new Date().toISOString().split('T')[0];

  const response =
    await fetch(
      `${API_BASE}/site/snh/graphs/import-export?date=${today}`
    );

  return await response.json();

}

async function fetchSolarGenerationGraph() {

  const today =
    new Date().toISOString().split('T')[0];

  const response =
    await fetch(
      `${API_BASE}/site/snh/graphs/solar-generation?date=${today}`
    );

  return await response.json();

}

// LOGIN CHECK
if (!localStorage.getItem("role")) {
  window.location.href = "login.html";
}

 function toggleMenu() {
  var submenu = document.getElementById("reportSubmenu");

  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}
function navigate(page) {

  history.pushState(
    { page: page },
    "",
    `#${page}`
  );

  document.getElementById(page).click();
}

window.onload = () => {

history.replaceState(
  { page: "dashboard" },
  "",
  "#dashboard"
);

const content = document.getElementById("content");

document.getElementById("dashboard").onclick = () => {

  history.pushState({page:"dashboard"}, "", "#dashboard");

    content.innerHTML = `

      <h1>Dashboard</h1>
      <p>Overview of solar system</p>

      <div class="cards">
        <div class="card">
          <h3>Total Devices</h3>
          <p>20</p>
        </div>

        <div class="card">
          <h3>Active Devices</h3>
          <p style="color:#00c853;">15</p>
        </div>

        <div class="card">
          <h3>Inactive Devices</h3>
          <p style="color:#ff3d00;">5</p>
        </div>
      </div>
    `;
    loadDashboardData();
  };


// REPORTS
document.getElementById("reports").onclick = () => {
  
  history.pushState({page:"reports"}, "", "#reports");

  content.innerHTML = `
    <h1>Reporting</h1>

    <div class="report-box">

      <div class="report-header">
        <h3>Devices</h3>
        <input type="text" placeholder="Filter..." class="search-box">
      </div>

      <table class="device-table">
        <tr>
          <th><input type="checkbox"></th>
          <th>ID</th>
          <th>MAC</th>
          <th>Name</th>
          <th>Status</th>
        </tr>

        <tr>
          <td><input type="checkbox" value="GS-121" onchange="selectDevice(this.value)"></td>
          <td>GS-121</td>
          <td>74-C9-0F-AE-9E-C1</td>
          <td>TPEX</td>
          <td><span class="status active">Active</span></td>
        </tr>

        <tr>
          <td><input type="checkbox" value="GS-110" onchange="selectDevice(this.value)"></td>
          <td>GS-110</td>
          <td>44-B7-D0-9E-A6-EE</td>
          <td>Apar</td>
          <td><span class="status active">Active</span></td>
        </tr>

        <tr>
          <td><input type="checkbox" value="GS-107" onchange="selectDevice(this.value)"></td>
          <td>GS-107</td>
          <td>D8-47-8F-42-BB-1A</td>
          <td>SNH</td>
          <td><span class="status active">Active</span></td>
        </tr>

        <tr>
          <td><input type="checkbox" value="GS-120" onchange="selectDevice(this.value)"></td>
          <td>GS-120</td>
          <td>74-C9-0F-98-12-5E</td>
          <td>Sew Pune</td>
          <td><span class="status inactive">Inactive</span></td>
        </tr>

      </table>
    <div id="variablesSection" class="report-box" style="margin-top:20px;">

  <div class="report-header">
    <h3>Variables (<span id="varCount">0</span>)</h3>
    <input type="text" placeholder="Filter variables..." class="search-box" onkeyup="filterVariables()">
  </div>

  <div style="max-height:250px; overflow-y:auto;">
    <table class="device-table" id="variableTable">
      <tr>
        <th><input type="checkbox"></th>
        <th>Name</th>
      </tr>
    </table>
  </div>

  <p id="noData" style="text-align:center; color:#888; display:none;">
    No variables found
  </p>

</div>
   <div class="report-box" style="margin-top:20px;">

  <div class="report-header">
    <h3>Period</h3>
  </div>

  <div class="period-section">

    <!-- Period Type -->
    <label>Period Type</label><br>
    <select class="input-box">
      <option>Custom date range</option>
      <option>Today</option>
      <option>Yesterday</option>
      <option>Last 7 days</option>
    </select>

    <br><br>

    <!-- Start Date -->
    <label>Start Date:</label><br>
    <input type="date" class="input-box">

    <br><br>

    <!-- End Date -->
    <label>End Date:</label><br>
    <input type="date" class="input-box">

    <br><br>

    <!-- Start Time -->
    <label>Start Time</label><br>
    HH: <input type="number" class="time-box">
    MM: <input type="number" class="time-box">
    <p class="hint">* Leave at zero to ignore</p>

    <!-- End Time -->
    <label>End Time</label><br>
    HH: <input type="number" class="time-box">
    MM: <input type="number" class="time-box">
    <p class="hint">* Leave at zero to ignore</p>

    <br>

    <!-- Time Format -->
    <label>Time Format</label><br>
    <select class="input-box">
      <option>Human Readable</option>
      <option>Unix Timestamp</option>
    </select>

    <br><br>

    <!-- Interval -->
    <label>Interval</label><br>
    <select class="input-box">
      <option>1 minute</option>
      <option>5 minutes</option>
      <option>15 minutes</option>
      <option>1 hour</option>
    </select>

    <br><br>

    <!-- Function -->
    <label>Function</label><br>
    <select class="input-box">
      <option>Max</option>
      <option>Min</option>
      <option>Average</option>
      <option>Sum</option>
    </select>

    <br><br>

    <!-- Buttons -->
    <button class="export-btn">Generate CSV Report</button>
    <button class="export-btn">View JSON</button>
    <button class="export-btn">View Report</button>

  </div>

</div>
    <div class="report-box" style="margin-top:20px;">

  <div class="report-header">
    <h3>Preset Reports</h3>
  </div>

  <div class="preset-section">

    <!-- Preset Name -->
    <label>Preset Report Name</label><br>
    <input type="text" placeholder="Enter preset name..." class="input-box">

    <br><br>

    <!-- Buttons -->
    <button class="export-btn">Save Preset</button>
    <button class="export-btn">Load Preset</button>

  </div>

</div>
<br>

<button class="export-btn">Export Data</button>

  `;
};

// ALERTS
  document.getElementById("alerts").onclick = () => {
   history.pushState({page:"alerts"}, "", "#alerts");
    content.innerHTML = `
    <h1>Alerts</h1>

    <div class="report-box">

      <div class="report-header">
        <h3>Alerts</h3>
      </div>

      <p>Select the alerts you wish to process</p>

      <!-- TOP BAR -->
      <div class="alert-top">

        <div>
          <label>Filter:</label>
          <input type="text" class="search-box">
        </div>

        <div class="right-controls">
          <div class="status-box">
            <span>Status:</span>
            <button class="active-btn">Pending</button>
            <button>Processed</button>
            <button>Important</button>
          </div>

          <div class="page-size">
            <span>Page Size:</span>
            <button>30</button>
            <button class="active-btn">50</button>
            <button>100</button>
            <button>All</button>
          </div>

          <select class="page-dropdown">
            <option>1</option>
            <option>2</option>
          </select>
        </div>

      </div>

      <p>Showing 30 alerts.</p>

      <!-- ACTION BUTTONS -->
      <div class="alert-actions">
        <button class="blue-btn">🔄 Mark Pending</button>
        <button class="blue-btn">✔ Mark Done</button>
        <button class="gray-btn">⬇ Download</button>
        <button class="gray-btn">🗑 Delete</button>
      </div>

      <!-- TABLE -->
      <table class="device-table">
        <tr>
          <th><input type="checkbox"></th>
          <th>ID</th>
          <th>Type</th>
          <th>Alert Date</th>
          <th>Device</th>
          <th>Message</th>
          <th>Status</th>
        </tr>

        <tr>
          <td><input type="checkbox"></td>
          <td><span class="badge">5277404</span></td>
          <td><span class="tag warning">Warning</span></td>
          <td>2026-05-05 14:07 (24 minutes ago)</td>
          <td>SSP</td>
          <td>SSP is now offline.</td>
          <td>Unhandled</td>
        </tr>

        <tr>
          <td><input type="checkbox"></td>
          <td><span class="badge">5277378</span></td>
          <td><span class="tag info">Info</span></td>
          <td>2026-05-05 14:03 (28 minutes ago)</td>
          <td>KKR</td>
          <td>KKR is now online.</td>
          <td>Unhandled</td>
        </tr>

        <tr>
          <td><input type="checkbox"></td>
          <td><span class="badge">5277289</span></td>
          <td><span class="tag warning">Warning</span></td>
          <td>2026-05-05 13:46 (45 minutes ago)</td>
          <td>KKR</td>
          <td>KKR is now offline.</td>
          <td>Unhandled</td>
        </tr>

      </table>

    </div>
  `;
};

// ACTIVE DEVICES
document.getElementById("active").onclick = () => {
 history.pushState({page:"active"}, "", "#active");
  content.innerHTML = `
  <h1>Active Devices</h1>

  <input type="text" placeholder="Search device..." class="search-box" onkeyup="searchDevice()">

  <table class="device-table" id="deviceTable">
    <tr>
      <th>Device ID</th>
      <th>Location</th>
      <th>Status</th>
      <th>Energy (kW)</th>
    </tr>

    <tr onclick="showDetails('GS001','SNH','Active','5.2')">
      <td></td><td>SNH</td><td><span class="status active">Active</span></td><td>5.2</td>
    </tr>

    <tr onclick="showDetails('D002','Delhi','Active','4.8')">
      <td>D002</td><td>Delhi</td><td><span class="status active">Active</span></td><td>4.8</td>
    </tr>

    <tr onclick="showDetails('D003','Noida','Active','6.1')">
      <td>D003</td><td>Noida</td><td><span class="status active">Active</span></td><td>6.1</td>
    </tr>

    <tr onclick="showDetails('D004','Lucknow','Active','3.9')">
      <td>D004</td><td>Lucknow</td><td><span class="status active">Active</span></td><td>3.9</td>
    </tr>

    <tr onclick="showDetails('D005','Kanpur','Active','5.5')">
      <td>D005</td><td>Kanpur</td><td><span class="status active">Active</span></td><td>5.5</td>
    </tr>

    <tr onclick="showDetails('D006','Agra','Active','4.2')">
      <td>D006</td><td>Agra</td><td><span class="status active">Active</span></td><td>4.2</td>
    </tr>

    <tr onclick="showDetails('D007','Jaipur','Active','6.8')">
      <td>D007</td><td>Jaipur</td><td><span class="status active">Active</span></td><td>6.8</td>
    </tr>

    <tr onclick="showDetails('D008','Mumbai','Active','7.1')">
      <td>D008</td><td>Mumbai</td><td><span class="status active">Active</span></td><td>7.1</td>
    </tr>
  </table>
`;
};
// INACTIVE
document.getElementById("inactive").onclick = () => {
  history.pushState({page:"inactive"}, "", "#inactive");
  content.innerHTML = `
    <h1>Inactive Devices</h1>
    <table class="device-table">
      <tr>
        <th>Device ID</th>
        <th>Location</th>
        <th>Status</th>
        <th>Energy</th>
      </tr>

      <tr onclick="showDetails('D010','Agra','Inactive','0')">
        <td>D010</td>
        <td>Agra</td>
        <td><span class="status inactive">Inactive</span></td>
        <td>0</td>
      </tr>

      <tr onclick="showDetails('D011','Delhi','Inactive','0')">
        <td>D011</td>
        <td>Delhi</td>
        <td><span class="status inactive">Inactive</span></td>
        <td>0</td>
      </tr>
    </table>
  `;
};

window.onpopstate = (event) => {

  if(event.state && event.state.page){

    document.getElementById(event.state.page).click();

  }
};
};

//  DEVICE DETAILS + MULTI GRAPH
function showDetails(id, location, status, energy) {
  const content = document.getElementById("content");
    history.pushState(
   {page:"details"},
   "",
   "#details"
    );
  content.innerHTML = `
    <div style="display:flex; justify-content:space-between;">
      <div>
        <h1>${location}</h1>
        <p>125 KWp Solar Plant</p>
      </div>
        
      <div style="background:#2f5d7c;color:white;padding:20px;border-radius:10px;">
  <h3>Weather</h3>
  <p style="font-size:22px;">31°C</p>
  <p>Cloudy</p>
</div>

</div>
    </div>

   <div class="cards">

  <!-- ROW 1 -->
  <div class="card">
    <p id="solarLiveCard" style="color:green;">--</p>
    <h3>Solar plant</h3>
    <small style="color:green;">Live Generation</small>
  </div>

  <div class="card">
    <p id="gridLiveCard" style="color:red;">--</p>
    <h3>RSEB Supply</h3>
    <small style="color:red;">Live</small>
  </div>

  <div class="card">
    <p id="dgLiveCard" style="color:blue;">--</p>
    <h3 style="color:blue;">DG Set</h3>
    <small style="color:blue;">Live</small>
  </div>

  <div class="card" style="background:#ffe5e0;">
    <p id="loadLiveCard" style="color:red;">--</p>
    <h3>Site Load</h3>
    <small style="color:red;">Live</small>
  </div>

  <!-- ROW 2 -->
  <div class="card">
    <p id="gridStatusCard" style="color:red;">--</p>
    <h3>RSEB Supply</h3>
    <small style="color:pink;">Status</small>
  </div>

  <div class="card">
    <p id="dg5001StatusCard" style="color:red;">--</p>
    <h3>DG500-1</h3>
    <small style="color:blue;">Status</small>
  </div>

  <div class="card" style="background:#ffe5e0;">
    <p id="dg5002StatusCard" style="color:cyan;">--</p>
    <h3>DG500-2</h3>
    <small style="color:cyan;">Status</small>
  </div>

  <div class="card" style="background:#ffe5e0;">
    <p id="dg250StatusCard" style="color:blue;">--</p>
    <h3>DG250</h3>
    <small style="color:blue;">Status</small>
  </div>

  <!-- ROW 3 -->
  <div class="card" style="background:#ffe5e0;">
    <p id="importTodayCard" style="color:darkorange;">--</p>
    <h3>RSEB IMPORT</h3>
    <small style="color:darkorange;">Today</small>
  </div>

  <div class="card">
    <p id="importMonthCard" style="color:darkorange;">--</p>
    <h3>RSEB IMPORT</h3>
    <small style="color:magenta;">Month</small>
  </div>

  <div class="card">
    <p id="exportTodayCard" style="color:magenta;">--</p>
    <h3>RSEB Export</h3>
    <small style="color:magenta;">Today</small>
  </div>

  <div class="card">
    <p id="exportMonthCard" style="color:magenta;">--</p>
    <h3>RSEB Export</h3>
    <small style="color:magenta;">Month</small>
  </div>

  <!-- ROW 4 -->
  <div class="card">
    <p id="generationTodayCard" style="color:green;">--</p>
    <h3 style="color:black;">Generation</h3>
    <small style="color:green;">Today</small>
  </div>

  <div class="card">
    <p id="generationMonthCard" style="color:green;">--</p>
    <h3 style="color:black;">Generation</h3>
    <small style="color:green;">Month</small>
  </div>

  <div class="card">
    <p id="dgOutputTodayCard" style="color:blue;">--</p>
    <h3>DG_Output</h3>
    <small>Today</small>
  </div>

  <div class="card">
    <p id="dgOutputMonthCard" style="color:blue;">--</p>
    <h3>DG_Output</h3>
    <small>Month</small>
  </div>

</div>
</div>
   <div class="graph-box">
  <h3>Energy Source Performance Today</h3>
  <canvas id="lineChart"></canvas>
</div>

<div class="graph-box">
  <h3>Solar Inverter Performance</h3>
  <canvas id="barChart"></canvas>
</div>

<div class="graph-box">
  <h3>Import-Export</h3>
  <canvas id="dailyGenChart"></canvas>
</div>

<div class="graph-box">
  <h3>Solar Generation</h3>
  <canvas id="lineCurrentChart"></canvas>
</div>

    <br>
    <button onclick="goBack()">⬅ Back</button>
  `;

  loadLiveCards();
  
  setTimeout(() => {
        
   loadEnergyChart();
   loadInverterChart();
   loadImportExportChart();
   loadSolarGenerationChart();

  }, 200);
}

// BACK
function goBack() {
  history.back();
}

// SEARCH
function searchDevice() {
  let input = document.querySelector(".search-box").value.toLowerCase();
  let rows = document.querySelectorAll("#deviceTable tr");

  rows.forEach((row, index) => {
    if (index === 0) return;
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}
// Sample data 
const deviceVariables = {
  "GS-121": [
    "Havells Solar Day Generation",
    "Havells INV lifetime",
    "Havells Inverters Live"
  ],
  "GS-110": [
    "Solar Edge Live",
    "Solar Live",
    "Solaredge Day Gen"
  ],
  "GS-107": [
    "SE lifetime",
    "eb_state",
    "meter_grid132_AC_Active_Power"
  ]
};

// checkbox click function
function selectDevice(deviceId) {
  const table = document.getElementById("variableTable");
  const count = document.getElementById("varCount");
  const noData = document.getElementById("noData");

  table.innerHTML = `
    <tr>
      <th><input type="checkbox"></th>
      <th>Name</th>
    </tr>
  `;

  const variables = deviceVariables[deviceId] || [];

  if (variables.length === 0) {
    noData.style.display = "block";
    count.innerText = 0;
    return;
  }

  noData.style.display = "none";

  variables.forEach(v => {
    table.innerHTML += `
      <tr>
        <td><input type="checkbox"></td>
        <td>${v}</td>
      </tr>
    `;
  });

  count.innerText = variables.length;
}
function filterVariables() {
  let input = document.querySelector("#variablesSection .search-box").value.toLowerCase();
  let rows = document.querySelectorAll("#variableTable tr");

  let visible = 0;

  rows.forEach((row, index) => {
    if (index === 0) return;

    let text = row.innerText.toLowerCase();

    if (text.includes(input)) {
      row.style.display = "";
      visible++;
    } else {
      row.style.display = "none";
    }
  });

  document.getElementById("varCount").innerText = visible;
}

async function loadDashboardData() {

  try {

    const data =
      await fetchLiveData();

    document.getElementById("solarPlant")
      .innerText =
      `${data.cards.solarPlantLive.toFixed(2)} kW`;

    document.getElementById("gridLive")
      .innerText =
      `${data.cards.gridLive.toFixed(2)} kW`;

    document.getElementById("dgLive")
      .innerText =
      `${data.cards.dgLive.toFixed(2)} kW`;

    document.getElementById("plantLoad")
      .innerText =
      `${data.cards.plantLoad.toFixed(2)} kW`;

    document.getElementById("solarToday")
      .innerText =
      `${data.cards.solarGenerationToday.toFixed(2)} kWh`;

  } catch (err) {

    console.error(err);

  }

}

let energyChartInstance = null;

async function loadEnergyChart() {

  try {

    const graph = await fetchEnergyGraph();

    if (!graph || !graph.length) {
      console.log("No energy graph data");
      return;
    }

    // Remove invalid rows
    // const filteredGraph = graph.filter(item =>
    //   item.timestamp &&
    //   (
    //     Number(item.solar || 0) > 0 ||
    //     Number(item.dg || 0) > 0 ||
    //     Number(item.grid || 0) > 0 ||
    //     Number(item.load || 0) > 0
    //   )
    // );

    const now = new Date();

const filteredGraph = graph.filter(item => {

  if (!item.timestamp) return false;

  const itemTime = new Date(item.timestamp);

  // Remove future timestamps
  if (itemTime > now) return false;

  // Remove empty rows
  return (
    Number(item.solar || 0) > 0 ||
    Number(item.dg || 0) > 0 ||
    Number(item.grid || 0) > 0 ||
    Number(item.load || 0) > 0
  );

});

    const labels = filteredGraph.map(item =>
      new Date(item.timestamp).toLocaleTimeString('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit'
})
    );

    const datasets = [

      {
        label: "Solar Plant",
        data: filteredGraph.map(item => Number(item.solar || 0)),
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 2
      },

      {
        label: "DG Set",
        data: filteredGraph.map(item => Number(item.dg || 0)),
        borderColor: "purple",
        backgroundColor: "purple",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 2
      },

      {
        label: "Grid",
        data: filteredGraph.map(item => Number(item.grid || 0)),
        borderColor: "orange",
        backgroundColor: "orange",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 2
      },

      {
        label: "Load",
        data: filteredGraph.map(item => Number(item.load || 0)),
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 2
      }

    ];

    // Destroy previous chart
    if (energyChartInstance) {
      energyChartInstance.destroy();
    }

    const ctx = document.getElementById("lineChart");

    energyChartInstance = new Chart(ctx, {

      type: "line",

      data: {
        labels,
        datasets
      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
          mode: 'index',
          intersect: false
        },

        plugins: {

          legend: {
            position: 'top'
          }

        },

        scales: {

          x: {

            ticks: {
              maxRotation: 45,
              minRotation: 45
            }

          },

          y: {

            beginAtZero: true,

            suggestedMax: 1000

          }

        }

      }

    });

  } catch (err) {

    console.error("Energy chart error:", err);

  }

}

let inverterChartInstance = null;

async function loadInverterChart() {

  try {

    const graph = await fetchInverterGraph();

    if (!graph.length) return;

    // Current time
    const now = new Date();

    // Remove future data + sanitize
    const cleanedGraph = graph
      .filter(item => new Date(item.timestamp) <= now)
      .map(item => {

        const cleaned = { ...item };

        Object.keys(cleaned).forEach(key => {

          if (key !== "timestamp") {

            let value = Number(cleaned[key] || 0);

            // Remove negative values
            if (value < 0) {
              value = 0;
            }

            // Remove unrealistic spike values
            if (value > 1000) {
              value = 0;
            }

            cleaned[key] = value;
          }

        });

        return cleaned;

      });

    // Labels
    const labels = cleanedGraph.map(x =>
      new Date(x.timestamp)
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
    );

    // Inverter keys
    const inverterKeys =
      Object.keys(cleanedGraph[0])
        .filter(k => k !== 'timestamp');

    // Dataset generation
    const datasets = inverterKeys.map((key, index) => {

      return {

        label: key.replace("_", " ").toUpperCase(),

        data: cleanedGraph.map(x =>
          Number(x[key] || 0)
        ),

        borderWidth: 2,

        fill: false,

        tension: 0.4,

        pointRadius: 1,

        spanGaps: true

      };

    });

    // Destroy old chart before creating new
    if (inverterChartInstance) {
      inverterChartInstance.destroy();
    }

    inverterChartInstance = new Chart(
      document.getElementById("barChart"),
      {

        type: "line",

        data: {
          labels,
          datasets
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          interaction: {
            mode: 'index',
            intersect: false
          },

          plugins: {

            legend: {
              display: true,
              position: 'top'
            }

          },

          scales: {

            y: {

              min: 0,

              max: 150,

              ticks: {
                stepSize: 10
              }

            },

            x: {

              ticks: {
                maxTicksLimit: 15
              }

            }

          }

        }

      }
    );

  } catch (err) {

    console.error("Inverter chart error:", err);

  }

}
async function loadImportExportChart() {

  try {

    const graph =
      await fetchImportExportGraph();

    new Chart(
      document.getElementById("dailyGenChart"),
      {

        type: "bar",

        data: {

          labels:
            graph.map(x => x.date),

          datasets: [

            {
              label: "Import",
              data:
                graph.map(x => x.import)
            },

            {
              label: "Export",
              data:
                graph.map(x => x.export)
            }

          ]

        },

        options: {
          responsive: true,
          maintainAspectRatio: false
        }

      }
    );

  } catch (err) {

    console.error(err);

  }

}

async function loadSolarGenerationChart() {

  try {

    const graph =
      await fetchSolarGenerationGraph();

    new Chart(
      document.getElementById("lineCurrentChart"),
      {

        type: "bar",

        data: {

          // BLANK X AXIS
          labels:
            graph.map(() => ''),

          datasets: [

            {
              label: "Solar Generation",

              data:
                graph.map(x => x.generation),

              // NEON GREEN
              backgroundColor:
                '#39ff14',

              borderColor:
                '#39ff14',

              borderWidth: 1
            }

          ]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              labels: {

                color: '#39ff14'

              }

            }

          },

          scales: {

            // REMOVE X AXIS TEXT
            x: {

              ticks: {

                display: false

              },

              grid: {

                display: false

              }

            },

            y: {

              ticks: {

                color: '#39ff14'

              },

              grid: {

                color: 'rgba(57,255,20,0.15)'

              }

            }

          }

        }

      }
    );

  } catch (err) {

    console.error(err);

  }

}


async function loadLiveCards() {

 try {

   // =========================
   // LIVE API
   // =========================

   const response =
      await fetch(
         'https://snh-backend-3tg6.onrender.com/api/api/site/snh/live'
      );

   const data =
      await response.json();

   // =========================
   // ENERGY SUMMARY API
   // =========================

   const summaryResponse =
      await fetch(
         'https://snh-backend-3tg6.onrender.com/api/api/site/snh/energy-summary'
      );

   const summary =
      await summaryResponse.json();

   // =========================
   // LIVE CARDS
   // =========================

   document.getElementById(
      'solarLiveCard'
   ).innerText =
      (data.cards.solarPlantLive || 0)
      + ' kW';

   document.getElementById(
      'gridLiveCard'
   ).innerText =
      (data.cards.gridLive || 0)
      + ' kW';

   document.getElementById(
      'dgLiveCard'
   ).innerText =
      (data.cards.dgLive || 0)
      + ' kW';

   document.getElementById(
      'loadLiveCard'
   ).innerText =
      (data.cards.plantLoad || 0)
      + ' kW';

   // =========================
   // SOLAR GENERATION
   // =========================

   document.getElementById(
      'generationTodayCard'
   ).innerText =
      (summary.todaySolar || 0)
      + ' kWh';

   document.getElementById(
      'generationMonthCard'
   ).innerText =
      (summary.monthSolar || 0)
      + ' kWh';

   // =========================
   // IMPORT EXPORT
   // =========================

   document.getElementById(
      'importTodayCard'
   ).innerText =
      (summary.gridImportToday || 0)
      + ' kWh';

   document.getElementById(
      'importMonthCard'
   ).innerText =
      (summary.gridImportMonth || 0)
      + ' kWh';

   document.getElementById(
      'exportTodayCard'
   ).innerText =
      (summary.gridExportToday || 0)
      + ' kWh';

   document.getElementById(
      'exportMonthCard'
   ).innerText =
      (summary.gridExportMonth || 0)
      + ' kWh';

   // =========================
   // DG STATUS
   // =========================

   document.getElementById(
      'dg250StatusCard'
   ).innerText =
      data.cards.dg250Status
      || 'Stopped';

   document.getElementById(
      'dg5001StatusCard'
   ).innerText =
      data.cards.dg500_1_Status
      || 'Stopped';

   document.getElementById(
      'dg5002StatusCard'
   ).innerText =
      data.cards.dg500_2_Status
      || 'Stopped';

   // =========================
   // GRID STATUS
   // =========================

   document.getElementById(
      'gridStatusCard'
   ).innerText =

      data.cards.gridLive < 0
         ? 'Export'
         : 'Import';

} catch (err) {

   console.log(err);

}}

function logout(){

  localStorage.removeItem("role");

  window.location.href = "login.html";
}
function toggleLogoutMenu(){

  const menu =
  document.getElementById("logoutMenu");

  if(menu.style.display === "block"){

      menu.style.display = "none";

  }

  else{

      menu.style.display = "block";

  }
}
let designerVisible = true;

function toggleDesigner(){

  const toggleBtn =
  document.getElementById("designerToggle");

  if(designerVisible){

    toggleBtn.innerText =
    "Show Dashboard Designer";

    designerVisible = false;
  }

  else{

    toggleBtn.innerText =
    "Hide Dashboard Designer";

    designerVisible = true;
  }
}

