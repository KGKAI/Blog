## 定义
instanseof可以判断一个引用是否属于某构造函数。  

## 实现

```
function instance_of(left, right) {
    left = left.__proto__;
    right = right.prototype;
    
    while(true) {
        if (!left) {
            return false;
        } else if (left === right){
            return true;
        }
        
        left = left.__proto__;
    }
}
```
