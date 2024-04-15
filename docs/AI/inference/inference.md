# LLM inference

## series 1. 介绍

###  先验知识
 -  I assume you already have basic knowledge of the Transformer architecture and of the scaled dot-product attention (SDPA) mechanism as introduced in the famous Attention Is All You Need paper.
    -  我假设您已经对Transformer架构和在著名的《Attention Is All You Need》论文中介绍的缩放点积注意力（SDPA）机制有基本的了解。
- SDPA(Scaled dot-product attention)
    - Scaled dot-product attention is a mechanism in the Transformer model architecture used in natural language processing. It calculates the dot product of the query with all keys, divides each by the square root of the dimension of the key, and applies a softmax function to obtain the weights on the values.
        - 缩放点积注意力是自然语言处理中Transformer模型架构中的一种机制。它计算查询和所有键的点积，然后每个结果除以键的维数的平方根，并应用softmax函数来获得对值的权重。
    - Scaled dot-product attention: 缩放点积注意力，是一种计算模型中注意力权重的方法。
    - Transformer model architecture: Transformer模型架构，是一种流行的自然语言处理模型。
    - natural language processing: 自然语言处理，计算机科学领域的一个分支，专注于计算机和人类（自然）语言之间的交互。
    - calculates the dot product: 计算点积，线性代数中的操作，用于确定两个向量的相似性。
    - query: 查询，在此上下文中指的是模型试图在信息中寻找的部分。
    - keys: 键，这里指的是模型中用于与查询匹配的元素。
    - divides each by the square root of the dimension: 每个结果除以维数的平方根，这是缩放点积注意力中的缩放步骤。
    - softmax function: softmax函数，一种数学函数通常用于多分类问题中的输出层。给定一个向量，softmax函数可以将其转换为概率分布，使得每个元素的取值范围在0到1之间，并且所有元素的和为1。

### define 
- By LLM inference, I mean token generation using decoder-only Transformer models since most challenges and their associated remediation come from that particular architecture and use case.
    - 通过LLM推断，我的意思是使用仅解码器的变换器模型进行令牌生成，因为大多数挑战及其相关的补救措施都源于那种特定的架构和用例。
- To make sense of the jungle of inference optimizations (quantization, fused kernels, model architecture modifications, etc.)
    - 为了理解推理优化的丛林（量化，融合内核，模型架构修改等）。

### goals

- By the end of this series, you will hopefully be able to understand terms often associated with LLM inference like key-value (KV) cache, memory-bandwidth bound, etc.
- to make sense of the jungle of inference optimizations (quantization, fused kernels, model architecture modifications, etc.)
- and configurations (batch size, which GPU to use, etc.)
- finally, to link them with key performance metrics like latency, throughput and cost.
- I hope that you will be able to build an insightful mental model that will enable you to make informed and quick decisions when configuring and optimizing your LLM serving solution
    - 我希望你能够构建一个富有洞察力的心智模型，使你能够在配置和优化你的LLM服务方案时做出明智和迅速的决策。
    - Make informed 做出明智的决定

### 核心概念

#### Token Generation

- Alright, let's break this down. When we talk about generating tokens using a transformer decoder, we're dealing with two steps: the prompt processing step and several autoregressive steps. These two steps have very different characteristics when it comes to hardware utilization.
    - 首先，我们需要明白，使用变压器解码器进行令牌生成包括两种步骤：提示处理步骤和多个自回归步骤，这两种步骤在硬件使用上有非常不同的特点。

- challenge 1: The computational demand of the attention mechanism scales quadratically with the total sequence length.
    -  注意力机制对总序列长度的计算需求呈二次方的扩展。
    -  solutions：  Through a simple caching strategy, also known as KV caching.
    -  通过简单的缓存策略所谓的KV caching 
    -   As we will see, KV caching is actually a trade-off and presents its own set of problems.
    -  弊端：正如我们将看到的，KV缓存实际上是一种权衡，并提出了自己的一系列问题。
- challenge 2: how to better utilize hardware and improve our performance metrics
    - goal:  understand the motivation of all the major performance optimization strategies
    - key concept
        - We have to introduce the more general key concept of arithmetic intensity, a useful mental model called the roofline model, and to link them to both key hardware characteristics like peak FLOPS and memory-bandwidth and to key performance metrics like latency, throughput, and cost.
            -  我们需要引入一个更通用的关键概念——算术强度，一个有用的心智模型称为屋脊线模型，并将其与峰值浮点运算能力（FLOPS）、内存带宽等关键硬件特性以及延迟、吞吐量和成本等关键性能指标相联系。
        -  arithmetic intensity(算术强度)
        -  roofline model
        -   peak FLOPS
        -   memory-bandwidth
        -   latency
        -   throughput
        -   cost
- chanllenge 3: quantization
    - Quantization has been one of the hottest optimization strategy bringing major performance improvements over the last year. 
- chanllenge 4: LLM  Serving frameworks work
    -  Model servers indeed play a key role in ensuring the best end-to-end performance by efficiently managing the incoming requests and hardware resources. 
    -  模型服务器确实在确保最佳端到端性能方面起着关键作用，它们通过有效管理传入的请求和硬件资源来实现这一点。



