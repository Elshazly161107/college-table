// عناصر DOM
let searchBtn = document.getElementById("search");
let sectionIn = document.getElementById("search-by-num");
let tableDiv = document.querySelector("table");
let tableDays = document.querySelectorAll(".days");
let theSpan = document.querySelector(".select-search-type button span");

let currentData = [];
let btnText = "ابحث";

// --- عرض أو إخفاء الجدول ---
function toggleTable() {
  searchBtn.textContent = "تحديث";
  tableDiv.classList.add("active");
}

// Msg hidden

let sectionInP = document.querySelector("section form");

sectionIn.addEventListener("click", function () {
  sectionInP.classList.add("open");
});

//

// --- فلترة البيانات حسب القسم ---
function filterData(data) {
  currentData = []; // تصفير البيانات
  data.forEach((item) => {
    if (
      (item.section === Number(sectionIn.value) || item.section === "all") &&
      item.sub &&
      item.time
    ) {
      currentData.push(item);
    }
  });
}

// --- إدخال البيانات في الجدول ---
function populateTable() {
  // مسح المحتوى القديم
  tableDays.forEach((day) => (day.innerHTML = ""));

  currentData.forEach((item) => {
    let dayElement = document.getElementById(item.day);
    if (dayElement) {
      let p = document.createElement("p");
      p.textContent = `${item.sub} | ${item.time} | ${item.place}`; // ممكن تضيف المكان لو حبيت
      dayElement.appendChild(p);
    }
  });
}

function tdOpacity() {
  if (sectionIn.value === "") {
    theSpan.textContent = "...";
  } else {
    theSpan.textContent = sectionIn.value;
  }
  for (let i = 0; i < tableDays.length; i++) {
    tableDays[i].style.opacity = "1";
    if (tableDays[i].innerHTML === "") {
      tableDays[i].style.opacity = "0.5";
    }
  }
}

// --- حدث الضغط على زر البحث ---
searchBtn.addEventListener("click", () => {
  sectionInP.classList.remove("open");
  toggleTable();
  filterData(data); // 'data' موجودة في مكان آخر
  populateTable();
  tdOpacity();
});

let downloadBtn = document.getElementById("download-pdf");
downloadBtn.addEventListener("click", function () {
  let originalTable = document.querySelector("table");

  // نسخ الجدول
  let tableClone = originalTable.cloneNode(true);
  tableClone.classList.add("pdf-table");

  // wrapper خاص بالـ PDF
  let wrapper = document.createElement("div");
  wrapper.classList.add("pdf-wrapper");
  wrapper.appendChild(tableClone);

  document.body.appendChild(wrapper);

  let sectionName = sectionIn.value ? sectionIn.value : "عام";

  let options = {
    margin: 1,
    filename: `جدول سكشن ${sectionName}.pdf`,
    html2canvas: {
      scale: 2,
      scrollY: 0,
    },
    jsPDF: {
      unit: "cm",
      format: "a4",
      orientation: "landscape",
    },
    pagebreak: { mode: "avoid-all" },
  };

  html2pdf()
    .set(options)
    .from(wrapper)
    .save()
    .then(() => {
      wrapper.remove(); // تنظيف
    });
});

let profit = document.querySelector(".profit-mohamed");
let profitBtn = document.querySelector(".profit-mohamed button");

if (sessionStorage.getItem("introClosed")) {
  profit.classList.add("close");
}

profitBtn.addEventListener("click", function () {
  profit.classList.add("close");
  sessionStorage.setItem("introClosed", "true");
});
