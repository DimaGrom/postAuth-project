import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:3002/api'
})

instance.interceptors.request.use(config => {
	// зашиваем token в header для бэкенда.
	// В бекенде будем доставать его 
	// const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
	// А имено в checkAuth функции
	config.headers.Authorization = window.localStorage.getItem('token')
	// теперь токен будет узоди с каждым axios запросе.
	return config
})

export default instance