function showMessage(message, isError = false) {
    const messageBox = document.createElement('div');
    messageBox.style.position = 'fixed';
    messageBox.style.top = '20px';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translateX(-50%)';
    messageBox.style.padding = '10px 20px';
    messageBox.style.backgroundColor = isError ? '#ff4c4c' : '#4caf50';
    messageBox.style.color = 'white';
    messageBox.style.borderRadius = '5px';
    messageBox.style.zIndex = '1000';
    messageBox.textContent = message;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.querySelector('#add-product-form');
    if (!form) {
        console.error('Форма не найдена!');
        return;
    }

    const formData = new FormData(form);

    fetch('../php/submit_product.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            showMessage(data.message, true);
        } else if (data.status === 'success') {
            showMessage(data.message, false);
            setTimeout(() => {
                window.location.href = '../html/my-products.html';
            }, 3000);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        showMessage('Произошла ошибка при добавлении товара.', true);
    });
}

window.onload = function() {
    const form = document.querySelector('#add-product-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Форма не найдена!');
    }
};
