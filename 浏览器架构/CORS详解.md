## 定义
CORS（cross-origin resource sharing）跨域资源共享。它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。
## 简介
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，==IE浏览器不能低于IE10==。  
整个CORS通信过程，都是刘看齐自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX没有差别，代码完全一样。==浏览器一旦发现AJAX请求跨域，就会自动添加一些附加的头信息，有时还会多出一次附加的请求==，但用户不会有感觉。  
因此，==实现CORS的关键是服务器==。只要服务器实现了CORS接口，就可以跨源通信。
## 两种请求
浏览器将CORS请求分成两类：简单请求和非简单请求。  
只要同时满足以下两大条件，就属于简单请求，否则是非简单请求。
>（1）请求方法是以下三种方法之一：
> - HEAD
> - POST
> - GET  

> （2）HTTP的头信息不超出以下几种字段：
> - Accept
> - Accept-Language
> - Content-Language
> - Last_Event_ID
> - Content-Type: 只限于三个值application/x-www-form-urlencoded、multipart/form-data、text-plain

## 简单请求
### 基本流程 
对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个==Origin字段，该字段用来说明本次请求来自哪个源==。浏览器根据这个值，决定是否同意这次请求。  
如果Origin制定的源，不再许可范围内，服务器会返回一个正常的响应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHTTPRequest的onerror回调函数捕获。  
如果Origin指定的域名在许可范围内，服务器返回的相应中会多出几个头信息字段：
> Access-Control-Allow-Origin: http://api.bob.com  
Access-Control-Allow-Credentials: true  
Access-Control-Expose-Headers: FooBar  
Content-type: text/html;charset=utf-8

上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control开头
1. Access-Control-Allow-Origin  
    该字段是必须的，它的值要么是请求时Origin字段的值，要么是*，表示接受任意域名的请求。
2. Access-Control-Allow-Credentials  
    该字段可选。它的值是一个布尔值。表示是否允许发送cookie。默认情况下，cookie不包括在CORS请求中，设为true，即表示服务器明确许可，cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送ookie，删除该字段即可。
3. Access-Control-Expose-Headers  
    该字段可选。CORS请求时，XMLHTTPRequest的getResponseHeader方法，只能拿到6个基本字段：cache-control、content-language、content-type、expires、last-modified、pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers中指定。
### withCredentials属性
上面说到，CORS请求默认不会发送cookie和http认证信息。如果要把cookie发送到服务器，一方面要服务器指定：
> access-control-allow-credentials: true

另一方面，开发者必须在AJAX请求中打开withCredentials属性
> var xhr = new XMLHttpRequest();  
xhr.withCredentials = true;

否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。  
需要注意的是，如果要发送cookie，access-control-allow-origin就不能设为*，必须指定明确的，与请求网页一致的域名。同时，cookie依然遵循同源策略。

## 非简单请求
### 预检请求
非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者content-type的类型是application/json。
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP“预检请求”。  
浏览器会先询问服务器，当前域名是否在服务器的许可名单中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定的答复，浏览器才会正式发出XMLTttpRequest请求，否则，就报错。
> 预检请求的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是origin，表示这个请求是来自哪个源。  
除了origin字段，预检请求的头信息里包含两个特殊字段：
> - Access-Control-Request-Method：
该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法。
> - Access-Control-Request-Headers:  
该字段是逗号分隔的字符串，指定浏览器CORS要额外发送的头字段信息。

### 预检请求的回应
服务器收到预检请求后，检查了origin、access-control-request-method、access-control-request-headers字段以后，确认允许跨源请求后，就可以作出回应。
如果浏览器否认了预检请求，会返回一个正常的http响应，但是没有任何的CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此会触发一个错误，被XMLHttpRequest的onerror捕获，控制台会打出如下的报错信息：
> XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.

服务器回应的其他字段如下：  
- Access-Control-Allow-Methods：
    该字段必需，它的值是逗号分隔的一个字符串，==表明服务器支持的所有跨域请求的方法==。
- Access-Control-Allow-Headers：
    如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，==表明服务器支持的所有头信息字段==，不限于浏览器在"预检"中请求的字段。
- Access-Control-Allow-Credentials
- Access-Control-Max-Age: 
    该字段可选。表明本次预检请求的有效期，单位为秒。
### 浏览器的正常请求和回应
一旦服务器通过了预检请求，以后每次浏览器CORS请求，就会跟简单请求一样，会有一个origin字段。
## 与JSONP的比较
CORS与JSONP的使用目的相同，但是比JSONP更强大。

JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。