import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  base: "https://mpaccione.github.io/fetch-take-home/", // for deployment 
  plugins: [react(), svgr()],
})
