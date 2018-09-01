const superb = require('superb')

module.exports = {
  prompts: {
    name: {
      message: 'Plugin name?',
      default: ':folderName:'
    },
    description: {
      message: 'Description:',
      default: `my ${superb()} project`
    },
    username: {
      message: 'Your name:',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'Your email:',
      default: ':gitEmail:',
      store: true
    },
    website: {
      message: 'The URL of your website?',
      default({ username }) {
        return `github.com/${username}`
      },
      store: true
    }
  },
  move: {
    'gitignore': '.gitignore'
  },
  showTip: true,
  gitInit: true,
  installDependencies: true,
  post({ log, isNewFolder, folderName, chalk }) {
    console.log()
    log.success(`Successfully generated into ${chalk.cyan(folderName)}`)
    console.log()
    console.log(chalk.bold('To get started:\n'))
    if (isNewFolder) {
      console.log(` cd ${folderName}`)
    }
    console.log(' npm start')
    console.log()
  }
}
