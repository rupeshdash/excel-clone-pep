let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let addressInput = document.querySelector(".address-input");
let alignBtns = document.querySelectorAll(".align-container>*");
let fontSizeElem = document.querySelector(".font-size");
let rows = 100;
let cols = 26;

let sheetDB = [];
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    let cell = {
      bold: "normal",
      italic: "normal",
      underline: "none",
      hAlign: "center",
      fontFamily: "sans-serif",
      fontSize : 16
    };

    row.push(cell);
  }
  sheetDB.push(row);
}

for (let i = 0; i < rows; i++) {
  let colBox = document.createElement("div");
  colBox.innerText = i + 1;
  colBox.setAttribute("class", "box");
  leftCol.appendChild(colBox);
}
for (let i = 0; i < cols; i++) {
  let cell = document.createElement("div");
  cell.innerText = String.fromCharCode(65 + i);
  // setAttribute
  cell.setAttribute("class", "cell");
  topRow.appendChild(cell);
}
for (let i = 0; i < rows; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");

    cell.setAttribute("class", "cell");
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    cell.setAttribute("contentEditable", "true");
    row.appendChild(cell);
  }
  grid.appendChild(row);
}

let allcells = document.querySelectorAll(".grid .cell");
for (let i = 0; i < allcells.length; i++) {
  allcells[i].addEventListener("click", function () {
    let rid = allcells[i].getAttribute("rid");
    let cid = allcells[i].getAttribute("cid");
    rid = Number(rid);
    cid = Number(cid);
    let address = `${String.fromCharCode(65 + cid)}${rid + 1}`;
    addressInput.value = address;
    let cellObj = sheetDB[rid][cid];
    checkAndSetCondition(cellObj);
  });
}

//check the status of the function buttons and set them accordingly
function checkAndSetCondition(cellObj) {
  if (cellObj.bold == "normal") {
    boldBtn.classList.remove("active-btn");
  } else {
    boldBtn.classList.add("active-btn");
  }
  if (cellObj.italic == "normal") {
    italicBtn.classList.remove("active-btn");
  } else {
    italicBtn.classList.add("active-btn");
  }
  if (cellObj.underline == "none") {
    underlineBtn.classList.remove("active-btn");
  } else {
    underlineBtn.classList.add("active-btn");
  }

  let target = cellObj.hAlign;
  for (let i = 0; i < alignBtns.length; i++) {
    if (alignBtns[i].getAttribute("class") == target) {
      alignBtns[i].classList.add("active-btn");
    } else {
      alignBtns[i].classList.remove("active-btn");
    }
  }
  
  fontSizeElem.value = cellObj.fontSize;
 
}

//Horizontal alignment
for (let i = 0; i < alignBtns.length; i++) {
  alignBtns[i].addEventListener("click", function () {
    let alignment = alignBtns[i].getAttribute("class");
    let uiCellElement = findUICellElement();
    let cid = uiCellElement.getAttribute("cid");
    let rid = uiCellElement.getAttribute("rid");
    let cellObj = sheetDB[rid][cid];
    uiCellElement.style.textAlign = alignment;
    cellObj.hAlign = alignment;
    for (let i = 0; i < alignBtns.length; i++) {
      alignBtns[i].classList.remove("active-btn");
    }
    alignBtns[i].classList.add("active-btn");
  });
}

//font size
fontSizeElem.addEventListener("change", function () {
  let val = fontSizeElem.value;
  let uiCellElement = findUICellElement();

  let cid = uiCellElement.getAttribute("cid");
  let rid = uiCellElement.getAttribute("rid");
  let cellObj = sheetDB[rid][cid];
  
    cellObj.fontSize = val;
    
    uiCellElement.style.fontSize = val + "px";
  
});

//for bold feature-------------------------------
boldBtn.addEventListener("click", function () {
  // Jispe cell click -> bold
  let uiCellElement = findUICellElement();
  let cid = uiCellElement.getAttribute("cid");
  let rid = uiCellElement.getAttribute("rid");
  let cellObj = sheetDB[rid][cid];
  if (cellObj.bold == "normal") {
    uiCellElement.style.fontWeight = "bold";
    boldBtn.classList.add("active-btn");
    cellObj.bold = "bold";
  } else {
    uiCellElement.style.fontWeight = "normal";
    boldBtn.classList.remove("active-btn");
    cellObj.bold = "normal";
  }
});
underlineBtn.addEventListener("click", function () {
  // Jispe cell click -> bold
  let uiCellElement = findUICellElement();
  let cid = uiCellElement.getAttribute("cid");
  let rid = uiCellElement.getAttribute("rid");
  let cellObj = sheetDB[rid][cid];
  if (cellObj.underline == "none") {
    uiCellElement.style.textDecoration = "underline";
    underlineBtn.classList.add("active-btn");
    cellObj.underline = "underline";
  } else {
    uiCellElement.style.textDecoration = "none";
    underlineBtn.classList.remove("active-btn");
    cellObj.underline = "none";
  }
});
italicBtn.addEventListener("click", function () {
  // Jispe cell click -> bold
  let uiCellElement = findUICellElement();
  let cid = uiCellElement.getAttribute("cid");
  let rid = uiCellElement.getAttribute("rid");
  let cellObj = sheetDB[rid][cid];
  if (cellObj.italic == "normal") {
    uiCellElement.style.fontStyle = "italic";
    italicBtn.classList.add("active-btn");
    cellObj.italic = "italic";
  } else {
    uiCellElement.style.fontStyle = "normal";
    italicBtn.classList.remove("active-btn");
    cellObj.italic = "normal";
  }
});

function findUICellElement() {
  let address = addressInput.value;
  let ricidObj = getridcid(address);
  let rid = ricidObj.rid;
  let cid = ricidObj.cid;
  let uiCellElement = document.querySelector(
    `.cell[rid="${rid}"][cid="${cid}"]`
  );
  return uiCellElement;
}
function getridcid(address) {
  let cid = Number(address.charCodeAt(0)) - 65;
  let rid = Number(address.slice(1)) - 1;
  return { cid: cid, rid: rid };
}

//TODO
for (let i = 0; i < alignBtns.length; i++) {
  alignBtns[i].addEventListener("click", function () {
    let uiCellElement = findUICellElement();
    uiCellElement.style.textAlign;
  });
}

// by this line by default address box mein A1 mtlb first cell ka address rehta h
allcells[0].click();
