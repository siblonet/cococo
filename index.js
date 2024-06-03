// Sidebar
const menuItems = document.querySelectorAll('.menu-item');

// Messages 
const messageNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

//story
const modala = document.querySelector('.modala');
const modala_wrap = document.querySelector('.modala-wrapa');
const line_runner1 = document.getElementById('line_runner1');
const line_runner2 = document.getElementById('line_runner2');
const line_runner3 = document.getElementById('line_runner3');
const line_runner = document.querySelector('.line_runner');
const profile_link = document.getElementById('profile_link');
const profil_img = document.getElementById('profil_img');
const profil_rol = document.getElementById('profil_rol');

const change_to_next = document.getElementById('change_to_next');


let timerId;
let timerIa;
let timerIb;

const modala_compte = document.querySelector('.modala_compte');
const modala_wrapa_compte = document.querySelector('.modala-wrapa_compte');

const modala_recrutement_form = document.querySelector('.modala_recrutement_form');
const modala_wrapa_recrutement_form = document.querySelector('.modala_wrapa_recrutement_form');


// ============== SIDEBAR ============== 

// Remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').
                style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').
                style.display = 'block';
            document.querySelector('#notifications .notification-count').
                style.display = 'none';
        }
    })
})

// ============== MESSAGES ============== 

//Searches messages
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if (name.indexOf(val) != -1) {
            user.style.display = 'flex';
        } else {
            user.style.display = 'none';
        }
    })
}

//Search for messages
messageSearch.addEventListener('keyup', searchMessage);

//Highlight messages card when messages menu item is clicked
messageNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messageNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

// ============== THEME / DISPLAY CUSTOMIZATION ============== 

// Opens Modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// Closes Modal
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);





// Closes Modal
const closeStoryModala = () => {
    clearTimeout(timerId);
    clearTimeout(timerIa);
    clearTimeout(timerIb);
    line_runner1.style.transition = 'width 0.5s linear';
    line_runner2.style.transition = 'width 0.5s linear';
    line_runner3.style.transition = 'width 0.5s linear';
    line_runner1.style.width = '0%';
    line_runner2.style.width = '0%';
    line_runner3.style.width = '0%';

    modala.style.pointerEvents = 'none';
    modala.style.opacity = '0';
    modala.style.transition = 'opacity 250ms 700ms ease';
    modala_wrap.style.pointerEvents = 'auto';
    modala_wrap.style.opacity = '0';
    modala_wrap.style.transform = 'scale(0.6)';
    modala_wrap.style.transition = 'opacity 250ms 250ms ease, transform 300ms 250ms ease';
    modala.style.zIndex = '-50';

}

// Closes Modal
const closeStoryModal = (e) => {
    if (e.target.classList.contains('modala')) {
        clearTimeout(timerId);
        clearTimeout(timerIa);
        clearTimeout(timerIb);
        line_runner1.style.transition = 'width 0.5s linear';
        line_runner2.style.transition = 'width 0.5s linear';
        line_runner3.style.transition = 'width 0.5s linear';

        line_runner1.style.width = '0%';
        line_runner2.style.width = '0%';
        line_runner3.style.width = '0%';

        modala.style.pointerEvents = 'none';
        modala.style.opacity = '0';
        modala.style.transition = 'opacity 250ms 700ms ease';

        modala_wrap.style.pointerEvents = 'auto';
        modala_wrap.style.opacity = '0';
        modala_wrap.style.transform = 'scale(0.6)';
        modala_wrap.style.transition = 'opacity 250ms 250ms ease, transform 300ms 250ms ease';
        modala.style.zIndex = '-50';

    }
}

modala.addEventListener('click', closeStoryModal);






const closeAccountModal = (e) => {
    if (e.target.classList.contains('modala_compte')) {
        try {
            document.getElementById('phone').value = "";
            document.getElementById('user-name').value = "";
        } catch (error) {

        }

        try {
            document.getElementById('pre-password').value = "";
            document.getElementById('phonea').value = "";
        } catch (error) {

        }


        const aoount_view_contaner = document.getElementById('aoount_view_contaner');
        aoount_view_contaner.innerHTML = `
            <div style="display: flex; width: 100%; flex-wrap: wrap; justify-content: space-between;">
                <a class="btn btn-primary" onclick="AccountView('connect')" style="cursor: pointer;">
                    Connexion
                </a>

                <a class="btn btn-primary" onclick="AccountView('create')" style="cursor: pointer;">
                    Créer Compte
                </a>
            </div>
        `;

        modala_compte.style.pointerEvents = 'none';
        modala_compte.style.opacity = '0';
        modala_compte.style.transition = 'opacity 250ms 700ms ease';

        modala_wrapa_compte.style.pointerEvents = 'auto';
        modala_wrapa_compte.style.opacity = '0';
        modala_wrapa_compte.style.transform = 'scale(0.6)';
        modala_wrapa_compte.style.transition = 'opacity 250ms 250ms ease, transform 300ms 250ms ease';
        modala_compte.style.zIndex = '-50';

    }
}
modala_compte.addEventListener('click', closeAccountModal);

const closeAccountModala = () => {
    try {
        document.getElementById('phone').value = "";
        document.getElementById('user-name').value = "";
    } catch (error) {

    }

    try {
        document.getElementById('pre-password').value = "";
        document.getElementById('phonea').value = "";
    } catch (error) {

    }


    const aoount_view_contaner = document.getElementById('aoount_view_contaner');
    aoount_view_contaner.innerHTML = `
            <div style="display: flex; width: 100%; flex-wrap: wrap; justify-content: space-between;">
                <a class="btn btn-primary" onclick="AccountView('connect')" style="cursor: pointer;">
                    Connexion
                </a>

                <a class="btn btn-primary" onclick="AccountView('create')" style="cursor: pointer;">
                    Créer Compte
                </a>
            </div>
        `;

    modala_compte.style.pointerEvents = 'none';
    modala_compte.style.opacity = '0';
    modala_compte.style.transition = 'opacity 250ms 700ms ease';

    modala_wrapa_compte.style.pointerEvents = 'auto';
    modala_wrapa_compte.style.opacity = '0';
    modala_wrapa_compte.style.transform = 'scale(0.6)';
    modala_wrapa_compte.style.transition = 'opacity 250ms 250ms ease, transform 300ms 250ms ease';
    modala_compte.style.zIndex = '-50';

}





const closeRecrutementForm = (e) => {
    if (e.target.classList.contains('modala_recrutement_form')) {
        try {
            //document.getElementById('phone').value = "";
        } catch (error) {

        }

       

        modala_recrutement_form.style.pointerEvents = 'none';
        modala_recrutement_form.style.opacity = '0';
        modala_recrutement_form.style.transition = 'opacity 250ms 700ms ease';

        modala_wrapa_recrutement_form.style.pointerEvents = 'auto';
        modala_wrapa_recrutement_form.style.opacity = '0';
        modala_wrapa_recrutement_form.style.transform = 'scale(0.6)';
        modala_wrapa_recrutement_form.style.transition = 'opacity 250ms 250ms ease, transform 300ms 250ms ease';
        modala_recrutement_form.style.zIndex = '-50';

    }
}
modala_recrutement_form.addEventListener('click', closeRecrutementForm);

const closeRecrutementForma = () => {
    try {
        //document.getElementById('phone').value = "";
    } catch (error) {

    }

    modala_recrutement_form.style.pointerEvents = 'none';
    modala_recrutement_form.style.opacity = '0';
    modala_recrutement_form.style.transition = 'opacity 250ms 700ms ease';

    modala_wrapa_recrutement_form.style.pointerEvents = 'auto';
    modala_wrapa_recrutement_form.style.opacity = '0';
    modala_wrapa_recrutement_form.style.transform = 'scale(0.6)';
    modala_wrapa_recrutement_form.style.transition = 'opacity 250ms 250ms ease, transform 300ms 250ms ease';
    modala_recrutement_form.style.zIndex = '-50';

}
// ============== FONT SIZE ============== 

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size-1')) {
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '-12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }

        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
    })
})

// Remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// Change color primary
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        changeActiveColorClass();

        if (color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }

        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remove customized changes from local storage
    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});