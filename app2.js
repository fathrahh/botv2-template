const tabListEl = document.querySelectorAll(".tab-list");
const contentLayouts = document.querySelectorAll(".content-layout");
const rememberMe = document.querySelector("#remember-me");
const cookieGoapotik = document.querySelector("#cookie-goapotik");
const cookieSehatQ = document.querySelector("#cookie-sehatq");
const cookieKlikdokter = document.querySelector("#cookie-klikdokter");
const cookieNextCloud = document.querySelector("#cookie-nextcloud");

// function for set tab is active
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

const saveCredentialsToLocalStorage = () => {
  if (!rememberMe.checked) return;
  const data = {
    cookie_goapotik: cookieGoapotik.value,
    cookie_sehatq: cookieSehatQ.value,
    cookie_klikdokter: cookieKlikdokter.value,
    cookie_nextcloud: cookieNextCloud.value,
  };
  window.localStorage.setItem("credentials", JSON.stringify(data));
};

// event Listener for manage tab active
tabListEl.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (tab.classList.contains("active")) return;
    setActiveTab(e.target.dataset.tab);
  });
});

// // event onClick Cetak Order
// btnCetak.addEventListener("click", () => {
//   /*
//     do something here
//     like update Stock or something else
//   */
//   saveCredentialsToLocalStorage();
// });

cbOrderAll.addEventListener("change", (e) => {
  cbOrder.forEach((el) => {
    if (e.target.checked) {
      el.checked = true;
    } else {
      el.checked = false;
    }
  });
});

this.addEventListener("load", () => {
  const credentials = JSON.parse(window.localStorage.getItem("credentials"));
  if (credentials || Object.keys(credentials).length > 0) {
    idPos.value = credentials["id_pos"] || "";
    passwordPos.value = credentials["password_pos"] || "";
    cookieGoapotik.value = credentials["cookie_goapotik"] || "";
    cookieSehatQ.value = credentials["cookie_sehatq"] || "";
    cookieKlikdokter.value = credentials["cookie_klikdokter"] || "";
    cookieNextCloud.value = credentials["cookie_nextcloud"] || "";
  }
});
