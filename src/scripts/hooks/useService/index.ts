import useUser from "../useUser";
import useAdapt from "./useAdapt";

export default () => {
  const { user } = useUser()
  const { loading, Post } = useAdapt()

  return {
    loading,
    QA: (inputStr: String) => Post('/text', {inputStr, user: user.id})
  }
}
