---
title: java入门笔记1——基础语法速记
date: 2025-12-06 19:39:44
tags:
---
**大概记录一下写leetcode会用到的语法ww**

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
```java
int[] arr = new int[5];        // 定义大小
int[] arr2 = {1, 2, 3, 4, 5};  // 初始化
int len = arr2.length;         // 获取长度
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
```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
String s = list.get(0); // 获取
list.remove(0);         // 删除
int size = list.size();
boolean has = list.contains("A");
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
