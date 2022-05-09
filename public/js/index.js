let opacity = 0;
let intervalID = 0;
	 

function caseConvert(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("caseConvert.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });
}

function uniConvert(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("uniConvert.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });
}

function queryConvert(){
    $('.mainDiv').fadeOut('slow', function(){
        $(".mainDiv").load("queryConvert.html", function(){
            $(".mainDiv").fadeIn('slow');
        });
    });
}