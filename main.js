let products = [];

// Adds product to products array in code and displays up-to-date table
function addProduct() {

    if (!validateInput()) return;

    // Create object of product
    const newProduct = {
        productName: document.getElementById("productName").value,
        productPrice: document.getElementById("productPrice").value,
        productCategory: document.getElementById("productCategory").value,
        productImageLink: document.getElementById("productImageLink").value
    };

    // Add the new product to the product array
    products.push(newProduct);
    
    displayTable();

    // Reset form
    document.getElementById("addProductForm").reset();
    document.getElementById("errorMessage").innerText = "";

}

// Displays the up-to-date products table on HTML page
function displayTable() {
    // Initialize html string as empty
    let html = "";
    
    // Iterate over every product in our array (using destructuring syntax to access index so I can send it as a parameter to deletion function)
    for(let [index, product] of products.entries()) {
        // Add to html a table row with the current product fields
        html += `<tr>
                    <td>${product.productName}</td>
                    <td>${product.productPrice}</td>
                    <td>${product.productCategory}</td>
                    <td><img src="${product.productImageLink}" alt="${product.productName}" height="100"></td>
                    <td><button onclick=deleteProduct(${index})>X</button></td>
                </tr>
        `;
    }
    
    // Replace table body on HTML with the up-to-date products table
    document.getElementById("productsTable").innerHTML = html;
}

// Deletes a product from products array (based on index) and displays up-to-date table
function deleteProduct(index) {

    // Delete the product from the array using splice method
    products.splice(index, 1);

    displayTable();
}

// Validates that all input fields were filled
function validateInput() {
    
    // Get all the input objects that need to be validated - marked in HTML with class="productInputField"
    let validationObjs = document.getElementsByClassName("productInputField");
    
    // Iterate over the input objects to be validated
    for (let obj of validationObjs) {
        
        // Check if current object is empty
        if(obj.value === "")
        {
            // Get name of input missing - get the substring from the index at end of "product" since all ids of inputs start with "product"
            let inputName = obj.id.substring("product".length);

            // Better more accurate way thought of after exam - using query selector to search for label text
            // let inputName = document.querySelector("label[for='" + obj.id + "']").innerText;
            
            // Set the error message appropriately so user will know what is wrong
            document.getElementById("errorMessage").innerText = "Error! Please fill in " + inputName;
            // Stylise error message red to draw user's attention
            document.getElementById("errorMessage").style.color = "red";
            
            // End function since validation is complete as containing an error
            return false;
        }
    }

    // If finished loop without returning false, validation is complete and no errors
    return true;
}