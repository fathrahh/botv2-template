const tabListEl = document.querySelectorAll(".tab-list");
const contentLayouts = document.querySelectorAll(".content-layout");

console.log(contentLayouts);

tabListEl.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (tab.classList.contains("active")) return;
    setActiveTab(e.target.dataset.tab);
  });
});

const setActiveTab = (targetTab) => {
  tabListEl.forEach((tab, idx) => {
    if (tab.dataset.tab !== targetTab) {
      tab.classList.remove("active");
      contentLayouts[idx].classList.remove("active");
    } else {
      tab.classList.add("active");
      contentLayouts[idx].classList.add("active");
    }
  });
};
