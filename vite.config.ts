// vite.config.js
import path from 'path'
import { partytownVite } from '@builder.io/partytown/utils'

export default ({ command }) => ({
  build: {
    plugins: [
      partytownVite({
        dest: path.join(__dirname, 'dist', '~partytown'),
      }),
    ],
  },
})
