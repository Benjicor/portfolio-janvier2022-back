require("dotenv").config();

const emailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const path = require("path");
const nodemailerHbs = require("nodemailer-express-handlebars");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD } = process.env;

// Configuration de nodemailer pour lui dire quelle boîte il utilise
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL_ADDRESS,
    pass: SENDER_EMAIL_PASSWORD,
  },
});

emailRouter.get("/", (req, res) => {
  res.send("Bonjour email routes");
});

// Envoie de mail avec du texte
// Penser à retirer le "async" si utilisation de la première méthode en commentaire sans le "try/catch"
emailRouter.post("/text", async (req, res) => {
  const { email, firstname, lastname } = req.body;

  // Configuration du mail
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: email,
    subject: `Test envoie d'email text avec Gmail de ${firstname} ${lastname}`,
    text: "C'est juste un test",
  };

  //  On envoie le mail
  // transport.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.send("Email envoyé avec succés !!!");
  //   }
  // });
  try {
    await transport.sendMail(mailOptions);
    res.send("Email envoyé avec succés !!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Envoie de mail avec du html
// Penser à retirer le "async" si utilisation de la première méthode en commentaire sans le "try/catch"
emailRouter.post("/html", async (req, res) => {
  const { email, firstname, lastname, message } = req.body;

  // Configuration du mail avec du HTML
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: email,
    // cc: 'Email en copie'
    // bcc: 'Email en copie cachée'
    subject: `Test envoie d'email avec du HTML`,
    // text: "C'est juste un test",
    html: `<p><span>Firstname: </span>${firstname}</p><br /><p><span>Lastname: </span>${lastname}</p><br /><p><span>Message: </span>${message}</p><br />`,
  };

  //  On envoie le mail
  // transport.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.send("Email envoyé avec succés !!!");
  //   }
  // });
  try {
    await transport.sendMail(mailOptions);
    res.send("Email envoyé avec succés !!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Envoie de mail avec du html et un fichier
// Penser à retirer le "async" si utilisation de la première méthode en commentaire sans le "try/catch"
emailRouter.post("/html-and-file", async (req, res) => {
  const { email, firstname, lastname, message } = req.body;

  // Configuration du mail avec du HTML et une image
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: email,
    // cc: 'Email en copie'
    // bcc: 'Email en copie cachée'
    subject: `Test envoie d'email avec du HTML et un fichier`,
    // text: "C'est juste un test",
    html: `<p><span>Firstname: </span>${firstname}</p><br /><p><span>Lastname: </span>${lastname}</p><br /><p><span>Message: </span>${message}</p><br />`,
    attachments: [
      {
        filename: "Speed-Triple.jpg",
        path: path.join(__dirname, "../../public/images/Speed-Triple-1050.jpg"),
      },
    ],
  };

  //  On envoie le mail
  // transport.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.send("Email envoyé avec succés !!!");
  //   }
  // });
  try {
    await transport.sendMail(mailOptions);
    res.send("Email envoyé avec succés !!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Envoie de mail avec hbs template et un fichier
// Penser à retirer le "async" si utilisation de la première méthode en commentaire sans le "try/catch"
emailRouter.post("/hbs-and-file", async (req, res) => {
  const { email, firstname, lastname, subject, message } = req.body;

  // Configuration du mail avec du hbs et une image
  const mailOptions = {
    from: email,
    to: SENDER_EMAIL_ADDRESS,
    cc: email,
    // bcc: 'Email en copie cachée'
    subject: `Bonjour je suis ${firstname} ${lastname} et vous contact depuis votre Portfolio`, // Envoie d'email avec une template hbs
    // text: "C'est juste un test",
    attachments: [
      {
        filename: "Speed-Triple.jpg",
        path: path.join(__dirname, "../../public/images/Speed-Triple-1050.jpg"),
        cid: "Speed-Triple.jpg",
      },
    ],
    template: "index",
    context: {
      src: "Speed-Triple.jpg",
      alt: "Photo Speed Triple 1050",
      firstname,
      lastname,
      email,
      subject,
      message,
    },
  };

  //  On envoie le mail
  // transport.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.send("Email envoyé avec succés !!!");
  //   }
  // });

  // Configuration de nodemailer pour utiliser un template hbs
  transport.use(
    "compile",
    nodemailerHbs({
      viewEngine: {
        extName: ".hbs",
        partialsDir: path.join(__dirname, "../views"),
        layoutsDir: path.join(__dirname, "../views/layouts"),
        defaultLayout: "",
      },
      viewPath: path.join(__dirname, "../views"),
      extName: ".hbs",
    }),
  );

  try {
    await transport.sendMail(mailOptions);
    res.send("Email envoyé avec succés");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = emailRouter;
