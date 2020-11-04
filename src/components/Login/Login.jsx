import React from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { isOpenLogin, isNeedReg, setAdmin, setLogin } from "../../actions/actions";

function Login() {
  const dispatch = useDispatch();

  const needReg = useSelector((state) => state.isNeedReg);

  const closeLogin = () => {
    dispatch(isOpenLogin());
  };

  const auth = e =>{
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
              localStorage.setItem('isLogginned','true')
              localStorage.setItem('personalData',JSON.stringify(data[0]))
              dispatch(setAdmin());
              dispatch(setLogin());
            }
            else {
              localStorage.setItem('isLogginned','true')
              localStorage.setItem('personalData',JSON.stringify(data[0]))
              dispatch(setLogin());
            }
          
          }
        })
        
      dispatch(isOpenLogin());
  }

  const registration = (e) => {
    e.preventDefault();
    const loginR = document.querySelector('#logR').value;
    const passR = document.querySelector('#passR').value;
    const emailR = document.querySelector('#emailR').value;

      fetch('http://localhost:3001/logins',{method:'post', headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email:emailR,
      login:loginR,
      pass:passR
    }) 
  })
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
            <input type="text" name="log" id="logL" className="inputLogin" defaultValue="admin" placeholder="Логин" />
            <input type="password" name="pass" id="passL" className="inputLogin" defaultValue="admin1" placeholder="Пароль" />
            <button type="submit" className="buttLogin">Войти</button>
            <button onClick={reg} className="buttLogin">Зарегистрироваться</button>
          </form>
        </div>
      ) : (
          <div className="loginCont">
            <button className="closeButt" onClick={closeLogin}>
              X
          </button>
            <form onSubmit={registration}>
              <input type="email" name="emailR" id="emailR" className="inputLogin" placeholder="Почта" />
              <input type="text" name="logR" id="logR" className="inputLogin" placeholder="Логин" />
              <input type="password" name="passR" id="passR" className="inputLogin" placeholder="Пароль" />
              <button type='submit' className="buttLogin">Зарегистрироваться</button>
              <button onClick={reg} className="buttLogin">Войти</button>
            </form>
          </div>
        )}
    </div>
  );
}

export default Login;
