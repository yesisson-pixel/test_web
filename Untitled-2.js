// --- JavaScript Logic ---
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      display.value = "";
    } else if (button.classList.contains("equals")) {
      try {
        display.value = eval(display.value) || "";
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += button.textContent;
    }
  });
});