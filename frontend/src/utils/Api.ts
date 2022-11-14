const baseUrl = 'http://localhost:3000';

interface RequestData {
  full_name: string
  email: string
  phone_number: string
  description: string
}

const stringifyData = (data: object) => {
  try {
    const stringifiedData:string = JSON.stringify(data);

    return stringifiedData;
  } catch (err) {
    console.error(err);
  }
}

export const createRequest = async (data: RequestData) => {
  const response = await fetch(baseUrl + '/orders/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringifyData(data)
  });

  return response.json();
};