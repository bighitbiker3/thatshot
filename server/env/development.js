module.exports = {
  'DATABASE_URL': 'postgres://localhost:5432/thatshot',
  'SESSION_SECRET': 'Optimus Prime is my real dad',
  'TWITTER': {
    'consumerKey': 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    'consumerSecret': 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    'callbackUrl': 'INSERT_TWITTER_CALLBACK_HERE'
  },
  'FACEBOOK': {
    'clientID': 'INSERT_FACEBOOK_CLIENTID_HERE',
    'clientSecret': 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
    'callbackURL': 'INSERT_FACEBOOK_CALLBACK_HERE'
  },
  'GOOGLE': {
    'clientID': 'INSERT_GOOGLE_CLIENTID_HERE',
    'clientSecret': 'INSERT_GOOGLE_CLIENT_SECRET_HERE',
    'callbackURL': 'INSERT_GOOGLE_CALLBACK_HERE'
  },
  'SOUNDCLOUD': {
    'clientID': '2fd5b79e3498c867ce3b817dce252dd2',
    'clientSecret': 'f4aca71f0560950db4ed8c3ae5d1ae19',
    'callbackUrl': 'http://localhost:3000/callback',
    'callbackRoute': '/callback'
  },
  'MAILGUN': {
    'apiKey': 'key-aaa3f71c340b05266e25a7f2da185eea'
  },
  'LOGGING': false
}
