const tabListEl = document.querySelectorAll(".tab-list");
const contentLayouts = document.querySelectorAll(".content-layout");
const idPos = document.querySelector("#id-pos");
const passwordPos = document.querySelector("#password-pos");
const rememberMe = document.querySelector("#remember-me");
const btnUpdate = document.querySelector(".js-btn-update");
const btnCetak = document.querySelector(".js-btn-cetak-pesanan");
const cbMarkup = document.querySelectorAll(".js-cbMarkup");
const cbMarkupAll = document.querySelector(".js-cbMarkup-all");
const cbNextCloud = document.querySelector("#update-nextcloud");
const cbTokopedia = document.querySelector("#update-xlsx-tokopedia");
const cbOrder = document.querySelectorAll(".js-cbOrder");
const cbOrderAll = document.querySelector("#cb-order-all");
const inputSplitExcel = document.querySelector("#split-excel");
const inputMarkups = document.querySelectorAll(".js-input-markup");
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
    id_pos: idPos.value,
    password_pos: passwordPos.value,
    cookie_goapotik: cookieGoapotik.value,
    cookie_sehatq: cookieSehatQ.value,
    cookie_klikdokter: cookieKlikdokter.value,
    cookie_nextcloud: cookieNextCloud.value,
  };
  console.log(data);
  window.localStorage.setItem("credentials", JSON.stringify(data));
};

// event Listener for manage tab active
tabListEl.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (tab.classList.contains("active")) return;
    setActiveTab(e.target.dataset.tab);
  });
});

// checkbox markup eventlisterner on tab update stock
cbMarkup.forEach((el) => {
  let inputMarkup;
  inputMarkups.forEach((inputEl) => {
    if (inputEl.dataset.markup === el.dataset.markup) {
      inputMarkup = inputEl;
    }
  });
  el.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      inputMarkup.disabled = false;
      if (el.dataset.markup === "sehatq") {
        inputSplitExcel.disabled = false;
      } else if (el.dataset.markup === "klikdokter") {
        cbNextCloud.disabled = false;
        cbTokopedia.disabled = false;
      }
    } else {
      inputMarkup.disabled = true;
      if (el.dataset.markup === "sehatq") {
        inputSplitExcel.disabled = true;
      } else if (el.dataset.markup === "klikdokter") {
        cbNextCloud.disabled = true;
        cbTokopedia.disabled = true;
      }
    }
  });
});

// checkbox markup all eventlistener on tab update stock
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

// event onClick for button update
btnUpdate.addEventListener("click", () => {
  /*
    do something here
    like update Stock or something else
  */
  saveCredentialsToLocalStorage();
});

// event onClick Cetak Order
btnCetak.addEventListener("click", () => {
  /*
    do something here
    like update Stock or something else
  */
  saveCredentialsToLocalStorage();
});

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
