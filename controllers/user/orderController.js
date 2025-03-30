const path = require('path');
exports.getOrderDetails = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'order-details.html');
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}