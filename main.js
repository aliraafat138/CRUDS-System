let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let create = document.getElementById('create');
let category = document.getElementById('category');
let count = document.getElementById('count');
let tbody = document.getElementById('tbody');
let mod = 'create';
let tmp;
let searchType = 'title';

function getTotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value) - +discount.value;
        total.style.background = 'bisque';
        total.innerHTML = result;
    } else {
        total.style.background = 'red';
        total.innerHTML = '';

    }

}
getTotal()

let dataProduct = [];
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

create.onclick = function() {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value,
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mod === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tmp] = newProduct;
            mod = 'create';
            create.innerHTML = 'create';

        }
        clearData()
    }


    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData()

}

function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `<tr>
        <td>${i+1}</td>
          <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td> <button onclick="updateData(${i})"  id="update" >update</button></td>
        <td> <button onclick="deleteData(${i})" id="delete" > delete</button></td>
    </tr>`
    }
    tbody.innerHTML = table;
    getTotal()
    if (dataProduct.length > 0) {
        let deleteAll = document.getElementById('deleteAll');

        deleteAll.innerHTML = ` <button  onclick="deleteAll()"  > deleteAll(${dataProduct.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}
showData()

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    getTotal();
    category.value = '';
    count.value = '';
}

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}

function deleteAll() {
    dataProduct.splice(0);
    localStorage.clear();
    showData()
}

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.value = dataProduct[i].count;
    mod = 'update';
    create.innerHTML = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
    showData()

}

function searchMod(id) {
    let search = document.getElementById('search');
    if (id == "searchTitle") {
        searchType = 'title';

    } else {
        searchType = 'category';


    }
    search.placeholder = 'search' + searchType;

    search.focus()
    search.value = '';
    showData()



}

function search(value) {
    let table = '';
    if (searchType == 'title') {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value)) {
                table += `  <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td> <button  id="update" onclick="updateData(${i})">update</button></td>
                <td> <button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>`
            }
        }
    } else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value)) {
                table += `  <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td> <button  id="update" onclick="updateData(${i})">update</button></td>
                        <td> <button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>`
            }
        }

    }
    tbody.innerHTML = table;

}