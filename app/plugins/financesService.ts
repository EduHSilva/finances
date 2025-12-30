import financesService from '~/services/financesService'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const service = financesService({
    apiUrl: `${config.public.apiUrl}/finances/`
  })

  return {
    provide: {
      financesService: service
    }
  }
})
