const tabListEl = document.querySelectorAll(".tab-list");
const contentLayouts = document.querySelectorAll(".content-layout");
const markupAll = document.querySelector("#markup-all");
const cbMarkup = document.querySelectorAll(".js-cbMarkup");
const cbMarkupAll = document.querySelector(".js-cbMarkup-all");
const inputMarkups = document.querySelectorAll(".js-input-markup");

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

tabListEl.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (tab.classList.contains("active")) return;
    setActiveTab(e.target.dataset.tab);
  });
});

cbMarkup.forEach((el) => {
  let inputMarkup;
  inputMarkups.forEach((inputEl) => {
    if (inputEl.dataset.markup === el.dataset.markup) {
      inputMarkup = inputEl;
    }
  });
  el.addEventListener("change", (event) => {
    console.log("e");
    if (event.currentTarget.checked) {
      inputMarkup.disabled = false;
    } else {
      inputMarkup.disabled = true;
    }
  });
});

cbMarkupAll.addEventListener("change", (e) => {
  const changeEvent = new Event("change");
  cbMarkup.forEach((el) => {
    if (e.target.checked) {
      el.checked = true;
      el.disabled = true;
      el.dispatchEvent(changeEvent);
    } else {
      el.checked = false;
      el.disabled = false;
      el.dispatchEvent(changeEvent);
    }
  });
});
