function checkOverlapId(){
    let httpReq = new XMLHttpRequest();
    let id = document.getElementById('id').value;
    
    httpReq.onreadystatechange = () =>{
        if(httpReq.readyState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                var isOverlap = JSON.parse(httpReq.response);
                if(isOverlap == true){
                    document.getElementById('idCorrect').style.display = 'block';
                    document.getElementById('idWrong').style.display = 'none';
                } else {
                    document.getElementById('idCorrect').style.display = 'none';
                    document.getElementById('idWrong').style.display = 'block';
                }
            } else {
                document.getElementById('idWrong').style.display = 'none';
                document.getElementById('idCorrect').style.display = 'none';
            }
        }
    }

    httpReq.open('GET', '/users/checkOverlapId?id=' + id);
    httpReq.setRequestHeader('Content-type', 'application/json');
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