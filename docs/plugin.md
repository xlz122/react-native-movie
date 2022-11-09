[Readme.md](../README.md) | [平台差异对比](./difference.md) | [阿里字体图标](./iconfont.md) | 项目插件

手势

* react-native-gesture-handler

持久化状态管理(redux + 本地存储 + redux-persist)

* @reduxjs/toolkit
* react-redux
* @react-native-async-storage/async-storage
* redux-persist

路由

* @react-navigation/native
* @react-navigation/stack
* react-native-safe-area-context
* react-native-screens

tab导航

* @react-navigation/bottom-tabs

轮播图

* react-native-reanimated
* react-native-reanimated-carousel

配置babel.config.js
```
plugins: ['react-native-reanimated/plugin']
```

轮播图2.10.0版本，启动项目时会进行下载boost_1_76_0.tar.gz(下载极慢，所以需使用2.10.0版本以上)，2.10.0版本示例如下：

```
> Task :react-native-reanimated:downloadGlog FAILED
<===========--> 85% EXECUTING [4m 37s]
> IDLE
> IDLE
> IDLE
> IDLE
> :react-native-reanimated:downloadBoost > boost_1_76_0.tar.gz > 77.67 MB/124.24 MB downloaded
```

渐变背景色

* react-native-linear-gradient(app端)
* react-native-web-linear-gradient(web端)

打开外部网页

* react-native-webview

路径别名

* babel-plugin-module-resolver

配置babel.config.js

```
[
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    alias: {
      '@': ['./src']
    }
  }
]
```

配置tsconfig.json(可直接拿create-react-app的官方配置)

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```