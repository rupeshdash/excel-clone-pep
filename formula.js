for(let i=0; i<allcells.length; i++){
    allcells[i].addEventListener("blur",function(){
        let data = allcells[i].innerText;
        // let address = addressInput.value;
        
        // let {rid , cid} = getridcid(address);
        
        let rid = allcells[i].getAttribute("rid");
        let cid = allcells[i].getAttribute("cid");
         let cellObj = sheetDB[rid][cid];
        cellObj.value = data;
        updateChildren(cellObj);

    })
}

formulaBar.addEventListener("keydown", function(e){
    if(e.key == "Enter" && formulaBar.value){
        //user in[ut formula]
        let cFormula = formulaBar.value;
        //formula --> value get
        let value = evaluateFormula(cFormula);

        //set value to the cell
        setCell(value,cFormula);
        let address = addressInput.value;
        setParentCHArray(cFormula,address);

    }
})



function evaluateFormula(formula) {
    // ( A1 + A2 )
    // split 
    // [(,A1,+,A2,)]
    // a-> z
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getridcid(formulaTokens[i]);
            let value = sheetDB[rid][cid].value;
            formulaTokens[i] = value;
        }
    }
    // [(,10,+,20,)]
    let evaluatedFormula = formulaTokens.join(" ");
    // ( 10 + 20 )
    // stack 
    return eval(evaluatedFormula);
}

function setCell(value,formula){
    let address = addressInput.value;
    let uiCellElem = findUICellElement();
    uiCellElem.innerText = value
    let {rid , cid} = getridcid(address);
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula; 

}

function setParentCHArray(formula,chAddress){
    let formulaTokens = formula.split(" ");
    for(let i=0; i<formulaTokens.length; i++){
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            let {rid , cid} = getridcid(formulaTokens[i]);
            let parent = sheetDB[rid][cid];
            parent.children.push(chAddress);
            
        }
    }
}

function updateChildren(cellObj){
    let children = cellObj.children;
    for(let i=0; i<children.length; i++){
        let chAddress = children[i];
        let{rid , cid} = getridcid(chAddress);
        let childObj = sheetDB[rid][cid];
        let chformula = childObj.formula;
        let newValue = evaluateFormula(chformula);
        SetChildrenCell(newValue, chformula, rid, cid);
        updateChildren(childObj);
    }
}

function SetChildrenCell(value, formula, rid, cid) {
    // let uicellElem = findUICellElement();
    // db update 
    let uiCellElement =
    document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElement.innerText = value;
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;
}
