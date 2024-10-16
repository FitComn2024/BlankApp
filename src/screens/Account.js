import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { getUserPoolData } from "../data/Config";

const AccountContext = createContext();
const Account = (props) => {
    const authenticate = async (Username, Password) =>{
      const poolData = await getUserPoolData();
        return await new Promise((resolve, reject)=>{
            var Pool = new CognitoUserPool(poolData);
        const user = new CognitoUser({Username, Pool })
        const authDetails = new AuthenticationDetails({ Username, Password })

        user.authenticateUser(authDetails,{
            onSuccess:(data)=>{
              console.log("Success: ",JSON.stringify(data))
              
            },
            onFailure: (err)=>{
              console.log("Failure: ",JSON.stringify(err))
              reject(err);
            },
            newPasswordRequired: (data)=>{
              console.log("new password required: ",JSON.stringify(data))
              resolve(data);
            }
    
          })
        })    
    }
    return(
        <AccountContext.Provider value={{authenticate}}>
            {props.children}

        </AccountContext.Provider>
    )
}

export {Account, AccountContext};