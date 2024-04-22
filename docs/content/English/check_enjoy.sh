#!/bin/bash

# 定义远程仓库地址和本地目录路径
remote_repo="https://github.com/xiaolai/everyone-can-use-english.git"
local_dir="/Users/kai.qiao/workspace/fonted/everyone-can-use-english/enjoy"

# 定义需要替换的文件路径和新路径
FILE_PATH="$local_dir/src/main/whisper.ts"

new_string="customWhisperPath=\'/Users/kai.qiao/workspace/llm_workspace/whisper.cpp/main\';"


# 切换到目标目录
cd "$local_dir" || exit

# 拉取最新代码
git fetch origin

# forch
git reset --hard origin/main


TEMP_FILE=$(mktemp)

# 检查文件是否存在
if [ ! -f "$FILE_PATH" ]; then
    echo "Error: File does not exist."
    exit 1
fi

# 使用awk命令处理文件
awk -v insert_line="const customWhisperPath='/Users/kai.qiao/workspace/llm_workspace/whisper.cpp/main';" '
    NR >= 27 && NR <= 30 {print "//" $0; next}
    NR == 31 {print "//" $0 "\n" insert_line; next}
    {print}' "$FILE_PATH" > "$TEMP_FILE"

# 用处理过的临时文件替换原文件
mv "$TEMP_FILE" "$FILE_PATH"

## 执行启动命令

yarn start

# 替换文件
#sed -i "s|customWhisperPath = '.*'|customWhisperPath = '$new_custom_path'|g" "$file_to_replace"
# 替换文件中的内容
#sed -i "s|const customWhisperPath = path.join(settings.libraryPath(), \"whisper\", \"main\");|customWhisperPath='$new_custom_path';|g" "$file_to_replace"
#sed -i "s|const customWhisperPath = path.join(settings.libraryPath(), \"whisper\", \"main\");|customWhisperPath='$new_custom_path'|g" "$file_to_replace"
# 使用 sed 命令进行替换
#sed -i "s#${old_string}#${new_string}#g" "$file_path"
# 使用 sed 命令进行替换（对于 BSD sed，包括 macOS）
#sed -i '' "s#${old_string}#${new_string}#g" "$file_path"
# 在这里可以添加其他需要执行的操作，比如重新编译等

echo "代码已更新,替换完成本地路径，启动软件！"
