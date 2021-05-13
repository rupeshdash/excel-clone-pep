let save = document.querySelector(".save");
save.addEventListener("click",function(){
    const data = JSON.stringify(sheetDB);

    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    let a  = document.createElement("a");
    a.href = url;
    a.download = "sheet.json";
    a.click();
    a.remove();
})