
#  多方观点

## Google工程总监Matt Welsh在ACM通讯上发表的《The End of Programming:编程的终结》
1. 经典CS 

在80s，经典CS的基础，从编程到算法、数据结构、系统和编程语言。在这种传统的CS教育中，目标是将各种想法转化为人类能读懂的程序，无论是Java、C++还是Python等编程语言。无论是简单的数据库连接算法还是复杂的Paxos共识协议，都能以人类可读、可理解的程序形式表达出来。

过去40年计算机科学一直是一门以数据结构、算法和编程为核心的学科。

2. 编程会走向消亡( Programming will be obsolete)

使用的是类比法：
* 最早的计算机科学先驱，从（相对）原始的电气工程洞穴中脱颖而出，强烈地相信所有未来的计算机科学家都需要对半导体、二进制算术和微处理器设计有深刻的理解才能理解软件。快进到今天，我敢打赌，99% 的软件编写者几乎不知道 CPU 是如何工作的，更不用说晶体管设计背后的物理原理了。通过扩展，我相信未来的计算机科学家将远离“软件”的经典定义，以至于他们将很难反转链表或实施快速排序。（见鬼，我不确定我是否记得如何自己实现快速排序。）

* 像 CoPilot 这样的 AI 编码助手只是触及了我所说的表面。对我来说，很明显，当然，未来的所有程序最终都将由 AI 编写，而人类充其量只能充当监督角色。任何怀疑这一预测的人只需看看 AI 内容生成的其他方面（例如图像生成）正在取得的快速进展。DALL-E v1 和 DALL-E v2（仅在 15 个月后宣布）在质量和复杂性上的差异令人震惊。如果我在过去几年的人工智能工作中学到了什么，那就是很容易低估越来越大的人工智能模型的力量。几个月前看起来还像科幻小说的事情正在迅速成为现实。
* 所以我不只是在谈论CoPilot 取代程序员。我说的是用训练模型代替编写程序的整个概念。将来，CS 学生将不再需要学习诸如如何将节点添加到二叉树或 C++ 代码之类的普通技能。那种教育会过时，就像教工科学生如何使用计算尺一样。
* 未来的工程师只需敲几下键，就会启动一个四五亿参数模型的实例，该模型已经编码了人类知识的全部范围（以及一些知识），准备好接受机器所需的任何任务。让机器做人们想做的事情的大部分智力工作将是提出正确的示例、正确的训练数据以及评估训练过程的正确方法。能够通过小样本学习进行泛化的适当强大模型将只需要执行任务的几个好的示例。在大多数情况下，将不再需要大量人工管理的数据集，并且大多数“训练”人工智能模型的人不会在 PyTorch 或类似的东西中运行梯度下降循环。他们将通过示例进行教学，其余的由机器完成。
* 在这门新的计算机科学中——如果我们甚至称它为计算机科学——机器将如此强大，并且已经知道如何做很多事情，以至于该领域看起来不像是一项工程努力，而更像是一个教育领域；也就是说，如何最好地教育机器，与如何最好地教育孩子在学校的科学没有什么不同。然而，与（人类）儿童不同，这些人工智能系统将驾驶我们的飞机，运行我们的电网，甚至可能管理整个国家。我认为，当我们的重点转向教授智能机器而不是直接对它们进行编程时，绝大多数经典 CS 就变得无关紧要了。传统意义上的编程实际上已经死了。

## 软件2.0 -- Andrej Karpathy

Neural networks are not just another classifier, they represent the beginning of a fundamental shift in how we develop software。

Software 1.0: 它是用Python、C++等语言编写的。它由程序员编写的对计算机的显式指令组成。
Software 2.0: 用更加抽象、对人类不友好的语言编写的，例如神经网络的权重。
- 我们的方法是指定所需程序的行为目标（例如，“满足输入输出示例对的数据集”，或“赢得围棋游戏”），编写代码的粗略框架（即神经网络架构），它识别要搜索的程序空间的子集，并使用我们可以使用的计算资源在该空间中搜索有效的程序。在神经网络的情况下，我们将搜索限制在程序空间的连续子集中，其中通过反向传播和随机梯度下降可以使搜索过程（有点令人惊讶）高效。

### 类比：
* 在软件 1.0 中，人工设计的源代码（例如一些 .cpp 文件）被编译成可执行有用工作的二进制文件。
* 在软件 2.0 中，源代码通常包含 1）定义所需行为的数据集和 2）给出代码粗略骨架的神经网络架构，但需要填充许多细节（权重）。训练神经网络将数据集编译成二进制文件——最终的神经网络。
2.0 程序员（数据标签人员）编辑和增长数据集，而一些 1.0 程序员维护和迭代周围的训练代码基础设施，分析、可视化和标签界面。
举例
* 计算机视觉、ASR/TTS/MT/Games/DataBase/

### 好处


| 对比项 | software1.0 | software2.0 |     |     |
| ------ | ----------- | ----------- | --- | --- |
| stack |         ConvNet    |   ConvNet          |     |     |
|        |             |             |     |     |