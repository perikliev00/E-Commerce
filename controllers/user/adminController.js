const path = require('path');

exports.getAdmin = async (req, res, next) => {
        try {
            const filePath = path.join(__dirname, '../../public/views', 'admin-panel.html');
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    };
