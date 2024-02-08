function handleFormSubmit(event) {
    event.preventDefault();
    const vegetablename = event.target.vegetablename.value;
    const vegetableprice = event.target.vegetableprice.value;
    const vegetablequantity = event.target.vegetablequantity.value;
  
    const obj = {
      vegetablename,
      vegetableprice,
      vegetablequantity
    };
  
    axios.post("https://crudcrud.com/api/46f623d6fb33490eb3816a0319a28695/vegetables", obj)
      .then((response) => {
        showVegetableOnScreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
      });
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/46f623d6fb33490eb3816a0319a28695/vegetables")
      .then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          showVegetableOnScreen(response.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  function showVegetableOnScreen(obj) {
    document.getElementById('vegetablename').value = '';
    document.getElementById('vegetableprice').value = '';
    document.getElementById('vegetablequantity').value = '';
  
    const parentNode = document.getElementById('vegetablelist');
  
    // Format the price
    const formattedPrice = `Rs ${obj.vegetableprice}`;
    const formattedquantity = `kg ${obj.vegetablequantity}`;
  
    const childnode = `<li id=${obj._id}> ${obj.vegetablename}-${formattedPrice}-${formattedquantity}
                      <input type="number" id="quantity_${obj._id}" placeholder="Quantity (kg)" required>
                      <button onclick=BuyVegetable('${obj._id}')>Buy</button>
                      <button onclick=DeleteVegetable('${obj._id}')>Delete</button>
                      </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childnode;
  }
  function BuyVegetable(id) {
    // Retrieve the vegetable details from the server using its ID
    axios.get(`https://crudcrud.com/api/fd57f8642a9d4d7e9be763d67d1638ad/vegetables/${id}`)
      .then((response) => {
        const vegetable = response.data;
        const { vegetablename, vegetableprice, vegetablequantity } = vegetable;
  
        // Perform any necessary actions for buying the vegetable
        // For example, you can update the quantity, notify the user, or process payment
  
        console.log(`Buying ${vegetablename} with ID: ${id}`);
      })
      .catch((error) => {
        console.log("Error retrieving vegetable details:", error);
      });
  }
  
  
  
  function DeleteVegetable(id) {
    axios.delete(`https://crudcrud.com/api/46f623d6fb33490eb3816a0319a28695/vegetables/${id}`)
      .then((res) => {
        removeVegetableFromScreen(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function removeVegetableFromScreen(id) {
    const parentNode = document.getElementById('vegetablelist');
    const ChildNodeToBeRemoved = document.getElementById(id);
    if (ChildNodeToBeRemoved) {
      parentNode.removeChild(ChildNodeToBeRemoved);
    }
  }
  