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

// 排序
Arrays.sort(nums);

// int数组的循环
int[] nums = new int [];
int res = 0;
……
for (int num : nums){
    res ^= num;
}

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


# 对于二维的arraylist，获取其中的值要使用两次.get()
int res = list.get(0).get(0)
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

// 一个语法糖：
Map<Character, Character> = new HashMap<Character, Character>(){{
    put(')', '(');
    put('[', ']');
    put('{', '}');
}};

// 等价于
// 常规写法：先创建对象，再逐个 put
Map<Character, Character> pairs = new HashMap<Character, Character>();
pairs.put(')', '(');
pairs.put(']', '[');
pairs.put('}', '{');

```

## 5. 常用函数
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
```

## 6. 一些数据结构
### 栈

栈（Stack）是一种遵循 **后进先出（LIFO, Last In First Out）** 原则的线性数据结构，只能在栈顶进行元素的添加（入栈）和删除（出栈）操作。

在 Java 中，官方推荐使用 `Deque`（双端队列）接口结合其实现类（如 `LinkedList`/`ArrayDeque`）来实现栈功能，而非直接使用老旧的 `Stack` 类（`Stack` 类继承自 `Vector`，设计存在缺陷）。


**栈的声明与初始化**
核心语法：`Deque<数据类型> 栈名 = new 实现类<数据类型>();`
```java
import java.util.Deque;
import java.util.LinkedList;

// 1. 声明字符类型的栈（最常用）
Deque<Character> charStack = new LinkedList<Character>();

// 2. 声明整数类型的栈
Deque<Integer> intStack = new LinkedList<Integer>();

// 3. 更高效的实现类（ArrayDeque，基于数组）
Deque<String> strStack = new ArrayDeque<String>();
```

**语法说明**
| 部分                | 含义                                                                 |
|---------------------|----------------------------------------------------------------------|
| `Deque`             | 双端队列接口，定义了栈的核心操作方法（push/pop/peek 等）|
| `<Character>`       | 泛型，限定栈中只能存放指定类型的元素（避免类型错误）|
| `stack`             | 栈的变量名，可自定义（如 charStack、intStack）|
| `new LinkedList<>()`| 创建实现类对象，LinkedList/ArrayDeque 均实现了 Deque 接口             |

**基本操作函数**
| 方法名       | 功能描述                                  | 返回值/说明                     |
|--------------|-------------------------------------------|---------------------------------|
| `push(E e)`  | 入栈（将类型E的元素e压入栈顶）         | 无返回值，失败抛异常            |
| `pop()`      | 出栈（移除并返回栈顶元素）                | 返回栈顶元素，栈空抛异常        |
| `peek()`     | 查看栈顶元素（不移除）                    | 返回栈顶元素，栈空返回 null     |
| `isEmpty()`  | 判断栈是否为空                            | 空返回 true，非空返回 false     |
| `size()`     | 获取栈中元素个数                          | 返回 int 类型的元素数量         |
| `clear()`    | 清空栈中所有元素                          | 无返回值                        |

**示例代码**
```java
import java.util.Deque;
import java.util.LinkedList;

/**
 * Java 栈（Deque实现）示例
 */
public class StackDemo {
    public static void main(String[] args) {
        // 1. 初始化一个字符类型的栈
        Deque<Character> stack = new LinkedList<>();

        // 2. 入栈操作（push）
        stack.push('A');
        stack.push('B');
        stack.push('C');
        System.out.println("入栈后栈内容：" + stack); // 输出 [C, B, A]（栈顶是C）

        // 3. 查看栈顶元素（peek）
        Character top = stack.peek();
        System.out.println("栈顶元素：" + top); // 输出 C

        // 4. 出栈操作（pop）
        Character popEle = stack.pop();
        System.out.println("出栈元素：" + popEle); // 输出 C
        System.out.println("出栈后栈内容：" + stack); // 输出 [B, A]

        // 5. 判断栈是否为空（isEmpty）
        boolean isEmpty = stack.isEmpty();
        System.out.println("栈是否为空：" + isEmpty); // 输出 false

        // 6. 获取栈大小（size）
        int size = stack.size();
        System.out.println("栈元素个数：" + size); // 输出 2

        // 7. 清空栈（clear）
        stack.clear();
        System.out.println("清空后栈是否为空：" + stack.isEmpty()); // 输出 true
    }
}
```

输出结果
```
入栈后栈内容：[C, B, A]
栈顶元素：C
出栈元素：C
出栈后栈内容：[B, A]
栈是否为空：false
栈元素个数：2
清空后栈是否为空：true
```

**注意事项**
1. 避免使用 `java.util.Stack` 类：该类是早期设计的栈实现，继承自 `Vector`，方法线程安全但效率低，且不符合面向接口编程的规范。
2. 空栈调用 `pop()` 会抛 `NoSuchElementException`：建议先通过 `isEmpty()` 判断栈是否为空，再执行出栈操作。
3. `ArrayDeque` 比 `LinkedList` 更高效：如果不需要链表的额外功能，优先使用 `ArrayDeque` 实现栈（基于数组，访问速度更快）。
