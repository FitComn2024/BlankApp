import {Amplify} from "@aws-amplify/core";
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData={
  UserPoolId: 'us-east-1_dNUZ5M8ew',
  ClientId: '30c25um8jerdkambajim4phh2s',
}



// export default new CognitoUserPool(poolData);


export default awsConfig = {
    Auth: {
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1', // Replace with your region
  
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_dNUZ5M8ew', // Replace with your User Pool ID
  
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '30c25um8jerdkambajim4phh2s', // Replace with your App Client ID
  
      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,
    },
  };
//   Amplify.configure(awsConfig);



// const poolData = {
// 	UserPoolId: 'us-east-1_4rY55MOe6', // Your user pool id here
// 	ClientId: '6v2icu0n4240c9scpbh2498vgh', // Your client id here
//   region: 'us-east-1',
// };
// const poolData = {
// 	UserPoolId: 'us-east-1_dNUZ5M8ew', // Your user pool id here
// 	ClientId: '30c25um8jerdkambajim4phh2s', // Your client id here
//   region: 'us-east-1',
// };

// export default poolData;