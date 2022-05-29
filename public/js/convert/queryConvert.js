function typeChange(){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    if(convertType == 'select'){
        document.getElementById('whereOptionDiv').style.display = 'block';
    } else if(convertType == 'insert'){
        document.getElementById('whereOptionDiv').style.display = 'none';
    } else if(convertType == 'update'){
        document.getElementById('whereOptionDiv').style.display = 'block';
    } else if(convertType == 'delete'){
        document.getElementById('whereOptionDiv').style.display = 'block';
    }

    convertReset();
    document.getElementById('whereCheckbox').checked = false;
    document.getElementById('whereAllCheckLabel').style.display = 'none';
}

function convertReset(){
    if(document.getElementById('whereCheckbox').checked == true){
        for(var i = 0; i < document.getElementById('columnsForm').childElementCount; i++){
            let parent = document.getElementsByName('columnDiv')[i];
            parent.removeChild(parent.firstChild);
        }
    }
    document.getElementById('whereAllCheckbox').checked = false;
    document.getElementById('afterConverTextarea').value = '';
}

function convert(isLineBreak){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;
    let output = '';
    let columnsArr = [];

    for(var i = 0; i < document.getElementById('columnsForm').childElementCount; i++){
        if(document.getElementsByName('columns')[i].value.length > 0){
            columnsArr.push(document.getElementsByName('columns')[i].value);
        }
    }

    if(convertType == 'select'){
        output = selectConvert(columnsArr, isLineBreak);
    } else if(convertType == 'insert'){
        output = insertConvert(columnsArr, isLineBreak);
    } else if(convertType == 'update'){
        output = updateConvert(columnsArr, isLineBreak);
    } else if(convertType == 'delete'){
        output = deleteConvert(columnsArr, isLineBreak);
    }

    document.getElementById('afterConverTextarea').value = output;
}

/* where 여부 체크 이벤트 */
function whereCheck(){
    if(document.getElementById('whereCheckbox').checked){
        document.getElementById('whereAllCheckLabel').style.display = 'block';
    } else {
        document.getElementById('whereAllCheckLabel').style.display = 'none';
        document.getElementById('whereAllCheckbox').checked = false;
    }

    for(var i = 0; i < document.getElementById('columnsForm').childElementCount; i++){
        let parent = document.getElementsByName('columnDiv')[i];

        if(document.getElementById('whereCheckbox').checked){
            let addCheckbox = document.createElement('input');
            addCheckbox.setAttribute('type', 'checkbox');
            addCheckbox.setAttribute('name', 'isTermColumns');
            
            parent.insertBefore(addCheckbox, parent.firstChild);
        } else {
            parent.removeChild(parent.firstChild);
        }
    }
}

/* where 전체 선택 */
function whereAllCheck(){
    for(var i = 0; i < document.getElementById('columnsForm').childElementCount; i++){
        let thisCheckbox = document.getElementsByName('columnDiv')[i];

        if(document.getElementById('whereAllCheckbox').checked){
            thisCheckbox.firstChild.checked = true;
        } else {
            thisCheckbox.firstChild.checked = false;
        }
    }
}

/* select 쿼리 생성 함수 */
function selectConvert(columnsArr, isLineBreak){
    let output = 'SELECT ';

    for(var i = 0; i < columnsArr.length; i++){
        if(i != columnsArr.length - 1){
            if(isLineBreak == true){
                output += '\t' + columnsArr[i] + ', ' + '\n'
            } else {
                output += columnsArr[i] + ', '
            }
            
        } else {
            if(isLineBreak == true){
                output += '\t' + columnsArr[i] + '\n'
            } else {
                output += columnsArr[i]
            }
        }
    }
    
    if(isLineBreak){
        output += 'FROM' + '\t' + '[table_name]';
    } else {
        output += ' FROM ' + '[table_name] ';
    }
    

    //WHERE은 선택사항
    if(document.getElementById('whereCheckbox').checked){
        output = makeWhereQuery(output, columnsArr, isLineBreak);
    }

    output += ';';
    return output;
}

/* insert 쿼리 생성 함수 */
function insertConvert(columnsArr, isLineBreak){
    let dbmsType = document.getElementById('queryType').options[document.getElementById('queryType').selectedIndex].value;
    let output = 'INSERT INTO ' + '[table_name]' + ' (';

    for(var i = 0; i < columnsArr.length; i++){
        if(i != columnsArr.length - 1){
            output += columnsArr[i] + ', '
        } else {
            output += columnsArr[i]
        }
    }

    if(dbmsType == 'node.js'){
        output += ') VALUES ?';
    } else if(dbmsType == 'mybatis'){
        output += ') VALUES (';

        for(var i = 0; i < columnsArr.length; i++){
            if(i != columnsArr.length - 1){
                output += columnsArr[i] + ', '
            } else {
                output += columnsArr[i]
            }
        }

        output += ')';
    }

    output += ';';
    return output;
}

/* update 쿼리 생성 함수 */
function updateConvert(columnsArr, isLineBreak){
    let dbmsType = document.getElementById('queryType').options[document.getElementById('queryType').selectedIndex].value;
    let output = 'UPDATE';

    if(isLineBreak) {
        output += '\n' + '\t' + '[table_name]' + '\n' + 'SET';
    } else {
        output += ' [table_name]' + ' SET ';
    }

    if(dbmsType == 'node.js'){
        for(var i = 0; i < columnsArr.length; i++){
            if(i != columnsArr.length - 1){
                if(isLineBreak == true){
                    output += '\t' + columnsArr[i] + '= ?,' + '\n'
                } else {
                    output += columnsArr[i] + '= ?, '
                }
            } else {
                if(isLineBreak == true){
                    output += '\t' + columnsArr[i] + '= ?'
                } else {
                    output += columnsArr[i] + '= ? '
                }
            }
        }
    } else if(dbmsType == 'mybatis'){ //mybatis는 나중에. #{} 붙여야됨
        let transColumnsArr = [];

        for(var i = 0; i < columnsArr.length; i++){
            if(columnsArr[i].indexOf('_', 0) >= 0 || columnsArr[i].indexOf(' ', 0) >= 0){
                var beforeUnderbar = false;
                var completeFactor = '';

                for(var j = 0; j < columnsArr[i].length; j++){
                    var nowText = columnsArr[i].substr(j, 1);

                    if(nowText == '_' || nowText == ' '){
                        beforeUnderbar = true;
                        continue;
                    }

                    if(beforeUnderbar == true){
                        completeFactor += nowText.toUpperCase();
                        beforeUnderbar = false;
                    } else {
                        completeFactor += nowText;
                    }
                }
            
            transColumnsArr.push(completeFactor);
            } else {
                transColumnsArr.push(columnsArr[i]);
                continue;
            }
        }

        for(var i = 0; i < columnsArr.length; i++){
            if(i != columnsArr.length - 1){
                if(isLineBreak == true){
                    output += '\t' + columnsArr[i] + '= #{'+ transColumnsArr[i] + '}, ' + '\n'
                } else {
                    output += columnsArr[i] + '= #{'+ transColumnsArr[i] + '}, '
                }
            } else {
                if(isLineBreak == true){
                    output += '\t' + columnsArr[i] + '= #{' + transColumnsArr[i] + '}'
                } else {
                    output += columnsArr[i] + '= #{' + transColumnsArr[i] + '} '
                }
            }
        }
    }

    //WHERE은 선택사항
    if(document.getElementById('whereCheckbox').checked){
        output = makeWhereQuery(output, columnsArr, isLineBreak);
    }

    output += ';';
    return output;
}

/* delete 쿼리 생성 함수 */
function deleteConvert(columnsArr, isLineBreak){
    let output = 'DELETE FROM ';

    //테이블명
    output += '[table_name] ';

    //WHERE은 선택사항
    if(document.getElementById('whereCheckbox').checked){
        output = makeWhereQuery(output, columnsArr, isLineBreak);
    }

    output += ';';
    return output;
}

/* where절 만드는 함수 */
function makeWhereQuery(output, columnsArr, isLineBreak){
    let dbmsType = document.getElementById('queryType').options[document.getElementById('queryType').selectedIndex].value;
    let termCheckArr = [];

    for(var i = 0; i < columnsArr.length; i++){
        if(document.getElementsByName('columnDiv')[i].firstChild.checked == true){
            termCheckArr.push(columnsArr[i]);
        }
    }

    if(termCheckArr.length <= 0){
        alert('where절의 조건에 들어갈 컬럼이 선택되지 않았습니다.');
        return '';
    }
        
    if(document.getElementsByClassName('convertType').value == 'delete' || !isLineBreak){
        output += 'WHERE ';
    } else {
        output += '\n' + 'WHERE';
    }
        

    for(var i = 0; i < termCheckArr.length; i++){
        if(dbmsType == 'node.js'){
            if(i != termCheckArr.length - 1){
                if(isLineBreak){
                    output += '\t' + termCheckArr[i] + ' = ? ' + '\n' + 'AND '
                } else {
                    output += termCheckArr[i] + ' = ? ' + 'AND '
                }
            } else {
                if(isLineBreak){
                    output += '\t' + termCheckArr[i] + ' = ?'
                } else {
                    output += termCheckArr[i] + ' = ?'
                }
            }
        } else if(dbmsType == 'mybatis') {
            if(i != termCheckArr.length - 1){
                if(isLineBreak){
                    output += '\t' + termCheckArr[i] + ' = #{' + termCheckArr[i] + '}' + '\n' + 'AND '
                } else {
                    output += termCheckArr[i] + ' = #{' + termCheckArr[i] + '} ' + 'AND '
                }
            } else {
                if(isLineBreak){
                    output += '\t' + termCheckArr[i] + ' = #{' + termCheckArr[i] + '}'
                } else {
                    output += termCheckArr[i] + ' = #{' + termCheckArr[i] + '}'
                }
            }
        }
    }

    return output;
}

/* 컬럼 추가 */
function addColumn(){
    if(document.getElementById('columnsForm').childElementCount > 29){
        alert('컬럼은 최대 30개까지만 설정할 수 있습니다.');
        return;
    }

    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'columnDiv');
    newDiv.setAttribute('name', 'columnDiv');

    // where절 여부 체크박스가 checked 상태일 때 컬럼 옆에 키값여부 체크박스를 생성한다
    if(document.getElementById('whereCheckbox').checked){
        let addCheckbox = document.createElement('input');
        addCheckbox.setAttribute('type', 'checkbox');
        addCheckbox.setAttribute('name', 'isTermColumns');

        newDiv.appendChild(addCheckbox);
    }

    let addColumn = document.createElement('input');
    addColumn.setAttribute('type', 'text');
    addColumn.setAttribute('name', 'columns');

    newDiv.appendChild(addColumn);

    document.getElementById('columnsForm').appendChild(newDiv);
}

/* 컬럼 삭제 */
function deleteColumn(){
    if(document.getElementById('columnsForm').childElementCount > 1){
        let removeColumn = document.getElementById('columnsForm').lastChild;
        document.getElementById('columnsForm').removeChild(removeColumn);
    }
}