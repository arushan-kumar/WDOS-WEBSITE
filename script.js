document.addEventListener('DOMContentLoaded', () => {
    const itemPrices = {
        'apple': 3,
        'banana': 2,
        'orange': 4,
        'grape': 5,
        'pear': 4.5,
        'kiwi': 6,
        'carrot': 1,
        'broccoli': 2,
        'spinach': 3,
        'potato': 0.5,
        'onion': 1.5,
        'pepper': 2.5,
        'milk': 1.5,
        'cheese': 25,
        'butter': 20,
        'yogurt': 4,
        'cream': 12,
        'icecream': 12,
        'chicken': 8,
        'beef': 10,
        'salmon': 12,
        'shrimp': 15,
        'fish': 10,
        'pork': 18,
        'flour': 2,
        'sugar': 1.5,
        'salt': 0.5,
        'baking_powder': 30,
        'vanilla': 100,
        'olive_oil': 8
    };

    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // Add Item button event listener
    document.querySelectorAll('section button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('section');
            const select = section.querySelector('select');
            const quantityInput = section.querySelector('input[type="number"]');
            const selectedItem = select.options[select.selectedIndex];
            const itemName = selectedItem.value;
            const itemText = selectedItem.text;
            const quantity = parseFloat(quantityInput.value);

            if (quantity > 0) {
                addItemToTable(itemText, quantity, itemPrices[itemName] * quantity);
                updateTotalPrice();
            }

            quantityInput.value = '';
        });
    });

    function addItemToTable(name, quantity, price) {
        const tableBody = document.querySelector('#items-table tbody');
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = name;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = `${quantity} kg`;

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${price.toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        tableBody.appendChild(row);
    }

    function updateTotalPrice() {
        const tableBody = document.querySelector('#items-table tbody');
        let totalPrice = 0;

        tableBody.querySelectorAll('tr').forEach(row => {
            const priceCell = row.children[2];
            const price = parseFloat(priceCell.textContent.replace('$', ''));
            totalPrice += price;
        });

        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Save Favourites to Local Storage
    document.getElementById('add-to-favourites').addEventListener('click', () => {
        favourites = [];
        const tableBody = document.querySelector('#items-table tbody');
        tableBody.querySelectorAll('tr').forEach(row => {
            const name = row.children[0].textContent;
            const quantity = parseFloat(row.children[1].textContent.replace(' kg', ''));
            const price = parseFloat(row.children[2].textContent.replace('$', ''));
            favourites.push({ name, quantity, price });
        });
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Items added to favourites!');
    });

    // Apply Favourites from Local Storage
    document.getElementById('apply-favourites').addEventListener('click', () => {
        const tableBody = document.querySelector('#items-table tbody');
        tableBody.innerHTML = ''; // Clear the table before applying favourites

        favourites.forEach(item => {
            addItemToTable(item.name, item.quantity, item.price);
        });
        updateTotalPrice();
    });

    // Redirection after checking if items are selected
    function redirectpage() {
        const tableBody = document.querySelector('#items-table tbody');
        if (tableBody.querySelectorAll('tr').length === 0) {
            alert('Please add items to your cart before proceeding.');
        } else {
            cartitems = [];
            tableBody.querySelectorAll('tr').forEach(row => {
                const name = row.children[0].textContent;
                const quantity = parseFloat(row.children[1].textContent.replace(' kg', ''));
                const price = parseFloat(row.children[2].textContent.replace('$', ''));
                cartitems.push({ name, quantity, price });
            });
            localStorage.setItem('cartitems', JSON.stringify(cartitems));
            window.location.href = "ordersummarypage.html";
        }
    }

    const Buy_now = document.getElementById("buy-now");
    Buy_now.addEventListener("click", redirectpage);
});
