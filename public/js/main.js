let opacity = 0;
let intervalID = 0;
	 

function choice1Click(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("input.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });    
}