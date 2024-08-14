import gravatar from 'gravatar';

const options = {
  protocol: 'http',
  s: 200,
};

const baseEmail = process.env.GRAVATAR_EMAIL;

const createAvatar = email => gravatar.url((email = baseEmail), options);

export default createAvatar;
