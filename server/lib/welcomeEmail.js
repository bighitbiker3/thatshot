const env = require('../env')
const apiKey = env.MAILGUN.apiKey
const domain = 'mail.thatshot.audio'
const mailgun = require('mailgun-js')({ apiKey, domain })

module.exports = (user) => {
  const makeEmail = (address, id, tracks) => {
    return {
      from: 'That\'s Hot <elliott@thatshot.audio>',
      to: address,
      subject: `Welcome to That's Hot!`,
      text: 'Testing some Mailgun awesomness!',
      html: `
  <body bgcolor="#f6f6f6" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0;">
  &#13;
  &#13;
  &#13;
    <table style="width: 100%; margin: 0; padding: 20px;"><tr style="margin: 0; padding: 0;"><td style="margin: 0; padding: 0;"></td>&#13;
      <td bgcolor="#FFFFFF" style="display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0;">
  &#13;
  &#13;
  &#13;
  <div style="max-width: 600px; display: block; margin: 0 auto; padding: 0;">&#13;
  <table style="width: 100%; margin: 0; padding: 0;"><tr style="margin: 0; padding: 0;"><td style="margin: 0; padding: 0;">&#13;
  <h1 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 70px; text-align: center; line-height: 1.2; color: #000; font-style: italic; font-weight: 200; margin: 40px 0 10px; padding: 0;">That's Hot</h1>&#13;
  <h2 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 28px; line-height: 1.2; color: #000; font-weight: 200; margin: 20px 0 20px; padding: 0; text-align: left">
    Yo ${user.username},
    </h2>
    <h2 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 28px; line-height: 1.2; color: #000; font-weight: 200; margin: 20px 0 20px; padding: 0; text-align: left">
    Isn't this hot? Thanks so much for joining! I hope we can find you some amazing tunes from lesser-known artists. Check back daily!
      </h2>
    <h2 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 28px; line-height: 1.2; color: #000; font-weight: 200; margin: 20px 0 20px; padding: 0; text-align: left">
    Hottest Regards,   
      </h2>
      <h2 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 28px; line-height: 1.2; color: #000; font-weight: 200; margin: 20px 0 20px; padding: 0; text-align: left">
      
    Elliott
  </h2>&#13;
 
  <table style="width: 100%; margin: 0; padding: 0;"><tr style="margin: 0; padding: 0;"><td style="margin: 0; padding: 10px 0;">&#13;
  <p style="font-size: 14px; line-height: 1.6; text-align: center; font-weight: normal; margin: 0 0 10px; padding: 0;"><a href="https://thatshot.audio" style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 32px; line-height: 1; color: #FFF; text-decoration: none; font-weight: 100; text-align: center; cursor: pointer; display: inline-block; background-color: black; margin: 0 10px 0 0; padding: 10px;">Listen</a></p>&#13;
  </td>&#13;</div>&#13;
  &#13;
  &#13;
  </td>&#13;
  <td style="margin: 0; padding: 0;"></td>&#13;
  </tr></table><table style="width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="margin: 0; padding: 0;"><td style="margin: 0; padding: 0;"></td>&#13;
  <td style="display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">&#13;
  &#13;
  &#13;
  <div style="max-width: 600px; display: block; margin: 0 auto; padding: 0;">&#13;
  <table style="width: 100%; margin: 0; padding: 0;"><tr style="margin: 0; padding: 0;"><td align="center" style="margin: 0; padding: 0;">&#13;
  <p style="font-size: 12px; line-height: 1.6; color: #666; font-weight: normal; margin: 0 0 10px; padding: 0;">Don't like these annoying emails? <a href='https://localhost:3000/api/users/${id}/unsubscribe' style="color: #999; margin: 0; padding: 0;"><unsubscribe style="margin: 0; padding: 0;">Unsubscribe</unsubscribe></a>.&#13;
  </p>&#13;
  </td>&#13;
  </tr></table></div>&#13;
  &#13;
  &#13;
  </td>&#13;
  <td style="margin: 0; padding: 0;"></td>&#13;
  </tr></table></body>`
    }
  }
  mailgun.messages().send(makeEmail(user.email, user.id), (error, body) => {
    console.log(body, 'body')
    console.log(error, 'err')
  })

}

