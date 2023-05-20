import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import { getPackagesSync } from '@lerna/project'; 
import vue from 'rollup-plugin-vue'
//获取当前packages目录下的所有package.json
const inputs = getPackagesSync().map(pck => pck.name).filter(name => name.includes('@tp-ui'));
export default {
    input: path.resolve(__dirname, `./packages/tp-ui/index.ts`),
    output: {
        format: 'es',
        file: `lib/index.esm.js`,
    },
    plugins: [
        nodeResolve(),
        vue({
            target: 'browser'
        }),
        typescript({
           exclude: [// 默认调用tscofig.json  自动生成声明文件
               'node_modules',
               'website'
           ]
        })
    ],
    external(id) { // 排除vue本身
        return /^vue/.test(id)
    },
}