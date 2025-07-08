let currentUser = null;

// Sign Up
function signup() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (!user || !pass) return showMessage("Please enter a username and password.");

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[user]) return showMessage("Username already taken.");

  users[user] = { password: pass, entries: [], theme: "pink" };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Account created! Please log in.");
}

// Login
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[user] || users[user].password !== pass) {
    return showMessage("Incorrect username or password.");
  }

  currentUser = user;
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("journal-screen").style.display = "block";
  document.getElementById("user-display").textContent = user;
  setTheme(users[user].theme);
  loadEntries();
}

// Show message
function showMessage(msg) {
  document.getElementById("auth-message").textContent = msg;
}

// Save Entry
function saveEntry() {
  const text = document.getElementById("entry-text").value.trim();
  if (!text) return;

  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].entries.unshift({
    text,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("entry-text").value = "";
  loadEntries();
}

// Load Entries
function loadEntries() {
  let users = JSON.parse(localStorage.getItem("users"));
  const entries = users[currentUser].entries;
  const list = document.getElementById("entries-list");
  list.innerHTML = "";

  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${entry.text}</div>
      <small>${entry.date}</small>
      <div class="entry-buttons">
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Delete Entry
function deleteEntry(index) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].entries.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadEntries();
}

// Edit Entry
function editEntry(index) {
  let users = JSON.parse(localStorage.getItem("users"));
  const currentText = users[currentUser].entries[index].text;
  const updatedText = prompt("Edit your entry:", currentText);
  if (updatedText !== null) {
    users[currentUser].entries[index].text = updatedText.trim();
    localStorage.setItem("users", JSON.stringify(users));
    loadEntries();
  }
}

// Change Theme
function changeTheme(theme) {
  document.body.className = "theme-" + theme;
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].theme = theme;
  localStorage.setItem("users", JSON.stringify(users));
}

// Set Theme on Load
function setTheme(theme) {
  document.body.className = "theme-" + theme;
  document.querySelector("select").value = theme;
}
