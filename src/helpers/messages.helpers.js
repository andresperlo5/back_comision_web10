const transporter = require("./nodemailer.helpers");

const registroExitoso = async (userEmail, userName) => {
  const info = await transporter.sendMail({
    from: `"Comision-web-10" <${process.env.GMAIL_USER}>`,
    to: `${userEmail}`,
    subject: `Bienvenido  ${userName} ✔`,
    text: "En breve podras ingresar a esta pagina web que transformara tu vida", // plain‑text body
    html: `
    <img src="https://i.pinimg.com/originals/37/1a/c8/371ac843551c2f299675c76d510eab62.gif" alt="gif1">
    <h1>Gracias por ser parte de esta comunidad</h1>
    
    `, // HTML body
  });

  console.log(info);

  return {
    info: info.response.includes("OK"),
    rejected: info.rejected,
  };
};

module.exports = {
  registroExitoso,
};
