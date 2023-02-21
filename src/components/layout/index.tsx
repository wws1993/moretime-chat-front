import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import sys from './layout.module.less'
import cx from 'classnames';
import projectConfig from '@config/project.config';

type IProps = ComponentBaseProps & {
  Header?: React.ReactNode
  Footer?: boolean
}

export default (props: IProps) => {
  const { isMobile } = projectConfig

  return <div className={cx(sys.layout, isMobile && 'mobile')}>
    <div className={sys['layout-header']}>{props.Header}</div>

    <div className={sys['layout-view']}>
      { props.children }
      <div className={sys['layout-footer']}>
        <div className={sys.Copyright}>Copyright © 2023-2023 MoreTime. All Rights Reserved.</div>
      </div>
    </div>

    <ToastContainer
      position='top-center'
      autoClose={1500}
    />
  </div>
}
