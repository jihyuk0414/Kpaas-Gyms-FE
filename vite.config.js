import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // 기본 포트를 3000으로 변경
  },
  plugins: [react()],
})

