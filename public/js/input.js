function convertReset(){
    document.getElementById('beforeConverTextarea').value = '';
    document.getElementById('afterConverTextarea').value = '';
}

function convertChange(){
    console.log(document.getElementById('beforeConverTextarea').value);
    document.getElementById('beforeConverTextarea').value = document.getElementById('afterConverTextarea').value;
}