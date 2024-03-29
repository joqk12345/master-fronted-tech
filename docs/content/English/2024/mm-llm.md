# mm-llm

1. understanding: MM-LLMs that emphasize MM understanding only include the first three components. 
2. During training, Modality Encoder, LLM Backbone, and Modality Generator are generally maintained in a frozen state. The primary optimization emphasis is on Input and Output Projectors.
3. The Modality Encoder (ME) is tasked with encoding inputs from diverse modalities IX to obtain corresponding features FX, formulated as follows: FX = MEX(IX).
4. The Input Projector ΘX→T is tasked with aligning the encoded features of other modalities FX with the text feature space T. 
 -  输入投影器 ΘX→T 的任务是将其他模态的编码特征 FX 与文本特征空间 T 对齐。
 -  The aligned features as prompts PX are then fed into the LLM Backbone alongside the textual features FT
- 对齐的特征作为提示 PX 然后与文本特征 FT 一起输入到LLM主干中。
- arg min ΘX→T Ltxt-gen(LLM(PX,FT ), t),
- where PX = ΘX→T (FX).
5. The LLM Backbone processes representations from various modalities, engaging in semantic understanding, reasoning, and decision-making regarding the inputs.  
- LLM主干处理来自各种模态的表示，参与对输入的语义理解、推理和决策
- It produces direct textual outputs t and signal tokens SX from other modalities (if any).  
- These signal tokens act as instructions to guide the generator on whether to produce MM contents and,if affirmative, specifying the content to produce
- 如果是肯定的，它们会指定要生成的内容：
- t, SX = LLM(PX,FT ),
- where the aligned representations of other modalities PX can be considered as soft Prompt-tuning
for the LLM.
6. The Output Projector ΘT→X maps the signal token representations SX from the LLM Backbone
into features HX understandable to the following Modality Generator MGX.
    - 输出投影器 ΘT→X 将来自LLM主干的信号标记表示 SX 映射为对后续模态生成器 MGX 可理解的特征 HX。
7. MM-LLMs’ training pipeline can be delineated into two principal stages: MM PT and MM IT. MM-LLMs的训练流程可以划分为两个主要阶段：多模态预训练（MM PT）和多模态微调（MM IT）。
 - 在PT阶段，通常利用XText数据集，训练输入和输出投影器以通过优化预定义的目标实现各种模态之间的对齐。
 - Through this process,

8. IT：MM-LLMs can generalize to unseen tasks by adhering to new instructions, thereby enhancing zeroshot performance.
 - 通过这个过程，MM-LLMs可以通过遵循新的指令来泛化到未见过的任务，从而提高零样本性能。


