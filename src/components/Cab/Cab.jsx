import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setLogin } from "../../actions/actions";
import "./Cab.css";
import { useEffect } from "react";
import { useState } from "react";

const Cab = () => {
  const [isEdit, setIsEdit] = useState(false); 
  const persData = [{name:"email",text:"Почта:"},{name:"login",text:"Логин:"},{name:"pass",text:"Пароль:"}
  ,{name:"FIO",text:"ФИО:"},{name:"about",text:"Описание:"},];

  // useEffect(()=>{
  //   if(localStorage.getItem('personalData')) {
  //     const parsedImgData = JSON.parse(localStorage.getItem('personalData')).img;
  //     if(parsedImgData) document.querySelector('.avatar').src = parsedImgData;
  //   }
  // },[])

    const dispatch = useDispatch()
    const isAdmin = useSelector((state) => state.isAdmin);
    const isLogginned = useSelector((state) => state.isLogginned);
        if(!isAdmin && localStorage.getItem('isAdmin')){
            dispatch(setAdmin())
        }
        if(!isLogginned && localStorage.getItem('isLogginned')){
          dispatch(setLogin())
        }
        if(!isLogginned || !localStorage.getItem('isLogginned')){
          return(
            <div className="noAuth">
              Сначала нужно авторизоваться!
              <NavLink to="/" activeClassName="">
            Вернуться в каталог
          </NavLink>
            </div>
          )
        }

        const personalDataList = persData.map(data=>{
          const parsedData = JSON.parse(localStorage.getItem('personalData'))
         return <li key={`${data.name}_pd`} className="dataCont">
           <span className="dataName">{data.text} </span>
           <span className="dataText">{parsedData[data.name] ? parsedData[data.name] : "Пусто"}</span>
           </li>
          })

          const editPersonalDataList = persData.map(data=>{
            const parsedData = JSON.parse(localStorage.getItem('personalData'))
           return <li key={`${data.name}_pd`} className="dataCont">
             <span className="dataName">{data.text} </span>
             <span className="dataText"><input type="text" disabled={data.name === "email" ? true : false} id={`${data.name}_newData`} defaultValue={parsedData[data.name] ? parsedData[data.name] : null}/></span>
             </li>
           })

           const editChange = e => {
            e.preventDefault();
             const newLogin = document.querySelector("#login_newData").value;
             const newPass = document.querySelector("#pass_newData").value;
             const newFIO = document.querySelector("#FIO_newData").value;
             const newAbout = document.querySelector("#about_newData").value;

            const parsedData = JSON.parse(localStorage.getItem('personalData'))
            const newParsedData = {
              id:parsedData.id,
              email:parsedData.email,
              login:newLogin,
              pass:newPass,
              FIO:newFIO,
              about:newAbout,
              img:parsedData.img
            }
            localStorage.setItem('personalData',JSON.stringify(newParsedData))
             setIsEdit(!isEdit);
            fetch(`http://localhost:3001/logins/${parsedData.id}`,{method:'put', headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newParsedData) 
          });
          
           }

           const setImg = e => {
            e.preventDefault();
            const parsedData = JSON.parse(localStorage.getItem('personalData'))
            const inImg = document.querySelector("#imgForData").files;

            var reader = new FileReader();
                reader.onload = function( e ){
                  console.log(e.target.result)
                  parsedData.img = e.target.result;
                  localStorage.setItem('personalData',JSON.stringify(parsedData));
                  fetch(`http://localhost:3001/logins/${parsedData.id}`,{method:'put', headers:{
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(parsedData)
                });
                };
                reader.readAsDataURL( inImg[0] );
            }
            
  return (
    <div className="contCab">
      <div className="personalData"> 
      <div className="imgData">
      <img
           src={JSON.parse(localStorage.getItem('personalData')).img ? JSON.parse(localStorage.getItem('personalData')).img : require("../../image/avatar.jpg")}
           alt="avatar"
           className="avatar"
      />
      <input type="file" accept=".png, .jpg, .jpeg" id="imgForData" name="imgForData" onChange={setImg}/>

      </div>
      <ul>
        {!isEdit ? personalDataList : editPersonalDataList}
        {!isEdit ? <button className="dataEditButt" onClick={()=>setIsEdit(!isEdit)}>Изменить</button> : <button className="dataEditButt" onClick={editChange}>Готово</button>}
      </ul>
      </div>
        
    </div>
  );
};

export default Cab;
