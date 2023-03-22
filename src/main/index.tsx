import React from 'react'
import ReactDOM from 'react-dom'

import Router from '@/presentation/components/router/router'
import { makeLogin } from './factories/pages'

ReactDOM.render(<Router Login={makeLogin} />, document.getElementById('root'))
