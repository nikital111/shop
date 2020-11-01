import React from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { isOpenLogin, isNeedReg, setAdmin } from "../../actions/actions";

function Login() {
  const dispatch = useDispatch();

  const needReg = useSelector((state) => state.isNeedReg);

  const closeLogin = () => {
    dispatch(isOpenLogin());
  };

  const auth = (e)=>{
    e.preventDefault();
    const login = document.querySelector('#logL').value;
    const password = document.querySelector('#passL').value;
    
    fetch(`http://localhost:3001/logins?login=${login}&pass=${password}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            if(data[0]){
            if(data[0].login === "admin"){
              localStorage.setItem('isAdmin','true')
              dispatch(setAdmin());
            }}
        })
        
      dispatch(isOpenLogin());
  }

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
          <form onSubmit={auth}>
            <input type="text" name="log" id="logL" defaultValue="admin" placeholder="Логин" />
            <input type="password" name="pass" id="passL" defaultValue="admin1" placeholder="Пароль" />
            <button type="submit">Войти</button>
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
