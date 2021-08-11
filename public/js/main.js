function convert(){
    let beforeText = document.getElementById('beforeText').value;
    
}

function choice1Click(){
   //$(".mainDiv").load("/input.do");

    $(".mainDiv").load("input.html", {"ex" : "data"}, function(){
        alert("success");
    });
}