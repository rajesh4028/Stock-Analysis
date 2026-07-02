const STORAGE_KEY = "complianceChecklist_v1";
const THEME_KEY = "complianceChecklist_theme";

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
state.checked = state.checked || {};
state.company = state.company || "";
state.fy = state.fy || "";

let activeFilter = "All";
let searchTerm = "";
let collapsed = state.collapsed || {};

function allItems() {
  return COMPLIANCE_DATA.flatMap((cat) => cat.items.map((i) => ({ ...i, categoryId: cat.id })));
}

function itemMatchesFilters(item) {
  if (activeFilter !== "All" && item.frequency !== activeFilter) return false;
  if (searchTerm) {
    const haystack = (item.title + " " + item.description + " " + item.dueDate).toLowerCase();
    if (!haystack.includes(searchTerm.toLowerCase())) return false;
  }
  return true;
}

function render() {
  renderCompanyCard();
  renderCategories();
  renderProgress();
}

function renderCompanyCard() {
  document.getElementById("companyName").value = state.company;
  document.getElementById("fyLabel").value = state.fy;
}

function renderCategories() {
  const root = document.getElementById("categories");
  root.innerHTML = "";

  COMPLIANCE_DATA.forEach((cat) => {
    const visibleItems = cat.items.filter(itemMatchesFilters);
    const catEl = document.createElement("div");
    catEl.className = "category" + (collapsed[cat.id] ? " collapsed" : "");
    if (visibleItems.length === 0) catEl.classList.add("hidden");

    const doneCount = cat.items.filter((i) => state.checked[i.id]).length;

    const header = document.createElement("div");
    header.className = "category-header";
    header.innerHTML = `
      <div class="title"><span>${cat.icon}</span><span>${cat.category}</span></div>
      <div class="meta">
        <span>${doneCount}/${cat.items.length} done</span>
        <span class="chevron">▾</span>
      </div>
    `;
    header.addEventListener("click", () => {
      collapsed[cat.id] = !collapsed[cat.id];
      state.collapsed = collapsed;
      saveState(state);
      render();
    });

    const itemsWrap = document.createElement("div");
    itemsWrap.className = "items";

    visibleItems.forEach((item) => {
      const isDone = !!state.checked[item.id];
      const itemEl = document.createElement("div");
      itemEl.className = "item" + (isDone ? " done" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isDone;
      checkbox.addEventListener("change", () => {
        state.checked[item.id] = checkbox.checked;
        saveState(state);
        render();
      });

      const content = document.createElement("div");
      content.className = "content";
      content.innerHTML = `
        <div class="item-title">${item.title}</div>
        <div class="item-desc">${item.description}</div>
        <div class="badges">
          <span class="badge">${item.frequency}</span>
          <span class="badge due">Due: ${item.dueDate}</span>
          ${item.penalty ? `<span class="badge penalty">${item.penalty}</span>` : ""}
        </div>
      `;

      itemEl.appendChild(checkbox);
      itemEl.appendChild(content);
      itemsWrap.appendChild(itemEl);
    });

    catEl.appendChild(header);
    catEl.appendChild(itemsWrap);
    root.appendChild(catEl);
  });
}

function renderProgress() {
  const items = allItems();
  const total = items.length;
  const done = items.filter((i) => state.checked[i.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  document.getElementById("overallLabel").textContent = `${done} / ${total} tasks completed (${pct}%)`;
  document.getElementById("overallBar").style.width = pct + "%";

  const byFreqWrap = document.getElementById("freqProgress");
  byFreqWrap.innerHTML = "";
  FREQUENCIES.forEach((freq) => {
    const freqItems = items.filter((i) => i.frequency === freq);
    const freqDone = freqItems.filter((i) => state.checked[i.id]).length;
    const freqPct = freqItems.length ? Math.round((freqDone / freqItems.length) * 100) : 0;
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<span>${freq}</span><span>${freqDone}/${freqItems.length}</span>`;
    byFreqWrap.appendChild(row);
  });
}

function resetByFrequency(freq) {
  const items = allItems().filter((i) => (freq === "All" ? true : i.frequency === freq));
  const label = freq === "All" ? "ALL compliance items" : `all ${freq} items`;
  if (!confirm(`Reset checklist state for ${label}? This cannot be undone.`)) return;
  items.forEach((i) => delete state.checked[i.id]);
  saveState(state);
  render();
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(preferred);
}

function initControls() {
  document.getElementById("companyName").addEventListener("input", (e) => {
    state.company = e.target.value;
    saveState(state);
  });
  document.getElementById("fyLabel").addEventListener("input", (e) => {
    state.fy = e.target.value;
    saveState(state);
  });

  document.getElementById("searchBox").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    render();
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeFilter = tab.dataset.freq;
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      render();
    });
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  document.getElementById("printBtn").addEventListener("click", () => window.print());

  document.querySelectorAll("[data-reset]").forEach((btn) => {
    btn.addEventListener("click", () => resetByFrequency(btn.dataset.reset));
  });
}

initTheme();
initControls();
render();
