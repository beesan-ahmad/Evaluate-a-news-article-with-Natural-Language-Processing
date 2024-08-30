// js files
import {handleSubmit} from './js/formHandler.js'
// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

document.getElementById('form-section')
.addEventListener('submit', handleSubmit)
