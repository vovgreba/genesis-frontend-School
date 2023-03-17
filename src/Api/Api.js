import axios from 'axios';

// Отримуємо токен, для доступу до API 
const getToken = async() => {
  try{
    const {data} = await axios.get(`https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`)
    return data.token
  } catch(error) {
    return error
  }
}
// Отримання даних з API
export const requestData = async () => {
  const token = await getToken();
  try {
    const { data } = await axios.get(`https://api.wisey.app/api/v1/core/preview-courses`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return data;
  } catch (error) {
    return error
  }
};
// Отримання даних з API конкретного курса.

export const requestDataCourse = async (id) => {
  
  const token = await getToken();
  try {
    const { data } = await axios.get(`https://api.wisey.app/api/v1/core/preview-courses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return data;
  } catch (error) {
    return error
  }
};