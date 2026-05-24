var already_clicked = false;
var v_is_selected = false;

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
            v_is_selected = true;
        } 
        else if (vorm == ".misi") {
            misi.classList.add("active")
            visi.classList.add("hidden")
            v_is_selected = false;
        }
    }
    else {
        if (v_is_selected) {
            misi.classList.add("active")
            visi.classList.add("hidden")
            v_is_selected = false;
        } 
        else {
            visi.classList.add("active")
            misi.classList.add("hidden")
            v_is_selected = true;
        }
    }

    vm_container.classList.add("one-please")
    already_clicked = true;
}