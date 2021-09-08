function loginButtonClick(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("login.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });    
}

function doLogin(){
    let id = document.getElementById("id").value;
    let pw = doucment.getElementById("pw").value;

    
}