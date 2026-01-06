---
title: FastAPI入门笔记
date: 2026-01-05 17:25:13
tags:
---
## 1. 快速上手
@app.get 是一个装饰器，当用户访问根路径 "/" 且请求方法是 GET 时，执行下面的函数
```python
# practice.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def welcome():
    return {"message": "Hello!"}

# uvicorn practice:app --reload 以运行服务器
# 这里的app是实例名
```

## 2.获取参数
###  1.路径参数

```python
@app.get("/item_id/{item_id}")
def item(item_id: int): # 指定int类型
    return {"item_id": item_id, "description": f"这是第{item_id}个商品"}
```

### 2.查询参数
```python
@app.get("/search/")
def search(keyword: str, page: int = 1): # page 给了默认值 1
    return {"query": keyword, "page": page}
# 访问地址：/search/?keyword=python&page=2
```

### 请求体参数
就是request，把数据放在HTTP请求体里，用JSON格式