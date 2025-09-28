// Get form and input elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Get greeting element
const greeting = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 50;

// Track team counts
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

// Get attendee count element
const attendeeCount = document.getElementById("attendeeCount");

// Get progress bar element
const progressBar = document.getElementById("progressBar");

// Helper to highlight winning team
function highlightWinningTeam(winner) {
  const teamCards = document.querySelectorAll(".team-card");
  for (let i = 0; i < teamCards.length; i++) {
    teamCards[i].style.border = "";
    teamCards[i].style.boxShadow = "";
  }
  if (winner) {
    const winnerCard = document.querySelector(`.team-card.${winner}`);
    winnerCard.style.border = "3px solid #00c7fd";
    winnerCard.style.boxShadow = "0 0 18px #00c7fd55";
  }
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop page from reloading

  // Prevent submissions after maxCount
  if (count >= maxCount) {
    greeting.textContent = `Check-in closed!`;
    greeting.classList.add("success-message");
    greeting.style.display = "block";
    return;
  }

  // Get form values
  const name = nameInput.value; // Get attendee name
  const team = teamSelect.value; // Get team value
  const teamName = teamSelect.selectedOptions[0].text; // Get team display name

  // Increment total check-in count
  count++;

  // Update attendee count on the page
  attendeeCount.textContent = count;

  // Calculate progress percentage
  const percentage = Math.round((count / maxCount) * 100) + "%";

  // Update progress bar width
  // This changes the bar's width style to match the percentage
  progressBar.style.width = percentage;

  // Update team counter
  teamCounts[team]++;
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = teamCounts[team];

  // Show personalized greeting
  // Use template literals to make the message
  greeting.textContent = `Welcome, ${name} from ${teamName}!`;
  greeting.classList.add("success-message"); // Add style for success
  greeting.style.display = "block"; // Show the greeting

  // If maxCount reached, show celebration and highlight winner
  if (count === maxCount) {
    // Find winning team
    let maxTeam = null;
    let maxValue = -1;
    for (const key in teamCounts) {
      if (teamCounts[key] > maxValue) {
        maxValue = teamCounts[key];
        maxTeam = key;
      }
    }
    greeting.textContent = `🎉 Goal reached! Winning team: ${
      teamSelect.querySelector(`[value="${maxTeam}"]`).text
    } 🎉`;
    highlightWinningTeam(maxTeam);
    // Optionally disable the form
    document.getElementById("checkInBtn").disabled = true;
    document.getElementById("checkInBtn").style.backgroundColor = "#94a3b8";
    document.getElementById("checkInBtn").style.cursor = "not-allowed";
  }

  form.reset(); // Clear the form
});
