const path = require('path');

module.exports = {
  getLogin: (req, res) => {
    const filePath = path.join(__dirname, '../../public/views/login.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending login page:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  },
  getRegister: (req, res) => {
    const filePath = path.join(__dirname, '../../public/views/register.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending register page:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  }
};
