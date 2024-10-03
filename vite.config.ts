import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// mock插件提供的方法
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig((command)=>{
  return {
    plugins: [vue(),
      viteMockServe({
        // 保证开发环境可以使用mock接口
        localEnabled: command.mode === 'development', // 或者使用 'serve'
      }),
    // 配置小图标
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    ],
    resolve: { alias: { '@': path.resolve('./src') } },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
