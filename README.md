# 数据处理系统
------------
* 项目依赖React、Ant Design、DVA, 工程构建基于[roadhog](https://github.com/sorrycc/roadhog)

### 快速开始
* `npm install` 安装所有依赖包
* `npm start` 启动本地HTTP服务（默认监听8000端口）

### 打包构建
* `npm build` 文件都自动构建到 dist 目录下 

### 代码规范 
* 本项目代码规范基于AirBnb的代码约定, 可参考此[文档说明](https://github.com/dwqs/react-style-guide)
* 代码提交前会进行eslint校验，**请所有同学务必遵守代码规范**。 
* 相关的 IDE 可以配置eslint检验，以方便你在编辑代码的时候就可以清楚知道，自己错误的地方。
	* 如：Webstorm 可以参考此[文档](https://www.jetbrains.com/help/webstorm/2017.1/eslint.html)进行配置

	
### 目录结构约定
##### 目录
* mock (mock数据)
* public （页面入口）
* src
	* common(公共样式文件)
	* components（所有组件）
		* common （公共组件）
	* entry （页面入口文件）
	* images （所有依赖的图片）
	* models
		* app.js (主框架modal)
	* routes （路由配置）
		* router.jsx 	（路由主入口）
	* services (http下所有调用的接口，websocket暂时用不到这个)
		* app.js 
	* utils（公共的方法）		

		

### 相关学习文档：
* [Ant Design](https://react-guide.github.io/react-router-cn/) 
* [DVA](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md)
* [React-router](https://react-guide.github.io/react-router-cn/)
* [Redux](http://cn.redux.js.org/index.html)
* [Redux-saga](http://leonshi.com/redux-saga-in-chinese/index.html)

