import { useState } from "react"

export default () => {
  const [user, SetUser] = useState<T.User>({
    id: 'Ad'
  })

  return {
    user
  }
}
