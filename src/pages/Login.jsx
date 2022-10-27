import React from "react";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
    return (
        <div>
            <h1>Страница для логина</h1>
            <form>
                <Myinput type="text" placeholder="Введите логин"/>
                <Myinput type="password" placeholder="Введите пароль"/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}

export default Login