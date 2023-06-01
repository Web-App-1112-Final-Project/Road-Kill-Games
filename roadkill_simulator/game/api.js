
const instance = axios.create({ baseURL: 'http://localhost:4000/api/' });

export const getCourses = async () => {
  const { data } = await instance.get('/courses')
  console.log('hi', data)
  return (data)
};
