
const ApRoutes = [
    { path: '/' },
    { path: '/about' },
    { path: '/contact' },
    { path: '/products/:id', dynamic: { id: ['1', '2', '3'] } }, // Routes dynamiques
  ];

  export default ApRoutes;
