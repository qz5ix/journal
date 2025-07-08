const correctPassword = "24jan";

function checkPassword() {
  const input = document.getElementById("password-input").value;
  const error = document.getElementById("login-error");
  if (input === correctPassword) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("journal-screen").style.display = "block";
    loadEntries();
  } else {
    error.textContent = "Wrong password. Try again.";
  }
}

function saveEntry() {
  const text = document.getElementById("entry").value;
  if (text.trim() === "") return;

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.unshift(text);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  document.getElementById("entry").value = "";
  loadEntries();
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const entriesList = document.getElementById("entries");
  entriesList.innerHTML = "";

  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    entriesList.appendChild(li);
  });
}
