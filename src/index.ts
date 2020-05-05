import app from './App';
import CONFIG from './config/config';

const PORT = CONFIG.PORT;
const server = require('http').createServer(app);
server.listen(PORT, (err: any) => {
  if (err) {
    return console.log(err);
  }
  console.log(CONFIG.DB_URL);
  const hostName = server.address().address;
  console.log(`Server is listening on ${hostName}:${PORT}`);
});
