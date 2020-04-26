import htmlToElement from "../../utils/htmlToElement"
import { nanoid } from 'nanoid'


class ToggleSwitch {

    constructor(onClick) {
        this.id = nanoid()
        this.onClick = onClick




    }

    handleClick(e) {

        this.onClick(e.target.checked)
    }

    render() {

        const element = htmlToElement(`
            <div class="toggle-switch">
                <input checked id="${this.id}" type="checkbox" class="toggle-switch__input" />
                <label for="${this.id}"  class="toggle-switch__label">
                    <span class="toggle-switch__label--off">OFF</span>
                    <span class="toggle-switch__label--on">ON</span>
                  
                </label>
            </div>
          
        `)


        element.querySelector("input").addEventListener('click', this.handleClick.bind(this))

        return element
    }
}

export { ToggleSwitch as default }