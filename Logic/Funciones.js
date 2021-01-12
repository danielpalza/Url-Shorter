var cont = 0;

function mostrarUrl() {
	if (localStorage.getItem("arrUrl") != null) {
		let arr = localStorage.getItem("arrUrl");

		arr = JSON.parse(arr);
		console.log("arr mos:", arr);
		let list = document.querySelector("#listaUrls");

		for (var i = 0; i < arr.length; i++) {
			cont++;
			crearElementos(arr[i].dir, arr[i].shortDir);
		}
	}
}

function crearUrl(url, shortUrl) {
	let dire = new Url(url, shortUrl);
	let arr = new Array();

	if (localStorage.getItem("arrUrl") != null) {
		arr = localStorage.getItem("arrUrl");
		arr = JSON.parse(arr);
	}

	crearElementos(url, shortUrl);
	arr.push(dire);
	localStorage.setItem("arrUrl", JSON.stringify(arr));
	cont++;
}

function crearElementos(url, shortUrl) {
	let urlLong = document.createElement("h3");
	let urlShort = document.createElement("h3");
	let copy = document.createElement("button");
	let list = document.querySelector("#listaUrls");
	let element = document.createElement("li");
	let div = document.createElement("div")
	element.setAttribute("id", cont);
	copy.textContent = "Copy";
	copy.addEventListener("click", function () {
		let seleccion = document.createRange();
		seleccion.selectNodeContents(urlShort);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(seleccion);
		let res = document.execCommand("copy");
		window.getSelection().removeRange(seleccion);
		this.textContent="Copied!"
	});
	urlLong.textContent = url;
	urlShort.textContent = shortUrl;
	div.insertAdjacentElement("afterbegin", copy);
	div.insertAdjacentElement("afterbegin", urlShort);
	element.insertAdjacentElement("afterbegin", div);
	element.insertAdjacentElement("afterbegin", urlLong);
	list.insertAdjacentElement("afterbegin", element);
}

//###############################################
async function cortarUrl(form) {
	event.preventDefault();
	let url = form.url.value;
	if(url!=""){
		let myInit = { method: "GET", mode: "cors", cache: "default" };
		let myRequest = new Request(
			"https://api.shrtco.de/v2/shorten?url=" + url,
			myInit
	);

	await fetch(myRequest)
		// Handle success
		.then((response) => response.json()) // convert to json
		.then((json) => crearUrl(url, json.result.full_short_link)) //print data to console
		.catch((err) => console.log("Request Failed", err)); // Catch errors
	}
	else{
		let inputUrl = document.querySelector("#url");
		inputUrl.setAttribute("class", "error-input")
	}
}
