const authConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
}

export {authConfig}