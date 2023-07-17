document.getElementById("questionnaire").addEventListener("submit", function (e) {
    e.preventDefault();
    let el = document.getElementById("questionnaire"); 
    let fData = new FormData(el);
    console.log(fData)
})
