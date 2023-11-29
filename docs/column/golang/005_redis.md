
1. 获取所有的keys

```
redis-cli keys "*"
```

2. 内部任务格式

```json
{
  "id":1,
  "task_id":"test_123",
  "name":"content2text",
  "type":"signle",
  params:{
	"url":"https://www.wsj.com/tech/ai/openai-leadership-hangs-in-balance-as-sam-altmans-counte-rebellion-gains-steam-47276fa8?mod=hp_lead_pos1",
  "title":"Sam Altman to Join Microsoft Following OpenAI Ouster",
  "character_len":190,
  "tts_conf":{
    "timer":"lisa",
    "speed": "",
    "volume": "",
    "gender":"",
    "target_language":""
  }
  },
  "create_time":"",
  "result":"",
  "group_id":"",
  "priority":"",
  "user_id":1
}

```