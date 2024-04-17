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

##  The two-phase process behind LLMs’ responses

The two-phase process  contains the initiation phase and the generation phase of text generation using Transformer-based decoders, as well as different decoding strategies such as greedy decoding, sampling decoding, and more complex heuristics like beam search.

- greedy decoding: 贪婪解码，一种简单的解码策略，每一步都选择概率最高的词。
- sampling decoding: 抽样解码，一种解码策略，通过从概率分布中抽样来选择下一个词。
- heuristics: 启发式，通常指根据经验制定的策略或方法。
- beam search: 束搜索，一种在解码时考虑多个候选选项的复杂启发式搜索策略。

#### Refresher

![Outline of a Transformer decoder model](https://miro.medium.com/v2/resize:fit:700/1*elYzMNlqOvxnZwiFVCqazQ.png)


 In the figure below I pictured the main layers of a vanilla Transformer-based decoder.used to generate an output token from a sequence of input tokens.

- "Word": Refresher
  - "Lemma": Refresher
  - "Pronunciation": /rɪˈfrɛʃər/
  - "POS": Noun
  - "Definition": Something that serves to refresh or renew one's knowledge or memory about a particular subject.
  - "Translation": 复习材料
  - "Context": a little Transformer refresher.
  - "Context_translation": 一点Transformer的复习材料。
- "Word": Vanilla
  - "Lemma": Vanilla
  - "Pronunciation": /vəˈnɪlə/
  - "POS": Adjective
  - "Definition": Plain or basic, without any additional features or enhancements.
  - "Translation": 基础的，普通的
  - "Context": in the figure below I pictured the main layers of a vanilla Transformer-based decoder.
  - "Context_translation": 在下面的图中，我描绘了一个基础的基于Transformer的解码器的主要层。

Notice that the decoder itself does not output tokens but logits (as many as the vocabulary size). By the way, the last layer outputting the logits is often called the language model head or LM head. Deriving the token from the logits is the job of a heuristic called (token) search strategy, generation strategy or decoding strategy. Common decoding strategies include:

- "Word": Logits
  - "Lemma": Logit
  - "Pronunciation": /ˈloʊdʒɪts/
  - "POS": Noun
  - "Definition": The vector of raw predictions generated by a model before applying a softmax function. Logits represent the unnormalized probabilities of different classes or categories.
  - "Translation": 逻辑回归
  - "Context": deriving the token from the logits is the job of a heuristic called (token) search strategy.
  - "Context_translation": 从逻辑回归中推导出标记是一个被称为（标记）搜索策略的启发式方法的任务。
- deriving dɪˈraɪvɪŋ  推导

* Greedy decoding which simply consists of picking the token with the largest logit, possibly after altering the logits using transformations such as a repetition penalty.
* Sampling decoding which consists of using the logits as a multinomial distribution to sample from. In other words, we pick a token from the vocabulary by sampling. The distribution we sample from can first be warped using simple transformations such as temperature scaling, top-k and top-p to mention the most well known.
* More complex heuristics such as beam search, contrastive decoding, etc.

#### execution engine && inference englne

For the sake of simplicity, we will assume the decoding strategy to be part of the model
![](https://miro.medium.com/v2/resize:fit:700/1*wqZPT9lxUDHEnEfozugSjw.png)
This mental model is actually useful in the context of LLM serving solutions where such entities that take a sequence of tokens as input and return a corresponding output token are usually called an _execution engine_ or an _inference engine_.

### initiation phrase

what about generating more than one token? Generating text (commonly named completion) from an input text sequence (commonly named prompt) using a Transformer-based decoder basically consists of the following steps:

1. Loading the model weights to GPU
2. Tokenizing the prompt on CPU and transferring the token tensor to GPU
![Image 4: what color is the sky?](https://miro.medium.com/v2/resize:fit:700/1*oRbImGZ3-eCzcmec-WIXgg.png)
Figure 3 — Tokenization step
3. Generating the first token of the completion by running the tokenized prompt through the network.

This single-step phase is typically called the initiation phase. In the next post, we will see that it is also often called the pre-fill phase.


### generation(or decoding) phrase

4. Appending the generated token to the sequence of input tokens and using it as a new input to generate the second token of the completion. Then, repeat this process until either a stop sequence has been generated (e.g. a single end-of-sequence (EOS) token) or the configured maximum sequence length has been reached (Figure 4)

![Image 5: a diagram showing the different phases of a decoder model](https://miro.medium.com/v2/resize:fit:700/1*SUZHcgpwiF0KcBFVTJ8NKQ.png)

This multi-step phase is usually called the generation phase, the decoding phase, the auto-regressive phase or even the incremental phase.
5. Fetching the the completion’s tokens to CPU and detokenize them to get your generated text (Figure 5).

![Image 6: the sky is blue the sky is blue](https://miro.medium.com/v2/resize:fit:700/1*lfyuPLSForcyZDEQV_e_QA.png)

Figure 5 — Detokenization step

**_Notice:_** Recent and more advanced techniques aiming at achieving lower latency such as speculative sampling² or lookahead decoding³ don’t exactly follow the simple algorithm described above.

- recent and more advanced techniques: 最新和更先进的技术，指的是近期发展出来的，相比以前有所提升的技术。
- achieving lower latency: 实现更低延迟，指的是降低系统反应时间的目标。
- speculative sampling: 推测采样，是一种预测性的采样方法，通常用于减少延迟。
- lookahead decoding: 预先解码，是一种在解码时预测未来的解码方法，也是为了减少延迟。
- follow the simple algorithm: 遵循简单的算法，指的是按照某种已经描述过的基本算法进行操作。

o what is the actual difference between the initiation phase and the decoding phase? It seems artificial at best at this point. The initiation phase feels indeed as special as the initialization step of a while loop and we essentially do the same in both phases: on each iteration we apply a forward pass to a sequence of tokens which gets one token larger every time.

You would actually be right. At that point, there is indeed no difference on how the computations are run on the hardware and therefore nothing special about either phase in that regard. However, and as we will see in the next post, this setup involves expensive computations (scaling quadratically in the total sequence length), a lot of which being actually and fortunately redundant.
An obvious way to alleviate this is to cache what we could spare recomputing. 
This optimization is known as KV caching and introduces this critical difference I keep hinting at

- "Word": Alleviate
  - "Lemma": Alleviate
  - "Pronunciation": /əˈliːvieɪt/
  - "POS": Verb
  - "Definition": To make something less severe, intense, or burdensome; to reduce or relieve the negative impact or intensity of something.
  - "Translation": 缓解，减轻
  - "Context": An obvious way to alleviate this is to cache what we could spare recomputing.
  - "Context_translation": 缓解这个问题的一个明显方法是缓存我们可以避免重新计算的内容。
- "Word": Expensive
  - "Lemma": Expensive
  - "Pronunciation": /ɪkˈspɛnsɪv/
  - "POS": Adjective
  - "Definition": Costing a lot of money or resources; requiring a significant amount of expenditure.
  - "Translation": 昂贵的，费用高的
  - "Context": and as we will see in the next post, this setup involves expensive computations (scaling quadratically in the total sequence length).
  - "Context_translation": 正如我们将在下一篇文章中看到的那样，这个设置涉及到昂贵的计算（在整个序列长度上呈二次扩展）。

[Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)
[Break the Sequential Dependency of LLM Inference Using Lookahead Decoding](https://lmsys.org/blog/2023-11-21-lookahead-decoding/)
[A Contrastive Framework for Neural Text Generation](https://arxiv.org/abs/2202.06417)
