# vue-plugin-cli

##说明

vue-plugin-cli 是一款帮助开发者在 npm 快速发布 Vue 组件的库

## 起步

**安装**

```
npm install -g vue-plugin-cli
```

**创建一个项目**

```
vue-plugin tpl my-project
```

## 操作

1.创建项目后，执行`npm i`安装依赖。

2.将自己的 Vue 组件代码拷贝至 src/components/Component.vue 文件中。

3.创建的项目默认有 `development` 和 `production` 两个环境。

4.执行 `npm run dev`会进入 `development`环境，浏览器自动打开 `localhost:9000`，这个环境是为了方便调试自己的 Vue 组件。

5.执行 `npm run build`会进入 `production`环境,会将你的 Vue 组件打包至 dist 文件夹。

6.调试完毕，打包之后，直接在项目根目录，执行 npm 发布命令 `npm publish`，即可将自己的 Vue 组件发布至 npm 仓库。

7.发布之后，其他人下载调用，直接 eg: `npm install my-project`。

8.本地应用，`import myProject from 'my-project'`。

## 友情链接

[webpack 配置](https://www.webpackjs.com/guides/author-libraries/)
