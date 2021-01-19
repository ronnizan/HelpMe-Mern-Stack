const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});
const sendSms = (
  phoneNumber,
  userAcceptedName,
  postId,
  sendSmsOnPostPeopleNeededReached
) => {
  const from = 'HelpME';
  const to = phoneNumber;

  let text = `Great news! we would like to inform you that ${userAcceptedName} has accepted  your post! to the post page: http://localhost:3000/post/${postId} `;
  if (sendSmsOnPostPeopleNeededReached) {
    text = `Great news! we would like to inform you that the number of people needed in your post demands has reached! to the post page: http://localhost:3000/post/${postId} `;
  }
  const opts = {
    type: 'unicode',
  };

  vonage.message.sendSms(from, to, text, opts, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === '0') {
        console.log('Message sent successfully.');
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]['error-text']}`
        );
      }
    }
  });
};

module.exports = sendSms;
