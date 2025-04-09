export default () => ({
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  smtpConfig: {
    smtpDomain: process.env.SMTP_DOMAIN,
    smtpEndpoint: process.env.SMTP_ENDPOINT,
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
  },
  frontendUrl: process.env.FRONTEND_SERVER,
});
