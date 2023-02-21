import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default () => {

  const nav = useNavigate()

  useEffect(() => nav('/chat'))

  return <div>ChatGpt</div>
}
