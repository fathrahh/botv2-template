const tabListEl = document.querySelectorAll(".tab-list");
const contentLayouts = document.querySelectorAll(".content-layout");
const rememberMe = document.querySelector("#remember-me");
const cookieGoapotik = document.querySelector("#cookie-goapotik");
const cookieSehatQ = document.querySelector("#cookie-sehatq");
const cookieKlikdokter = document.querySelector("#cookie-klikdokter");
const cookieNextCloud = document.querySelector("#cookie-nextcloud");
const datePenjualanFrom = document.querySelector("#penjualan-from");
const datePenjualanTo = document.querySelector("#penjualan-to");
const messageWrapper = document.querySelector(
  ".message-validate-error-wrapper"
);

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

const createMessageError = () => {
  const p = document.createElement("p");
  p.classList.add("message-error", "js-message-validate-error");
  p.innerText = "Input Date anda salah";
  return p;
};

const getUnixTime = (time) => {
  return new Date(time).getTime();
};

const validateDate = (event) => {
  if (!datePenjualanFrom.value || !datePenjualanTo.value) return;
  if (
    getUnixTime(datePenjualanFrom.value) > getUnixTime(datePenjualanTo.value)
  ) {
    messageWrapper.innerHTML = "";
    event.currentTarget.value = null;
    messageWrapper.appendChild(createMessageError());
  } else {
    messageWrapper.innerHTML = "";
  }
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

// Declaration Event Listener Below Here
// event Listener for manage tab active
tabListEl.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (tab.classList.contains("active")) return;
    setActiveTab(e.target.dataset.tab);
  });
});

datePenjualanFrom.addEventListener("change", validateDate);
datePenjualanTo.addEventListener("change", validateDate);

// // event onClick Cetak Order
// btnCetak.addEventListener("click", () => {
//   /*
//     do something here
//     like update Stock or something else
//   */
//   saveCredentialsToLocalStorage();
// });

// cbOrderAll.addEventListener("change", (e) => {
//   cbOrder.forEach((el) => {
//     if (e.target.checked) {
//       el.checked = true;
//     } else {
//       el.checked = false;
//     }
//   });
// });

this.addEventListener("load", () => {
  const credentials = JSON.parse(window.localStorage.getItem("credentials"));
  if (credentials || Object.keys(credentials).length > 0) {
    cookieGoapotik.value = credentials["cookie_goapotik"] || "";
    cookieSehatQ.value = credentials["cookie_sehatq"] || "";
    cookieKlikdokter.value = credentials["cookie_klikdokter"] || "";
    // cookieNextCloud.value = credentials["cookie_nextcloud"] || "";
  }
});
