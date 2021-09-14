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