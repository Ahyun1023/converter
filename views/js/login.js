function login(){
    let login_data = {
        id: document.getElementById("id").value,
        password: document.getElementById("password").value
    }

    if(login_data.id.length <= 0){
        alert('아이디를 입력해주세요.');
        document.getElementById("id").focus();
        return;
    } else if(login_data.password.length <= 0){
        alert('비밀번호를 입력해주세요.');
        document.getElementById("password").focus();
        return;
    }

    let httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = () =>{
        if(httpReq.readyState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                var result = JSON.parse(httpReq.response);

                if(result == true){
                    location.href = '/';
                } else{
                    alert('아이디 혹은 비밀번호가 틀렸습니다.');
                }
            } else {
                alert('error');
            }
        }
    }

    httpReq.open('POST', '/users/doLogin');
    httpReq.setRequestHeader('Content-type', 'application/json');
    httpReq.send(JSON.stringify(login_data));
}