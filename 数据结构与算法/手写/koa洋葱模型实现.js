class App {
  middlewares = []
  use(fn) {
    this.middlewares.push(fn)
  }
  compose() {
    this.dispatch(0)
  }
  dispatch(index) {
    if (index === this.middlewares.length) return Promise.resolve()
    const middleware = this.middlewares[index]
    return Promise.resolve(middleware(() => this.dispatch(index + 1)))
  }
}

const fn1 = async (next) => {
  console.log('1')
  await next()
  console.log('2')
}

const fn2 = (next) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3')
      next()
      resolve()
      console.log('4')
    }, 2000)
  })
}

const app = new App()
app.use(fn1)
app.use(fn2)
app.compose()
