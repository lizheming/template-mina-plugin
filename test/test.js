const { test } = require('ava')
const path = require('path')
const sao = require('sao')

const template = path.resolve(__dirname, '..')

test('defaults', async t => {
  const stream = await sao.mockPrompt(template, {
    name: 'mina-plugin-test',
    description: 'mina-plugin for tina.js',
    username: 'lizheming',
    email: 'i@imnerd.org',
    website: 'github.com/lizheming'
  })
  t.snapshot(stream.fileList, 'generated files')

  stream.fileList.forEach(file => t.snapshot(stream.fileContents(file), `content of ${file}`))
})