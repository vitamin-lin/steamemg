

# Git Flow

### Git Commit 流程

对应 git commit msg 做了格式化规范，所以下面的 git commit 流程

1. `git status` 查看变更的文件
2. `git add .` 把变更文件提交到暂存区
3. `git cz` 触发 [Commitizen](https://github.com/commitizen/cz-cli) 工具，编写 git commit msg 信息
4. `git pull & git push` 拉取线上代码并提交当前代码到线上

有问题，可以参考：[git commit message 规范设置](https://github.com/sumaolin/study/blob/master/readme/git_cmmit_message.md) 解决