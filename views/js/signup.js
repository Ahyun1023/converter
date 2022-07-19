let checkId = false;

function checkOverlapId(){
    let httpReq = new XMLHttpRequest();
    let id = document.getElementById('id').value;

    if(id.length <= 0){
        document.getElementById('idExp').style.display = 'block';
        document.getElementById('idExp').innerHTML = '아이디는 필수 정보입니다.';
        return;
    }
    
    httpReq.onreadystatechange = () =>{
        if(httpReq.readyState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                var isOverlap = JSON.parse(httpReq.response);
                if(isOverlap == true){
                    checkId = true;
                    document.getElementById('idExp').style.display = 'block';
                    document.getElementById('idExp').innerHTML = '사용가능한 아이디입니다.';
                } else {
                    checkId = false;
                    document.getElementById('idExp').style.display = 'block';
                    document.getElementById('idExp').innerHTML = '사용할 수 없는 아이디 입니다.';
                }
            } else {
                document.getElementById('idExp').style.display = 'none';
                checkId = false;
            }
        }
    }

    httpReq.open('GET', '/users/checkOverlapId?id=' + id);
    httpReq.responseType = "json";
    httpReq.send();
}

function checkPassword(){
    let pw = document.getElementById('password').value;
    let checkPw = document.getElementById('checkPassword').value;

    if(pw.length == 0){

    } else if(checkPw == 0){

    }

    if((pw.length > 0 && checkPw <= 0)){
        document.getElementById('checkPwExp').style.display = 'none';
        return;
    }

    if(pw != checkPw){
        document.getElementById('checkPwExp').style.display = 'block';
        document.getElementById('checkPwExp').innerHTML = '비밀번호가 일치하지 않습니다.';
        
    } else {
        document.getElementById('checkPwExp').style.display = 'block';
        document.getElementById('checkPwExp').innerHTML = '비밀번호가 일치합니다.';
    }
}

function doSignup(){
    let httpReq = new XMLHttpRequest();
    let signup_data = {
        id: document.getElementById('id').value,
        password: document.getElementById('password').value,
        name: document.getElementById('name').value,
        birth: document.getElementById('birth').value,
        email: document.getElementById('email').value
    };

    for(var i in signup_data.length){
        if(signup_data[i].length <= 0){
            alert('입력되지 않은 필수항목이 있습니다.');
            //focus?
            return;
        }
    }

    httpReq.onreadystatechange = () =>{
        if(httpReq.readyState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                //다음 실행
                var success = JSON.parse(httpReq.response);
                if(success == true){
                    alert('회원가입이 완료되었습니다. 로그인 화면에서 로그인 해주세요.');
                    location.href = '/users/login';
                }
            } else {
                //오류
            }
        }
    }

    httpReq.open('POST', '/users/doSignup', true);
    httpReq.responseType = "json";
    httpReq.setRequestHeader('Content-Type', 'application/json');
    httpReq.send(JSON.stringify(signup_data));
}