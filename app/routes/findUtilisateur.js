const { util } = require('../sequelize')


module.exports = (app) =>{
    app.post('/findUtilisateur', (req, res) =>{
        console.log(req.body);
        const login = req.body.username;
        const password = req.body.password;
        util.findOne({
            where: {
                login,
                password
              },
        }).then((data)=>{
             console.log(data);
             res.json(data);
        })
    })
}