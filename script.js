'use strict';
const h1 = document.querySelector('h1'),
    registrButton = document.querySelectorAll('button')[0],
    loginButton = document.querySelectorAll('button')[1],
    ul = document.querySelector('ul');

const dataArr = JSON.parse(localStorage.getItem('savesUser')) || [],
    month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const registr = () => {
        let name, login, password;
        name = isName();
        if (name !== false) {
            login = isLogin();

            if (login !== false) {
                password = isPassword();

                if (password !== false) {
                    let date = new Date();
                    let user = {
                        firstName: name.split(' ')[0],
                        lastName: name.split(' ')[1],
                        loginObj: login,
                        passwordObj: password,
                        dateObj: `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} г., ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
                    };

                    dataArr.push(user);
                    saveUser();
                    renderUser();
                }
            }

        }
    },
    isSting = item => {
        for (let i = 0; i < item.length; i++) {
            if (!isNaN(parseFloat(item[i]))) {
                return false;
            }
        }

        return true;
    },
    isName = () => {
        let name = prompt('Введите Имя и Фамилию');
        if (name === null) {
            return false;
        } else {
            if ((name.trim().length === 0 || name.split(' ').length !== 2 || isSting(name) === false)) {
                isName();
            } else {
                return name;
            }
        }
    },
    isLogin = () => {
        let login = prompt('Введите логин');
        if (login === null) {
            return false;
        } else {
            if ((login.trim().length === 0)) {
                isLogin();
            } else {
                return login;
            }
        }
    },
    isPassword = () => {
        let password = prompt('Введите пароль');
        if (password === null) {
            return false;
        } else {
            if ((password.trim().length === 0)) {
                isLogin();
            } else {
                return password;
            }
        }
    },
    renderUser = () => {
        ul.textContent = '';
        dataArr.forEach((item, i) => {
            let li = document.createElement('li');
            li.insertAdjacentHTML('beforeend', `
            <h3>
                Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегестрирован: ${item.dateObj}
            </h3>
                <span>х</span>
            `);

            ul.append(li);

            let deleteUser = li.querySelector('span');

            deleteUser.addEventListener('click', () => {
                dataArr.splice(i, 1);
                saveUser();
                renderUser();
            });
        });

        
    },
    addZero = item => item < 10 ? '0' + item : item,
    saveUser= () => {
        localStorage.setItem('savesUser', JSON.stringify(dataArr));
    },
    logIn = () => {
        let login = isLogin();

        if (login !== false) {
            let password = isPassword();
            let check;
            if (password !== false) {
                dataArr.forEach((item, i) => {
                    if(item.loginObj === login && item.passwordObj === password) {
                        renderText(i);
                        return;
                    };

                    check = false;
                });

                if(check === false) {
                    alert('Неверно введен логин и пароль');
                }
            }
        }
        
    },
    renderText = id => {
        h1.textContent = `Привет, ${dataArr[id].firstName}`;
    };


    renderUser();
registrButton.addEventListener('click', registr);

loginButton.addEventListener('click', logIn);