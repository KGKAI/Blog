function transform(str) {
  return str.replace(/(\w)/g, function(match, $1) {
    return $1.toLowerCase() === $1 ? $1.toUpperCase() : $1.toLowerCase()
  })
}

console.log(transform('ABC-'))
