 
```
function objectFactory() {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Consturctor.apply(obj, arguments);
    return typeof ret === "object" ? ret : obj;
}
```
