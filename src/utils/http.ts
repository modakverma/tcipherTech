import { config } from "../config";

const getEnvUrl = (): string => {
  switch(import.meta.env.MODE) {
    case "development":
      return config.localurl;
    case "production":
      return config.productionUrl;
    default:
      return ""
  }
  return import.meta.env.MODE === "development" ? config.localurl : ""
}

export const handlePostRequest = async (suburl: string, postData: any) => {
  try {
    const url = getEnvUrl() + suburl;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const jsonResponse = await response.json();
    console.log('Response:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
};

export const handleGetRequest = async (url:string)=>{
  try{
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Network response was not ok.');
      }
      const jsonResponse = await response.json();
      return jsonResponse;
  }
  catch(error){
    console.error('Error FETCHING data:', error);
  }
}