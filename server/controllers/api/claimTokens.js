const fetch = require('node-fetch');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
require('dotenv').config({path: '.env' })

const addresses = []

module.exports = async (req, res, next) => {
    try {
        const data = req.body;
        // if (!await isValidToken(data.token)) {
        //     res.status(401).json({ message: "Error captcha" });
        // }
        console.log(process.env.SECRET_KEY);
        if (addresses.includes(data.address)) {
            res.status(402).json({ message: "Already get tokens." });
            return;
        } else {
            addresses.push(data.address);
        }
        console.log(data);
        const line = await claimToken(data.address);
        console.log(line);
        res.status(200).json({ message: "True" });

    } catch (err) {
        return next(err);
    }
};

async function claimToken(address) {
    const cmd = await exec(`seid tx bank send sei1yv0cjc33480q8kt2ngnpkm090ylls9aqmfneme ${address} 100usei --chain-id=atlantic-1 --node=tcp://88.99.104.186:11301 -y`);
    const data = cmd.stdout.toString().replace('\n');
    if (data.includes('txhash')) {
        for (let line of data) {
            if (line.includes('txhash')) {
                 return line;
             }
        }
    }
}

async function isValidToken(token) {
    const params = new URLSearchParams();
    params.append('secret', process.env.SECRET_KEY)
    params.append('response', token)
    console.log('ok');

    const response = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const json = await response.json();
    const { success } = json;
    return success;
}