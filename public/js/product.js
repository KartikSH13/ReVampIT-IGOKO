function displayProduct() {
  const data = JSON.parse(localStorage.getItem('product-data'));
  if (data.length <= 0) {
    return;
  }
  changeData(data);
}
function changeData(data) {
  const root = document.getElementById("root")
  root.innerHTML = ''
  data.forEach(e => {
    root.innerHTML += `<div class="wrapper">
    <div class="product-img">
      <img src="/image${e.image_id}" height="420" width="327">
    </div>
    <div class="product-info">
      <div class="product-text">
        <h1>${e.name}</h1>
        <p>${e.description}</p>
      </div>
      <div class="product-price-btn">
        <p><span>${e.price}</span>₹</p>
        <button type="button">buy now</button>
      </div>
    </div>
  </div>`

  });
}