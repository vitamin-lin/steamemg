# 项目代码的格式化统一配置



Reference： [项目代码的格式化统一配置](https://github.com/sumaolin/study/blob/master/readme/prettier_eslint_editConfig.md) 

### 1. VS Code 编辑器中相关的插件：

1. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 

   给出了读取配置文件的优先级 priority

2. [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

3. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)



### 2. 配置 VS Code 的 `formatOnSave` 设置

VS Code 插件配置统一在 preference → setting → user setting 设置 (快捷键： `Command + ,`)，即可实现保存时自动格式化

```json
{
  "prettier.eslintIntegration": true,
  "eslint.autoFixOnSave": true,
  "editor.formatOnSave": true
}
```



### 目标

所有冲突文件解决标准：[Taro 规范](https://nervjs.github.io/taro/docs/spec-for-taro.html#%E5%9F%BA%E6%9C%AC%E4%B9%A6%E5%86%99) 