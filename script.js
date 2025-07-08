let currentUser = null;

function showMessage(msg) {
  document.getElementById("auth-message").textContent = msg;
}

function signup() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (!user || !pass) return showMessage("Please enter username and password");

  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[user]) return showMessage("Username already exists");

  users[user] = { password: pass, entries: [], theme: "pink" };
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Signup successful! Please log in.");
}

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (!users[user] || users[user].password !== pass) {
    return showMessage("Wrong username or password");
  }

  currentUser = user;
  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("journal-screen").style.display = "block";
  document.getElementById("user-display").textContent = user;
  setTheme(users[user].theme || "pink");
  loadEntries();
}

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

function loadEntries() {
  let users = JSON.parse(localStorage.getItem("users"));
  const entries = users[currentUser].entries;
  const list = document.getElementById("entries-list");
  list.innerHTML = "";

  entries.forEach((entry, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${entry.text}</div>
      <small>${entry.date}</small><br>
      <button onclick="editEntry(${i})">Edit</button>
      <button onclick="deleteEntry(${i})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteEntry(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].entries.splice(i, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadEntries();
}

function editEntry(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  const oldText = users[currentUser].entries[i].text;
  const newText = prompt("Edit your entry:", oldText);
  if (newText !== null) {
    users[currentUser].entries[i].text = newText;
    localStorage.setItem("users", JSON.stringify(users));
    loadEntries();
  }
}

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
