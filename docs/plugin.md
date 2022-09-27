[Readme.md](../README.md) | [平台差异对比](./difference.md) | [阿里字体图标](./iconfont.md) | 项目插件

手势

* react-native-gesture-handler

状态管理

* @reduxjs/toolkit
* react-redux

本地存储

* @react-native-async-storage/async-storage

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

轮播图2.10.0版本及以上，启动项目时会进行下载boost_1_76_0.tar.gz(下载极慢，所以项目写死版本号为2.9.1)，2.10.0版本如下：

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

* react-native-linear-gradient

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

配置tsconfig.json(直接拿的create-react-app的官方配置)
```
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
}
```