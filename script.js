const revealItems = document.querySelectorAll(".reveal");
const themeToggleButton = document.querySelector("#theme-switch");
const root = document.documentElement;
const storedTheme = window.localStorage.getItem("theme");

if (storedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
  root.classList.remove("light");
} else {
  root.removeAttribute("data-theme");
  root.classList.add("light");
}

const syncThemeToggle = () => {
  if (!themeToggleButton) {
    return;
  }

  const isDark = root.getAttribute("data-theme") === "dark";
  themeToggleButton.checked = isDark;
  themeToggleButton.setAttribute(
    "aria-label",
    isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
  );
};

syncThemeToggle();

themeToggleButton?.addEventListener("change", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    root.classList.add("light");
    window.localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    root.classList.remove("light");
    window.localStorage.setItem("theme", "dark");
  }

  syncThemeToggle();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -24px 0px",
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});
