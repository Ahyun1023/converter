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
        if(isNowTime){
            document.getElementById('afterConverTextarea').value = Math.floor(new Date().getTime() / 1000);
        } else {
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
        let nowUnixTime = Math.floor(new Date().getTime() / 1000);
        document.getElementById('beforeConverTextarea').value = nowUnixTime;
        
        nowUnixTime = new Date(nowUnixTime*1000);

        let year = nowUnixTime.getFullYear();
        let month = nowUnixTime.getMonth() + 1;
        let day = nowUnixTime.getDate();
        let hour = nowUnixTime.getHours();
        let minutes = nowUnixTime.getMinutes();
        let seconds = nowUnixTime.getSeconds();

        document.getElementById('afterConverTextarea').value = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}