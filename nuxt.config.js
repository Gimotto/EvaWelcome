const isDev = process.env.NODE_ENV !== 'production'
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  pwa: {
    manifest: {
      lang: 'en',
      name: "EvaWelcome",
      short_name: "EvaWel",
      display: 'standalone',
      theme_color: '#F11010',
    },
    workbox: {
      dev: isDev // Put workbox module into development mode based on current NODE_ENV variable
    }
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/app',
    '@/plugins/vueSignaturePad',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://192.168.2.198:3330/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
