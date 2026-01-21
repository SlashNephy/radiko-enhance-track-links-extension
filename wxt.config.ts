import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    web_accessible_resources: [
      {
        matches: ['https://radiko.jp/*'],
        resources: ['listen_on_spotify.png'],
      },
    ],
  },
})
