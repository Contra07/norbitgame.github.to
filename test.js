document.getElementById("questionnaire").addEventListener("submit", function (e) {
    e.preventDefault();
    var el = document.getElementById("questionnaire"); 
    var fData = new FormData(el);
    var obj = {}
    fData.forEach( (value, key, parent )=> {
        obj[key] = value
    })
    console.log(obj)
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");
    elem.href = url;
    elem.download = "filename.txt";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    console.log(fData.values())
})

const postData = async (url, fData) => {
	let fetchResponse = await fetch(url, {
		method: "POST",
		body: fData
	});
	return await fetchResponse.text();
};
