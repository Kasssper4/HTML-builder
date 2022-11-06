const fs = require('fs');
const path = require('path')

const {stdin, stdout} = process
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'))

stdout.write('Введите что-нибудь:\n')
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit()
  }
  writeStream.write(data)
  stdout.write(`Файл дополнен следующим текстом: ${data}`)
})
process.on('SIGINT', () => process.exit())
process.on('exit', () => stdout.write('Всего доброго!'))