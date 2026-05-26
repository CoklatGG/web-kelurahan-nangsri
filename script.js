var already_clicked = false
var v_is_selected = false

function selectVM(vorm) {
    const vm_container = document.querySelector(".visi-misi-container")
    const visi = document.querySelector(".visi")
    const misi = document.querySelector(".misi")

    vm_container.classList.remove("one-please")
    
    visi.classList.remove("active")
    visi.classList.remove("hidden")
    
    misi.classList.remove("active")
    misi.classList.remove("hidden")
    if (!already_clicked) {
        if (vorm == ".visi") {
            visi.classList.add("active")
            misi.classList.add("hidden")
            v_is_selected = true
        } 
        else if (vorm == ".misi") {
            misi.classList.add("active")
            visi.classList.add("hidden")
            v_is_selected = false
        }
    }
    else {
        if (v_is_selected) {
            misi.classList.add("active")
            visi.classList.add("hidden")
            v_is_selected = false
        } 
        else {
            visi.classList.add("active")
            misi.classList.add("hidden")
            v_is_selected = true
        }
    }

    vm_container.classList.add("one-please")
    already_clicked = true
}

function zoomImage(item) {
    const zoomOverlay = document.createElement("div")
    zoomOverlay.classList.add("zoom-overlay")

    const zoomImage = document.createElement("img")
    zoomImage.src = item.children[0].src

    document.body.appendChild(zoomOverlay)
    zoomOverlay.appendChild(zoomImage)

    zoomOverlay.addEventListener("click", function() {
        document.body.removeChild(zoomOverlay)
    })
}

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

function keyframesString(step) {
    let keyframesString = "@keyframes m-change-color {"
    
    for (i = 0; i < step; i++) {
        let t = i / (step - 1)
        console.log(t)
        keyframesString += `${Math.round(t * 100)}% {
            background: linear-gradient(180deg, ${lerpColor(m_b, vorm_b, t)}, ${lerpColor(m_a, vorm_a, t)})
        }`
    }

    keyframesString += "}"

    keyframesString += "@keyframes v-change-color {"
    
    for (i = 0; i < step; i++) {
        let t = i / (step - 1)
        console.log(t)
        keyframesString += `${Math.round(t * 100)}% {
            background: linear-gradient(180deg, ${lerpColor(v_b, vorm_b, t)}, ${lerpColor(v_a, vorm_a, t)})
        }`
    }

    keyframesString += "}"

    return keyframesString
}

let color_lerp = document.createElement("style")

color_lerp.textContent = keyframesString(101)

document.head.appendChild(color_lerp)