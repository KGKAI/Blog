function myGetData(getData, retries, delay) {
    return new Promise((resolve, reject) => {
        function attempt() {
            getData().then((v) => resolve(v)).catch(r => {
                console.log(`还有${retries}次尝试`)
                if (retries > 0) {
                    retries--
                    attempt()
                } else {
                    reject(r)
                }
            })
        }

        attempt()
    })
}

function getData(){
    let p = new Promise(function(resolve, reject){
        setTimeout(function(){
            var num = Math.ceil(Math.random()*20); //生成1-10的随机数
            console.log('随机数生成的值：',num)
            if(num<=1){
                console.log('符合条件，值为'+num)
                resolve(num);
            }
            else{
                reject('数字大于10了执行失败');
            }
        }, 2000);
       })
       return p
  }

  let p = myGetData(getData, 5)
  console.log(p)