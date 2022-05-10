function typeChange(){

}

function convertReset(){
    document.getElementById('afterConverTextarea').value = '';
    document.getElementById('columnsForm').reset();
}

function convert(){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;
    let output = '';
    let columnsArr = [];

    for(var i = 0; i < document.getElementById('columnsForm').childElementCount; i++){
        columnsArr.push(document.getElementsByName('columns')[i].value);
    }

    if(convertType == 'select'){
        output = selectConvert(columnsArr);
    } else if(convertType == 'insert'){
        output = insertConvert(columnsArr);
    } else if(convertType == 'update'){
        output = updateConvert(columnsArr);
    } else if(convertType == 'delete'){
        output = deleteConvert(columnsArr);
    }

    document.getElementById('afterConverTextarea').value = output;
}

function whereCheck(){
    if(document.getElementById('whereCheckbox').checked){
        let addCheckbox = document.createElement('input');
            addCheckbox.setAttribute('type', 'checkbox');
            addCheckbox.setAttribute('name', 'isKeyColumns');

        for(var i = 0; i < document.getElementById('columnsForm').childElementCount; i++){
            //let parentparent = document.getElementById('columnsForm');
            let parent = document.getElementsByName('columnDiv')[i];
            console.log(parent);
            
            parent.insertBefore(addCheckbox, parent.firstChild);
        }
    } else {
        
    }
}

function selectConvert(columnsArr){
    let output = 'SELECT ';

    for(var i = 0; i < columnsArr.length; i++){
        output += columnsArr[i] + ', '
    }

    //WHERE은 선택사항 (선택시 써놓은 컬럼 옆에 WHERE절에 넣을 키값?들을 선택하는 체크박스가 생겨야할듯)
    if(document.getElementById('whereCheckbox').checked){
        output += " WHERE ";

        if(document.getElementById('queryType').options[document.getElementById('queryType').selectedIndex].value == 'node.js'){
            
        } else {
            
        }
    }

    return ouput;
    /* 조인? 일단 생각만 해놓겠삼 */
}

function insertConvert(columnsArr){
    let output = 'INSERT INTO' + document.getElementById('tables').value + ' (';

    for(var i = 0; i < columnsArr.length; i++){
        output += columnsArr[i] + ', '
    }

    output += ') VALUES (';

    for(var i = 0; i < columnsArr.length; i++){
        output += columnsArr[i] + ', '
    }

    return output;
}

function updateConvert(columnsArr){
    let output = 'UPDATE';

    //WHERE은 선택사항

    return ouput;
}

function deleteConvert(columnsArr){
    let output = 'DELETE';

    //WHERE은 선택사항

    return ouput;
}

function addColumn(){
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'columnDiv');
    newDiv.setAttribute('name', 'columnDiv');

    /* where절 여부 체크박스가 checked 상태일 때 컬럼 옆에 키값여부 체크박스를 생성한다 */
    if(document.getElementById('whereCheckbox').checked){
        let addCheckbox = document.createElement('input');
        addCheckbox.setAttribute('type', 'checkbox');
        addCheckbox.setAttribute('name', 'isKeyColumns');

        newDiv.appendChild(addCheckbox);
    }

    let addColumn = document.createElement('input');
    addColumn.setAttribute('type', 'text');
    addColumn.setAttribute('name', 'columns');

    newDiv.appendChild(addColumn);

    document.getElementById('columnsForm').appendChild(newDiv);
}

function deleteColumn(){
    if(document.getElementById('columnsForm').childElementCount > 1){
        let removeColumn = document.getElementById('columnsForm').lastChild;
        document.getElementById('columnsForm').removeChild(removeColumn);
    }
}