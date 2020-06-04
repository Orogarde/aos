const { profil_aos} = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteProfil', (req, res) =>{
        const profilAos = req.body; 
        console.log(profilAos);
        profil_aos.destroy({
           where: {
                profilId: profilAos.profilIdSup,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}