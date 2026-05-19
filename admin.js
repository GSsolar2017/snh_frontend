const content = document.getElementById("content");

function toggleSettingsMenu() {

  const submenu = document.getElementById("settingsSubmenu");

  submenu.style.display =
    submenu.style.display === "block"
    ? "none"
    : "block";
}

// MANAGE SUBSCRIPTIONS
document.getElementById("subscriptions").onclick = () => {

  content.innerHTML = `

    <h1>Manage Subscriptions</h1>

    <div class="report-box">

      <table class="device-table">

        <tr>
          <th>Company</th>
          <th>Plan</th>
          <th>Expiry</th>
        </tr>

        <tr>
          <td>GS Solar</td>
          <td>Premium</td>
          <td>2027-12-31</td>
        </tr>

      </table>

    </div>
  `;
};

// MANAGE DEVICES
document.getElementById("manageDevices").onclick = () => {

  content.innerHTML = `

    <h1>Manage Devices</h1>

    <div class="report-box">

      <input type="text" id="deviceId" placeholder="Device ID"><br><br>

      <input type="text" id="deviceLocation" placeholder="Location"><br><br>

      <select id="deviceStatus">
        <option>Active</option>
        <option>Inactive</option>
      </select><br><br>

      <input type="number" id="deviceEnergy" placeholder="Energy"><br><br>

      <button class="export-btn" onclick="addDevice()">
        Add Device
      </button>

      <br><br>

      <table class="device-table" id="adminDeviceTable">

        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Status</th>
          <th>Energy</th>
        </tr>

      </table>

    </div>
  `;

  loadDevices();
};

// MANAGE USERS
document.getElementById("manageUsers").onclick = () => {

  content.innerHTML = `

    <h1>Manage Users</h1>

    <div class="report-box">

      <button class="export-btn">
        + Add User
      </button>

      <br><br>

      <table class="device-table">

        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>

        <tr>
          <td>Admin</td>
          <td>admin@gssolar.com</td>
          <td>Administrator</td>
        </tr>

      </table>

    </div>
  `;
};

// SIMPLE PAGES
document.getElementById("deviceProfiles").onclick = () => {
  content.innerHTML = "<h1>Manage Device Profiles</h1>";
};

document.getElementById("manageGraphs").onclick = () => {
  content.innerHTML = "<h1>Manage Graphs</h1>";
};

document.getElementById("notifications").onclick = () => {
  content.innerHTML = "<h1>User Notifications</h1>";
};

document.getElementById("emailProviders").onclick = () => {
  content.innerHTML = "<h1>Email Alert Providers</h1>";
};

document.getElementById("accountDetails").onclick = () => {
  content.innerHTML = "<h1>Account Details</h1>";
};

document.getElementById("manageDashboards").onclick = () => {
  content.innerHTML = "<h1>Manage Dashboards</h1>";
};

document.getElementById("manageCompanies").onclick = () => {
  content.innerHTML = "<h1>Manage Companies</h1>";
};

// LOGOUT
document.getElementById("logout").onclick = () => {

  const logout = confirm("Do you want to logout?");

  if(logout) {
    window.location.href = "login.html";
  }
};
function addDevice() {

  let id = document.getElementById("deviceId").value;
  let location = document.getElementById("deviceLocation").value;
  let status = document.getElementById("deviceStatus").value;
  let energy = document.getElementById("deviceEnergy").value;

  let devices = JSON.parse(localStorage.getItem("devices")) || [];

  devices.push({
    id,
    location,
    status,
    energy
  });

  localStorage.setItem("devices", JSON.stringify(devices));

  loadDevices();

  document.getElementById("deviceId").value = "";
  document.getElementById("deviceLocation").value = "";
  document.getElementById("deviceEnergy").value = "";
}

function loadDevices() {

  let devices = JSON.parse(localStorage.getItem("devices")) || [];

  let table = document.getElementById("adminDeviceTable");

  table.innerHTML = `

    <tr>
      <th>ID</th>
      <th>Location</th>
      <th>Status</th>
      <th>Energy</th>
    </tr>
  `;

  devices.forEach(device => {

    table.innerHTML += `

      <tr>
        <td>${device.id}</td>
        <td>${device.location}</td>
        <td>${device.status}</td>
        <td>${device.energy}</td>
      </tr>
    `;
  });
}