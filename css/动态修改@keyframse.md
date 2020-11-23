### insertRule用来给当前样式表插入新的样式规则
```javascript
let style = document.styleSheets[0]
style.insertRule("@keyframes rotate_before{from { transform: translate(0%,0%); }to{ transform:  translate(0%,-"+param +"%);}}",9)
```
    
