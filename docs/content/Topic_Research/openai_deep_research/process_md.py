import os
import re

def process_markdown_file(file_path):
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 处理URL前的换行
    # 匹配形如：\n[text](url) 的模式
    pattern = r'\n(\[.*?\]\(.*?\))'
    content = re.sub(pattern, r'\1', content)
    
    # 处理URL后的换行
    # 匹配形如：[text](url)\n 的模式，但保留段落之间的换行（两个或更多换行）
    pattern = r'(\[.*?\]\(.*?\))\n(?!\n)'
    content = re.sub(pattern, r'\1', content)
    
    # 处理URL后缺少句号的情况
    # 匹配形如：[text](url)后面不是句号的情况
    pattern = r'(\[.*?\]\(.*?\))([^。．.]\s*)'
    content = re.sub(pattern, r'\1。\2', content)
    
    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # 获取当前目录下所有的markdown文件
    current_dir = os.getcwd()
    markdown_files = [f for f in os.listdir(current_dir) 
                     if f.endswith(('.md', '.markdown'))]
    
    # 处理每个markdown文件
    for md_file in markdown_files:
        file_path = os.path.join(current_dir, md_file)
        print(f"Processing {md_file}...")
        try:
            process_markdown_file(file_path)
            print(f"Successfully processed {md_file}")
        except Exception as e:
            print(f"Error processing {md_file}: {str(e)}")

if __name__ == "__main__":
    main()