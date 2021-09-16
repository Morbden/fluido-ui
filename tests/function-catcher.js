const REGEX_FUNC = /#(if|else|func|call|or|and|math|select)\(/gi
const text = '& > :is(#func(makeNthChildSelector, false))'

const functionCatcher = (val) => {
  const buffer = []
  const funcs = val.match(REGEX_FUNC)
  let strBuffer = []
  let brackets = 0
  let step = 0

  for (let i = 0; i < val.length; i++) {
    console.log('s')
    if (brackets === 0 && step >= funcs.length) break
    console.log('nb')

    if (brackets === 0) {
      console.log('init')
      i = val.indexOf(funcs[step]) + funcs[step].length
      strBuffer = [funcs[step]]
      step++
      brackets++
    }

    const caret = val[i]
    console.log('char:', caret)
    if (caret === '(') {
      brackets++
      console.log('bracket-open:', brackets)
    }
    if (caret === ')') {
      brackets--
      console.log('bracket-close:', brackets)
    }

    strBuffer.push(caret)
    console.log('buffering:', caret)

    if (brackets === 0) {
      console.log('push:', strBuffer.join(''))
      buffer.push(strBuffer.join(''))
    }
  }

  return buffer
}

console.log(functionCatcher(text))
