

## 1 - Introduction to Cursor 

### 1.1 what is Cursor

Cursor是VS Code的一个克隆或分支，拥有VS Code的所有扩展，并在AI和工具方面进行了提升，改善了软件开发体验。

 Cursor的一些关键特性。

AI赋能的代码完成和生成能力（AI-powered Code Completion and Generation）、自然语言的代码编写（Natural language code editing）、基于代码库感知的聊天助手（Codebase-aware chat assistant）、多文件编辑（Multi-file editing）。能够预测开发者的自然使用需求。

在深入思考一下Cursor的本质：就是「模型 + 交互」**，还有高效的 RAG （检索增强）和联网补充。因此，完全可以把原始文档当作「知识库」，借助工具搭载的 LLM 来萃取

### 为什么要使用Curosr

1. Increased Productivity
   1. Al predicts and suggests next edits
   2. Natural language commands for quick code changes

	2. Enhanced Code Understanding:

​		a. Al assistant can explain and analyze your codebase

​		b. Easy reference to specific files or documentation

3. Familiar Environment:
   1. Supports importing extensions, themes, and keybindings
   2. Feels like your usual editor, but supercharged with Al
4. Privacy and Security:
   1. SOC 2 certified
   2. Privacy mode available
   3. Option to use your own APl key

### Github Co-pilot and Cursor

与GitHub Copilot相比，Cursor允许引用整个文件夹和文件，进行多文件生成和读取，并且Cursor是一个完整的IDE，而GitHub Copilot是一个VS Code扩展。

### 1.2  register& download cursor

### 1.3 cursor setting

* AI 规则文件

  AI规则是cursor将要遵循的规则，他可以在运行不同类型的自动完成时候预测。

  * 可以参考的网站：https://cursor.directory/

* 模型选择

  * 建议使用claude-3.5-sonnet

* Features
  * cursor Tab
    * 部分接受（partial Accepts）
    * cursor 预测（cursor prediction）
    * Trigger in Comments
    * Auto import
  * composer（写作模块、作曲家模块）
    * https://docs.cursor.com/composer/overview
  * Codebase indexing
  * Docs
    * 添加一些自定义文档，这个可以补充llm以外的知识，提测代码的生产
  * Editor
  * Terminal
* Beta
  * Notepads
  * Bug Finder

最后，课程还介绍了如何注册和下载Cursor。

### 1.4 Codebase Indexing

* Codebase Indexing
  * https://docs.cursor.com/context/codebase-indexing
* Cursor原生支持代码库索引，能够为单个文件创建新的数字表示，并使用重新排序算法将相关代码拉回，从而提高代码生成的质量。用户可以通过进入Cursor并查看设置来启用此功能。在设置中，用户可以查看和配置忽略文件，选择性地排除某些文件不被索引，从而优化项目索引。此外，用户还可以通过.gitignore文件来设置忽略文件，例如排除node_modules文件夹等。
* ignorefiles

###  1.5 Navigating the Cursor interface

* 首先介绍了Tab完成功能，允许选择代码部分并生成自动完成。
* 接着展示了CMD+K功能，用于内联编辑和重写代码。
* 然后介绍了Chat功能，可以通过聊天窗口获取代码片段。
* 最后讲解了Composer功能，实现多文件编辑，创建、删除或更新文件。
* 详细演示了如何使用AI进行编程，特别是通过Cursor工具进行代码编写，包括更改main.py文件，添加新的JavaScript函数，添加、删除和编辑待办事项等。

## 2 - Mastering Tab Completion 

### 2.1  自动补全（Autocomplete）

### 2.2 Smart Rewrites

如何利用智能重写与注释功能，结合光标（cursor）的tab补全功能，自动更新和修复代码。

通过几个实例展示了如何使用tab补全功能，包括删除多余代码、添加注释、修复错误等。

如何在编码编辑器中使用不同类型的注释进行修复。

最后，鼓励观众在空闲时间尝试这一功能。

## 3 - Harnessing the Power of Chat and Images 

### 3.1 Building a NextJS Dashboard Page with AI Chat

如何使用AI Coding with Cursor工具在React项目中进行调试(AI Fix in Chat)和设置仪表盘。

通过该工具，用户可以快速修复代码中的错误，例如导入问题、类型声明缺失等。

视频还展示了如何通过AI修复轻模式和暗模式的问题，以及如何更新组件以支持这些模式。

此外，视频提到了在运行应用时遇到的错误，并指出了需要修复的主题提供程序问题。最后，视频如何使用AI进行编程，特别是通过Udemy的AI Coding with Cursor课程。

课程中展示了如何通过AI代码库进行代码修改，包括删除不必要的导入和添加暗模式。同时，强调了使用@符号进行文件、文件夹和代码库的引用，以及如何通过包括数据库模式来减少错误和编辑。

最后，预告了下一节课将探讨如何使用自定义文档和语言链来生成有效的Python脚本。

### 3.2 Using_custom_documentation_with_llms

本质是RAG在code的应用

### 3.3 Enhancing_context_with_image_attachments



如何将图像集成到工作流程中，特别是在绘制图表时。

通过使用聊天功能和LangChain，能够将图表集成到代码驱动的开发环境中。

具体步骤包括获取图像，使用GPT-4o mini进行识别，然后将其与自定义文档结合，生成基于LLM的故事生成链。虽然过程中出现了一些错误，但通过自定义文档和图像识别，最终成功生成了故事。

### 3.4 





## 4 - Maximizing CMD+K Efficiency 

## 5 - Exploring Cursor Composer 

### 5.1  [YOLO Mode](https://forum.cursor.com/t/yolo-mode-is-amazing/36262)

​	you only live once

### Checkpoints

Every time you generate code, Composer creates a checkpoint. You can return to any previous version by clicking on `checkout` near that checkpoint. This is handy if you don’t like the current changes and want to revert to an earlier state.

[checkpoints][https://docs.cursor.com/composer/overview#checkpoints]

## 6.Features

### Exploring Cursor Notepads

Notepads are powerful context-sharing tools in Cursor that bridge the gap between composers and chat interactions. Think of them as enhanced reference documents that go beyond the capabilities of `.cursorrules`, allowing you to create reusable contexts for your development workflow.

[Notepads][https://docs.cursor.com/features/beta/notepads]

### Generate Commit Message

1. Stage the files you want to commit
2. Open the Git tab in the sidebar
3. Look for the sparkle (✨) icon next to the commit message input field
4. Click the sparkle icon to generate a commit message based on your staged changes

[commit-message][https://docs.cursor.com/features/generate-commit-message]

## x - Best Practices for AI Code Generation



### 1. Cursor copywriting optimization workflow