function loginButtonClick(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("login.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });    
}

function doLogin(){
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

    login_data = JSON.stringify(login_data);

    $(document).ready(()=>{
        $.ajax({
            url: '/doLogin',
            type: 'POST',
            dataType: 'json',
            data: {login_data: login_data},
            success: (result)=>{
                if(result.result == true){
                    location.href = '/public/index.html';
                } else{
                    alert('아이디 혹은 비밀번호가 틀렸습니다.');
                }
            }
        })
    });
}