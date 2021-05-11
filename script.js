let btnContainer = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheetList");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click",makeMeActive);

btnContainer.addEventListener("click",function(){
    let AllSheets = document.querySelector(".sheet");
    let lastSheet = AllSheets[AllSheets.length-1];
    let Lastidx = lastSheet.getAttribute("idx");
    Lastidx = Number(Lastidx);
    let Newsheet = document.createElement("div");
    Newsheet.setAttribute("class","sheet");
    Newsheet.setAttribute("idx",`${Lastidx+1}`);
    Newsheet.innerText = `Sheet+${Lastidx+2}`;
    sheetList.appendChild(Newsheet);
    for(let i =0; i<AllSheets.length; i++){
        AllSheets[i].classList.remove("active");
    }

    Newsheet.classList.add("active");
    Newsheet.addEventListener("click",makeMeActive);

})
function makeMeActive(e){
    let sheet = e.currentTarget;
    let AllSheets = document.querySelector(".sheet");
    for(let i =0; i<AllSheets.length; i++){
        AllSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
}