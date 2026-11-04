import { loadConfig } from './config.mjs';
import { createApplication } from './app.mjs';
const config=loadConfig();const application=createApplication(config);
application.server.listen(config.port,config.host,()=>console.log(JSON.stringify({event:'listening',port:config.port})));
for(const signal of ['SIGTERM','SIGINT'])process.once(signal,async()=>{await application.close();process.exit(0);});
