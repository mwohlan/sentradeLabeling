import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Unocss from 'unocss/vite'
import { presetUno,presetIcons,presetAttributify } from 'unocss'



export default defineConfig(
  {
  plugins: [vue({

    reactivityTransform: true,

  }),
      Unocss({
        presets: [
          presetUno(),
          presetIcons({
            prefix: 'i-',
            extraProperties: {
              display: 'inline-block'
            }
          }),
          presetAttributify()
      ]
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  server: {
    open: false,
    },

})
