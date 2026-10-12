// Keyboard and closing behaviour for the dropdowns in the Main navigation bar.
//
// Each dropdown is a <details> element, so it already opens and closes with
// Enter or Space on its button, with no script. This adds what <details>
// lacks: Escape closes it and returns focus to its button; Down and Up arrow
// move through its links while it is open; and it closes when focus moves to
// something outside it or a click lands outside it.

const submenus = document.querySelectorAll(".main-menu details");

for (const submenu of submenus) {
  submenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && submenu.open) {
      submenu.open = false;
      submenu.querySelector("summary").focus();
      return;
    }
    // While it is open, Down and Up move focus from link to link, wrapping at
    // either end so focus stays in the list; from the button, Down goes to the
    // first link and Up to the last. Without this the arrows only scrolled the
    // page. A screen reader in browse mode keeps the arrows for itself, so
    // this changes nothing there; a closed dropdown is left alone.
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!step || !submenu.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const links = [...submenu.querySelectorAll("ul a")];
    if (!links.length) return;
    const current = links.indexOf(document.activeElement);
    const next = current === -1
      ? (step === 1 ? 0 : links.length - 1)
      : (current + step + links.length) % links.length;
    // The key is the dropdown's alone: on the unstrung app page, the app also
    // listens for the arrows on the whole page, for moving through playback.
    event.preventDefault();
    event.stopPropagation();
    links[next].focus();
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
