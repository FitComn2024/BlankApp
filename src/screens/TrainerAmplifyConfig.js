// import Amplify from 'aws-amplify';
// import { CognitoUserPool } from 'amazon-cognito-identity-js';

// const poolData={
//   UserPoolId: 'us-east-1_4rY55MOe6',
//   ClientId: '6v2icu0n4240c9scpbh2498vgh',
// }


// export default new CognitoUserPool(poolData);


// const awsConfig = {
//     Auth: {
//       // REQUIRED - Amazon Cognito Region
//       region: 'us-east-1', // Replace with your region
  
//       // OPTIONAL - Amazon Cognito User Pool ID
//       userPoolId: 'us-east-1_4rY55MOe6', // Replace with your User Pool ID
  
//       // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//       userPoolWebClientId: '6v2icu0n4240c9scpbh2498vgh', // Replace with your App Client ID
  
//       // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//       mandatorySignIn: true,
//     },
//   };
//   Amplify.configure(awsConfig);



const poolData = {
	UserPoolId: 'us-east-1_4rY55MOe6', // Your user pool id here
	ClientId: '6v2icu0n4240c9scpbh2498vgh', // Your client id here
  region: 'us-east-1',
};

export default poolData;