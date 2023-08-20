const visitorApi = {
	saveVisitorHome: 'http://localhost:3000/visitor/save/home',
	saveVisitorCareer: 'http://localhost:3000/visitor/save/career',
	saveVisitorProduct: 'http://localhost:3000/visitor/save/product',
	showVisitor: 'http://localhost:3000/visitor/show'
}
var VisitorAPI = function (t, e, a) {
	var s = new XMLHttpRequest;
	s.onreadystatechange = function () {
		var t;
		s.readyState === XMLHttpRequest.DONE && (200 === (t = JSON.parse(s.responseText)).status ? e(t.data) : a(t.status, t.result))
	},
		s.open("GET", "https://api.visitorapi.com/api/?pid=" + t),
		s.send(null)
};
function homeVisitor() {
	VisitorAPI(
		"ZVKAhhtXWYPuD2ytUWe8",
		function (data) {
			fetch(visitorApi.saveVisitorHome, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => response.json()).then(data => console.log(data)).catch(err => {
				console.log(err)
			})
		},
		function (errorCode, errorMessage) { console.log(errorCode, errorMessage) }
	);
}
function careerVisitor() {
	VisitorAPI(
		"ZVKAhhtXWYPuD2ytUWe8",
		function (data) {
			fetch(visitorApi.saveVisitorCareer, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => response.json()).then(data => console.log(data)).catch(err => {
				console.log(err)
			})
		},
		function (errorCode, errorMessage) { console.log(errorCode, errorMessage) }
	);
}
function productVisitor() {
	VisitorAPI(
		"ZVKAhhtXWYPuD2ytUWe8",
		function (data) {
			fetch(visitorApi.saveVisitorProduct, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}).then(response => response.json()).then(data => console.log(data)).catch(err => {
				console.log(err)
			})
		},
		function (errorCode, errorMessage) { console.log(errorCode, errorMessage) }
	);
}
var s=new XMLHttpRequest;
s.onreadystatechange=function(){
	var t;
	if(this.readyState==4 && this.status==200){
		console.log("done");
		console.log(t);
	}else{
		console.log("err");
		console.log(t);
	}
}
s.open("GET",visitorApi.showVisitor)
s.send(null);