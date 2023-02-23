import { useState } from "react"

export default () => {
  const [user, SetUser] = useState<T.User>({
    id: 'You'
  })

  return {
    user,
    client: /Mobi|Android|iPhone/i.test(window.navigator.userAgent) ? 'mobile' : 'pc'
  }
}
