let currentUser = null;

// ========== AUTH ==========
function signup() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) return showMessage("Please enter username & password");

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[user]) return showMessage("Username already exists");

  users[user] = { password: pass, entries: [], theme: "pink" };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Account created! You can now log in.");
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[user] || users[user].password !== pass) {
    return showMessage("Incorrect username or password");
  }

  currentUser = user;
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("journal-screen").style.display = "block";
  document.getElementById("user-display").textContent = currentUser;

  setTheme(users[user].theme || "pink");
  loadEntries();
}

function showMessage(msg) {
  document.getElementById("auth-message").textContent = msg;
}

// ========== ENTRIES ==========
function saveEntry() {
  const text = document.getElementById("entry-text").value;
  if (!text.trim()) return;

  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].entries.unshift({ text, date: new Date().toLocaleString() });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("entry-text").value = "";
  loadEntries();
}

function loadEntries() {
  const users = JSON.parse(localStorage.getItem("users"));
  const entries = users[currentUser].entries || [];
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

function deleteEntry(index) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].entries.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadEntries();
}

function editEntry(index) {
  let users = JSON.parse(localStorage.getItem("users"));
  const newText = prompt("Edit your entry:", users[currentUser].entries[index].text);
  if (newText !== null) {
    users[currentUser].entries[index].text = newText;
    localStorage.setItem("users", JSON.stringify(users));
    loadEntries();
  }
}

// ========== THEMES ==========
function changeTheme(theme) {
  document.body.className = "theme-" + theme;
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].theme = theme;
  localStorage.setItem("users", JSON.stringify(users));
}

function setTheme(theme) {
  document.body.className = "theme-" + theme;
  document.querySelector("select").value = theme;
}
