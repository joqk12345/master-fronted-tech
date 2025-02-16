# 亚洲的迁移和文化遗产

下面将整体内容拆分成9个独立的 Mermaid 子图，每个子图对应一个概念关系图。你可以将以下代码分别复制到 Mermaid 编辑器中单独渲染：

------

### Diagram 1: 人口迁移与替代 (Population Migration and Replacement)

```mermaid
flowchart TD
  %% Diagram 1: 人口迁移与替代 (Population Migration and Replacement)
  A1["早期南亚居民"]
  A2["南中国人和现代南亚人"]
  A3["新几内亚高地人（早期居民）"]
  A4["爪哇人（来自中国南方）"]
  A5["人口替代"]

  A1 --> A5
  A2 --> A5
  A3 --> A5
  A4 --> A5
```

------

### Diagram 2: 语言的采用与文化影响 (Language Adoption and Cultural Influence)

```mermaid
flowchart TD
  %% Diagram 2: 语言的采用与文化影响 (Language Adoption and Cultural Influence)
  B1["狩猎采集者"]
  B2["农民贸易伙伴"]
  B3["语言采用"]
  B4["中国文化影响"]
  B5["朝鲜和日本文化发展 (保持独特性)"]

  B1 --> B3
  B2 --> B3
  B4 --> B5
```

------

### Diagram 3: 文化传播与技术转移 (Cultural Diffusion and Technology Transfer)

```mermaid
flowchart TD
  %% Diagram 3: 文化传播与技术转移 (Cultural Diffusion and Technology Transfer)
  C1["中国"]
  C2["水稻 + 青铜冶金 + 文字"]
  C3["朝鲜和日本"]
  C4["小麦 + 大麦"]

  C1 --> C2
  C2 --> C3
  C1 --> C4
  C4 --> C3
```

------

### Diagram 4: 文化认同与文字使用 (Cultural Identity and Writing System Usage)

```mermaid
flowchart TD
  %% Diagram 4: 文化认同与文字使用 (Cultural Identity and Writing System Usage)
  D1["文化声望高"]
  D2["保留中国文字 (即使存在缺点)"]
  D3["本土文字发展"]
  D4["取代中国文字"]

  D1 --> D2
  D3 --> D4
```

------

### Diagram 5: 族群关系与社会张力 (Ethnic Relations and Social Tension)

```mermaid
flowchart TD
  %% Diagram 5: 族群关系与社会张力 (Ethnic Relations and Social Tension)
  E1["爪哇人 (政府)"]
  E2["华人 (经济)"]
  E3["新几内亚高地人/低地人 (地域差异)"]
  E4["社会张力"]

  E1 --> E4
  E2 --> E4
  E3 --> E4
```

------

### Diagram 6: 食物与文化 (Food and Culture)

```mermaid
flowchart TD
  %% Diagram 6: 食物与文化 (Food and Culture)
  F1["特定食物资源 (如红薯)"]
  F2["地域文化差异"]

  F1 --> F2
```

------

### Diagram 7: 历史事件与族群冲突 (Historical Events and Ethnic Conflicts)

```mermaid
flowchart TD
  %% Diagram 7: 历史事件与族群冲突 (Historical Events and Ethnic Conflicts)
  G1["历史事件 (1966年屠杀)"]
  G2["族群冲突"]

  G1 --> G2
```

------

### Diagram 8: 生存方式与语言 (Lifestyle and Language)

```mermaid
flowchart TD
  %% Diagram 8: 生存方式与语言 (Lifestyle and Language)
  H1["尼格利陀人（猎人采集者）"]
  H2["语言的最后幸存者"]

  H1 --> H2
```

------

### Diagram 9: 殖民与冲突 (Colonization and Conflict)

```mermaid
flowchart TD
  %% Diagram 9: 殖民与冲突 (Colonization and Conflict)
  I1["殖民扩张（印尼吞并西新几内亚）"]
  I2["武力镇压和文化冲突"]

  I1 --> I2
```

------

这样，每个子图都是独立的 Mermaid 流程图，方便单独查看和调试。如需更多信息，请参阅 [Mermaid Flowchart 语法文档](https://mermaid.js.org/syntax/flowchart/)。