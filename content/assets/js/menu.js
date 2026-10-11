// Closing behaviour for the dropdowns in the Main navigation bar.
//
// Each dropdown is a <details> element, so it already opens and closes with
// Enter or Space on its button, with no script. This adds what <details>
// lacks: Escape closes it and returns focus to its button, and it closes when
// focus moves to something outside it or a click lands outside it.

const submenus = document.querySelectorAll(".main-menu details");

for (const submenu of submenus) {
  submenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && submenu.open) {
      submenu.open = false;
      submenu.querySelector("summary").focus();
    }
  });

  // Only when focus has gone to something else outside. Safari, and so every
  // browser on iOS, does not focus a link when it is tapped: focus leaves the
  // dropdown's button for nowhere (relatedTarget is null) between the tap and
  // its click. Closing then hid the link before the click reached it, so
  // tapping a dropdown item did nothing. Focus going nowhere is left to the
  // click handler below, which closes the dropdown when a click lands outside.
  submenu.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !submenu.contains(event.relatedTarget)) submenu.open = false;
  });
}

document.addEventListener("click", (event) => {
  for (const submenu of submenus) {
    if (!submenu.contains(event.target)) submenu.open = false;
  }
});
