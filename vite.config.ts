import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//     host:"192.168.2.196",
//     port: 9002
//   }
// })


export default defineConfig({
  plugins: [react()],
  server:{
    host:"10.0.0.54",
    port: 9002
  }
})