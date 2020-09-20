// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['blog', 'followers', 'followings', 'projects'],
        // singleTypes: ['general'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    StrapiFollowings: [
      {
        path: '/following/:id',
        component: './src/templates/Socialdetail.vue'
      }
    ],
    StrapiFollowers: [
      {
        path: '/follower/:id',
        component: './src/templates/Socialdetail.vue'
      }
    ],
    StrapiBlog: [
      {
        path: '/vblog/:id',
        component: './src/templates/Vblogdetail.vue'
      }
    ],
    StrapiProjects: [
      {
        path: '/project/:id',
        component: './src/templates/Projectdetail.vue'
      }
    ]
    // StrapiTag: [
    //   {
    //     path: '/tag/:id',
    //     component: './src/templates/Tag.vue'
    //   }
    // ]
  }
}
