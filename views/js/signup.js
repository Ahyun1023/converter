function checkOverlapId(){
    let httpReq;
    let id = document.getElementById('id').value;
    
    httpReq = new XMLHttpRequest();

    httpReq.onreadystatechange = () =>{
        if(httpReq.readState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                alert('ok');
                var isOverlap = httpReq.response;
                if(isOverlap == false){
                    document.getElementById('idCorrect').style.display = 'block';
                    document.getElementById('idWrong').style.display = 'none';
                } else {
                    document.getElementById('idWrong').style.display = 'block';
                    document.getElementById('idCorrect').style.display = 'none';
                }
            } else {
                alert('fail');
                document.getElementById('idWrong').style.display = 'none';
                document.getElementById('idCorrect').style.display = 'none';
            }
        }
    }

    httpReq.open('GET', '/users/checkOverlapId?id=', id);
    httpReq.responseType = 'json';
    httpReq.send();
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