# LLM inference

## 1. 介绍

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

## 2. The two-phase process behind LLMs’ responses

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

## 3. KV caching explained

### first challenge of LLM inference
- the quadratic scaling of compute required by the attention layer with the total sequence length (prompt tokens and generated completion tokens).
    - quadratic scaling: 二次方增长，是一种计算复杂度的描述，表示随着输入的增长，计算需求将按照二次方的速度增长。
    - attention layer: 注意力层，是深度学习模型中的一个重要组成部分，特别是在自然语言处理和机器翻译等领域。
- **Word**: Quadratic
  - **Lemma**: Quadratic
  - **Pronunciation**: /kwɒˈdrætɪk/
  - **POS**: Adjective
  - **Definition**: Involving the second and no higher power of an unknown quantity or variable.
  - **Translation**: 二次的
  - **Context**: The quadratic scaling of compute required by the attention layer.
  - **Context_translation**: 注意力层所需的计算的二次比例扩大。
- **Word**: Scaling
  - **Lemma**: Scale
  - **Pronunciation**: /ˈskeɪlɪŋ/
  - **POS**: Noun
  - **Definition**: The act of adjusting or determining the size or extent of something, often as a proportion of something else. In the context of computing, it often refers to the ability of a system, network, or process to handle a growing amount of work.
  - **Translation**: 缩放，扩展
  - **Context**: The quadratic scaling of compute required by the attention layer.
  - **Context_translation**: 注意力层所需的计算的二次比例扩大。
- Fortunately, many of these computations are redundant across generation steps, allowing us to cache appropriate results and reduce compute requirements. 
- This caching transforms the formerly quadratic scaling attention layer into one that scales linearly with total sequence length.
### Refresher Transformer's attention layer

- Let’s start by reminding ourselves of a few facts about what happens in the multi-head attention (MHA) layer of the vanilla Transformer (Figure 1).
  - 让我们首先回顾一下标准Transformer体系结构中多头注意(MHA)层操作的一些关键点(图1)。
![Image 2: a diagram showing the process of a docker container](https://miro.medium.com/v2/resize:fit:700/1*AxPZ5-EZ-fT0Ma5utAx2sA.png)

![Image 3: a diagram showing the process of a system](https://miro.medium.com/v2/resize:fit:700/1*5dBHHM-jJCJjwg9xj-tmfA.png)
Figure 1 — Detailed view of a Transformer decoder layer (above) and of a two-head (self)-attention layer (below) with a input sequence of length 3

For simplicity, we assume we only process a single sequence of length t (i.e. batch size is 1):
-  At every point in the process, each token in the input sequence (prompt) is represented by a dense vector (light yellow in Figure 1)
-  The input of the attention layer is a sequence of dense vectors, one for each input token, produced by the preceding decoder block.
    - 注意层的输入是一个密集向量序列，每个输入标记一个，由前面的解码器块产生。
- For each input vector, the attention layer produces a single dense vector of the same dimension (light blue in Figure 1).
    - 对于每个输入向量，注意层产生一个相同维度的单一密集向量

Now, considering a single attention head:
    - 对与单头注意力
-  First, we produce three lower-dimension dense vectors per input vector using three different projections: the query, the key and the value (leftmost light gray vectors in Figure 1).Overall, we have t query, t key and t value vectors.
    -  首先，我们使用三个不同的投影为每个输入向量生成三个低维密集向量:查询、键和值(图1中最左边的浅灰色向量)。
-   For each query we produce an output vector equal to the linear combination of the values, the coefficients of this linear combination being the attention scores. In other words, for each query, the corresponding output vector is an attention-weighted average of the values. For a given query, the attention scores are derived from the dot product of that query with each key. By doing this, we generate a representation for each token in the sequence that includes information from the other tokens, meaning we create a contextual representation of each token.
    - 对于每个查询，我们生成一个输出向量，等于这些值的线性组合，这个线性组合的系数是注意力得分。
    - 换句话说，对于每个查询，对应的输出向量是这些值的关注加权平均值。
    - 对于给定的查询，注意分数是从该查询与每个键的点积派生出来的。
    - 通过这样做，我们为序列中的每个令牌生成一个表示，其中包括来自其他令牌的信息，这意味着我们创建了每个令牌的上下文表示。
- Finally, the outputs of each attention head are concatenated and transformed using a last linear transformation to yield the final output.
    - 最后，将每个注意头的输出连接起来，并使用最后的线性变换进行转换，以产生最终输出。

### Quadratic scaling of attention computation

- Let’s have a look a the number of FLOPs required to compute the attention scores.  For one given head, for each sequence in a batch of size `b` of total length `t` (including prompt and generated completions), the attention score matrix is created by multiplying a query tensor of shape `(t, d_head)` with a transposed key tensor of shape `(d_head, t)`.
    - 让我们看一下计算注意力分数所需的flop数。
    - 对于一个给定的头部，对于总长度为' t '的批次大小为' b '的每个序列(包括提示和生成补全)，通过将形状为' (t, d_head) '的查询张量与形状为' (d_head, t) '的转置键张量相乘来创建注意力得分矩阵。
- How many FLOPs is spent in a single matrix multiplication? Multiplying a matrix of shape `(n, p)` with another matrix of size `(n, m)` approximately involves `2.m.n.p` operations. In our case, a single-head single-sequence attention scores computations therefore approximately amounts `2.d_head.t^2` FLOPs. Overall, attention scores computations hence require `2.b.n_layers.n_head.d_head.t^2=2.b.n_layers.d_model.t^2` FLOPs. The quadratic scaling with `t` now appears clearly.
    - 在一个矩阵乘法中花费了多少个FLOPs ?
    - 将形状为“(n, p)”的矩阵与另一个大小为“(n, m)”的矩阵相乘，大约需要“2.m.n.p”操作。
    - 在我们的例子中，单头单序列注意力得分计算因此大约等于' 2.d_head.t^2 FLOPS
    - 总的来说，注意力得分计算因此需要 `2.b.n_layers.n_head.d_head.t^2=2.b.n_layers.d_model. t^2` FLOPs.
- Looking at real numbers, in [Meta’s Llama2–7B](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf/blob/main/config.json) for example, `n_layers=32` and `d_model=4096`.
    - 在神经网络模型的配置文件中，n_layers和d_model是两个关键的参数，它们定义了模型的结构和大小。在你提到的Llama-2-7b-chat-hf这个模型的配置中，这两个参数具体的意义如下：
        - n_layers=32：这个参数指的是模型中的层数，也就是模型中堆叠的编码器（encoder）或解码器（decoder）的数量。在Transformer架构中，每一层通常包含自注意力（self-attention）机制和前馈神经网络。层数越多，模型通常能够捕捉到更复杂的特征，但同时也会增加模型的计算量和训练的难度。
        - d_model=4096：这个参数定义了模型中所有层的内部表示的大小，即每一层的输出维度。在自注意力机制中，这通常也是key、query和value向量的维度，以及前馈神经网络中隐藏层的大小。较大的d_model可以让模型学习到更丰富的特征表示，但同样会增加模型的参数总数和计算负担。
        - 在深度学习中，特别是在使用Transformer架构的语言模型中，`n_layers`、`n_heads`和`d_head`是关键的超参数，它们共同定义了模型的结构和容量。下面是这些参数的具体含义：
            - 1. `n_layers=32`：这个参数指的是模型中的层数。在Transformer模型中，这通常是指编码器（encoder）和解码器（decoder）的层数。每一层通常包括一个自注意力（self-attention）机制和一个前馈神经网络（feed-forward neural network）。层数越多，模型可以捕获更深层次的抽象特征，但同时也意味着需要更多的计算资源和更复杂的训练过程
            - 2. `n_heads=32`：这个参数指的是在自注意力机制中的头数（head number）。在Transformer模型中，自注意力层被分割成多个头，每个头学习输入数据的不同部分的表示。多头注意力允许模型在不同的表示子空间中并行捕捉信息。每个头关注输入序列的不同方面，这样可以使得模型更加灵活和强大。
            - 3. `d_head=128`：这个参数定义了每个注意力头中的特征维度。`d_head`是每个头的维度，因此每个注意力头产生的输出将是一个128维的向量。`n_heads`和`d_head`的乘积通常等于`d_model`，即模型的隐藏层大小。在这个例子中，如果`d_model`是4096，那么`n_heads * d_head`应该等于4096，这样每个头输出的128维向量乘以32个头，就得到了每层的输出维度4096。 这三个参数共同决定了Transformer模型的一个重要方面，即它的宽度和深度。模型的宽度（通过`d_model`和`d_head`来控制）影响了它能够捕捉的信息的丰富程度，而模型的深度（通过`n_layers`来控制）影响了它处理信息的复杂性。调整这些参数可以对模型的性能和所需的计算资源产生重大影响。通常，更大的模型（更多的层和/或更宽的层）需要更多的数据和计算资源来有效地训练。
- **Note:** The multiplication of the masked attention score matrix with the value tensor requires the same amount of FLOPs as computed above.
- What about the matrix multiplications involving the model weights? Using similar analysis, we can show that their computational complexity is `O(b.n_layers.d_model^2.t)`, that is, the computations requirements scale linearly with the total sequence length `t`.
- To understand the severity of quadratic scaling, let’s look at an example. **To generate the 1,001st token, the model must perform 100x more FLOPs than to generate the 101st token.** This exponential growth in compute obviously quickly becomes prohibitive. Fortunately for us and thanks to masking, a lot of computations can actually be spared between steps.
    - 为了生成第1001个令牌，模型必须执行比生成第101个令牌多100倍的FLOPs。这种计算的指数级增长显然很快变得令人望而却步。幸运的是，由于屏蔽，在步骤之间可以省去很多计算。

### Masking induces redundant computations in the generation phase
- We are now getting to the crux of the problem.  Due to masking, for a given token, the output representation is generated using representations from previous tokens only.  Because the previous tokens are identical across iterations, the output representation for that particular token will also be identical for all subsequent iterations and therefore implying redundant computations.
    - 我们现在正接近问题的关键。由于屏蔽，对于给定的标记，输出表示仅使用先前标记的表示生成。由于之前的标记在迭代中是相同的，因此该特定标记的输出表示对于所有后续迭代也将是相同的，因此意味着冗余计算。
- Let’s use the sequence of tokens from the previous post as an example (it has the nice feature of having one token per word). Let’s say we just generated “is ” from the “What color is the sky? The sky ” input sequence. In the past iteration, “sky ” was the last token of the input sequence, output representations associated with this token were therefore produced using the representations from all the tokens in the sequence, i.e. the value vectors for “What”, “ color”, “ is”, “ the”, “ sky”, “?”, “The ” and “sky ”.
- The input sequence for the next iteration will be ”What color is the sky? The sky is ” but because of masking, from “sky ”’s perspective, it appears as though the input sequence is still “What color is the sky? The sky ”. The output representations generated for “sky ” will therefore be identical to the ones from the previous iteration.
- ow an illustrated example (Figure 2) using the chart from Figure 1. The initiation step is supposed to process a input sequence of length 1. Redundantly computed elements are highlighted in light red and light purple. Light purple elements correspond to the redundantly computed keys and values.

![Image 4: a diagram showing the different stages of the process](https://miro.medium.com/v2/resize:fit:700/1*MwGRp2Z5DG4cUpvKfH90Qg.png)

- Figure 2 — Redundant computations in the attention layer in the generation phase

- Coming back to our example, for our new iteration that uses ”What color is the sky? The sky is ” as input, the only representation we have not already computed in previous steps is for the last token in the input sequence “is ”.

- More concretely, what material do we need to do just that?
*   A query vector for “is “.
*   Key vectors for “What”, “ color”, “ is”, “ the”, “ sky”, “?”, “The ” “sky ” and “is ” to compute attention scores.
*   Value vectors for “What”, “ color”, “ is”, “ the”, “ sky”, “?”, “The ” “sky ” and “is ” to compute the output.
- Regarding key and value vectors, they have been computed during previous iterations for all tokens but “is ”. We therefore could save (i.e. cache) and reuse the key and the value vectors from the previous iterations. This optimization is simply called **_KV caching_**. Computing an output representation for “is ” would then be as simple as:
1.  Computing a query, a key and a value for “is ”.
2.  Fetching key and value vectors for “What”, “ color”, “ is”, “ the”, “ sky”, “?”, “The ” and “sky ” from the cache and concatenating them with the key and value we just computed for “is ”
3.  Computing the attention scores using the “is ” query and all the keys.
4.  Computing the output vector for “is ” using the attention scores and all the values.

- Looking at our inputs, we actually no longer need the previous tokens as long as we can use their key and value vectors. When we KV cache, actual inputs to the model are the last generated token (vs. the whole sequence) and the KV cache. Figure 3 below provides an illustrated example of this new way of running the attention layer during the generation phase.

![Image 5: a diagram of a machine learning system](https://miro.medium.com/v2/resize:fit:700/1*4RwWnUm8zaUJmME0RkkUBQ.png)

Figure 3 — Generation step with KV caching enabled

Coming back to the two phases from [the previous post](https://medium.com/@plienhar/llm-inference-series-2-the-two-phase-process-behind-llms-responses-1ff1ff021cd5):

*   The initiation phase is actually unaffected by the KV caching strategy since there are no previous steps.
*   For the decoding phase however, the situation now looks very different. We no longer use the whole sequence as input but only the last generated token (and the KV cache).

- In the attention phase, the attention layer now processes all the prompt’s tokens in one go as opposed to the decoding steps where it processes only one token at a time. In the literature [1], the first set up is called batched attention (sometimes misleadingly parallel attention) while the second incremental attention.
    - 在注意阶段，注意层现在一次性处理所有提示的令牌，而不是在解码步骤中一次只处理一个令牌。在文献[1]中，第一种设置被称为批处理注意力(有时会导致错误的并行注意力)，而第二种设置被称为增量注意力。
- When resorting to KV caching, the initiation phase actually computes and (pre-)fills the KV cache with the key and the values of all the input tokens and is therefore often called pre-fill phase instead. In practice, the terms pre-fill and initiation phase are used interchangeably, we will favor the former starting from now.
    - 当使用KV缓存时，初始阶段实际上是用键和所有输入令牌的值来计算和(预)填充KV缓存，因此通常称为预填充阶段。在实践中，术语预填充和起始阶段可以互换使用，我们将从现在开始倾向于前者。
- This new difference between the initiation and generation phases is not merely conceptual. Now, at each generation step, in addition to the weight matrices, we have to fetch an ever growing cache from memory and only to process a single token per sequence. Notice that using GPU kernels optimized for each phase brings better performance than using the same one for both the pre-fill and the decoding phase with KV cache enabled (cf. for example [2]).
    - 启动阶段和生成阶段之间的新区别不仅仅是概念上的。现在，在每个生成步骤中，除了权重矩阵之外，我们还必须从内存中获取不断增长的缓存，并且每个序列只处理一个标记。请注意，使用针对每个阶段优化的GPU内核比在启用KV缓存的情况下对预填充和解码阶段使用相同的GPU内核带来更好的性能(参见示例[2])。
### KV caching enables linear attention scaling
- How does attention scale now? The transposed key tensor is still of shape (t, d_head). However, the query tensor is now of shape (d_head, 1). Single-head single-sequence attention scores computation therefore requires 2.d_head.t FLOPs and overall, attention computations require 2.b.n_layers.d_model.t FLOPs. Attention now scales linearly with the total sequence length!
    - 现在注意力是如何扩展的?转置的键张量仍然是形状(t, d_head)。然而，查询张量现在的形状是(d_head, 1)。因此，单头单序列注意分数计算需要2.d_head。对于FLOPs和总体而言，注意力计算需要2.b.n_layers.d_model。t FLOPs。注意力现在与总序列长度线性扩展!
- Are we done with quadratic scaling? Not if you discarded the cache and need to recompute it for example. Imagine you developed a chatbot application [3] and keep the cache in memory between each conversation round. Now, one client has been idle for quite some time. Since GPU memory is limited, you implemented a cache eviction policy that discards stale conversations. Unfortunately, the client resumes so you must recompute the cache for the entire history. This recomputation incurs a computational cost quadratic in the total conversation length.
    - 我们完成了二次缩放吗?例如，如果您丢弃了缓存并需要重新计算它，则不会。假设您开发了一个聊天机器人应用程序[3]，并在每个会话回合之间将缓存保存在内存中。现在，有一个客户机已经闲置了很长一段时间。由于GPU内存有限，您实现了一个缓存清除策略，该策略可以丢弃过时的会话。不幸的是，客户端会继续运行，因此您必须重新计算整个历史记录的缓存。这种重新计算产生了总会话长度的二次计算开销- The example above highlights how (KV) caching is a compromise and therefore not a free lunch. Specifically, we trade higher memory usage and data transfer for reduced computation. As we will see in upcoming posts, the memory footprint cost of caching can be substantial.
    - 上面的例子强调了(KV)缓存是一种妥协，因此不是免费的午餐。具体来说，我们用更高的内存使用和数据传输来换取更少的计算。正如我们将在接下来的文章中看到的，缓存的内存占用成本可能非常大。
- Revisiting the chatbot example, designing an efficient cache eviction policy is challenging since it requires balancing two expensive options: either consume more of scarce resources (GPU memory and bandwidth) or require quadratic amounts of computation.
    - 回顾聊天机器人的例子，设计一个有效的缓存回收策略是具有挑战性的，因为它需要平衡两个昂贵的选项:要么消耗更多的稀缺资源(GPU内存和带宽)，要么需要二次量的计算。
### summary 
- Let’s summarize what we just learned. Attention scores computation scales quadratically in the total sequence length. However, due to masking in the attention computation, at each generation step, we can actually spare recomputing the keys and the values for past tokens but the last generated one. Every time we compute new keys and values we can indeed cache them into GPU memory for future reuse, hence sparing us spending FLOPs recomputing them.
    - 让我们总结一下刚刚学到的东西。注意分数计算在总序列长度上呈二次增长。然而，由于注意力计算中的掩蔽，在每个生成步骤中，我们实际上可以省去重新计算过去令牌的键和值，但最后生成的令牌。每次我们计算新的键和值时，我们确实可以将它们缓存到GPU内存中以备将来重用，从而节省了我们重新计算它们的FLOPs。
- The main benefit of this strategy is to make the FLOPs requirements of the (self-)attention mechanism to scale linearly rather than quadratically in the total sequence length.
    -  这种策略的主要好处是使(自)注意机制的FLOPs需求在总序列长度中呈线性扩展，而不是二次扩展。
- As mentioned above, KV caching is a tradeoff and raises new problems 
    - The KV cache consumes GPU memory and can become very large. Unfortunately, GPU memory is scarce even when you have to load reasonably small LLMs. The KV cache is therefore the main technical obstacle when it comes to increasing the total sequence length (context window size) or the number of sequences you process at once, i.e. your throughput, and therefore to improving your cost efficiency.
        - KV缓存消耗GPU内存，并且可以变得非常大。不幸的是，即使在必须加载相当小的llm时，GPU内存也是稀缺的。因此，当涉及到增加总序列长度(上下文窗口大小)或一次处理的序列数量(即吞吐量)，从而提高成本效率时，KV缓存是主要的技术障碍。
    - KV caching greatly reduces the amount of operations we perform during a single generation step compared to the amount of data we have to move from memory: we fetch big weight matrices and an ever growing KV cache only to perform meager matrix-to-vector operations. On modern hardware, we unfortunately end up spending more time loading the data than to actually crunching numbers which obviously results in the underutilization of the compute capacity of our GPUs. In other words, we achieve low GPU utilization and therefore a low cost efficiency.
    - 与我们必须从内存中移动的数据量相比，KV缓存大大减少了我们在单个生成步骤中执行的操作量:我们获取大权重矩阵和不断增长的KV缓存，只执行微薄的矩阵到向量操作。在现代硬件上，不幸的是，我们最终花更多的时间加载数据，而不是实际处理数字，这显然会导致gpu的计算能力利用率不足。换句话说，我们实现了低GPU利用率，因此成本效率很低。
## 4. KV caching, a deeper look 

We will  discusses KV caching as an optimization for the inference process of LLMs, explaining how it reduces compute requirements by storing key and value tensors in GPU memory. It also addresses the challenges of KV caching, such as the linear growth with batch size and total sequence length, and the strategies used to manage its memory requirements.

KV caching is a compromise: we trade memory against compute. In this post, we will see how big the KV cache can grow, what challenges it creates and what are the most common strategies used to tackle them.
    - KV缓存是一种折中：我们用内存来换取计算力。在这篇文章中，我们将看到KV缓存可以增长到多大，它带来了什么挑战，以及常用的解决这些挑战的策略是什么。

### how big can the KV Cache grow?

This is quite simple: for each token of each sequence in the batch, we need to store two vector tensors (one key tensor and one value tensor) of size d_head for each attention head of each attention layer. The space required by each tensor parameter depends on the precision: 4 bytes/parameter in full-precision (FP32), 2 bytes/parameter in half-precision (BF16, FP16), 1 byte/parameter for 8-bit data types (INT8, FP8), etc.
    - 这很简单:对于批处理中每个序列的每个标记，我们需要为每个注意层的每个注意头存储两个大小为d_head的向量张量(一个键张量和一个值张量)。每个张量参数所需的空间取决于精度:全精度(FP32)时4字节/参数，半精度(BF16, FP16)时2字节/参数，8位数据类型(INT8, FP8)时1字节/参数，等等。

Let be b the batch size, t the total sequence length (prompt + completion), n_layers the number of decoder blocks / attention layers, n_heads the number of attention heads per attention layer, d_head the hidden dimension of the attention layer, p_a the precision. The per-token memory consumption (in bytes) of the KV cache of a multi-head attention (MHA) model is:

![Image 2: 2 mayers heads head pa](https://miro.medium.com/v2/resize:fit:244/1*Ekk1XV8AhGcD98YS9Se9yg.png)

**Notice:** We remind that in MHA models, `n_heads.d_head=d_model` but we won’t use it to simplify the formula above.

The total size of the KV cache (in bytes) is therefore:

![Image 3: a black and white image with the words'two heads heads head' written on it](https://miro.medium.com/v2/resize:fit:265/1*x3UMm0rAKOf8EriN56c8pA.png)
One of the first challenges of the KV cache appears: it grows linearly with the batch size and most importantly with the total sequence length. Since it grows with the total sequence length, the KV cache size is virtually not bounded while our GPU memory is obviously limited. Even worse, since the total sequence length cannot be known ahead of time, the KV cache memory requirements are therefore unknown making memory management particularly challenging.
    - KV缓存的第一个挑战出现了:它随着批处理大小线性增长，最重要的是随着总序列长度线性增长。因为它随着总序列长度的增长而增长，所以KV缓存大小实际上是没有限制的，而我们的GPU内存显然是有限的。更糟糕的是，由于不能提前知道总序列长度，因此KV缓存内存需求是未知的，这使得内存管理特别具有挑战性。

Let’s look at some numbers for popular MHA models (Table 1), namely Meta’s Llama-2 [1] and OPT [2], MosaicML’s MPT [3] and BigScience’s BLOOM [4]:

| Model       | n_layers | n_heads | d_head | d_model |
|-------------|----------|---------|--------|---------|
| Llama-2-7B  | 32       | 32      | 128    | 4096    |
| Llama-2-13B | 40       | 40      | 128    | 5120    |
| MPT-7B      | 32       | 32      | 128    | 4096    |
| MPT-30B     | 48       | 64      | 112    | 7168    |
| OPT-7B      | 32       | 32      | 128    | 4096    |
| OPT-13B     | 40       | 40      | 128    | 5120    |
| OPT-30B     | 48       | 56      | 128    | 7168    |
| OPT-66B     | 64       | 72      | 128    | 9216    |
| OPT-175B    | 96       | 96      | 128    | 12288   |
| BLOOM-176B  | 70       | 112     | 128    | 14336   |

Let’s assume the parameters are stored in half precision (FP16, BF16) and pick a smaller model (Llama-2–7B) and a larger one (BLOOM-176B). For Llama-2–7B (resp. BLOOM-176B), KV cache memory consumption amounts ~0.5MB/token (resp. ~4MB/token).

Let’s focus on Llama-2–7B. Using half precision, loading the model weights consumes ~14GB of memory, same as a caching keys and values for 28k tokens. 28k tokens could for example correspond to a batch of 56 sequences of length 512 which is not particularly extreme.

We can see from the numbers above that the KV cache memory consumption can grow very large and even exceed the amount of memory required to load the model weights for large sequences.

Now let’s compare these numbers to the memory capacity of common NVIDIA data center GPUs (Table 2):

| GPU             | Memory (GB) | Memory bandwidth (GB/s) | FP16 Tensor Core (TFLOP/s) |
|-----------------|-------------|--------------------------|----------------------------|
| A10             | 24          | 600                      | 125                        |
| A100 PCIe/SXM   | 80          | 1935/2039                | 312                        |
| L4              | 24          | 300                      | 121                        |
| L40S            | 48          | 864                      | 362                        |
| H100 PCIe/SXM   | 80          | 2000/3350                | 756/989                    |
| H200 SXM        | 141         | 4800                     | 989                        |


Let’s pick the rather cost-efficient A10 GPU, stick to Llama-2–7B and compute the maximum KV cache capacity. Once the model weights have been loaded, 24–2x7=10 GB remain available for the KV cache, i.e. ~20k tokens total capacity, prompts included, which obviously does not allow to serve a lot of concurrent requests when processing or generating long sequences especially.
    - 让我们选择相当经济高效的A10 GPU，坚持使用Llama-2-7B并计算最大KV缓存容量。一旦加载了模型权重，24-2x7 = 10gb仍可用于KV缓存，即~20k令牌总容量，包括提示，这显然不允许在处理或生成长序列时提供大量并发请求，特别是。
We now understand that the KV cache prevents us from processing or generating very long sequences (i.e. obstacle long context windows) and/or from processing large batches and therefore from maximizing our hardware efficiency.
    - 我们现在明白KV缓存阻止我们处理或生成非常长的序列(即障碍长上下文窗口)和/或处理大批量，因此无法最大化我们的硬件效率。
In that perspective, maximizing our processing capacity means having as much room as possible for the KV cache which can be achieved by:
    - Reducing the model weight memory footprint (weight quantization)
    - Reducing the KV cache memory footprint
    - Pooling memory from multiple devices by sharding our model over multiple GPUs at the cost of network communication (model parallelism) or using other kind of storage like CPU memory or disk (offloading)

Since the model weights and the ever-growing KV cache have to be loaded on each forward pass, decoding steps involves very large data transfer and as we will see in the next posts, are actually memory-bandwidth bound, i.e. we actually spend more time moving data than doing useful work, i.e. compute. In such regime, latency can only be improved by either having more memory bandwidth (i.e. better hardware) or by transferring less data. Smaller model weights and KV cache free up memory for more sequence and therefore enable to increase throughput (and/or the maximum sequence length).
    - 由于模型权重和不断增长的KV缓存必须在每次转发时加载，解码步骤涉及非常大的数据传输，并且正如我们将在下一篇文章中看到的那样，实际上是内存带宽限制，即我们实际上花费更多的时间移动数据而不是做有用的工作，即计算。在这种情况下，延迟只能通过拥有更多的内存带宽(即更好的硬件)或传输更少的数据来改善。较小的模型权重和KV缓存可以为更多序列释放内存，因此可以提高吞吐量(和/或最大序列长度)。
In that regard, memory footprint reduction strategies are triply useful as they allow us to increase our hardware utilization and therefore cost efficiency while reducing latency and increasing throughput.

### Digression - Why am I billed for my input tokens? 

At this point you should get a feeling as to why you are billed for both input and output tokens. Once the input prompt has been processed, i.e. at the end of the prefill phase, we have already consumed both GPU memory (to store the key and the value tensors of each input token) and compute (to pass the prompt tokens through the model).

| Model    | Input            | Output           |
|----------|------------------|------------------|
| gpt-4    | $0.03/1K tokens  | $0.06/1K tokens  |
| gpt-4-32k| $0.03/1K tokens  | $0.12/1K tokens  |

Let’s have a look at some real numbers. Assuming the total FLOPs count of the forward pass of a P parameters model is approximately 2.P FLOPs/token [5], processing a prompt using Llama-2-7B consumes ~0.5 MB/token of GPU memory (cf. above) and ~14 GFLOPs/token of GPU compute. For a 1000 token prompt (a bit less than a two-pager), thats ~500MB of memory and 14 TFLOPs of compute and we have not generated anything yet.

Now let’s have a look at all the ways we can reduce the memory footprint of the KV cache by taking the formula above and looking at each of its terms in turn:

![Image 4: a black and white image with the words'two heads heads head' written on it](https://miro.medium.com/v2/resize:fit:265/1*x3UMm0rAKOf8EriN56c8pA.png)

### What about reducing the batch size?

In most cases, we don’t want to decrease the batch size since while it helps with the KV cache memory footprint and hence with the latency, it decreases our hardware utilization and therefore our cost efficiency. In the following posts we will indeed see that on the contrary, we want to increase the batch size as much as we can.
    - 在大多数情况下，我们并不希望减小批处理的大小，因为虽然它有助于减小KV缓存的内存占用，从而降低延迟，但它会降低我们的硬件利用率，从而降低我们的成本效益。

### What about reducing the dependency to the total sequence length?

One reason not to store the keys and the values for all the tokens in the sequence would be that we explicitly choose to recompute the missing ones on each iteration because it is worth spending the FLOPS instead of consuming GPU memory (for example because we are memory-bandwidth bound, which is the case during the auto-regressive phase). To the best of my knowledge, this is not something I know of in practice so we won’t dive deeper in that direction.
    - 不存储序列中所有令牌的键和值的一个原因是，我们明确选择在每次迭代时重新计算缺失的部分，因为这样做花费的浮点运算次数(FLOPS)比起占用GPU内存来更值得。
    - 例如，因为我们受到内存带宽的限制，这在自回归阶段是常见的情况。
    - 据我所知，这不是我在实践中知道的东西，所以我们不会在这个方向上深入研究。
Another perspective would be that we could not bother storing the keys and the values for tokens the model pays no or very little attention to. This could be the case by design for models trained to attend to only part of the sequence (for example with Mistral AI’s Mistral-7B) or as part of a compromise between memory consumption and model accuracy. Let me explain.
    - 另一个观点是，我们可以不必存储模型对其几乎不关注或完全不关注的令牌的键和值。
    - 这种情况可能是由于模型被训练为只关注序列的一部分(例如Mistral AI的Mistral- 7b)，或者作为内存消耗和模型准确性之间妥协的一部分。让我解释一下。
Models like Mistral-7B [6] are trained not to pay attention to the whole sequence. Mistral-7B attention layers indeed build token representations by attending to the last (4096) neighboring tokens only. This variant of the attention mechanism is called sliding window attention (SWA) or local attention. By design, local attention guarantees that we will never store more tensor pairs per sequence in the KV cache than the window size (e.g. 4096).
    - 像Mistral-7B[6]这样的模型被训练成不关注整个序列。Mistral-7B注意层确实通过只关注最后(4096)个相邻标记来构建标记表示。
    - 这种注意机制的变体被称为滑动窗口注意(SWA)或局部注意。通过设计，局部关注保证我们在KV缓存中存储的每个序列的张量对永远不会超过窗口大小。
Another approach consists in taking advantage of patterns in the way attention layers spread their attention over the tokens in the sequence. It is indeed known that attention modules disproportionately and consistently allocate more attention to a handful tokens in the sequence (Figure 1). By contrast, many tokens consistently contribute very little to the output so why bother storing their keys and values at all.
    - 另一种方法是利用注意力层在序列中的令牌上分配注意力的模式。我们确实知道，注意力模块不成比例地、持续地将更多注意力分配给序列中的少数token(图1)。相比之下，许多token对输出的贡献一直很小，所以为什么要费心存储它们的键和值呢?

![Image 5: an image of a pixel graph with a red, blue, and blue color](https://miro.medium.com/v2/resize:fit:700/1*Ng1yJGPx-PgM5qP54rkH3w.png)

Figure 1 — Example of attention (heat)map from the StreamingLLM paper: A lot of attention is consistently allocated to the first token and to the last neighboring tokens (local attention)
By discarding these tokens, we de facto set the corresponding attention scores to zero and approximate the attention matrix with a sparser one. A successful approximation would minimize the approximation error and therefore the impact on model accuracy (measured using perplexity for example).
    - 通过丢弃这些标记，我们实际上将相应的注意力得分设置为零，并用一个更稀疏的注意力矩阵来近似注意力矩阵。成功的近似将使近似误差最小化，从而使对模型精度的影响最小化(例如使用困惑度来测量)。

Let’s have a look at a few methods that emerged over the past few months and which are readily applicable without any retraining nor fine-tuning: the StreamingLLM framework, H2O (Heavy-Hitter Oracle), Scissorhands and FastGen. To the best of my knowledge however, none of them is yet supported by any popular LLM inference framework.
    - 让我们看看过去几个月出现的一些方法，这些方法很容易适用，无需任何重新训练或微调:StreamingLLM框架，H2O(重量级Oracle)， Scissorhands和FastGen。然而，据我所知，它们都没有得到任何流行的LLM推理框架的支持。

Targeting models trained with a finite length context window, the StreamingLLM framework [7] builds on the observation that the initial tokens collect a large amount of attention. The framework therefore builds a sliding window by only keeping the very first positional tokens (”sink tokens”) and the last neighboring tokens (local attention) in the cache. The StreamingLLM KV cache is therefore of fixed length with both a fixed part (typically 1 to 4 tokens) and a sliding part.
    - 针对使用有限长度上下文窗口训练的模型，StreamingLLM框架[7]建立在观察到初始令牌收集大量注意力的基础上。因此，框架通过仅在缓存中保留第一个位置令牌(“接收令牌”)和最后一个相邻令牌(本地注意)来构建滑动窗口。因此，StreamingLLM KV缓存具有固定长度，具有固定部分(通常为1到4个令牌)和滑动部分。

The similar H2O [8] and Scissorhands [9] methods explicitly aim at compressing the KV cache by setting a maximum number of cached tokens (budget) and by discarding tokens every time the cache budget has been reached. The H2O algorithm only discards one token at a time while Scissorhands drops as many tokens as required by a target compression ratio (e.g. 30% KV cache size reduction).
    - 类似的H2O[8]和Scissorhands[9]方法明确旨在通过设置缓存令牌的最大数量(预算)和每次达到缓存预算时丢弃令牌来压缩KV缓存。H2O算法每次只丢弃一个令牌，而剪刀手丢弃目标压缩比所需的令牌(例如30% KV缓存大小减少)。

Both approaches build on the observation that influent tokens at a given step (”pivotal tokens” or “heavy hitters”) remain influent at future steps (what the Scissorhands authors name the Persistence of Importance Hypothesis). In other words, we are ensured that the discarded low-influence tokens would have remained relatively ignored at future steps so they can be safely dropped.
    - 这两种方法都基于这样的观察，即在给定步骤中的影响符号(“关键符号”或“重拳”)在未来的步骤中仍然具有影响力(剪刀手的作者将其命名为重要性持久性假设)。换句话说，我们可以确保丢弃的低影响力令牌在未来的步骤中相对被忽略，因此可以安全地丢弃它们。

A key aspect of both algorithms is obviously the cache eviction policy. Scissorhands simply keeps the most recent tokens and the tokens with the highest attention scores within a history window. H2O discards the token with the lowest cumulated attention scores and therefore only keeps the tokens that consistently achieve high attention scores across iterations. Both author teams have shown that their algorithm achieve up to 80% KV cache size reduction with negligible model accuracy loss.
    - 这两种算法的一个关键方面显然是缓存清除策略。剪刀手只是在历史窗口中保存最近的令牌和具有最高注意力分数的令牌。H2O丢弃累积注意力分数最低的令牌，因此只保留在迭代中始终获得高注意力分数的令牌。两个作者团队都表明，他们的算法在模型精度损失可以忽略不计的情况下实现了高达80% KV的缓存大小减少。

The FastGen method  (not to be confused with the unrelated DeepSpeed-FastGen) still builds on attention patterns but takes another approach by not setting a cache budget but a maximum approximation error for the attention matrix hence focusing on model accuracy preservation.
    -FastGen方法(不要与不相关的DeepSpeed-FastGen混淆)仍然建立在注意力模式的基础上，但采用了另一种方法，不设置缓存预算，而是设置注意力矩阵的最大近似误差，因此专注于模型精度保持。

![Image 6: a bar chart with different types of animals](https://miro.medium.com/v2/resize:fit:700/1*iHTisJJMMU-tWnUhl_4SbQ.png)

Figure 2 — Example of set of compression policies from the FastGen paper: Special tokens (green) + Punctuation tokens (orange) + Local attention (blue). Discarded tokens are colored in gray.

FastGen is a two-step approach: first, the model’s attention layers are profiled at the end of the prefill phase to determine the set of compression policies that allow to meet the error target. Like the other methods, it assumes that the identified attention patterns will hold in future generation steps. Compression policies include: keep special tokens, keep punctuation tokens, keep last neighboring tokens (local attention), etc. (Figure 2). If the error target is too stringent and cannot be met, FastGen falls back to regular KV caching. Then, the chosen compression policies are applied to the KV cache at each generation step.
     - FastGen是一种分两步的方法:首先，在预填充阶段结束时对模型的注意层进行分析，以确定允许满足错误目标的压缩策略集。与其他方法一样，它假设已识别的注意力模式将在未来的生成步骤中保持不变。压缩策略包括:保留特殊令牌、保留标点令牌、保留最后一个相邻令牌(局部注意)等(图2)。如果错误目标过于严格而无法满足，FastGen会退回到常规KV缓存。然后，将选择的压缩策略应用于KV缓存的每个生成步骤。

Notice that contrary to other methods, FastGen builds a compression policy tailored to each prompt. The FastGen authors show that for a given KV cache compression ratio, they better preserve model accuracy than H2O and Scissorhands.
    -  注意，与其他方法相反，FastGen为每个提示构建了定制的压缩策略。请注意，与其他方法相反，FastGen构建了针对每个提示的压缩策略。FastGen的作者表明，对于给定的KV缓存压缩比，他们比H2O和剪刀手更好地保持了模型的准确性。

In any case, breaking the dependency to the unpredictable total sequence length is a relief since it allows to give each sequence a memory budget and therefore greatly ease memory management. Since data transfer is the main contributor to the latency, not having a KV cache that grows linearly with the sequence length can bring spectacular speedups for longer sequence lengths especially.
    - 在任何情况下，打破对不可预测的总序列长度的依赖是一种解脱，因为它允许给每个序列一个内存预算，因此大大简化了内存管理。由于数据传输是延迟的主要原因，所以不使用随序列长度线性增长的KV缓存可以带来惊人的加速，特别是对于较长的序列长度。

### What about reducing the number of layers?

There is not much to gain here. Smaller models usually have less layers (Table 4) so if a smaller model performs well on your use case, simply go for it.
| Model      | n_layers | n_heads | d_model | d_qkv |
|------------|----------|---------|---------|-------|
| Llama-2-7B | 32       | 32      | 4096    | 128   |
| Llama-2-13B| 40       | 40      | 5120    | 128   |
| Llama-2-70B| 80       | 64      | 8192    | 128   |


### What about reducing the number of attention heads?

Since for a given model architecture, the model size is mainly controlled by the number of layers and the number of heads, reducing the number of heads can mean opting for a smaller model
    - 鉴于对于给定的模型架构，模型大小主要由层数和头数控制，减少头数可能意味着选择一个更小的模型。
However, if we take a closer look, we notice that we only need to reduce the number of key and value heads, the number of query heads does not impact the KV cache size. This is precisely the idea behind the multi-query attention (MQA) [11] and grouped-query attention (GQA) [12] architectures. The sole motivation of these variants of the multi-head attention (MHA) is KV cache size reduction.
    - 然而，如果我们仔细观察，我们注意到我们只需要减少键和值头的数量，查询头的数量并不影响KV缓存大小。这正是多查询关注(MQA)[11]和分组查询关注(GQA)[12]架构背后的思想。这些多头注意(MHA)变体的唯一动机是KV缓存大小的减小。

MQA was introduced first in 2019. In MQA, all query heads share the same single key and value heads. In other words, all query heads compute their attention scores using the same keys and all head outputs are computed using the same values (but not the same attention scores) 
    - MQA于2019年首次推出。在MQA中，所有查询头共享相同的单个键和值头。换句话说，所有查询头都使用相同的键来计算它们的注意力分数，并且所有查询头输出都使用相同的值来计算(但不是相同的注意力分数)。

![Image 7: two diagrams of a pnp system](https://miro.medium.com/v2/resize:fit:700/1*IMdGztuTYzayTfQ_k6q6Ug.png)
Figure 3 — Multi-head attention (above) vs. Multi-query attention (below) (Two attention heads)

Stripping all heads is however relatively more aggressive for larger models. For example, going from 64 heads down to 1 is comparatively a bigger cut in the model’s representation capacity than going from 32 heads down to 1. GQA solves the problem by providing a midway solution: instead of having all the query heads to share the same unique KV heads, we split them into groups of g query heads and query heads from the same group share the same unique KV heads. In other words, instead of downsizing from n_heads to 1 KV head, the number of KV heads is cut from n_heads down to 1<g<n_heads.
    - 然而，对于较大的模型，剥离所有头部相对更具激进。
    - 例如，与从32个头降低到1相比，从64个头降低到1对模型表示能力的影响更大。
    - GQA通过提供一个中间解决方案来解决这个问题:我们不是让所有的查询头共享相同的唯一KV头，而是将它们分成g个查询头组，同一组的查询头共享相同的唯一KV头。
    - 换句话说，不是从n_heads减少到1 KV head，而是从n_heads减少到1<g<n_heads。

In that perspective, both MHA and MQA are particular cases of GQA (g=1 and g=n_heads respectively). QGA allows to navigate the model accuracy / KV cache size (which is connected to both latency and throughput) compromise more smoothly between two extreme cases, MHA and MQA.
    - 从这个角度来看，MHA和MQA都是GQA的特殊情况(分别为g=1和g=n_heads)。QGA允许在两种极端情况(MHA和MQA)之间更顺利地导航模型精度/ KV缓存大小(与延迟和吞吐量相关)。

Accounting for this new parameter g, the KV cache size formula becomes:

![Image 8: a chemical formula with the words dp 2 dp 2 dp 2 dp 2 dp 2 dp](https://miro.medium.com/v2/resize:fit:266/1*gqAb8IK4WRz3fr1LLsswWw.png)

In practice, the MQA/GQA architecture has been notably implemented by Google Research’s PaLM [13], TII’s Falcon [14] models, Meta’s Llama-2 [1] (70B only) and Mistral AI’s Mistral-7B [7] (Table 5).

| Model      | n_layers | n_heads | n_KV_heads | d_head | d_model | Attention |
|------------|----------|---------|------------|--------|---------|-----------|
| Llama-2-7B | 32       | 32      | 32         | 128    | 4096    | MHA       |
| Llama-2-13B| 40       | 40      | 40         | 128    | 5120    | MHA       |
| Llama-2-70B| 80       | 64      | 8          | 128    | 8192    | GQA       |
| Falcon-7B  | 32       | 71      | 1          | 64     | 4544    | MQA       |
| Falcon-40B | 60       | 128     | 8          | 64     | 8192    | GQA       |
| Falcon-180B| 80       | 232     | 8          | 64     | 14848   | GQA       |
| Mistral-7B | 32       | 32      | 8          | 128    | 4096    | GQA       |
| PaLM-8B    | 32       | 16      | 1          | 256    | 4096    | MQA       |
| PaLM-62B   | 64       | 32      | 1          | 256    | 8192    | MQA       |
| PaLM-540B  | 118      | 48      | 1          | 384    | 18432   | MQA       |

### What about the hidden dimension of attention heads?

Once again, there is nothing much to gain here if you are not ready to opt for another model. Depending on the model family, the head hidden dimension can be constant across model sizes (e.g. Llama-2, Falcon) so going for a smaller variant from the same family won’t help.

### What about using less bytes per parameter?

Quantizing the KV cache is indeed a great way to drastically reduce its size. However, weight-only quantization algorithms like AWQ [15] or GPTQ [16] won’t help by definition. Only algorithms that quantize both weights and “activations” (i.e. anything that is not a weight) such as LLM.int8()[17] or SmoothQuant [18] would produce a quantized KV cache.
    - 量化KV缓存确实是大幅减少其大小的好方法。然而，AWQ[15]或GPTQ[16]等仅限权重的量化算法从定义上来说并没有帮助。只有量化权重和“激活”(即任何不是权重的东西)的算法，如LLM.int8()[17]或SmoothQuant[18]，才能产生量化的KV缓存。

Notice that one of the intent of quantization algorithms that work on both weights and activations is to perform the compute-intensive matrix multiplications in lower precision. This gives a performance boost if compute bound like during training but as we will see in the next posts, the autoregressive phase of inference is actually memory-bandwidth bound so being able to compute faster does not bring much value. Since inference is memory-bandwidth bound, we are actually only interested in the reduction of the memory footprint since it means less data transfer.
    - 注意，同时处理权重和激活的量化算法的目的之一是以较低的精度执行计算密集型矩阵乘法。
    - 如果在训练期间计算受限，这将提高性能，但正如我们将在下一篇文章中看到的那样，推理的自回归阶段实际上是内存带宽受限的，因此能够更快地计算并没有带来太多价值。
    - 由于推理受内存带宽限制，我们实际上只对减少内存占用感兴趣，因为这意味着更少的数据传输。
From that perspective, quantization algorithms like LLM.int8() or SmoothQuant are a bit overkill: quantizing the cached tensors before moving them to GPU memory and dequantizing the same tensors after having fetched them from GPU memory (at the cost of additional overhead) should be enough.
    - 从这个角度来看，像LLM.int8()或SmoothQuant这样的量化算法有点过头了:在将缓存的张量移动到GPU内存之前对它们进行量化，并在从GPU内存获取它们之后对相同的张量进行去量化(以额外的开销为代价)应该足够了。
From that perspective, quantization algorithms like LLM.int8() or SmoothQuant are a bit overkill: quantizing the cached tensors before moving them to GPU memory and dequantizing the same tensors after having fetched them from GPU memory (at the cost of additional overhead) should be enough.

A few LLM inference systems already include such a KV caching quantization feature. For example, FlexGen [19] quantizes and stores both the KV cache and the model weights in a 4-bit data format. NVIDIA TensorRT-LLM is capable of quantizing the KV cache in 8-bit data formats (INT8 or FP8). The popular vLLM framework has been supporting KV cache (FP8) quantization since version 0.3.0 as well. Since quantization is performed dynamically at each iteration, no calibration step is required.
    - 一些LLM推理系统已经包含了这样的KV缓存量化特性。例如，FlexGen[19]将KV缓存和模型权重量化并以4位数据格式存储。NVIDIA TensorRT-LLM能够量化8位数据格式(INT8或FP8)的KV缓存。流行的vLLM框架也从0.3.0版本开始支持KV缓存(FP8)量化。由于量化在每次迭代中都是动态执行的，因此不需要校准步骤。

### On the importance of efficient memory management

Until now, we implicitly assumed that there is no waste in memory: all the reserved memory is used to store tokens and all the available memory can be reserved. In practice, naive memory management strategies can lead to significant part of the memory to be wasted (the PagedAttention paper [20] showed that actual effective memory utilization could be as low as 20%, i.e. 80% waste!):
    * Since the total sequence length of a request is unknown in advance, we could reserve contiguous memory chunks capable to fit the maximum sequence length. Significant part of this allocation will surely never be used and since unavailable for other requests, wasted (internal memory fragmentation).
    * Even if the sequence length is know in advance, since memory is consumed gradually but the memory chunks are reserved for the request’s lifetime, shorter requests cannot use still-unused memory chunks.
    * If we use decoding strategies that produce multiple sequences per request like beam search, the multiple candidate sequences could actually partially share their KV cache. If we do not account for this scenario, we will inevitably waste memory by storing duplicate KV entries that could have been shared.

These shortcomings are exactly what the now popular PagedAttention algorithm aims to solve. PagedAttention allocates fixed-size and relatively small memory chunks called blocks. Each block can contain a fixed number of tokens and if necessary be shared across different requests. On-demand allocation and the small block size alleviates internal memory fragmentation while same-size blocks eliminates external memory fragmentation.
    - 些缺点正是目前流行的PagedAttention算法旨在解决的。PagedAttention分配固定大小和相对较小的内存块，称为块。每个块可以包含固定数量的令牌，并在必要时跨不同请求共享。按需分配和小块大小减轻了内部内存碎片，而相同大小的块消除了外部内存碎片。

Overall, PagedAttention achieves a near-zero waste in KV cache memory (less than 4% [21]). The previously wasted memory can now be used to fit more requests and therefore to increase throughput. The throughput improvement figures from PagedAttention when it came out were as spectacular as the levels of memory waste were high at the time.
     - 总的来说，PagedAttention在KV缓存内存中实现了接近零的浪费(小于4%[21])。以前浪费的内存现在可以用来适应更多的请求，从而提高吞吐量。当PagedAttention出现时，它的吞吐量改进数据与当时内存浪费的水平一样惊人。

PagedAttention was first implemented by the vLLM inference system but is now supported by all the major inference frameworks (e.g. HuggingFace TGI, NVIDIA TensorRT-LLM, LMDeploy TurboMind, etc.).

Another possible optimization not covered by PagedAttention is reusing the key-value cache across requests. This would apply when the prompts share a common prefix, which commonly occurs in multi-round use cases like chat and agents or when using prompt templates (Figure 4).

![Image 9: a diagram showing the different stages of a process](https://miro.medium.com/v2/resize:fit:569/1*C9PaYlOPDEg-5Rslyy3GYQ.png)

Figure 4 — KV cache sharing example (multi-turn chat) from the SGLang paper totaling four generation requests. Blue boxes represent shareable prompt parts.

Being able to reuse the KV cache across requests would enable significant latency (especially first token latency) and throughput (by greatly reducing the memory footprint of concurrent requests with a shared prefix) improvements.
    - 能够跨请求重用KV缓存将显著提高延迟(特别是第一个令牌延迟)和吞吐量(通过使用共享前缀大大减少并发请求的内存占用)。

Instead of discarding the KV cache after finishing a generation request, the RadixAttention algorithm keeps it in GPU memory and adds a new entry to a dedicated data structure (radix tree) that maps the sequence of tokens to their KV cache tensors. When a new request comes in, the scheduler uses the radix tree for prefix matching. If there is a cache hit, the scheduler reuses the cached KV tensors to fulfill the request.
    - RadixAttention算法没有在完成生成请求后丢弃KV缓存，而是将其保存在GPU内存中，并将新条目添加到专用数据结构(基数树)中，该数据结构将令牌序列映射到它们的KV缓存张量。当有新请求进来时，调度器使用基数树进行前缀匹配。如果缓存命中，调度器重用缓存的KV张量来完成请求。

Since GPU memory is limited, cached KV tensors cannot be retained forever. The RadixAttention algorithm therefore includes an eviction policy (e.g. least recently used (LRU) eviction policy). Optimal cache reuse may not be compatible with schedules such as first-come-first-serve. RadixAttention therefore comes with a modified scheduler which prioritizes requests that match cached prefixes (cache-aware scheduling).
    — 由于GPU内存有限，缓存的KV张量不能永远保留。因此，RadixAttention算法包括一个驱逐策略(例如最近最少使用(LRU)驱逐策略)。最佳缓存重用可能与诸如先到先服务之类的调度不兼容。因此，RadixAttention附带了一个修改过的调度器，它对匹配缓存前缀的请求进行优先级排序(缓存感知调度)。

Note: Naming for both PagedAttention and RadixAttention is a bit misleading since contrary to what one might think, they are not optimizations of the model’s attention layer (like FlashAttention) but operate at the model server level (they help the serving application to better manage the KV cache on the host).
    - 注意:PagedAttention和RadixAttention的命名有点误导人，因为与人们所想的相反，它们不是模型注意力层的优化(如FlashAttention)，而是在模型服务器级别操作(它们帮助服务应用程序更好地管理主机上的KV缓存)。

### If we are short on GPU memory, why not “just” using multiple GPUs? or offloading to CPU memory or even to disk?

First about offloading to more abundant while slower storages (CPU memory and disk). Not all inference frameworks support this feature, let’s cite HuggingFace Accelerate, DeepSpeed-Inference and the more advanced FlexGen. Since it involves using much slower storages, offloading comes at the price of a strong latency hit so this option should obviously not be favored for latency sensitive use cases. Offloading systems are usually intended for throughput-oriented use cases like offline batch processing.

Regarding using multiple GPUs (which cannot be avoided for larger models), sharding the model over multiple devices allows to release the memory pressure by benefiting from both aggregated memory capacity and memory bandwidth.

If opting for pipeline parallelism [23], both the model and the KV cache are sharded across the layer dimension. If opting for tensor parallelism [24] (more common for inference), the KV cache is sharded across the heads dimension. Notice that MQA becomes quite inefficient in that setup: since we cannot shard a single head across multiple devices, the KV cache has to be replicated on all the devices therefore losing the benefits of MQA. An alternative for models implementing MQA is to shard the KV cache across the batch size dimension [25].

In any case, all the cases above assume a single host, we are still bounded by the storage capacity of the largest multi-GPU instance we can put our hands on. To the best of my knowledge, no inference framework support multi-host model parallelism yet. If we were able to shard both the model and the KV cache on multiple hosts, the amount of available memory and the maximum sequence length we would be capable to process become virtually unlimited. This is the problem that the Infinite-LLM paper [26] aims to solve by both introducing a new distributed attention algorithm (DistAttention) and adapting the Ray framework to build a multi-host distributed KV cache management and scheduling system (DistKV-LLM).

#### Summary

In this post, we learned how opting for KV caching creates additional challenges. The KV cache of multi-head attention (MHA) models indeed consumes a lot of GPU memory, in the order of ~1MB/token, and can easily grow larger than the model weights.
 - 在这篇文章中，我们了解了选择KV缓存如何带来额外的挑战。多头关注(MHA)模型的KV缓存确实消耗了大量GPU内存，大约为~1MB/令牌，并且很容易比模型权重大。
Given how limited GPU memory is, the KV cache memory pressure induced a lot of initiatives in different directions: novel attention architectures (MQA, GQA, SWA), cache compression strategies (H2O, Scissorhands, FastGen), efficient memory management (PagedAttention, RadixAttention), quantization and storage capacity expansion (offloading systems, single- and multi-host model parallelism).
    - 鉴于GPU内存有限，KV缓存压力在不同方向上引发了许多创新:新颖的注意力架构(MQA, GQA, SWA)，缓存压缩策略(H2O, Scissorhands, FastGen)，高效的内存管理(PagedAttention, RadixAttention)，量化和存储容量扩展(卸载系统，单主机和多主机模型并行)。
As we will see in the following posts, reducing the KV cache size is key not only because of limited GPU memory but because the amount of data movement is actually the main contributor to the latency of each autoregressive step and therefore of the generation process as a whole.
    — 正如我们将在以下文章中看到的那样，减少KV缓存大小是关键，不仅因为GPU内存有限，而且因为数据移动量实际上是每个自回归步骤延迟的主要贡献者，因此整个生成过程也是如此。

## Dissecting model performance(解刨模型性能)

This Section we will talk about different performance bottlenecks that can affect the speed of a machine learning model, focusing specifically on LLM inference setups. It identifies four main performance bottleneck categories, including compute bound, memory bandwidth bound, and communications bound processes, and emphasizes the importance of optimizing for the compute bound regime for cost efficiency.
- 本节我们将讨论可能影响机器学习模型速度的不同性能瓶颈，特别关注LLM推理设置。它确定了四个主要的性能瓶颈类别，包括计算约束、内存带宽约束和通信约束进程，并强调了优化计算约束机制以提高成本效率的重要性。

### The four kinds of performance bottlenecks

If you are unhappy with your model’s performance and ready to invest time into improvements, the first step is identifying the bottleneck type. There are four main performance bottleneck categories — three related to hardware limitations and one tied to software.

Let’s start by examining the hardware bottlenecks. Each of these corresponds to a specific operational regime:

* Compute bound regime: Most of the processing time, i.e. latency, is spent performing arithmetic operations (Figure 1). Compared to the other regimes and since you are primarily paying for compute, the compute bound regime is the most cost efficient and therefore the one we should aim for.
![Image 2: a diagram of a line with a arrow pointing in the direction of the line](https://miro.medium.com/v2/resize:fit:700/1*z3u3T2hpslUxpFgyQ1NhGQ.png)
Figure 1 — A compute bound process with compute and data transfer time highlighted in yellow and blue respectively
    - - **Word**: Regime
        - **Lemma**: Regime
        - **Pronunciation**: /rɪˈʒiːm/
        - **Definition**: A system or planned way of doing things, especially one imposed from above.
        - **Translation**: 制度
        - **Context**: Compute bound regime.
        - **Context_translation**: 计算约束制度。
*  **Memory bandwidth bound:** Most of the processing time is spent moving data like weight matrices, intermediate computations, etc., between chip memory and processors (Figure 2).
    - 大部分处理时间都花在在芯片存储器和处理器之间移动数据，如权重矩阵、中间计算等
![Image 3: a diagram of a striped pattern with an arrow pointing in the direction of the striped pattern](https://miro.medium.com/v2/resize:fit:700/1*lyYiBpY0BxNY4FjLfwkPpg.png)
Figure 2 — A memory bandwidth bound process with compute and data transfer time highlighted in yellow and blue respectively

- Bandwidth costs are essentially the cost paid to move data from one place to another. This might be moving the data from CPU to GPU, from one node to another, or even from CUDA global memory to CUDA shared memory. This last one, in particular, is what we'll be focusing on here, and is typically referred to as "bandwidth cost" or "memory bandwidth cost".
    - 带宽成本本质上是将数据从一个地方移动到另一个地方所支付的成本。这可能会将数据从 CPU 移动到 GPU、从一个节点移动到另一个节点，甚至从 CUDA 全局内存移动到 CUDA 共享内存。最后一项是我们在这里重点关注的，通常称为“带宽成本”或“内存带宽成本”。
- data transfer costs: moving the data from CPU to GPU: 
- from one node to another: network costs
- from CUDA global memory to CUDA shared memory: bandwidth cost, memory bandwidth cost
![Memory Hierarchy with Bandwidth & Memory Size](https://github.com/Dao-AILab/flash-attention/blob/main/assets/flashattn_banner.jpg)
- GPU Compute is where we do the actual work, it's not suitable as a bulk storage unit. A large part of this is that since we're doing actual work here, all the storage is optimized for being fast to actually use (SRAM), instead of having a lot of it.
    - GPU是我们进行实际工作的地方，但它不适合作为散装存储单元。其中很大一部分原因是，由于我们在这里进行实际工作，因此所有存储都经过优化，以便能够快速实际使用（SRAM），而不是拥有大量存储。
- So, where do we store the actual results and materials? The typical approach is to have a warehouse, probably somewhere where land is cheap and we have a lot of space (DRAM). Then, we can ship supplies to and from our factories (memory bandwidth).
    - 那么，我们将实际结果和材料存储在哪里呢？典型的方法是建立一个仓库，可能是在土地便宜且有大量空间（DRAM）的地方。然后，我们可以将物资运送到我们的工厂或从我们的工厂运送物资（内存带宽）。
![Bandwith Cost](https://horace.io/img/perf_intro/factory_bandwidth.png)
- This cost of moving stuff to and from our compute units is what's called the "memory bandwidth" cost. As an aside, your GPU's DRAM is what shows up in nvidia-smi, and is the primary quantity responsible for your lovely "CUDA Out of Memory' errors.
    - 将数据移入和移出计算单元的成本就是所谓的“内存带宽”成本。顺便说一句，您的 GPU 的 DRAM 是 nvidia-smi 中显示的内容，并且是导致可爱的“CUDA Out of Memory”错误的主要数量。
- One thing to note is that every single time we perform a GPU kernel, we need to move our data from and back to our GPU's DRAM (i.e. our warehouse).
    - 需要注意的一件事是，每次执行 GPU 内核时，我们都需要将数据从 GPU 的 DRAM（即我们的仓库）移出或移回。
- Now, imagine what happens when we perform an unary operation like torch.cos. We need to ship our data from our storage to the warehouse, then perform a tiny bit of computation for each piece of data, and then ship that storage back. Shipping things around is quite expensive. As a result, nearly all of our time here is spent shipping data around, and not on the actual computation itself.
    - 现在，想象一下当我们执行像 torch.cos 这样的一元操作时会发生什么。我们需要将数据从存储发送到仓库，然后对每条数据执行少量计算，然后将该存储发送回。运送东西的费用相当昂贵。因此，我们几乎所有的时间都花在了传输数据上，而不是实际的计算本身。
- Since we're spending all of our time on memory-bandwidth, such an operation is called a memory-bound operation, and it means that we're not spending a lot of time on compute.
    - 由于我们将所有时间都花在内存带宽上，因此此类操作称为内存限制操作，这意味着我们不会在计算上花费大量时间。
- Communications bound (not covered by [1]): Only applies when computations and data are distributed across multiple chips. Most of the processing time is taken up by networking data transfer between chips (Figure 3).
![Image 4: a diagram of a striped pattern with a arrow pointing in the direction of the striped pattern](https://miro.medium.com/v2/resize:fit:700/1*JqBF7jrc2H75VIUKiIYDnA.png)
Frgure 3 — A communications bound process with compute, data transfer and network communications time highlighted in yellow, blue and green respectively
**Notice:** I use the word “chip” since these concepts apply to any kind of chip: CPUs, GPUs, custom silicon (Google TPUs, AWS Neuron Cores, etc.), etc.
- Note that modern hardware and frameworks are highly optimized and compute and data transfer tasks usually partially overlap (Figure 4). For simplicity, we will keep assuming they occur sequentially in this post.
![Image 5: a diagram showing the process of running a program](https://miro.medium.com/v2/resize:fit:700/1*YTS_VgjNkdKFVbws8i2-vw.png)
Figure 4 — A communications bound process with overlapping data transfer

- The last regime is called overhead bound and relates to software-induced limitations. In this regime, most of the processing time is spent scheduling work and submitting it to the hardware — essentially, we spend more time figuring out what to do than performing actual operations on the hardware (Figure 5). Being overhead bound is more likely when using very flexible languages (e.g. Python) or frameworks (e.g. PyTorch) that don’t require explicitly specifying all information needed at runtime (like tensor data types, target device, kernels to invoke, etc.). This missing information must be inferred at runtime, with the corresponding CPU cycles called overhead. Accelerated hardware is now so fast compared to CPUs that situations in which overhead impacts the hardware utilisation and therefore cost efficiency are likely — essentially there are times when the hardware remains idle, waiting for the software to submit the next work item.
    - 最后一种情况被称为开销限制，并与软件引起的限制相关。在这种情况下，大部分的处理时间用于调度工作并将其提交给硬件——基本上，我们花费更多的时间来确定要做什么，而不是在硬件上执行实际操作（图5）。当使用非常灵活的语言（例如Python）或框架（例如PyTorch）时，更容易出现开销限制，因为这些语言或框架不需要在运行时显式地指定所有所需的信息（如张量数据类型、目标设备、需要调用的内核等）。这些缺失的信息必须在运行时推断，相应的CPU周期被称为开销。与CPU相比，加速硬件现在非常快，以至于开销影响硬件利用率和成本效益的情况很可能发生，基本上就是硬件在等待软件提交下一个工作项时保持空闲。

![Image 6: a diagram of a striped pattern with a arrow pointing in the direction of the striped pattern](https://miro.medium.com/v2/resize:fit:700/1*v5gYw8th0X1hPVtZKOyXSQ.png)

Figure 5 — An overhead bound process with compute, data transfer and software overhead time highlighted in yellow, blue and purple respectively

- Executing a model backward or forward pass involves running multiple kernel executions (~ GPU function calls). It is unlikely that all kernels operate in the same regime. What matters is identifying the regime where most of the execution time is being spent. The priority then becomes optimizing for that primary bottleneck, pinpointing the next most significant one, and so on.
    - 执行模型向后或向前传递涉及运行多个内核执行(~ GPU函数调用)。
    - 不可能所有的内核都在相同的机制下运行。
    - 重要的是确定将大部分执行时间花在哪个制度上。
    - 然后优先级变为针对主要瓶颈进行优化，确定下一个最重要的瓶颈，依此类推。
- Being right at identifying the type of bottleneck is critical. Each issue requires different solutions. If you get your diagnosis wrong, you may waste your time implementing an optimization that disappoints if it helps at all.

### Diagnosing the limiting factor

- We won’t delve into extensive detail here, but [1] highlights that when overhead bound, runtime does not scale proportionally with increased compute or data transfer. In other words, if you double your compute or data transfer capacity but runtime fails to increase accordingly, your program is likely overhead bound. Otherwise you are hardware bound, but distinguishing between bottlenecks like compute versus memory bandwidth requires access to metrics like FLOP count and data transfer volume, i.e. to use a profiler.

- Bringing LLMs back into frame, keep in mind that training and inference pre-fill phase are usually compute bound while inference decoding phase is usually memory bandwidth bound on most hardwares. Optimizations primarily intended for training (e.g. lower-precision matrix multiplications) may therefore not be as helpful if applied to reduce total inference latency which is dominated by the decoding latency.

### Optimizing for lower latency based on bottleneck type

In you are in the compute bound regime, you can:
 - Upgrade to a more powerful and more expensive chip with higher peak FLOPS.
 - For particular operations like matrix multiplications, leverage specialized, faster cores like NVIDIA Tensor Cores. For example the NVIDIA H100 PCIe [2] has 51 TFLOPS peak compute using general-purpose CUDA cores vs. 378 TFLOPS with specialized Tensor Cores (in full precision).
 - Reduce the number of required operations. More concretely with ML models, this could mean using less parameters to achieve the same outcome. Techniques like pruning or knowledge distillation can help.
 - Use lower precision and faster data types for computations. For example for the same NVIDIA H100 PCIe, 8-bit Tensor Cores peak FLOPS (1 513 TFLOPS) is twice 16-bit peak FLOPS (756 TFLOPS) which is twice 32-bit peak FLOPS (378 TFLOPS). This requires quantizing all inputs however (e.g. both the weight matrices and the activations, see for example the LLM.int8() [3] or SmoothQuant [4] quantization algorithms) and using dedicated lower precision kernels.
 
If you are in the memory bandwidth bound regime, you can:
- Upgrade to a more powerful and more expensive chip with higher memory bandwidth.
- Reduce the size of the data you move using for example model compression techniques like quantization or the not-as-popular pruning and knowledge distillation. Regarding LLMs, the data size issue is mostly tackled using weight-only quantization techniques (see for example the GTPQ [5] and AWQ [6] quantization algorithms) plus KV-cache quantization.
- Reduce the number of memory operations. Running tasks on GPUs boils down to the execution of a directed graph of kernels (~ GPU function calls). For each kernel, inputs must be fetched from memory and outputs written to it. Fusing kernels, i.e. performing operations initially scattered across multiple kernels as a single kernel call, allows to reduce the number of memory operations. Operator fusion (Figure 6) can either be performed automatically by a compiler or manually by writing your own kernels (which is harder but necessary for complex fusions).
    - 在GPU上运行计算任务的本质是执行一系列的并行程序（内核），这些程序按照他们之间的数据依赖关系（形成的有向图）进行组织和执行。
    - “内核”是指在GPU上执行的小的并行程序。这些内核可以组合在一起，形成一个“有向图”，其中的每个节点代表一个内核，每个边代表数据依赖关系。这意味着一些内核（或任务）的执行可能依赖于其他内核的结果。执行这个有向图就是按照这些依赖关系，以正确的顺序执行内核。
    ![Image 7: a diagram showing the structure of a database](https://miro.medium.com/v2/resize:fit:700/1*nxEuwsXRGrS_XmlG-4GwfA.png)
    Figure 6 — Example of both horizontal and vertical layer (operation) fusion applied to a CNN, inital state (above) & final state (below) \[8\]
- In the case of Transformer models, the development of highly efficient fused kernels for the attention layer remains an active field. Many optimized kernels are based on the popular FlashAttention algorithm [7]. Transformer fused kernels libraries include FlashAttention, Meta’s xFormers and the now deprecated NVIDIA FasterTransformer (merged into NVIDIA TensorRT-LLM).
    - 对于Transformer模型来说，对于注意力层高效融合核的开发仍然是一个活跃的研究领域。许多优化的核都是基于流行的FlashAttention算法[7]。Transformer融合核库包括FlashAttention、Meta的xFormers以及现已废弃的NVIDIA FasterTransformer（现已合并到NVIDIA TensorRT-LLM中）。 
    - Transformer融合的内核库包括FlashAttention, Meta的xFormers和现在已弃用的NVIDIA FasterTransformer(合并到NVIDIA TensorRT-LLM中)。

If you are in the communications bound regime, you can:
- Upgrade to a more powerful and more expensive chip with higher network bandwidth.
- Reduce the communication volume by opting for a more efficient partitioning and collective communication strategy. For example, [9] expands the popular tensor parallelism layout for Transformer models from [10] by introducing new tensor parallel strategies that allows communication times to better scale (i.e. prevent them from becoming a bottleneck) for large chip count and/or batch sizes.
    -  通过选择更高效的分区和集体通信策略来减少通信量。例如，[9]通过引入新的张量并行策略，扩展了Transformer模型的流行张量并行布局[10]，这些策略允许通信时间更好地扩展（即防止它们成为大规模芯片数量和/或批处理大小的瓶颈）。
    - For example, the tensor parallelism layout in [10] keeps the weights shards stationary while the activation shards are moved between the chips. At the pre-fill stage and for batches of very large sequences for example, [9] notes that activations can outsize the weights. So from a communications perspective, it becomes more efficient to keep activations stationary and move weight shards instead as in their “weight-gathered” partitioning strategy.
    - 例如，[10]中的张量并行布局使权重分片保持静止，而激活分片在芯片之间移动。例如，在预填充阶段和批量非常大的序列中，[9]注意到激活可以使权重过大。因此，从通信的角度来看，保持激活静止并移动权重碎片变得更有效，而不是像“权重收集”分区策略那样。

If you are in the overhead bound regime, you can:
    - Trade flexibility for less overhead by using a less flexible but more efficient language like C++.
    - Submit kernels in groups to amortize submission overhead across multiple kernels instead of paying it per kernel. This is especially beneficial when you need to submit the same group of short-lived kernels multiple times (e.g. in iterative workloads). CUDA Graphs (integrated to PyTorch since release 1.10 [11]) serve this purpose by providing utilities to capture all GPU activities induced by a code block into a directed graph of kernel launches for one-time submission.
    - Extract the compute graph ahead of time (AOT) into a deployable artifact (model tracing). For example, PyTorch torch.jit.trace traces a PyTorch program and package it into a deployable TorchScript program.
    - CUDA图表（自PyTorch 1.10版本发布以来已集成）通过提供将由代码块引起的所有GPU活动捕获到一个内核启动的有向图中，为一次性提交提供了这个目的。
    In any case, you once again trade flexibility for less overhead since tracing/compilation requires parameters like tensors sizes, types, etc. to be static and therefore to remain the same at runtime. Control flow structures, like if-else, are also usually lost in the process.
    For cases requiring flexibility incompatible with AOT compilation (e.g. dynamic tensor shapes, control flow, etc.), just-in-time (JIT) compilers come to the rescue by dynamically optimizing your model’s code right before it is executed (not as thoroughly as an AOT compiler though). For example, PyTorch 2.x features a JIT compiler named TorchDynamo. Since you don’t need to modify your PyTorch program to use it, you get the reduced overhead of using a JIT compiler while keeping the usability of the Python development experience.

### Bottleneck = f(Hardware, Arithmetic intensity)

- Interestingly, the same algorithm processing identical inputs can be either compute bound or memory bandwidth bound, depending on the hardware used. The applicable regime is determined by the algorithm’s arithmetic intensity — the number of arithmetic operations performed per byte of memory accessed.
    - 有趣的是，处理相同输入的相同算法可能受到计算限制，也可能受到内存带宽限制，这取决于所使用的硬件。适用的制度是由算法的算术强度决定的——即访问内存的每个字节所执行的算术操作的数量。
- We want intensity values that place us in or closer to the more cost-efficient compute bound regime. As we will see, higher intensity correlates with better throughput and cost efficiency. However, some intensity drivers can degrade latency. A tradeoff between latency and throughput is nearly inevitable.
    - 我们希望强度值能够使我们处于或更接近更具成本效益的计算范围。正如我们将看到的，更高的强度与更好的吞吐量和成本效率相关。但是，某些强度驱动程序可能会降低延迟。延迟和吞吐量之间的权衡几乎是不可避免的。
- Let b be the number of bytes of data transferred to/from memory per run, and let p be the number of FLOPs (floating point operations) performed per run. Let BW_mem (in TB/s) be the hardware's memory bandwidth, and let BW_math (in TFLOPS) be the math bandwidth, also called peak FLOPS. Let t_mem be the time spent moving data bytes, and let t_math be the time spent on arithmetic operations.
- Being compute bound simply means spending more time on arithmetic operations than transferring data (Figure 7).
- ![Image 8: a diagram showing the difference between a memory board and a compute board](https://miro.medium.com/v2/resize:fit:700/1*SKC41r0SZyBq6-GeCmxZ0g.png)
Figure 7 — Compute vs. memory bandwidth bound regimes. Computation and data transfer times are highlighted in yellow and blue respectively.
So, we are compute bound when:

![Image 9: a diagram showing the structure of a chemical compound](https://miro.medium.com/v2/resize:fit:573/1*l-Y9jHFZP7X6ZWeh2_ROLw.png)

`A` **is the algorithm’s arithmetic intensity**, its dimension is FLOP per byte. The more arithmetic operations for each byte of transferred data, the higher the arithmetic intensity.

As seen in the equation, for an algorithm to be compute bound, its arithmetic intensity must exceed a hardware-dependent ratio of peak FLOPS to memory bandwidth. Conversely, being memory bandwidth bound means operating at an intensity below that same bandwidths ratio (Figure 8).

![Image 10: a picture of a board with the words memory and board](https://miro.medium.com/v2/resize:fit:700/1*fDaWpZSBijhMtIOAdPOVzg.png)

Figure 8 — The memory bandwidth / compute bound frontier

Let’s look at some real numbers for half-precision matrix multiplications (i.e. using Tensor Cores) on NVIDIA hardware (Table 1):

Table 1 — Specifications of NVIDIA data center GPUs commonly used for training and/or serving LLMs

What does that mean? Taking the NVIDIA A10 as an example, a bandwidths ratio of 208 means moving one byte of data on that particular hardware is as fast as performing 208 FLOPs. Therefore, if an algorithm running on a NVIDIA A10 does not perform at least 208 FLOPs per byte transferred (or equivalently 416 FLOPs per half-precision number transferred), it inevitably spends more time moving data than on computations, i.e. it is memory bandwidth bound. In other words, algorithms with an arithmetic intensity below the hardware bandwidths ratio are memory bandwidth bound. QED.

Knowing that the decoding phase of the LLM inference process has low arithmetic intensity (detailed in the next blog post), it becomes memory bandwidth bound on most hardware. The NVIDIA H200 features a more favorable bandwidth ratio for such low-intensity workloads compared to the NVIDIA H100. This explains NVIDIA marketing the H200 as “supercharging generative AI inference,” as its hardware design targets this memory boundedness.

Now let’s connect the arithmetic intensity with latency and throughput:

![Image 11: a diagram showing the formula for bw and bw](https://miro.medium.com/v2/resize:fit:641/1*emMYOUrnqwwZP5_iBFgnBA.png)

**Notice:** Throughput is is expressed here in TFLOPS rather than requests per second, but both are directly proportional. Also, the fact that throughput is expressed in TFLOPS highlights its link to hardware utilization and therefore to cost efficiency. To make the link more obvious, throughput is more precisely the number of requests per chip-second, the lower the number of chip-seconds per request, i.e. the higher the throughput, the greater the cost efficiency (cf. \[9\] section 4). If we plot arithmetic intensity on the x-axis and the (maximum achievable) throughput as the dependent variable on the y-axis, we get what is known as the (naive) **_roofline model_** \[12\](Figure9).

![Image 12: a diagram showing the volume of a volume of a volume of a volume of a volume of a volume of a volume](https://miro.medium.com/v2/resize:fit:700/1*ZLtYeP-MBmf6lk2GnPywAw.png)

Figure 9 — The roofline model

Let’s do a little thought experiment to better grasp why the throughput values on this plot are maximum achievable levels. In the compute bound regime, it is obvious: nothing prevents us from utilizing the full compute capacity, we are only bounded by the hardware’s peak capacity. In the memory bandwidth bound regime, the maximum amount of data that we can fetch in 1s is fixed by the hardware’s memory bandwidth `BW_mem`. Considering an algorithm of arithmetic intensity `A`, the maximum amount of FLOPs we can achieve in 1s is therefore `BW_mem.A`. CED.

What is the impact of increasing an algorithm’s arithmetic intensity? We can examine three scenarios (Figure 10):

![Image 13: a diagram showing the direction of a magnetic field](https://miro.medium.com/v2/resize:fit:700/1*8Czywt_8KeXcEE1tNX9ICg.png)

Figure 10 — Three scenarios of arithmetic intensity increase

*   **Scenario 1:** The increase in arithmetic intensity is too small to escape the memory bandwidth bound regime but involves a proportional increase in throughput. The system remains memory bandwidth bound, so the effect on latency depends on how more intensity affects data transfer for that particular algorithm.
*   **Scenario 2:** The increase in arithmetic intensity switches the system to the compute bound regime. Throughput rises to hardware peak throughput. Now compute bound, latency impact depends on how higher intensity changes total operations for that algorithm.
*   **Scenario 3:** Since already compute bound and at peak throughput, increased intensity provides no throughput gain. Latency impact still depends on how more intensity affects total computations for that algorithm.

How do we concretely increase arithmetic intensity? This depends entirely on the algorithm specifics. In the next post, we’ll examine the key parameters governing the arithmetic intensity of Transformer decoder blocks. We’ll see how raising batch size, for instance, can heighten arithmetic intensity for certain operations.

Some optimizations already discussed also boost arithmetic intensity, improving throughput and resource utilization. For Transformer models (whose decoding phase is memory bandwidth bound), arithmetic intensity is mostly improved by reducing both the number and size of data transfers via operation fusion and data (weight matrices, KV cache) quantization.

**Until now, we made the crucial assumption that the algorithm implementation optimally utilizes hardware resources.** For example when transferring data, the algorithm’s implementation is assumed to use 100% of the hardware’s theoretical memory bandwidth. This is obviously not the case in practice (though some implementations achieve near-optimal ressource use) so how does sub-optimal resource use impact the analysis?

It is quite simple: the bandwidth numbers above must be replaced by the actually achieved figures. The sub-optimal system lives on its own roofline curve somewhere below the optimal roofline curve (Figure 11). There are now two degrees of freedom to improve throughput: increase arithmetic intensity and/or enhance the algorithm’s implementation to better use hardware resources.

![Image 14: a diagram showing the difference between a horizontal and vertical axis](https://miro.medium.com/v2/resize:fit:700/1*3MmUB9vcspln2So0EhBMIA.png)

Figure 11 — Roofline model with sub-optimal resource utilization

Let’s conclude by providing a real-world example of an implementation improvement. Prior to [version 2.2](https://github.com/Dao-AILab/flash-attention?tab=readme-ov-file#22-optimize-for-inference), the implementation of the FlashAttention kernel could become highly sub-optimal when applied to the decoding phase of inference. The previous data loading implementation made the kernel inherently less efficient at leveraging memory bandwidth in the decoding phase. Worse yet, bandwidth utilization actually further decreased with larger batch sizes; thus, performance suffered the most for longer sequences which require smaller batches due to memory limitations. The FlashAttention team addressed this issue (primarily by parallelizing data loading across the KV cache sequence length dimension) and released an optimized decoding phase kernel named FlashDecoding which achieved dramatic latency improvements for long sequence lengths \[13\].




