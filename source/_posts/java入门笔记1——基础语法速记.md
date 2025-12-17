---
title: java入门笔记1——基础语法速记
date: 2025-12-06 19:39:44
tags:
---
**大概记录一下java基础语法ww**

## 1. 数据类型与变量

### 8大基本数据类型
| 类型 | 描述 | 大小 | 示例 |
| :--- | :--- | :--- | :--- |
| `byte` | 字节 | 8-bit | `byte b = 100;` |
| `short` | 短整型 | 16-bit | `short s = 1000;` |
| `int` | 整型 | 32-bit | `int i = 123;` |
| `long` | 长整型 | 64-bit | `long l = 123L;` (末尾加L) |
| `float` | 单精度 | 32-bit | `float f = 10.5f;` (末尾加f) |
| `double` | 双精度 | 64-bit | `double d = 20.5;` |
| `char` | 字符 | 16-bit | `char c = 'A';` (单引号) |
| `boolean`| 布尔 | 1-bit | `boolean flag = true;` |

### 引用类型
```java
String str = "Hello"; // 字符串对象
Integer num = 10;     // 包装类 (自动装箱)
int[] arr = {1, 2};   // 数组
```

## 2. 运算符 (Operators)

*   **算术**: `+`, `-`, `*`, `/`, `%`, `++`, `--`
*   **关系**: `==`, `!=`, `>`, `<`, `>=`, `<=`
*   **逻辑**: `&&` (短路与), `||` (短路或), `!` (非)
*   **三元**: `条件 ? 真值 : 假值`
    ```java
    int max = (a > b) ? a : b;
    ```

## 3. 数组与字符串 (Array & String)

### 数组
数组是Java语言内置的、最基本的数据结构。数组在创建时固定大小，无法动态改变。数组提供的方法很少，只有基本的访问和赋值操作。Java 支持锯齿数组，在 Java 中，二维数组实际上是 "数组的数组"
```java
int[] arr = new int[5];        // 定义大小，默认全0
int[] arr2 = {1, 2, 3, 4, 5};  // 初始化
int len = arr2.length;         // 获取长度
// string转char数组
String p = "";
int[] arr3 = p.toCharArray(); 
boolean a = Arrays.equal("JAVA", "java"); // 判断是否相同


// 这是一个包含3个一维数组的数组
int[][] matrix = new int[3][];  // 只指定了第一维

// 每个一维数组可以独立创建，长度可以不同
matrix[0] = new int[2];  // 第一行有2个元素
matrix[1] = new int[5];  // 第二行有5个元素
matrix[2] = new int[3];  // 第三行有3个元素

// 可以clone数组里的内容，假设matrix是n*n二维数组
int[][] temp = new int [n][];
for (int i = 0; i < n; i++) temp[i] = matrix[i].clone(); // 复制了数组每一行的内容

// arraycopy
System.arraycopy(newArr, 0, nums, 0, n);
// 语法如下所示：
/*
    src：源数组（从哪个数组复制数据）
    srcPos：源数组的起始位置（从源数组的哪个索引开始复制）
    dest：目标数组（复制到哪个数组）
    destPos：目标数组的起始位置（从目标数组的哪个索引开始粘贴）
    length：要复制的元素数量
*/
System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length)

```

### 字符串 (String - 不可变)
```java
String s = "Java";
int len = s.length();          // 长度
char c = s.charAt(0);          // 获取字符
String sub = s.substring(1, 3);// 截取
boolean b = s.equals("Java");  // 内容比较 (不要用 ==)
String[] parts = s.split(","); // 分割
```

## 4. 常用集合

需导入: `import java.util.*;`

### List (有序，可重复)
List是一个接口，ArrayList是List接口的一个实现类（基于动态数组）。ArrayList是动态数组，可以自动扩容，因此可以动态增长。ArrayList作为集合框架的一部分，提供了丰富的方法，如添加、删除、查找、排序等。
```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
String s = list.get(0); // 获取
list.remove(0);         // 删除
int size = list.size();
boolean has = list.contains("A");
ans.isEmpty() // 判断是否为空
ans.size() // list大小

int[][] res = ans.toArray(new int[ans.size()][]); // 转二维array
```

### Set (无序，不可重复)
```java
Set<Integer> set = new HashSet<>();
set.add(1);
set.add(1); // 无效，重复
```

### Map (键值对)
```java
Map<String, Integer> map = new HashMap<>();
HashMap<Character, Integer> map2 = new HashMap<Character, Integer>();
map.put("Java", 100);
map.put("Python", 90);
Integer score = map.get("Java");
boolean hasKey = map.containsKey("Java");

// 遍历
for (String key : map.keySet()) { ... } // 遍历键
for (Map.Entry<String, Integer> entry : map.entrySet()) { ... } // 遍历键值对
```
## 常用函数
### 排序
```java
// 对数组 第一个是要排序的数组，第二个参数是比较器 Comparator，定义排序规则
Arrays.sort(array, comparator)
// 来自hot100 56合并区间
// 对二维数组的排序（按第零位），Comparator.comparingInt是一个静态工厂方法，它接收一个函数作为参数，这个函数从要比较的对象中提取一个int类型的键（key），然后根据这个键进行排序。在这个例子中，我们传递了一个lambda表达式：a -> a[0]。这里的a表示二维数组中的一个元素（即一个一维数组），a[0]就是取这个一维数组的第一个元素（即区间的起始值）。所以，这个比较器会按照每个区间的起始值进行排序。
Arrays.sort(array, Comparator.comparingInt(a -> a[0]));
// 默认情况下，Comparator.comparingInt是按照升序排序的。如果我们想要降序排序，可以这样写：
Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]).reversed());
// 此外，如果起始值相同，我们可能还需要按照第二个元素（结束值）进行排序，那么我们可以使用thenComparing方法：
Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]).thenComparingInt(a -> a[1]));