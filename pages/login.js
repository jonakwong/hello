
import { useState, useEffect } from 'react'
const bcrypt = require('bcrypt')

export default function Login() {
  const Logo = '../Material/Logo.png'
  const [LogResBoolean, setLogResBoolean] = useState(true) //true= Page Register
  const [PageTitle, setPageTitle] = useState()
  const [Login_Register_Toggle, setLogin_Sign_Toggle] = useState()

  useEffect(() => {
    //setpage boolean
    if (LogResBoolean == true) {
      setPageTitle('Register')
      setLogin_Sign_Toggle('Login')

    } else {
      setPageTitle('Login')
      setLogin_Sign_Toggle('Register')
    }
  })

  //define capture data (login details by user)
  const [details, setDetails] = useState({
    username: "",
    password: ""
  });

  //handle login form submit
  const submitHandler = e => {
    e.preventDefault();
    console.log(details)

    //Hash password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(details.password, salt)
    setDetails({ ...details, password: hashedPassword })

    if (LogResBoolean == true) { //if true = register > create account
      registerAccount(details)
    } else { //else false = login > login account
      loginAccount(details)
    }
  }

  //register quest to api
  async function registerAccount(details) {
    const registerurl = '/api/players/register'

    await fetch(registerurl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: (JSON.stringify({
        username: details.username,
        password: details.password
      }))
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', JSON.stringify(response)))

  }
  //login quest to api



  return (
    <div className="LoginSignup_page">
      <div className={`${!LogResBoolean && "LoginContainer"} ${LogResBoolean && "SignupContainer"}`}>

        {/* LogoContainer*/}
        <div className="Logocontainer">

        </div>
        {/* PageTitle*/}
        <div className="Pagetitlecontainer">
          <h3>{PageTitle}</h3>
        </div>


        {/*Form */}
        <form className="Login_form_container" onSubmit={submitHandler}>
          <div className="errorcontainer">

          </div>

          {/*Container*/}
          <div className="Login_Signup_Input_Container">
            <div className={`${LogResBoolean && "Login_Input_container_noshow"}  ${!LogResBoolean && "Login_Input_container "}`}>
              <div className="Login_Input_Field">
                <input placeholder="Login" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
              </div>
              <div className="Signup_Input_Field">
                <input type="password" name="password" id="password" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
              </div>
            </div>


            <div className={`${!LogResBoolean && "Signup_Input_Container_noshow"}  ${LogResBoolean && "Signup_Input_Container"}`}>
              <div className="Signup_Input_Field">
                <input type="text" name="name" id="name" placeholder="UserName" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
              </div>

              <div className="Signup_Input_Field">
                <input type="password" name="password" id="password" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
              </div>
            </div>
          </div>
          <button className="Loginbutton" type='submit' value="LOGIN">{PageTitle}</button>

        </form>
        <div className="LogResToggleContainer">
          <button className="Login_Sign_Toggle" onClick={() => setLogResBoolean(!LogResBoolean)}>{Login_Register_Toggle}</button>
        </div>
      </div>



      <style jsx>{`

          /////////////////////////// - Login Page (height 100%)

          .LoginSignup_page{
            height:100vh;
            height:100vw;
            
          }
          ////////////////////////////////////////////////////// - Containers (max - height 90%)
          /////////////////////////// - Container Design

          .SignupContainer{
            width: 95%;
            height: 90vh;
            position: fixed;
            box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
            -8px -8px 12px 0 rgba(255, 255, 255, 0.3);       
    
            border-radius: 20px;
            top: 50%;
            left: 50%;
            right: auto;
            bottom: auto;
            box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional
              spread radius] [color];
            transform: translate(-50%, -50%);

            

            text-align:center;
            justify-content: center;
            align-items: center;
            margin-right: 4rem;
            margin-bottom: 5vh;
          }
          
          .LoginContainer{
            width: 95%;
            height: 90vh;
            position: fixed;
            box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
            -8px -8px 12px 0 rgba(255, 255, 255, 0.3);       
    
            border-radius: 20px;
            top: 50%;
            left: 50%;
            right: auto;
            bottom: auto;
            box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional
              spread radius] [color];
            transform: translate(-50%, -50%);

            text-align:center;
            justify-content: center;
            align-items: center;
            margin-right: 4rem;
            margin-bottom: 5vh;
          }

          ////////////////////////////////////////////////////// - Component container
          /////////////////////////// - Logo Container (max - height 32%)

          .Logocontainer{
            height:32vh;
          }

          /////////////////////////// - Pagetitle (max - height 3%)

          .Pagetitlecontainer{
            height:3vh;
          }

          /////////////////////////// - Login form conatiner (max - height 40%)

          .Login_form_container {
            height:37vh;
            position: relative;
 
            justify-content: center;
            text-align:center;
            align-items: center;
          }

          .Login_Signup_Input_Container{
            height: 15vh;
          }

          /////////////////////////// - Login form conatiner (max- height 15%)
          .LogResToggleContainer{
            height: 15vh;
          }

          ////////////////////////////////////////////////////// - Components
          /////////////////////////// - Logo Image (max - height 32% )

          .Logocontainer img{
            margin-top:2vh; 

            height: 30vh;
            width: 30vh;
          }

          /////////////////////////// - Page Title (max - height 3% )

          .Pagetitlecontainer h3{
            color:white;
            text-shadow: 2px 2px 3px rgba(1,1,1,0.3);
            margin:0;
            letter-spacing:3px;
          }         

          /////////////////////////// - Error  (heighit 7%)
          .errorcontainer{
            height: 3vh;
            margin-top: 2vh;
            margin-bottom : 2vh;
          }   

          /////////////////////////// - Login- Fields (height 15%)

          .Login_Input_container_noshow{
            display: none;
          }

          .Login_Input_container{
            display: block;
          }

          .Login_Input_Field {
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .Login_Input_Field input {
            margin-top :2.5vh;
            margin-bottom: 2.5vh;
            height: 5vh;
            width:90vw;
            border:none;
            border-radius: 50px;
            background-color: rgba(252, 252, 252, 0.723);
            box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
              -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
              text-align: center;
          }


          /////////////////////////// - Signup - Fields (height 15%)

          .Signup_Input_Container{
            display: block;
          }

          .Signup_Input_Container_noshow{
            display: none;
          }

          .Signup_Input_Field {
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .Signup_Input_Field input {
            height: 3vh;
            margin-top: 1vh;
            margin-bottom: 1vh;
            width:90vw;
            border:none;
            border-radius: 50px;
            background-color: rgba(252, 252, 252, 0.723);
            box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
              -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
              text-align: center;

          }

          /////////////////////////// -  submit (height 18%)

          .Loginbutton {
            background-color: rgba(252, 252, 252, 0.723);
            box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
              -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
            border-radius: 50px;
            display: flex;
            height: 10vh;
            width: 40vw;
            font-size: large;
            color: white;
            font-weight: 1000;
            letter-spacing: 3px;
            align-items: center;
            justify-content: center;
            margin-top:2vh;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 3vh;
            border: none;
            text-shadow: 2px 2px 3px rgba(1,1,1,0.3);

          }

          /////////////////////////// -  submit (height 18%)
          
          .LogResToggleContainer button{
            background-color: rgba(252, 252, 252, 0.723);
            box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
              -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
            border-radius: 50px;
            display: flex;
            height: 10vh;
            width: 10vh;
            font-weight: 1000;
            font-size: 10px;
            color:white;;
            letter-spacing: 3px;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            border: none;
            text-shadow: 2px 2px 3px rgba(1,1,1,0.3);
 
          }
          

        `}</style>
    </div>
  )
}

