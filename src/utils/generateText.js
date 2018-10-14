const generateText = (size = 10) => {
  let generatedText = ''
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < size; i += 1) {
    generatedText += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
  }

  return generatedText
}

module.exports = generateText
