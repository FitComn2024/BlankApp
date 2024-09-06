const awsConfig = {
    Auth: {
      identityPoolId: 'us-east-1:5f551dfe-c0a5-48e9-9e0a-e7f0ee8133bf', // Replace with your Identity Pool ID
      region: 'us-east-1', // Replace with your region
      userPoolId: 'us-east-1_4rY55MOe6', // Replace with your User Pool ID
      userPoolWebClientId: '6v2icu0n4240c9scpbh2498vgh', // Replace with your App Client ID
    },
    Storage: {
      region: 'us-east-1',
      bucket: 'fitcomnbucket', // Replace with your S3 bucket name
    },
  };
  
  export default awsConfig;
