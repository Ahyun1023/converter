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
        pw: doucment.getElementById("pw").value
    }

    login_data = JSON.stringify(login_data);
}