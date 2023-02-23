import useMount from '@/scripts/hooks/useMount';
import useService from '@/scripts/hooks/useService';
import useUser from '@/scripts/hooks/useUser';
import sys from '@less/pages/chat.module.less'
import cx from 'classnames'
import { createRef, useEffect, useState } from 'react'

type Dialogue = {
  msg: string;
  user: string;
  t: number;
}

export default () => {
  const [dialogues, setDialogues] = useState<Dialogue[]>(JSON.parse(window.localStorage.getItem('CHATBOT_HISTORY') || '[]'))
  const [words, setWords] = useState<string>('')
  const { user } = useUser()
  const service = useService()

  const inputRef = createRef<HTMLTextAreaElement>()
  const viewRef = createRef<HTMLDivElement>()

  const hooks = {
    /** 同步对话 */
    syncDialogues(info: Dialogue) {
      dialogues.push(info)

      viewRef.current?.scrollTo({
        top: viewRef.current.children[0]?.clientHeight * 2,
        behavior: 'smooth',
      })

      setDialogues([...dialogues])
    },
    /** 自动聚焦 */
    autoFocus() { inputRef.current?.focus() },
    /** 提交发言 */
    async submit() {
      const msg = inputRef.current?.value!;
      hooks.syncDialogues({msg: msg, user: user.id, t: Date.now()});

      (inputRef.current!).value = '';
      setWords('')

      const res = await service.QA(msg)
      hooks.syncDialogues({msg: res.data, user: 'Bot', t: Date.now()})
    },
    /** 键盘按下监听 */
    listenKeybroad(ev: React.KeyboardEvent) {
      if (ev.key === 'Enter' && ev.ctrlKey) {
        ev.preventDefault()
        hooks.submit()
      }
    }
  }

  useMount(hooks.autoFocus)

  useEffect(() => {
    window.localStorage.setItem('CHATBOT_HISTORY', JSON.stringify(dialogues))
  }, [dialogues])

  return <div className={sys.chat}>
    <div className={sys.header}>ChatBot</div>

    <div className={sys.view} ref={viewRef}>
      <section>
        {dialogues.map((item, k) => <div
          key={k}
          className={cx(
            sys.item,
            item.user === user.id && sys.self,
          )}
        >
          <span className={sys.avatar}>{item.user}</span>
          <span className={sys.msg}>{item.msg}</span>
        </div>)}
      </section>
    </div>

    <div className={sys.input}>
      <div className={sys.area}>
        <textarea
          ref={inputRef}
          className={sys.areaInput}
          onSubmit={hooks.submit}
          onChange={ev => setWords(ev.target.value)}
          onKeyDownCapture={hooks.listenKeybroad}
        ></textarea>
        <span className={sys.areaSpan}>{ words }</span>
      </div>

      <span
        className={sys.send}
        onClick={hooks.submit}
      >发送</span>
    </div>
  </div>
}
