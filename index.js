// عناصر DOM
const searchBtn = document.getElementById("search");
const sectionIn = document.getElementById("search-by-num");
const tableDiv = document.querySelector("table");
const tableDays = document.querySelectorAll(".days");
const theSpan = document.querySelector(".select-search-type button span");

let currentData = [];
let btnText = "ابحث";

// --- عرض أو إخفاء الجدول ---
function toggleTable() {
  searchBtn.textContent = "تحديث";
  tableDiv.classList.add("active");
}

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
    const dayElement = document.getElementById(item.day);
    if (dayElement) {
      const p = document.createElement("p");
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
  toggleTable();
  filterData(data); // 'data' موجودة في مكان آخر
  populateTable();
  tdOpacity();
});

let downloadBtn = document.getElementById("download-pdf");
downloadBtn.addEventListener("click", function () {
  const originalTable = document.querySelector("table");

  // نسخ الجدول
  const tableClone = originalTable.cloneNode(true);
  tableClone.classList.add("pdf-table");

  // wrapper خاص بالـ PDF
  const wrapper = document.createElement("div");
  wrapper.classList.add("pdf-wrapper");
  wrapper.appendChild(tableClone);

  document.body.appendChild(wrapper);

  const sectionName = sectionIn.value ? sectionIn.value : "عام";

  const options = {
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
