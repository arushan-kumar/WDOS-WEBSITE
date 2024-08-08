document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart items from localStorage
    const orderItems = JSON.parse(localStorage.getItem('cartitems'));
    const totalPrice = localStorage.getItem('totalPrice');

    // Check if there are any items in cart and populate the table
    if (orderItems && orderItems.length > 0) {
        const tableBody = document.querySelector('#items-table tbody');

        orderItems.forEach(item => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity + (item.name.includes('kg') ? ' kg' : ' qty');

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            tableBody.appendChild(row);
        });

        document.getElementById('total-price').textContent = `$${parseFloat(totalPrice).toFixed(2)}`;
    }
});

function confirmOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation for required fields
    if (!name || !email || !address || !paymentMethod) {
        alert("Please fill out all required fields.");
        return;
    }

    // Email validation (HTML5 will also validate this, but it's good to double-check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Payment method specific validation
    if (paymentMethod.value === 'card') {
        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill out all card details.");
            return;
        }

        // Validate card number (16 digits)
        const cardPattern = /^\d{16}$/;
        if (!cardPattern.test(cardNumber)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        // Validate CVV (3 digits)
        const cvvPattern = /^\d{3}$/;
        if (!cvvPattern.test(cvv)) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }

        // Validate expiry date
        const currentDate = new Date();
        const expiryDateObj = new Date(expiryDate);
        if (expiryDateObj < currentDate) {
            alert("The expiry date must be in the future.");
            return;
        }
    }

    // If all validations pass
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    document.getElementById('confirmation-message').innerHTML = 
        `Thank you, ${name}, for your purchase! Your order will be delivered on <strong>${deliveryDate.toDateString()}</strong>.`;
}
