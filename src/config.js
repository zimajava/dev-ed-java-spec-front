module.exports = {
  routing: [
    {
      path: '/people',
      name: 'People',
    },
    {
      path: '/channels',
      name: 'Channels',
    },
    {
      path: '/about',
      name: 'About',
    },
  ],
  users: [
    {
      name: 'User1',
      isOnline: true,
    },
    {
      name: 'User2',
      isOnline: false,
    },
    {
      name: 'User3',
      isOnline: true,
    },
  ],
  // API_BASE: 'https://nestjs-chat-api.herokuapp.com',
  API_BASE: 'http://localhost:3001',
  // WS_BASE: 'ws://nestjs-chat-api.herokuapp.com',
  WS_BASE: 'ws://localhost:3001',
  IO_BASE: 'http://localhost:3001',
};
