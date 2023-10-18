## golang的基础知识——结构，包，变量

1. 目录结构
  - 官方建议造构 pgk bin src
    - 一个go项目必澳有一个m包一个main函数
  - 1.11版水以后 可以随查自己的结构 建议道循官方】
    - 基于go mod
2. 声明变量(以string为例)
  - var(关键字)A(变量名) string(关键词)”我是字符串类型“
  - A:="我是规式真明的方法
  - 关键字不能做为变量名
    - 包管理（2个）
      - import package
      - 单独的代码块
      - 大写字母开头，共有、小写字母开头私有，包含方法、变量
    - 程序实体声明与定义（8个）
      - chan const func interfacemap struct type var
    - 程序流程控制（15个）
      - break case continue defsultdefer else fallthrough for gogoto if range return select switch
    - 36个预定义标识符
      - append bool byte cap close complex complex64 complex128 uint16copy false float32 float54 imag int int8 int16 uint32int32 int64 iota len make new nil panic uint64print println real recover string true uint wint8 wintptr
  - 注释
    - 单行
    - 多行