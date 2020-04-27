import htmlToElement from "../../utils/htmlToElement"
import { nanoid } from 'nanoid'



class ToggleSwitch {

    constructor({ onClick, isChecked = false }) {
        this.id = nanoid()
        this.onClick = onClick
        this.isChecked = isChecked
        this.element = null;
    }

    handleClick(e) {
        this.isChecked = e.target.checked
        this.onClick(this.isChecked)

    }

    render() {

        if (!this.element) {
            this.element = htmlToElement(`
            <div class="toggle-switch">
                <input id="${this.id}" type="checkbox" class="toggle-switch__input" />
                <label for="${this.id}"  class="toggle-switch__label">
                    <span class="toggle-switch__label--off">OFF</span>
                    <span class="toggle-switch__label--on">ON</span>
                  
                </label>
            </div>
        `)
            const input = this.element.querySelector("input")
            input.checked = this.isChecked
            input.addEventListener('click', this.handleClick.bind(this))
        }

        return this.element
    }
}

export { ToggleSwitch as default }