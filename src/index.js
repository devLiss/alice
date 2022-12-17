const { Alice, Reply, Markup, Stage, Scene} = require('yandex-dialogs-sdk')
const alice = new Alice();
const stage = new Stage();
const M = Markup;

const SCENE_AT_BAR = 'SCENE_AT_BAR';
const atBar = new Scene(SCENE_AT_BAR);

const SCENE_AT_END = 'SCENE_AT_END';
const atEnd = new Scene(SCENE_AT_END);

const GET_AGE = 'GET_AGE';
const getAge = new Scene(GET_AGE);

const ABOUT_SCHOOLES = 'ABOUT_SCHOOLES';
const aboutSchooles = new Scene(ABOUT_SCHOOLES);


atBar.command(['Да','Давай','Хочу','Можно','Расскажи'], async ctx =>{

    await ctx.leave()
    await ctx.enter(GET_AGE)
    return Reply.text('Каждый ребенок уникален, и к каждому нужен особый подход, расскажите мне о ребенке, сколько ему лет и чем он хочет заниматься. Это очень важно. Например: Косте 14 лет, хочет программировать.')
    });
atBar.command('Нет', async ctx => {
    console.log(ctx.originalUtterance)
    await ctx.leave();
    await ctx.enter(SCENE_AT_END);
    return Reply.text('Возможно я что-то не то сказала. Вы хотите закончить наш разговор?');
});
atBar.any(async ctx => {
    ctx.leave()
    ctx.enter(SCENE_AT_BAR)
    return Reply.text(`Мой диалог строится на ваших ответах ДА и НЕТ, на другие я ещё не научилась отвечать. Скажите да или нет. Алиса стоп и я закончу работу навыка`)
});


atEnd.command('Да', async ctx =>{
    await ctx.leave();
    return Reply.text('Навык завершен')
})
atEnd.command('Нет', async ctx => {
    return Reply.text('С радостью напомню чем я могу помочь Вам, для начала отмечу, что мы подбираем вашему ребенку IT школу, в которой он раскроет свой потенциал по Максимум Чтобы у нас с вами всё получилось надо сказать возраст и чем интересуется ребенок Например Ивану 16 лет и он хочет делать игры. Обратите внимание что я подбираю школы для детей возраста от 6-18 лет. Так же я могу прочитать отзывы, сказать рейтинги. Если вы хотите сохранить понравившуюся школу скажите Алиса  СОХРАНИ, если хотите получить найденную информацию скажите Алиса ПРИШЛИ НА ПОЧТУ, если вы хотите закончить работу навыка скажите АЛИСА СТОП. Я могу продолжить с момента где мы с вами остановились - скажите Алиса ПРОДОЛЖИТЬ. Я могу начать навык занаво скажите ДАВАЙ НАЧНЕМ СНАЧАЛА')
})

getAge.command(/(\d{1,2})/,async ctx => {
    console.log(ctx.message)
    const age = ctx.message.match(/(\d{1,2})/)
    console.log(+age[0])
    if(+age[0] > 17 || +age[0] < 6){
        return Reply.text(`Простите, на этот возраст я не могу подобрать онлайн школы. Возрастные ограничения с 6 до 17 лет. Укажите корректный возраст`)
    }

    return Reply.text(`Замечательно! А я уже подобрала несколько школ, которые идеально подойдут вашему ребенку. Мне не терпится про них рассказать, Давайте я начну?`)
})
getAge.command(["Нам надо что-то по созданию игр",'Давай ищи'],async ctx => {
    return Reply.text('Простите, я не поняла, повторите пожалуйста какой возрат ребенка и что хочет изучать?')
})
getAge.command('Не хочу говорить свои данные',async ctx => {
    return Reply.text('Хорошо, понимаю вас, приступаю рассказывать о школах')
})
getAge.command("",async ctx => {
    return Reply.text('Возраст ребенка неопределен ')
})


aboutSchooles.command('Да',async ctx=>{})
aboutSchooles.command('Нет',async ctx=>{})
aboutSchooles.command('',async ctx=>{
    return Reply.text('Мой диалог строится на ваших ответах ДА и НЕТ, на другие я ещё не научилась отвечать. Скажите да или нет. Алиса стоп и я закончу работу навыка')
})

stage.addScene(atBar);
stage.addScene(atEnd);
stage.addScene(getAge);
stage.addScene(aboutSchooles);
alice.use(stage.getMiddleware());
alice.command('Алиса запусти навык Найди-сравни десткие онлайн школы ай-ти', ctx => {
    ctx.enter(SCENE_AT_BAR);
    return Reply.text('Здравствуйте, рада слышать,что вас интересует сфера IT, за ней будующее! Если Вам будет нужна моя подборка топовых школ, просто скажите *Алиса, пришли результаты поиска*, а сейчас давайте подберем школы, которые подойдут именно вашему ребенку, Начнем ? ', {
        buttons: ['Да', 'Нет'],
    });
});
alice.any(async ctx => Reply.text(`Я Вас не понимаю`));
const server = alice.listen(3000, '/');
