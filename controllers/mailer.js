const nodemailer = require('nodemailer');


const mailer = {};

mailer.send = (req,res) => {
    console.log(req.body);
    const bodyHTML = `
    <h4>Mensaje de: ${req.body.name} Email: ${req.body.mail}</h4>
    <p>${req.body.msg}</p>
    `;
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'kayli.collins22@ethereal.email',
            pass: 'BrvUJKMwqpzf6fhTjU'
        }
    });

    var mailOptions = {
        from: req.body.mail,
        to: 'silent90s@gmail.com',
        subject: req.body.subject,
        text: bodyHTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {
            res.status(500).json({
                message: 'Ha ocurrido un error',
            });        
        } else {
            res.status(200).json({
                message: 'Mensaje enviado correctamente',
            });        } 
    });

};

module.exports = mailer;