
const instance = axios.create({ baseURL: 'http://localhost:4000/api_game2' });

export const saveScore = async ({ name, score }) => {
  const { data } = await instance.post('/save', {
    name,
    score
  })
  return (data)
};

