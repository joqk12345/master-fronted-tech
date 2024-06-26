

# chat_tts 服务搭建与性能评估

## 服务搭建指南

我们推荐使用[服务搭建仓库](https://github.com/jianchang512/ChatTTS-ui/tree/main?tab=readme-ov-file)来构建您的ChatTTS服务。该仓库提供了详细的指导和优化方案。

### GPU 加速方案

采用GPU方案可以显著提升服务性能，实验数据显示，处理速度可提升至5倍。

## Demo 使用说明

我们的Demo支持多种输入方式，包括文本和文件输入，确保用户能够便捷地体验服务。

## 性能记录

以下是对服务性能的详细记录，包括推理时长和实时因子（RTF）的统计。

### 记录1

- 推理时长：183.34 秒
- 音频时长：120.54 秒
- RTF：\( \frac{183}{120} = 1.525 \)

### 记录2

- 推理时长：161.47 秒
- 音频时长：162.71 秒
- RTF：\( \frac{161.47}{162.71} = 0.99 \)

### 记录3 (英文)

- 推理时长：334.13 秒
- 音频时长：283.68 秒
- RTF：\( \frac{334}{283.6} = 1.178 \)

### 记录 4 (英文)

- 推理时长：63.76 秒
- 音频时长：282.10 秒
- RTF：\( \frac{63}{282} = 0.223 \)

## 音质稳定性分析

在音频时长超过2分钟时，我们注意到可能会出现音质不稳定的现象，表现为仿佛有两个人在同时朗读文章。

## Zero 的能力评估

通过[Zero的能力测试页面](https://huggingface.co/spaces/Hilley/ChatTTS-OpenVoice)，我们进行了界面测试，发现Zero的能力尚有提升空间。

## Chat TTS 资源汇总

想要获取更多关于Chat TTS的资源和信息，请访问[Awesome-ChatTTS资源汇总](https://github.com/panyanyany/Awesome-ChatTTS?tab=readme-ov-file)。



