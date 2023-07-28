# Practicat.ru
## Сайт практикантов в компании Норбит
Репозиторий содержит исходный код сайта [practicat.ru](http://practicat.ru) и сервиса по отправки email писем.

## Структура сайта

|Ресурс|Исходные файлы|
|------|--------------|
|Главная страница|[/Web/site](/Web/site)|
|Подача заявки|[/Web/site](/Web/site)|
|Игра|[/Web/game](/Web/game)|
|Сервис отправки писем|[/Server](/Server)|

## Запуск

### Сайт

Входной точкой сайта является [index.html](/index.html).

Главная страница не требует дополнительных действий и доступны в браузере сразу.

#### Компиляция игры

Для работы игры требуется компиляция её иходного кода из TypeScript в JavaScript при помощи [Node.js](https://nodejs.org/).

Установите компилятор:

```npm install typescript --save-dev```
Создайте tsconfig.json в корне проекта:
```
{
  "compilerOptions": {
    "module": "ES2022",
    "allowSyntheticDefaultImports": true,             
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true, 
    "skipLibCheck": true,                                 
    "rootDir": "./game/src",  // Корневая папка для файлов TypeScript
    "outDir": "./game/dist"   // Папка для скомпилированных файлов
  },
  "include": ["./game/src/**/*","./resources/**/*"] // Включить данные исходные файлы 
}
```

Скомпелируйте проект:

```tsc```

#### Сервис

Для запуска сервиса используйте средства IDE (например [IntelliJ IDE](https://www.jetbrains.com/idea/)) или скомелируйте jar файл самостоятельно.

Для запуска используются следующие аргументы:

```
[порт] [базовый адрес сайта] [путь к конфиг файлу]
```

* Порт - номер порта (0-65555), котроый прослушивает сервер
* Базовый адрес сайта - адрес сайта с которого будет поступать заявка. (http://practicat.ru)
* Путь к конфиг файлу - путь к файлу .properties, содержащему информацию о SMTP сервере электронной почты.

config.properties:

```
mail.from = <sender's mail>
mail.from.password = <sender email password>
mail.to = <recipient's mail>
mail.smtp.auth = true
mail.smtp.starttls.enable = true
mail.smtp.host = <email SMTP server adress>
mail.smtp.port = <email SMTP server port>
```

В файле [form.html](/Web/site/form.html) на строке 20 впишите адрес сервиса, его порт и '/form'

```
 <form class="container" id="questionnaire" action="[адрес сервера]:[порт]/form">
```
Например:

```
 <form class="container" id="questionnaire" action="http://practicat.ru:8888/form">
```

### Как это работает

