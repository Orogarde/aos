module.exports = (app) =>{
const path = require('path');
const base64Img = require('base64-img');
app.post('/upload', (req, res) => {
  const {visuFinal} = req.body[0];
  const name = req.body[1].replace(/\..+$/, '');
  base64Img.img(visuFinal, './public/', name ,function(err, filepath) {
    const pathArr = filepath.split('/')
    const fileName = pathArr[pathArr.length - 1];
    console.log(fileName);

    res.status(200).json({
      success: true,
    })
  });
});
}