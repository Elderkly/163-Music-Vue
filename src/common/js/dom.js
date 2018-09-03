//  判断是否有class
const hasClass = (el,className) => {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`)
  return reg.test(el.className)
}
//  添加class
const addClass = (el,className) => {
  if (hasClass(el,className)) return
  let thenClass = el.className.split(' ')
  thenClass.push(className)
  el.className = thenClass.join(' ')
}

module.exports = {
  hasClass,
  addClass
}
