# dm-0910

**Разработать приложение для ведения картотеки компании и регистрации инвойсов**

Что необходимо реализовать в рамках приложения:

- просмотр, создание, редактирование и удаление карточки компании(Бизнес имя, дата регистрации, адрес проживания, телефон и тд);
- просмотр, создание, редактирование и удаление счетов на оплату (инвойсов) (дата инвойса, ввод типа инвойса (credit, debit, mixed, commercial), сумма).

Обязательное использование EntityFramework для MS SQL, .NET Core MVC и REACT JS (приветствуется).
Используйте Bootstrap, Semantic UI или Materialize для верстки веб-приложения.
Инициализация БД должна осуществляться с использованием миграций по команде Update-Database.
P.S.: Не забывайте корректно обрабатывать исключения в коде, пользователь не должен видеть непонятные окно падения приложения или текст стека вызовов
