const filterFormData = (formData: FormData) => {
  Array.from(formData.keys()).forEach((key) => {
    const value = formData.get(key)

    if (typeof value === 'string' && value === '') {
      formData.delete(key)
    }

    if (value instanceof File && value.size <= 0) {
      formData.delete(key)
    }
  })

  return formData
}
export { filterFormData }
