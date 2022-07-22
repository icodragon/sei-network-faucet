const fetch = require('node-fetch');
const { exec } = require("child_process");
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
        await claimToken(data.address);
        res.status(200).json({ message: "True" });

    } catch (err) {
        return next(err);
    }
};

async function claimToken(address) {
    // exec("ls -la", (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // });
}
async function isValidToken(token) {
    const params = new URLSearchParams();
    params.append('secret', process.env.SECRET_KEY)
    params.append('response', token)

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