"use strict";

const PROJECTS = [
  {
    name: "ForgeBridge",
    category: "developer-tools",
    label: "Developer tools",
    description: "A local, permissioned MCP agent for development workflows: files, Git, terminals and approvals.",
    stack: ["TypeScript", "Local-first", "MCP"],
    url: "https://github.com/t1ktakdev/ForgeBridge"
  },
  {
    name: "ReproDeck",
    category: "developer-tools",
    label: "Developer tools",
    description: "An evidence-first workbench for reproducing failures and debugging AI-assisted code changes.",
    stack: ["Rust", "Debugging", "Developer experience"],
    url: "https://github.com/t1ktakdev/ReproDeck"
  },
  {
    name: "ReproShot",
    category: "developer-tools",
    label: "Developer tools",
    description: "Turn a failing command into a reproducible bug report with the evidence required to investigate it.",
    stack: ["TypeScript", "CLI", "Debugging"],
    url: "https://github.com/t1ktakdev/ReproShot"
  },
  {
    name: "RouteWitness",
    category: "networking",
    label: "Networking",
    description: "A local-first recorder that captures context before, during and after network connectivity failures.",
    stack: ["Python", "Networking", "Local-first"],
    url: "https://github.com/t1ktakdev/RouteWitness"
  },
  {
    name: "niri-pip",
    category: "desktop",
    label: "Desktop & Wayland",
    description: "Picture-in-Picture and sticky-window control for the Niri Wayland compositor.",
    stack: ["Rust", "Linux", "Wayland"],
    url: "https://github.com/t1ktakdev/niri-pip"
  },
  {
    name: "niri-zones",
    category: "desktop",
    label: "Desktop & Wayland",
    description: "A Wayland-native overlay for assigning windows to preset zones in Niri.",
    stack: ["Rust", "Linux", "Window management"],
    url: "https://github.com/t1ktakdev/niri-zones"
  }
];

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const search = document.getElementById("projectSearch");
const categorySelect = document.getElementById("projectCategory");
const projectGrid = document.getElementById("projectGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function storedTheme() {
  try { return localStorage.getItem("t1ktakdev-theme"); } catch (_) { return null; }
}

function setTheme(value) {
  const theme = value === "light" ? "light" : "dark";
  html.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
  themeToggle.setAttribute("title", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
  themeIcon.textContent = theme === "dark" ? "☼" : "☾";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#0d141b" : "#f6f7f3";
}

setTheme(storedTheme() || "dark");
themeToggle.addEventListener("click", function() {
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  try { localStorage.setItem("t1ktakdev-theme", next); } catch (_) { /* Private browsing */ }
});

function closeMenu() {
  primaryNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}
menuToggle.addEventListener("click", function() {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
primaryNav.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && primaryNav.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});

function makeProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const top = document.createElement("div");
  top.className = "project-top";
  const kind = document.createElement("span");
  kind.className = "project-kind";
  kind.textContent = project.label;
  const link = document.createElement("a");
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "project-link";
  link.setAttribute("aria-label", "Open " + project.name + " repository in new tab");
  link.textContent = "↗";
  top.append(kind, link);

  const heading = document.createElement("h3");
  heading.textContent = project.name;
  const description = document.createElement("p");
  description.textContent = project.description;
  const tags = document.createElement("div");
  tags.className = "project-stack";
  project.stack.forEach(function(item) {
    const tag = document.createElement("span");
    tag.className = "stack-pill";
    tag.textContent = item;
    tags.appendChild(tag);
  });
  card.append(top, heading, description, tags);
  return card;
}

function renderProjects() {
  const query = search.value.trim().toLowerCase();
  const category = categorySelect.value;
  const shown = PROJECTS.filter(function(project) {
    return (category === "all" || project.category === category) &&
      [project.name, project.description, ...project.stack].join(" ").toLowerCase().includes(query);
  });
  projectGrid.replaceChildren(...shown.map(makeProjectCard));
  resultCount.textContent = "Showing " + shown.length + " of " + PROJECTS.length + " projects";
  emptyState.hidden = shown.length > 0;
}

search.addEventListener("input", renderProjects);
categorySelect.addEventListener("change", renderProjects);
renderProjects();
