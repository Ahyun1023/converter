const NUMBER_CHECK = /^[0-9]+$/;

function typeChange(){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    document.getElementById('beforeConverTextarea').value = '';
    document.getElementById('afterConverTextarea').value = '';

    if(convertType == 'unicode'){
        document.getElementById('beforeTitle').innerHTML = '한글입력 란';
        document.getElementById('afterTitle').innerHTML = '유니코드';
        document.getElementById('beforeConvert').style.display = 'inline-block';
        document.getElementById('normalTimeDiv').style.display = 'none';
        document.getElementById('convertButtonDiv').style.display = 'none';
        document.getElementById('typeForm').style.display = 'none';
    } else if(convertType == 'unixTime'){
        document.getElementById('typeForm').style.display = 'block';

        let formType = document.querySelector('input[name="caseType"]:checked').value;

        if(formType == 'normalChange'){
            document.getElementById('beforeTitle').innerHTML = '일반 시간';
            document.getElementById('afterTitle').innerHTML = '유닉스 시간';
            document.getElementById('convertButtonDiv').style.display = 'block';
            document.getElementById('normalTimeDiv').style.display = 'inline-block';
            document.getElementById('beforeConvert').style.display = 'none';
            document.getElementById('afterConverTextarea').readOnly = true;
        } else {
            document.getElementById('beforeTitle').innerHTML = '유닉스 시간';
            document.getElementById('afterTitle').innerHTML = '일반 시간';
            document.getElementById('convertButtonDiv').style.display = 'block';
            document.getElementById('normalTimeDiv').style.display = 'none';
            document.getElementById('beforeConvert').style.display = 'inline-block';
            document.getElementById('afterConverTextarea').readOnly = true;
        }
    }
}

function convertReset(){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;
    let formType = document.querySelector('input[name="caseType"]:checked').value;

    document.getElementById('beforeConverTextarea').value = '';
    document.getElementById('afterConverTextarea').value = '';

    if(convertType == 'unixTime'){
        if(formType = 'unixChange'){
            document.getElementById('beforeTimeForm').reset();
        }
    }
    
}

function convert(enter){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    if(convertType == 'unicode'){
        convertUnicode(enter);
    }
}

function convertUnicode(enter){
    let english = /[a-zA-Z]/;
    let number = /[0-9]/;
    let special =  /[~!@#\#$%<>^&*]/;
    let enterTextLength = enter.length;
    let afterText = '';

    for(var i = 0; i < enterTextLength; i++){
       var nowText = enter.substr(i, 1);
        if(english.test(nowText) || number.test(nowText)){
            afterText += nowText;
        } else if(special.test(nowText)){
            afterText += ('%' + (nowText.charCodeAt(0).toString(16)).toUpperCase());
        } else {
            afterText += ('%u' + (nowText.charCodeAt(0).toString(16)).toUpperCase());
        }
    }

    document.getElementById('afterConverTextarea').value = afterText;
}

function convertUnixTime(isNowTime){
    let formType = document.querySelector('input[name="caseType"]:checked').value;
    
    if(formType == 'normalChange'){
        if(isNowTime == true){
            let nowNormalTime = new Date();
            document.getElementById('normalYear').value = nowNormalTime.getFullYear();
            document.getElementById('normalMonth').value = nowNormalTime.getMonth() + 1;
            document.getElementById('normalDay').value = nowNormalTime.getDate();
            document.getElementById('normalHour').value = nowNormalTime.getHours();
            document.getElementById('normalMinutes').value = nowNormalTime.getMinutes();
            document.getElementById('normalSeconds').value = nowNormalTime.getSeconds();

            document.getElementById('afterConverTextarea').value = Math.floor(nowNormalTime.getTime() / 1000);
        } else {
            if(!checkAndFillZero()){
                return;
            }

            let year = document.getElementById('normalYear').value;
            let month = document.getElementById('normalMonth').value;
            let day = document.getElementById('normalDay').value;
            let hour = document.getElementById('normalHour').value;
            let minutes = document.getElementById('normalMinutes').value;
            let seconds = document.getElementById('normalSeconds').value;
            
            let date = new Date(year + "-" + month + "-" + day + ", " + hour + ":" + minutes  + ":" + seconds);
            let enter = Math.floor(date.getTime() / 1000);
            
            document.getElementById('afterConverTextarea').value = enter;
        }
    } else {
        let beforeUnixTime;

        if(isNowTime == true){
            beforeUnixTime = Math.floor(new Date().getTime() / 1000);
            document.getElementById('beforeConverTextarea').value = beforeUnixTime;
        } else {
            beforeUnixTime = document.getElementById('beforeConverTextarea').value;

            if(!NUMBER_CHECK.test(beforeUnixTime)){
                alert('숫자만 입력 가능합니다.');
                return false;
            }
        }

        beforeUnixTime = new Date(beforeUnixTime*1000);

        let year = beforeUnixTime.getFullYear();
        let month = beforeUnixTime.getMonth() + 1;
        let day = beforeUnixTime.getDate();
        let hour = beforeUnixTime.getHours();
        let minutes = beforeUnixTime.getMinutes();
        let seconds = beforeUnixTime.getSeconds();
        
        document.getElementById('afterConverTextarea').value = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}

function checkAndFillZero(){
    
    let dateArr = [document.getElementById('normalYear').value, document.getElementById('normalMonth').value,
        document.getElementById('normalDay').value, document.getElementById('normalHour').value,
        document.getElementById('normalMinutes').value, document.getElementById('normalSeconds').value];

    for(var i = 0; i < dateArr.length; i++){
        if(dateArr[i] == '' || dateArr[i] == undefined){
            alert('입력되지 않은 항목이 있습니다.');
            return false;
        }

        if(!NUMBER_CHECK.test(dateArr[i])){
            alert('날짜는 숫자만 입력 가능합니다.');
            return false;
        }

        if(i == 0 && dateArr[i].length != 4){
            alert('년도는 4자리수여야 합니다.');
            return false;
        } else if(i == 1 && dateArr[i] > 12 && dateArr[i] <= 0){
            alert('월은 1 ~ 12월까지만 입력할 수 있습니다.');
            return false;
        } else if(i == 2 && dateArr[i] > 31 && dateArr[i] <= 0){
            alert('날짜는 1 ~ 31일까지만 입력할 수 있습니다.');
            return false;
        } else if(i == 3 && dateArr[i] > 23 && dateArr[i] < 0){
            alert('시간은 0 ~ 23시까지만 입력할 수 있습니다.');
            return false;
        } else if((i == 4 || i == 5) && dateArr[i] > 59 && dateArr[i] < 0){
            alert('분 및 초는 0 ~ 59까지만 입력할 수 있습니다.');
            return false;
        }
    }

    return true;
}