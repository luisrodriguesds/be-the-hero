export function signIn(email, password){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'iuygq86rga8yvgbe6r8yb38785h3g877g7r',
        user:{
          name:'Luis',
          email: "luis@luis.com"
        }
      })
    }, 2000)
  })
}