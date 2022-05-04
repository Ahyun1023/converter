function typeChange(){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    if(convertType == 'unicode'){
        document.getElementById('beforeTitle').innerHTML = '한글입력 란';
        document.getElementById('afterTitle').innerHTML = '유니코드';
        document.getElementById('beforeConvert').style.display = 'inline-block';
        document.getElementById('normalTimeDiv').style.display = 'none';
        document.getElementById('convertButtonDiv').style.display = 'none';
    } else if(convertType == 'unixTime'){
        document.getElementById('beforeTitle').innerHTML = '일반 시간';
        document.getElementById('afterTitle').innerHTML = '유닉스 시간';
        document.getElementById('convertButtonDiv').style.display = 'block';
        document.getElementById('normalTimeDiv').style.display = 'inline-block';
        document.getElementById('beforeConvert').style.display = 'none';
        document.getElementById('afterConverTextarea').readOnly = true;
    }
}

function convertReset(){
    document.getElementById('beforeConverTextarea').value = '';
    document.getElementById('afterConverTextarea').value = '';
    
}

function convertChange(enter){
    let convertType = document.querySelector('input[name="convertType"]:checked').value;

    if(convertType == 'unicode'){
        convertUnicode(enter);
    } /*else if(convertType == 'unixTime') {
        convertUnixTime(enter);
    }*/
}

function convertUnicode(enter){
    //let enter = document.getElementById('beforeText').value;
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
    if(isNowTime){
        document.getElementById('afterConverTextarea').value = Math.floor(new Date().getTime() / 1000);
    } else {
        let year = document.getElementById('normal_year').value;
        let month = document.getElementById('normal_month').value;
        let day = document.getElementById('normal_day').value;
        let hour = document.getElementById('normal_hour').value;
        let minutes = document.getElementById('normal_minutes').value;
        let seconds = document.getElementById('normal_seconds').value;

        let enter = Math.floor()

        /* 변환 */
        //let enter = year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' ' + hour.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        document.getElementById('afterConverTextarea').value = enter;
    }
}

