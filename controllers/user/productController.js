const path = require('path');
const Home = require('../../models/Home');

exports.getHome = async (req, res, next) => {
    console.log(req.session.user);
    try {
        res.sendFile(path.join(__dirname, '../../public/views', 'index.html'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getCpus = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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

exports.getCooling = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
        res.sendFile(filePath, ( err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getRam = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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

exports.getCores = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        }
        )
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
exports.getOtherParts = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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

exports.getGraphicsCard = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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
exports.getStorage = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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
exports.getPowerSupply = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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
exports.getPcCases = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'section.html');
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
exports.getProductDetails = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../../public/views', 'product-details.html');
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
