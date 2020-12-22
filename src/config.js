module.exports = {
  routing: [
    {
      path: '/people',
      name: 'People',
    },
    {
      path: '/channels',
      name: 'Groups',
    },
    {
      path: '/about',
      name: 'About',
    },
  ],
  API_BASE: 'https://dev-ed-messenger-server-dev.herokuapp.com',
  // API_BASE: 'http://localhost:8080',
  WS_BASE: 'https://dev-ed-messenger-server-dev.herokuapp.com/ws',
  // WS_BASE: 'http://localhost:8080/ws',
};
