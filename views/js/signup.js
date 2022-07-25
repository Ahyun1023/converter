let checkId = false;

function checkOverlapId(){
    let httpReq = new XMLHttpRequest();
    let id = document.getElementById('id').value;

    if(id.length <= 0){
        document.getElementById('idExp').style.display = 'block';
        document.getElementById('idExp').innerHTML = '필수 정보입니다.';
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

function checkPassword1(){
    let pw = document.getElementById('password').value;

    if(pw.length == 0){
        document.getElementById('pwExp').style.display = 'block';
        document.getElementById('pwExp').innerHTML = '필수 정보입니다.';
        return;
    }

    //비밀번호 조건도 체크 추가해야함

    document.getElementById('pwExp').style.display = 'none';
}

function checkPassword2(){
    let pw = document.getElementById('password').value;
    let checkPw = document.getElementById('checkPassword').value;

    if(checkPw.length == 0){
        document.getElementById('checkPwExp').style.display = 'block';
        document.getElementById('checkPwExp').innerHTML = '필수 정보입니다.';
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

function checkBirth(){
    let today = new Date();
    let numberCheck = /^[0-9]+$/;

    let birthYear = document.getElementById('birthYear').value;
    let birthDay = document.getElementById('birthDay').value;

    if(!numberCheck.test(birthYear) || !numberCheck.test(birthDay)){
        document.getElementById('birthExp').style.display = 'block';
        document.getElementById('birthExp').innerHTML = '생년월일을 다시 확인해주세요.';
        return;
    }

    if(birthYear.length < 4){
        document.getElementById('birthExp').style.display = 'block';
        document.getElementById('birthExp').innerHTML = '태어난 년도 4자리를 정확히 입력해주세요.';
        return;
    }

    if(birthYear < today.getFullYear() - 110){
        document.getElementById('birthExp').style.display = 'block';
        document.getElementById('birthExp').innerHTML = '정말인가요?';
        return;
    }

    if(birthYear > today.getFullYear()){
        document.getElementById('birthExp').style.display = 'block';
        document.getElementById('birthExp').innerHTML = '미래에서 오셨나요? ㅎㅎ';
        return;
    }

    document.getElementById('birthExp').style.display = 'none';
}

function selectEmailForm(){
    let selected = document.getElementById('selectEmailForm').value;

    if(selected == ''){
        document.getElementById('emailForm').readOnly = false;
        return;
    } else {
        document.getElementById('emailForm').value = selected;
        document.getElementById('emailForm').readOnly = true;
    }
}

function checkEmail(){
    let email = document.getElementById('email').value;
    let emailForm = document.getElementById('emailForm').value;

    if(email.length <= 0 || emailForm.length <= 0){
        document.getElementById('emailExp').style.display = 'block';
        document.getElementById('emailExp').innerHTML = '이메일 양식을 다시 확인해주세요.';
    } else {
        document.getElementById('emailExp').style.display = 'none';
    }
}

function doCertificate(){
    let email = {
        email: document.getElementById('email').value + '@' + document.getElementById('emailForm').value
    };

    if(email.length <= 0){
        alert('이메일을 입력해주세요.');
        return;
    }

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = () =>{
        if(httpReq.readyState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                //다음 실행
                var success = JSON.parse(httpReq.response);
                if(success == true){
                    document.getElementById('certEmailExp').style.display = 'block';
                    document.getElementById('certEmailExp').innerHTML = '인증번호가 발급되었습니다. 이메일을 확인해주세요.';

                    document.getElementById('sendCertificate').innerHTML = '인증번호 재발급'
                }
            } else {
                //오류
            }
        }
    }

    httpReq.open('POST', '/users/emailCertificate', true);
    httpReq.responseType = "json";
    httpReq.setRequestHeader('Content-Type', 'application/json');
    httpReq.send(JSON.stringify(email));
}

function doSignup(){
    let httpReq = new XMLHttpRequest();
    let signup_data = {
        id: document.getElementById('id').value,
        password: document.getElementById('password').value,
        name: document.getElementById('name').value,
        birth: document.getElementById('birthYear').value + document.getElementById('birthMonth').value + document.getElementById('birthDay'),
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