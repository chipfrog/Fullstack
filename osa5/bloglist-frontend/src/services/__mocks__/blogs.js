
const blogs = [
  {
    id: 1,
    title: 'TestiBlogi',
    author: 'Testaaja',
    url: 'www.youtube.com',
    likes: 5,
    user: {
      name: 'Teppo',
      username: 'TestMan'
    }
  },
  {
    id: 2,
    title: 'UrheiluBlogi',
    author: 'Maija-Leena',
    url: 'www.google.com',
    likes: 10,
    user: {
      name: 'Maija',
      username: 'Maijuska'
    }
  },
  {
    id: 3,
    title: 'Testimaa',
    author: 'Tero',
    url: 'www.tero.fi',
    likes: 0,
    user: {
      name: 'Tero',
      username: 'TeroHero'
    }
  },
  {
    id: 4,
    title: 'Tyhjänpäiväisyydet',
    author: 'Tellervo Tyhjäntoimittaja',
    url: 'Mun elämä',
    likes: 3583,
    user: {
      name: 'Tellervo',
      username: 'Telluska'
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  jest.fn()
}

export default { getAll, setToken }
