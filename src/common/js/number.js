const setListenNum = (number) => {
  let num
  if (number > 100000) {
    num = parseInt(number / 10000)
  } else {
    return parseInt(number)
  }
  return num > 10000 ? num + '亿' : num + '万'
}

module.exports = {
  setListenNum
}
