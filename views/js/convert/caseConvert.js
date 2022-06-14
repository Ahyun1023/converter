function convertReset(){
    document.getElementById('beforeConverTextarea').value = '';
    document.getElementById('afterConverTextarea').value = '';
}

function convert(enter){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    if(convertType == 'camel' || convertType == 'pascal'){
        camelOrPascalChange(enter, convertType);
    } else if(convertType == 'snake'){
        snakeChange(enter);
    } else if(convertType == 'kebab'){
        kebabChange(enter);
    }
}

function typeChange(){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    if(convertType == 'camel'){
        document.getElementById('divTitle').innerHTML = '카멜 표기법';
        document.getElementById('divContent').innerHTML = '띄어쓰기, 언더바를 변환합니다. (ex: camel_var -> camelVar)';
    } else if(convertType == 'snake'){
        document.getElementById('divTitle').innerHTML = '스네이크 표기법';
        document.getElementById('divContent').innerHTML = '띄어쓰기를 변환합니다. (ex: snake var -> snake_var 혹은 SNAKE_VAR)';
    } else if(convertType == 'pascal'){
        document.getElementById('divTitle').innerHTML = '파스칼 표기법';
        document.getElementById('divContent').innerHTML = '띄어쓰기, 언더바를 변환합니다. (ex: pascal_var -> PascalVar)';
    } else if(convertType == 'kebab'){
        document.getElementById('divTitle').innerHTML = '케밥 표기법';
        document.getElementById('divContent').innerHTML = '띄어쓰기, 언더바를 변환합니다. (kebab_var -> kebab-var)';
    }

    if(convertType == 'snake'){
        document.getElementById('typeForm').style.display = 'block';
    } else {
        document.getElementById('typeForm').style.display = 'none';
    }

    convert(document.getElementById('beforeConverTextarea').value);
}

function camelOrPascalChange(enter, convertType){
    let enterTextLength = enter.length;
    let afterText = '';
    let beforeUnderbar = false;

    for(var i = 0; i < enterTextLength; i++){
        var beforeText = enter.substr(i - 1, 1);
        var nowText = enter.substr(i, 1);

        /* 파스칼은 앞글자를 대문자로 표기한다 */
        if(convertType == 'pascal'){
            if(i == 0 || beforeText == '\n'){
                nowText = nowText.toUpperCase();
            }
        }

        if(nowText == '_' || nowText == ' '){
            beforeUnderbar = true;
            continue;
        }

        if(beforeUnderbar == true){
            nowText = nowText.toUpperCase();
            beforeUnderbar = false;
        }
        afterText += nowText;
    }
    
    document.getElementById('afterConverTextarea').value = afterText;
}

function snakeChange(enter){
    /* 대소문자 구분 필요 */
    let enterTextLength = enter.length;
    let afterText = '';
    let caseType = document.querySelector('input[name="caseType"]:checked').value;

    for(var i = 0; i < enterTextLength; i++){
        var nowText = enter.substr(i, 1);

        if(nowText == ' '){
            nowText = '_';
        } else {
            if(caseType == 'enBig'){
                nowText = nowText.toUpperCase();
            } else{
                nowText = nowText.toLowerCase();
            }
        }

        afterText += nowText;
    }
    
    document.getElementById('afterConverTextarea').value = afterText;
}

function kebabChange(enter){
    let enterTextLength = enter.length;
    let afterText = '';

    for(var i = 0; i < enterTextLength; i++){
        var nowText = enter.substr(i, 1);

        if(nowText == '_' || nowText == ' '){
            nowText = '-';
        }

        afterText += nowText;
    }
    
    document.getElementById('afterConverTextarea').value = afterText;
}