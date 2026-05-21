export const SUPPORTED_LOCALES = ['ru', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DICT = {
  ru: {
    common: {
      next: 'Далее',
      back: 'Назад',
      skip: 'Пропустить',
      start: 'Начать',
      continue: 'Продолжить',
      cancel: 'Отмена',
      done: 'Готово',
      loading: 'Загрузка',
      send: 'Отправить',
    },
    onboarding: {
      slide1Title: 'Узнавай ближе',
      slide1Body: 'Глубокие вопросы для разговоров с друзьями, семьёй и второй половинкой.',
      slide2Title: 'Выбирай героя',
      slide2Body: 'Каждый герой — свой стиль игры. Открывай новых по мере прогресса.',
      slide3Title: 'Играй и собирай колоды',
      slide3Body: 'Сотни вопросов, ежедневные задания и награды ждут тебя.',
    },
    character: {
      pickTitle: 'Выбери героя',
      pickHint: 'Можно выбрать одного — остальных откроешь позже',
      locked: 'Открывается позже',
      owned: 'Уже твой',
      pick: 'Выбрать',
      buy: 'Купить',
    },
    tabs: {
      home: 'Главная',
      tasks: 'Задания',
      characters: 'Герои',
      coins: 'Монеты',
      decks: 'Колоды',
      play: 'Играть',
    },
    tasks: {
      title: 'Задания',
      claim: 'Забрать',
      claimed: 'Получено',
      inProgress: 'В процессе',
      locked: 'Скоро',
      reward: 'Награда',
      streakDay: 'День',
    },
    coins: {
      title: 'Магазин монет',
      buyWithStars: 'Telegram Stars',
      buyWithTon: 'TON',
      soon: 'Скоро',
      balance: 'Баланс',
    },
    decks: {
      title: 'Колоды',
      owned: 'Куплено',
      special: 'Особая',
      free: 'Бесплатно',
      buy: 'Купить',
      play: 'Играть',
    },
    play: {
      title: 'Играть',
      loadingHint: 'Подбираем вопросы…',
      sincerityTitle: 'Будь искренен',
      sincerityBody: 'Игра становится глубже, если отвечать честно. Слушай и делись.',
      rushTitle: 'Не спеши с ответом',
      rushBody: 'Возьми паузу, подумай — лучший ответ родится в тишине.',
      next: 'Следующий',
      follow: 'Уточнить',
      report: 'Пожаловаться',
      favorite: 'В избранное',
      exit: 'Выйти',
    },
    feedback: {
      title: 'Помоги нам стать лучше',
      submit: 'Отправить отзыв',
      thanks: 'Спасибо за отзыв!',
    },
  },
  en: {
    common: {
      next: 'Next', back: 'Back', skip: 'Skip', start: 'Start',
      continue: 'Continue', cancel: 'Cancel', done: 'Done', loading: 'Loading', send: 'Send',
    },
    onboarding: {
      slide1Title: 'Get closer',
      slide1Body: 'Deep questions for friends, family and the one you love.',
      slide2Title: 'Pick a hero',
      slide2Body: 'Every hero has its own vibe. Unlock more as you go.',
      slide3Title: 'Play & collect decks',
      slide3Body: 'Hundreds of questions, daily quests and rewards await.',
    },
    character: {
      pickTitle: 'Pick a hero', pickHint: 'Choose one — unlock the rest later',
      locked: 'Unlocks later', owned: 'Owned', pick: 'Pick', buy: 'Buy',
    },
    tabs: { home: 'Home', tasks: 'Tasks', characters: 'Heroes', coins: 'Coins', decks: 'Decks', play: 'Play' },
    tasks: {
      title: 'Quests', claim: 'Claim', claimed: 'Claimed',
      inProgress: 'In progress', locked: 'Soon', reward: 'Reward', streakDay: 'Day',
    },
    coins: { title: 'Coin shop', buyWithStars: 'Telegram Stars', buyWithTon: 'TON', soon: 'Soon', balance: 'Balance' },
    decks: { title: 'Decks', owned: 'Owned', special: 'Special', free: 'Free', buy: 'Buy', play: 'Play' },
    play: {
      title: 'Play', loadingHint: 'Picking questions…',
      sincerityTitle: 'Be sincere', sincerityBody: 'The game gets deeper when you answer honestly.',
      rushTitle: 'Don’t rush', rushBody: 'Take a breath — the best answer comes in silence.',
      next: 'Next', follow: 'Follow-up', report: 'Report', favorite: 'Favorite', exit: 'Exit',
    },
    feedback: { title: 'Help us improve', submit: 'Send feedback', thanks: 'Thanks for the feedback!' },
  },
} as const;

export type Dict = (typeof DICT)[Locale];
