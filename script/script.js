let cartItemCount = 0;
let itemsTotalPrice = 0;
let itemsTotalPriceWithDiscount = 0;
let discountAmount = 0;
let isCouponApplied = false;
const discount = 0.2;
const couponCode = "SELL200";

const allItems = document.querySelectorAll('.item');
for (const item of allItems) {
    item.addEventListener('click', function () {
        const itemName = this.querySelector('h2').innerText;
        const itemsContainer = document.getElementById('cart-list-container');
        const li = document.createElement('li');
        li.classList.add('font-medium', 'text-2xl',)
        li.innerHTML = `${++cartItemCount}. ${itemName}`;
        itemsContainer.appendChild(li);
        const itemPriceString = this.lastElementChild.lastElementChild.innerText.split(' ')[0];
        const itemPrice = parseFloat(itemPriceString);
        itemsTotalPrice += itemPrice;
        itemsTotalPriceWithDiscount = itemsTotalPrice;
        if (itemsTotalPrice >= 200) {
            const couponApplyButton = document.getElementById('coupon-apply-btn');
            couponApplyButton.removeAttribute('disabled');
            couponApplyButton.addEventListener('click', applyCoupon);
        }
        if (itemsTotalPrice > 0) {
            document.getElementById('purchase-btn').removeAttribute('disabled');
        }
        if (isCouponApplied) {
            calculateDiscount();
        }
        setValues(itemsTotalPrice, discountAmount, itemsTotalPriceWithDiscount);
    })
}
function setValueById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerHTML = `${value}TK`;
}
function applyCoupon(e) {
    const couponField = e.target.parentElement.children[0];
    const couponFieldValue = couponField.value;
    couponField.value = '';
    if (couponFieldValue === couponCode) {
        isCouponApplied = true;
        if (isCouponApplied) {
            calculateDiscount();
        }
    }
}
function calculateDiscount() {
    discountAmount = itemsTotalPrice * discount;
    itemsTotalPriceWithDiscount = itemsTotalPrice - discountAmount;
    setValues(itemsTotalPrice, discountAmount, itemsTotalPriceWithDiscount)
}
function clearCart() {
    const itemsContainer = document.getElementById('cart-list-container');
    itemsContainer.innerText = '';
    cartItemCount = 0;
    itemsTotalPrice = 0;
    itemsTotalPriceWithDiscount = 0;
    discountAmount = 0;
    isCouponApplied = false;
    document.getElementById('coupon-apply-btn').setAttribute('disabled', 'true')
    document.getElementById('purchase-btn').setAttribute('disabled', 'true')
    setValues(itemsTotalPrice, discountAmount, itemsTotalPriceWithDiscount)
}
function setValues(totalPrice, discountAmount, totalPriceWithDiscount) {
    setValueById('total-price', totalPrice.toFixed(2));
    setValueById('discount-amount', discountAmount.toFixed(2));
    setValueById('total-after-discount', totalPriceWithDiscount.toFixed(2))
}