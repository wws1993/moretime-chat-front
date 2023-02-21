import useMount from '@/scripts/hooks/useMount';
import sys from '@less/pages/chat.module.less'
import cx from 'classnames'
import { createRef, useEffect, useState } from 'react'

type Dialogue = {
  msg: string;
  t: number;
}

export default () => {
  const [dialogues, setDialogues] = useState<Dialogue[]>([])
  const [words, setWords] = useState<string>('')
  const inputRef = createRef<HTMLTextAreaElement>()

  const hooks = {
    /** 自动聚焦 */
    autoFocus() { inputRef.current?.focus() },
    /** 提交发言 */
    submit() {
      console.log(inputRef.current?.value);
    },
    /** 键盘按下监听 */
    listenKeybroad(ev: React.KeyboardEvent) {
      if (ev.key === 'Enter' && ev.shiftKey) {
        ev.preventDefault()
        hooks.submit()
      }
    }
  }

  useMount(hooks.autoFocus)

  return <div className={sys.chat}>
    <div className={sys.header}>ChatBot</div>

    <div className={sys.view}>
      {dialogues.map((item, k) => <div className={sys.item}>
      </div>)}
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
