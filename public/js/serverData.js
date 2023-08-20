const Api = {
	contactRequest: 'http://localhost:3000/contact/igoko',
	getCategories: 'http://localhost:3000/get/products/categories',
	getProducts: 'http://localhost:3000/get/products/all',
	getDescription: 'http://localhost:3000/get/products/description',
	saveVisitorHome: 'http://localhost:3000/visitor/save/home',
	saveVisitorCareer: 'http://localhost:3000/visitor/save/career',
	saveVisitorProduct: 'http://localhost:3000/visitor/save/product'
}

function loadProduct(category_id) {
	fetch(Api.getProducts, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ category_id: category_id })
	})
		.then(response => response.json())
		.then(data => {
			try {

				localStorage.setItem('product-data', JSON.stringify(data));
				window.location.replace('/product');
			}
			catch (err) {
				window.alert("Internal server error");
			}
		})
		.catch(err => console.log(err));

}

function loadDescription(productId) {
	fetch(Api.getDescription + '/' + productId)
		.then()
		.catch(error => console.log(error));
}

var categoryContainer = document.getElementById("product-container");
function loadCategories() {
	fetch(Api.getCategories)
		.then(response => response.json())
		.then((data) => {
			categoryContainer.innerHTML = ""
			data.forEach(e => {
				categoryContainer.innerHTML += `<div class="card" onclick=loadProduct(${e.category_id})>
					<h1>${e.category_name}</h1>
					<img src='${e.img_id}' alt="">
					<div class="shopnow-box">SHOP NOW <i class="fa fa-arrow-alt-circle-right"></i></div>
					</div>`
			})
		})
		.catch(error => console.log(error));
}