class RGB {
    constructor(string) {
        let number_string = string.slice(4, string.length - 1)
        let value_array = number_string.split(",")
        this.r = Number(value_array[0].trim())
        this.g = Number(value_array[1].trim())
        this.b = Number(value_array[2].trim())
    }
}

function lerpColor(from, to, t) {
    return "rgb(" +
    Math.round(from.r + ((to.r - from.r) * t)).toString() + ", " +
    Math.round(from.g + ((to.g - from.g) * t)).toString() + ", " +
    Math.round(from.b + ((to.b - from.b) * t)).toString() + ")"
}

const root = document.documentElement
const style = getComputedStyle(root)
const v_b = new RGB(style.getPropertyValue("--light-v").trim())
const m_b = new RGB(style.getPropertyValue("--light-m").trim())
const vorm_b = new RGB(style.getPropertyValue("--light-vorm").trim())
const vorm_a = new RGB(style.getPropertyValue("--dark-vorm").trim())
const m_a = new RGB(style.getPropertyValue("--dark-m").trim())
const v_a = new RGB(style.getPropertyValue("--dark-v").trim())

function keyframesString(color_1b, color_1a, color_2b, color_2a, name, step) {
    let keyframesString = `@keyframes ${name} {`
    
    for (i = 0; i < step; i++) {
        let t = i / (step - 1)
        keyframesString += `${Math.round(t * 100)}% {
            background: linear-gradient(180deg, ${lerpColor(color_1b, color_2b, t)}, ${lerpColor(color_1a, color_2a, t)})
        }`
    }

    keyframesString += "}"

    return keyframesString
}

let color_lerp_1 = document.createElement("style")
color_lerp_1.textContent = keyframesString(m_b, m_a, vorm_b, vorm_a, "m-change-color", 101)

let color_lerp_2 = document.createElement("style")
color_lerp_2.textContent = keyframesString(v_b, v_a, vorm_b, vorm_a, "v-change-color", 101)

let color_lerp_3 = document.createElement("style")
color_lerp_3.textContent = keyframesString(vorm_b, vorm_a, v_b, v_a, "v-back", 101)

let color_lerp_4 = document.createElement("style")
color_lerp_4.textContent = keyframesString(vorm_b, vorm_a, m_b, m_a, "m-back", 101)

document.head.appendChild(color_lerp_1)
document.head.appendChild(color_lerp_2)
document.head.appendChild(color_lerp_3)
document.head.appendChild(color_lerp_4)