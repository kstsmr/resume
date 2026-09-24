export const navigation = [
  { id: 'home', label: 'Главная', symbol: '⌂' },
  { id: 'about', label: 'Обо мне', symbol: '◎' },
  { id: 'work', label: 'Проекты', symbol: '▦' },
  { id: 'stack', label: 'Навыки', symbol: '◇' },
  { id: 'contact', label: 'Контакты', symbol: '↗' },
] as const

export const projects = [
  {
    number: '01',
    category: 'FULL-STACK / ХАКАТОН',
    title: 'Цифровая очередь нового поколения',
    description: 'Сервис для сценариев обслуживания клиентов Почты России: веб-интерфейс, серверная логика, API и развёртывание как единой системы.',
    tags: ['React', 'Python', 'API', 'Docker'],
    href: 'https://github.com/kstsmr/pochtatech_queue_service',
    linkLabel: 'Смотреть репозиторий',
  },
  {
    number: '02',
    category: 'BLOCKCHAIN / GITHUB',
    title: 'Deployee',
    description: 'Проект в репозитории deployer. Исходный код находится в каталоге deployee.',
    tags: ['Blockchain', 'GitHub'],
    href: 'https://github.com/kstsmr/deployer/tree/main/deployee',
    linkLabel: 'Смотреть репозиторий',
  },
  {
    number: '03',
    category: 'BLOCKCHAIN / NFT',
    title: 'Zaaim NFT',
    description: 'NFT-проект с исходным кодом и историей разработки в GitHub.',
    tags: ['NFT', 'Blockchain', 'GitHub'],
    href: 'https://github.com/kstsmr/zaaimNft',
    linkLabel: 'Смотреть репозиторий',
  },
] as const

export const skillGroups = [
  { number: '01', title: 'Клиентская часть', items: ['React', 'TypeScript', 'Адаптивные интерфейсы', 'Интеграция с API'] },
  { number: '02', title: 'Серверная часть', items: ['Python / FastAPI', 'C# / .NET', 'Клиент-серверная архитектура', 'REST API'] },
  { number: '03', title: 'Языки и платформы', items: ['Swift', 'C', 'C++', 'TON / Blockchain'] },
  { number: '04', title: 'Рабочий процесс', items: ['Git', 'Docker', 'Развёртывание', 'Разбор существующего кода'] },
] as const
