// console.log("Script connection established");
let cartItemCount = 0;
let itemsTotalPrice = 0;
let itemsTotalPriceWithDiscount = 0;
let discountAmount = 0;
const discount = 0.2;
const couponCode = "SELL200";

function setValueById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerHTML = `${value}TK`;
}

const allItems = document.querySelectorAll('.item');

for (const item of allItems) {
    item.addEventListener('click', function () {
        // console.log(this.lastElementChild.lastElementChild.innerText.split(' ')[0]);
        // console.log(this.querySelector('h2').innerText);
        const itemName = this.querySelector('h2').innerText;
        const itemsContainer = document.getElementById('cart-list-container');
        const li = document.createElement('li');
        li.classList.add('font-medium', 'text-2xl',)
        li.innerHTML = `
            ${++cartItemCount}. ${itemName}
        `
        itemsContainer.appendChild(li);
        const itemPriceString = this.lastElementChild.lastElementChild.innerText.split(' ')[0];
        const itemPrice = parseFloat(itemPriceString);
        itemsTotalPrice += itemPrice;
        itemsTotalPriceWithDiscount = itemsTotalPrice;
        if (itemsTotalPrice >= 200) {
            document.getElementById('coupon-apply-btn').removeAttribute('disabled')
            document.getElementById('coupon-apply-btn').addEventListener('click', applyCoupon);
        }
        if (itemsTotalPrice > 0) {
            document.getElementById('purchase-btn').removeAttribute('disabled')
        }
        setValueById('total-price', itemsTotalPrice.toFixed(2));
        setValueById('total-after-discount', itemsTotalPriceWithDiscount.toFixed(2))
    })
}

function applyCoupon(e) {
    const couponField = e.target.parentElement.children[0];
    const couponFieldValue = couponField.value;
    couponField.value = '';
    if (couponFieldValue === couponCode) {
        discountAmount = itemsTotalPrice * discount;
        itemsTotalPriceWithDiscount = itemsTotalPrice - discountAmount;
        setValueById('total-price', itemsTotalPrice.toFixed(2));
        setValueById('discount-amount', discountAmount.toFixed(2));
        setValueById('total-after-discount', itemsTotalPriceWithDiscount.toFixed(2))
    }
}

function clearCart() {
    const itemsContainer = document.getElementById('cart-list-container');
    itemsContainer.innerText = '';
    cartItemCount = 0;
    itemsTotalPrice = 0;
    itemsTotalPriceWithDiscount = 0;
    discountAmount = 0;
    document.getElementById('coupon-apply-btn').setAttribute('disabled', 'true')
    document.getElementById('purchase-btn').setAttribute('disabled', 'true')
    setValueById('total-price', itemsTotalPrice.toFixed(2));
    setValueById('discount-amount', discountAmount.toFixed(2));
    setValueById('total-after-discount', itemsTotalPriceWithDiscount.toFixed(2))
}