const mongoose = require('mongoose');

const Schema = mongoose.Schema;

    const userSchema = new Schema({
        email: { type: String, required: true },
        password: { type: String, required: true },
        cart: {
            items: [
                {
                    title: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    price : {type: Number, required: true},
                }
            ]
        },
        lastActive: { type: Date, default: Date.now }
    }, { collection: 'users' }
)
userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
                    return cp.title.toString() === product.title.toString();
                })
                let newQuantity= 1;
                const updatedCartItems = [...this.cart.items];

                if(cartProductIndex >=0) {
                    newQuantity=this.cart.items[cartProductIndex].quantity + 1;
                    updatedCartItems[cartProductIndex].quantity = newQuantity;
                } else {
                    updatedCartItems.push({title:product.title,quantity: newQuantity,price:product.price});
                }
                const updatedCart = {
                    items: updatedCartItems
                };

                this.cart = updatedCart;
                return this.save()
            }
userSchema.methods.clearCart = function(productId) {    
    this.cart = { items: [] };
    return this.save();
}
userSchema.methods.removeFromCart = function(prodId) {
    this.cart.items = this.cart.items.filter(i => {
        return i._id.toString() !== prodId.toString();
    })
    return this.save();
}
module.exports = mongoose.model('User', userSchema);