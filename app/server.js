import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
const app = express();

const API_PORT = process.env.API_PORT || 3000;

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(logger('dev'));

require('./routes/findBattletomes')(app);
require('./routes/findUnites')(app);
require('./routes/findModeles')(app);
require('./routes/createUnite')(app);
require('./routes/createModele')(app);
require('./routes/deleteUnite')(app);
require('./routes/updateUnite')(app);
require('./routes/updateModele')(app);
require('./routes/deleteModele')(app);
require('./routes/findUtilisateur')(app);
require('./routes/createBattletome')(app);
require('./routes/deleteBattletome')(app);
require('./routes/updateBattletome')(app);
require('./routes/upload')(app);
app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));

module.exports = app;