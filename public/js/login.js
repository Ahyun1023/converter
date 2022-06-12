function signupPage(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("signup.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });
}