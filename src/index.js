const Alice = require('yandex-dialogs-sdk')
const alice  = new Alice()

const {reply} = Alice
alice.welcome(ctx=>{
    ctx.reply('Hello!!!')
})

alice.command('Привет', ctx=>{
    ctx.reply("Доброго дня")
})
const port = 3000
alice.listen('/',port, callback => console.log(port))