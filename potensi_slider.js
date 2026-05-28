const potensi_items = document.body.querySelectorAll(".potensi-item")
const potensi_description = document.body.querySelector(".potensi-description")

console.log(potensi_description)

var chosen_potensi = 0

function clamp(min, v, max) {
    return Math.min(max, Math.max(v, min))
}

function changePotensi(by) {
    potensi_description.classList.remove(
        `translate-n-${chosen_potensi * 100}`
    )
    
    potensi_items[chosen_potensi].classList.remove("potensi-item-show")
    
    chosen_potensi = clamp(0, chosen_potensi + by, 3)
    
    potensi_items[chosen_potensi].classList.add("potensi-item-show")

    potensi_description.classList.add(
        `translate-n-${chosen_potensi * 100}`
    )
}
