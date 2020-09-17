import React from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { isOpenLogin, isNeedReg } from "../../actions/actions";

function Login() {
  const dispatch = useDispatch();

  const needReg = useSelector((state) => state.isNeedReg);

  const closeLogin = () => {
    dispatch(isOpenLogin());
  };

  const reg = (e) => {
    e.preventDefault();
    dispatch(isNeedReg());
  };

  return (
    <div id="login">
      {!needReg ? (
        <div className="loginCont">
          <button className="closeButt" onClick={closeLogin}>
            X
          </button>
          <form>
            <input type="text" placeholder="Логин" />
            <input type="password" placeholder="Пароль" />
            <button>Войти</button>
            <button onClick={reg}>Зарегистрироваться</button>
          </form>
        </div>
      ) : (
        <div className="loginCont">
          <button className="closeButt" onClick={closeLogin}>
            X
          </button>
          <form>
            <input type="email" placeholder="Почта" />
            <input type="text" placeholder="Логин" />
            <input type="password" placeholder="Пароль" />
            <button>Зарегистрироваться</button>
            <button onClick={reg}>Войти</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
