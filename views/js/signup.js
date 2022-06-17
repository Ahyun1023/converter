function checkOverlapId(){
    let httpReq;
    let id = document.getElementById('id').value;

    let id_data = {
        id: id
    }
    
    httpReq = new XMLHttpRequest();

    httpReq.open('POST', '/users/checkOverlapId', true);
    httpReq.responseType = 'json';
    httpReq.setRequestHeader('Content-Type', 'application/json');
    httpReq.send(JSON.stringify(id_data));

    httpReq.onreadystatechange = () =>{
        if(httpReq.readState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                alert('ok');
            } else {
                alert('fail');
            }
        }
    }
}

function checkPassword(){
    let pw = document.getElementById('password').value;
    let checkPw = document.getElementById('checkPassword').value;

    if(pw.length > 0 && checkPw <= 0){
        document.getElementById('pwWrong').style.display = 'none';
        document.getElementById('pwCorrect').style.display = 'none';
        return;
    }

    if(pw != checkPw){
        document.getElementById('pwWrong').style.display = 'block';
        document.getElementById('pwCorrect').style.display = 'none';
    } else {
        document.getElementById('pwWrong').style.display = 'none';
        document.getElementById('pwCorrect').style.display = 'block';
    }
}

function doSignup(){
    alert('^.^');
}