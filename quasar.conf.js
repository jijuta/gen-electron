// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'prototype',
      'gen'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QTabs',
        'QRouteTab',
        'QFooter',
        'QAvatar',
        'QSeparator',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QInput',
        'QTree',
        'QMenu',
        'QTimeline',
        'QTimelineEntry',
        'QBtnGroup',
        'QBtnDropdown',
        'QSelect',
        'QExpansionItem',
        'QCheckbox',
        'QTime',
        'QDate',
        'QPopupProxy',
        'QSplitter',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        'QDialog',
        'QOptionGroup',
        'QBanner',
        'QBar',
        'QSpace',
        'QTooltip',
        'QSplitter',
        'QForm'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ]
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    devServer: {
      // https: true,
      port: 9082,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: 'Saesolsoft GenApp',
        short_name: 'Saesolsoft genApp',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'com.saesol.sasolgen',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      //packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      //},
      builder: {

        appId: 'com.saesol.saesolgen2', // 앱아이디
        asar: true, // 소스코드를 asar 포맷으로 압축 여부
        win: { // Windows 옵션
          target: ["zip","nsis"]
        },
        publish: [{
          provider: "github",
          owner: "jijuta",
          releaseType: "release",
          repo: "saesolGen",
          publishAutoUpdate: true
        }],
        nsis: {
          oneClick: false, // nsis 기본 옵션은 원클릭 true
          allowToChangeInstallationDirectory: false, // Directory 변경 옵션
          installerLanguages: [ "en_US","ko_KR"],
          language: "1042"
        },
        directories: {
          buildResources: "resources/installer/",
          output: "build/", // 빌드 후 저장경로
          app: "."
        }
      }
      /*builder: {
        productName: "productTest", // 상품명
        appId: 'saesolgen2', // 앱아이디
        asar: true, // 소스코드를 asar 포맷으로 압축 여부
        protocols: {
          name: "productTest",
          schemes: ["productTest"]
        },
        mac: { // Mac 옵션
          target: [
            "default"
          ],
          icon: "./electron-root/favicon.ico"
        },
        dmg: { // Mac 인스톨 옵션
          title: "tournant",
          icon: "./electron-root/favicon.ico"
        },
        win: { // Windows 옵션
          target: ["zip","nsis"],
          icon: "./electron-root/favicon.ico"
        },
        linux: { // Linux 옵션
          target: [
            "AppImage",
            "deb",
            "rpm",
            "zip",
            "tar.gz"
          ],
          icon: "./electron-root/favicon.ico"
        },
        nsis: {
          oneClick: false, // nsis 기본 옵션은 원클릭 true
          allowToChangeInstallationDirectory: false, // Directory 변경 옵션
          installerLanguages: [
            "en_US",
            "ko_KR"
          ],
          language: "1042"
        },
        directories: {
          buildResources: "resources/installer/",
          output: "build/", // 빌드 후 저장경로
          app: "."
        }
      }*/
    }
  }
}
