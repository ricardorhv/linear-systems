let count = 3;
add(count)
addX(count)

 function openModal(modalName){
    let modal = document.getElementById(modalName);

    if(typeof modal == 'undefined' || modal == null)
        return;

        modal.style.display = 'flex';
}

function closeModal(modalName){
    let modal = document.getElementById(modalName);
    let moreResults = document.getElementById('more-results');

    if (!moreResults.classList.contains('hidden')){
        moreResults.classList.add('hidden');
    }
    if (typeof modal == 'undefined' || modal === null)
        return;
    modal.style.display = 'none'
}

function openModalBlock(modalName){
    let modal = document.getElementById(modalName);
    modal.inn
    if(typeof modal == 'undefined' || modal == null)
        return;

    modal.classList.toggle('hidden');
    document.querySelector(".content-modal").classList.toggle('higher');
}

function addX(limit) {
    systemResults.innerHTML = ""
    for (let col = 1; col <= limit; col++) {
        let result = document.createElement('div')
        result.classList.add('x')
        
        result.innerHTML += "<span class='letter'>x"+`<small class='lower-number'>${col}</small></span>`
        result.innerHTML += "<span>=</span>"
        result.innerHTML += "<div class='underline'></div>"
        systemResults.append(result)
    }
}

function removeX(limit) {
    systemResults.innerHTML = ""
    for (let col = 1; col <= limit; col++) {
        let result = document.createElement('div')
        result.classList.add('x')
        
        result.innerHTML += "<span class='letter'>x"+`<small class='lower-number'>${col}</small></span>`
        result.innerHTML += "<span>=</span>"
        result.innerHTML += "<div class='underline'></div>"
        systemResults.append(result)
    }
}

function add(limit) {
    systemContainer.innerHTML = ""
    for (let line = 0; line < limit; line++) {
        let system = document.createElement('div')
        system.classList.add('system-x')
        for (let col = 1; col <= limit; col++) {
            system.innerHTML += "<input type='text' class='sistem-input'"+ ` placeholder='x${col}'>`
            if (col !== limit) {
             system.innerHTML += "<span class='sistem-span'>+</span>"
            }
        }
        system.innerHTML += "<span class='sistem-span'>=</span>"
        system.innerHTML += "<input type='text' class='sistem-input'>"
        systemContainer.append(system)
    }
}

function remove(limit) {
    systemContainer.innerHTML = ""
    for (let line = 0; line < limit; line++) {
        let system = document.createElement('div')
        system.classList.add('system-x')
        for (let col = 1; col <= limit; col++) {
            system.innerHTML += "<input type='text' class='sistem-input'"+ ` placeholder='x${col}'>`
            if (col !== limit) {
                system.innerHTML += "<span class='sistem-span'>+</span>"
            }
        }
        system.innerHTML += "<span class='sistem-span'>=</span>"
        system.innerHTML += "<input type='text' class='sistem-input'>"
        systemContainer.append(system)
    }
}

btnAdd.addEventListener(('click'), () => {
    count++
    add(count)
    addX(count)
})

btnRemove.addEventListener(('click'), () => {
    if (count !== 3) {
        count--
        remove(count)
        removeX(count)
    }
})