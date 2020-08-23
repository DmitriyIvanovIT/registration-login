'use strict';
const h1 = document.querySelector('h1'),
    registrButton = document.querySelectorAll('button')[0],
    loginButton = document.querySelectorAll('button')[1],
    ul = document.querySelector('ul');

const dataArr = JSON.parse(localStorage.getItem('savesUser')) || [],
    month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

let name, login, password;

const registr = () => {
        
        isName();
        if (name !== null) {
            isLogin();

            if (login !== null) {
                isPassword();

                if (password !== null) {
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
        name = prompt('Введите Имя и Фамилию');
        if (name !== null) {
            if ((name.trim().length === 0 || name.split(' ').length !== 2 || isSting(name) === false)) {
                isName();
            } else {
                return name;
            }
        }
    },
    isLogin = () => {
        login = prompt('Введите логин на аглийском одни словом');
        if (login !== null) {
            if (login.trim().length !== 0 && isEngl(login) && login.split(' ').length === 1) {
                return login;              
            } else {
                isLogin();
            }
        }
    },
    isPassword = () => {
        password = prompt('Введите пароль');
        if (password !== null) {
            if (password.trim().length !== 0 && isEngl(password) && password.split(' ').length === 1) {
                return password;
            } else {
                isPassword();
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
        isLogin();
        if (login !== null) {
            isPassword();
            if (password !== null) {
                dataArr.forEach((item, i) => {
                    if(item.loginObj === login && item.passwordObj === password) {
                        renderText(i);
                        return;
                    } else if (i === (dataArr.length - 1)) {
                        alert('Неверно введен логин и пароль');
                    };
                });
            }
        }
        
    },
    renderText = id => {
        h1.textContent = `Привет, ${dataArr[id].firstName}`;
    }, 
    isEngl = elem => {
        let check = /[a-zA-Z0-9]/;
        return check.test(elem);
    };


    renderUser();
registrButton.addEventListener('click', registr);

loginButton.addEventListener('click', logIn);