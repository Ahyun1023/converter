function checkOverlapId(){
    let pw = document.getElementById('password').value;
    let checkPw = document.getElementById('checkPassword').value;

    if(pw != checkPw){
        document.getElementById('pwWrong').style.display = block;
        document.getElementById('pwCorrect').style.display = none;
    } else {
        document.getElementById('pwWrong').style.display = none;
        document.getElementById('pwCorrect').style.display = block;
    }
}

function doSignup(){
    alert('^.^');
}