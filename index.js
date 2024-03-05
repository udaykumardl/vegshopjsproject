// Function to handle form submission
document.getElementById('addForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const vegetablename = document.getElementById('vegetablename').value;
    const vegetableprice = parseFloat(document.getElementById('vegetableprice').value);
    const vegetablequantity = parseFloat(document.getElementById('vegetablequantity').value);

    const obj = {
      vegetablename,
      vegetableprice,
      vegetablequantity
    };

    // Example: POST request to add vegetable to the server
    axios.post("https://yourapi.com/api/vegetables", obj)
      .then((response) => {
        showVegetableOnScreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
}

// Function to display vegetable on screen
function showVegetableOnScreen(vegetable) {
    const vegetableList = document.getElementById('vegetableList');
    const listItem = document.createElement('li');
    listItem.textContent = `${vegetable.vegetablename} - Rs ${vegetable.vegetableprice} - ${vegetable.vegetablequantity} kg`;

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', () => buyVegetable(vegetable._id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteVegetable(vegetable._id));

    listItem.appendChild(buyButton);
    listItem.appendChild(deleteButton);

    vegetableList.appendChild(listItem);
}

// Function to simulate buying a vegetable
function buyVegetable(id) {
    // Example: GET request to simulate buying a vegetable
    axios.get(`https://yourapi.com/api/vegetables/${id}`)
      .then((response) => {
        console.log(`Bought vegetable with ID: ${id}`);
        // You can update the quantity on the screen or perform any other action after buying
      })
      .catch((error) => {
        console.log("Error simulating buying vegetable:", error);
      });
}

// Function to delete a vegetable
function deleteVegetable(id) {
    // Example: DELETE request to delete a vegetable from the server
    axios.delete(`https://yourapi.com/api/vegetables/${id}`)
      .then((response) => {
        removeVegetableFromScreen(id);
      })
      .catch((error) => {
        console.log("Error deleting vegetable:", error);
      });
}

// Function to remove vegetable from screen
function removeVegetableFromScreen(id) {
    const listItem = document.getElementById(id);
    if (listItem) {
      listItem.remove();
    }
}
