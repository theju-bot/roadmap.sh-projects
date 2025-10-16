const base64 = require('base-64');

const decodeCredentials = (authHeader) => {
  const encodedCredentials = authHeader // authHeader: Basic YWRtaW46YWRtaW4=
    .trim()
    .replace(/Basic\s+/i, '');
  const decodedCredentials = base64.decode(encodedCredentials);
  return decodedCredentials.split(':');
};

const auth = (req, res, next) => {
  const [username, password] = decodeCredentials(
    req.headers.authorization || ''
  );

  if (username === 'admin' && password === 'admin') {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="user_pages"');
  res.status(401).send('Authentication required.');
};

module.exports = auth;
