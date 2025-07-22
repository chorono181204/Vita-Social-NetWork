import { setContext } from '@apollo/client/link/context';
import * as tokenUtils from '../utils/token';

export const authLink = setContext(async (operation, { headers }) => {
  try {
    const accessToken = await tokenUtils.getAccessToken();
    
    const newHeaders = {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    };
    
    console.log('Apollo Request Headers:', newHeaders);
    console.log('Apollo Request Payload:', operation);
    console.log('Access Token available:', !!accessToken);
    
    return {
      headers: newHeaders,
    };
  } catch (error) {
    console.error('Error in auth link:', error);
    return {
      headers: {
        ...headers,
        authorization: '',
      },
    };
  }
});
