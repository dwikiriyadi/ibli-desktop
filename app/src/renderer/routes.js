export default [
  {
    path: '/',
    name: 'ibli',
    component: require('components/Ibli'),
    children: [
      {
        path: 'pinjam',
        component: require('components/Pinjam')
      },
      {
        path: 'kembalikan',
        component: require('components/Kembalikan')
      },
      {
        path: 'login',
        component: require('components/Login')
      },
      {
        path: 'about',
        component: require('components/Tentang')
      }
    ]
  },  
  {
    path: '/dashboard',
    name: 'dashboard',
    component: require('components/Dashboard'),
    children: [
        {
          path: 'laporan',
          component: require('components/pages/Laporan')
        },
        {
          path: 'user',
          component: require('components/pages/User'),
        },
        {
          path: 'barang',
          component: require('components/pages/Barang')
        },
        {
          path: 'peminjaman',
          component: require('components/pages/Peminjaman')
        },
        {
          path: 'perawatan',
          component: require('components/pages/Perawatan')
        },
        {
          path: '/dashboard',
          redirect: '/dashboard/user'
        }
      ]
  },
  {
    path: '/print',
    name: 'print',
    component: require('components/Print'),
    props: {
      
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]
