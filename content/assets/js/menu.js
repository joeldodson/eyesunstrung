// Closing behaviour for the dropdowns in the Main navigation bar.
//
// Each dropdown is a <details> element, so it already opens and closes with
// Enter or Space on its button, with no script. This adds what <details>
// lacks: Escape closes it and returns focus to its button, and it closes when
// focus or a click moves anywhere outside it.

const submenus = document.querySelectorAll(".main-menu details");

for (const submenu of submenus) {
  submenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && submenu.open) {
      submenu.open = false;
      submenu.querySelector("summary").focus();
    }
  });

  submenu.addEventListener("focusout", (event) => {
    if (!submenu.contains(event.relatedTarget)) submenu.open = false;
  });
}

document.addEventListener("click", (event) => {
  for (const submenu of submenus) {
    if (!submenu.contains(event.target)) submenu.open = false;
  }
});
