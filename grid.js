let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let addressInput = document.querySelector(".address-input");

let rows = 100;
let cols = 26;
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
  });
}

//for bold feature-------------------------------
let flag1 = 0;
bold.addEventListener("click", function () {
  let address = addressInput.value;
  let ridcidObj = getridcid(address);
  let rid = ridcidObj.rid;
  let cid = ridcidObj.cid;
  if (flag1 == 0) {
    bold.style.backgroundColor = "grey";

    let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCell.style.fontWeight = "bold";
    flag1 = 1;
  }
  else if(flag1==1){
    bold.style.backgroundColor = "white";
    let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCell.style.fontWeight = "normal";
    flag1 = 0;
  }
});


//for italic feature-------------------------
let flag2 = 0;
italic.addEventListener("click", function () {
    let address = addressInput.value;
    let ridcidObj = getridcid(address);
    let rid = ridcidObj.rid;
    let cid = ridcidObj.cid;
    if (flag2 == 0) {
      italic.style.backgroundColor = "grey";
  
      let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
      uiCell.style.fontStyle = "italic";
      flag2 = 1;
    }
    else if(flag2==1){
      italic.style.backgroundColor = "white";
      let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
      uiCell.style.fontStyle = "initial";
      flag2 = 0;
    }
  });


  //for underline feature-----------------------
  let flag3 = 0;
  underline.addEventListener("click", function () {
    let address = addressInput.value;
    let ridcidObj = getridcid(address);
    let rid = ridcidObj.rid;
    let cid = ridcidObj.cid;
    if (flag3 == 0) {
      underline.style.backgroundColor = "grey";
  
      let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
      uiCell.style.textDecoration = "underline";
      flag3 = 1;
    }
    else if(flag3==1){
      underline.style.backgroundColor = "white";
      let uiCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
      uiCell.style.textDecoration = "none";
      flag3 = 0;
    }
  });

function getridcid(address) {
  let cid = Number(address.charCodeAt(0)) - 65;
  let rid = Number(address.slice(1)) - 1;
  return { cid: cid, rid: rid };
}

// by this line by default address box mein A1 mtlb first cell ka address rehta h
allcells[0].click();
