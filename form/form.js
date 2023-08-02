document.getElementById("questionnaire").addEventListener("submit", function (e) {
    e.preventDefault();
    var el = document.getElementById("questionnaire"); 
    var fData = new FormData(el);
    var obj = {}
    fData.forEach( (value, key, parent )=> {
        obj[key] = value
    })
    postData(this.action, JSON.stringify(obj))
    .then(fetchResponse => {
        console.log(fetchResponse)
    })
    .catch( fetchResponse =>{
        console.log(fetchResponse)
        console.log("Fetch error")
    }
    )
})  

const postData = async (url, fData) => {
    let head = new Headers()
    head.append('Origin', 'http://community.practicat.tu')
    let options = {
        resource: url,
        method:  "POST",
        body: fData
    }
    
	let fetchResponse = await fetch(url, options);
	return fetchResponse.statusText;
};
