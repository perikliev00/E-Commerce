document.addEventListener("DOMContentLoaded", () => {
    const orderForm = document.getElementById("orderForm");
    orderForm.addEventListener("submit", (event) => {
        alert("Order created successfully!");
    });
});