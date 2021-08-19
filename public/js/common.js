function loginButtonClick(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("login.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });    
}