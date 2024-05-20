let sexslea
let useravailabilitysleb
let usersituationslec
let useretudientsled

async function getAdmin() {
    const user_id = sessionStorage.getItem('_id');
    const Supprimer = document.getElementById('Supprimer');
    const imagbotoma = document.getElementById('imagbotoma');
    const imagbotomb = document.getElementById('imagbotomb');
    const imagbotomc = document.getElementById('imagbotomc');
    Supprimer.removeAttribute("onclick");


    if (user_id) {
        const sesStoge = await GetPersonByID(user_id);
        const username = whatisthis(sesStoge.name);
        const userphone = whatisthis(sesStoge.phone);
        const useremail = whatisthis(sesStoge.email);
        const userprof = whatisthis(sesStoge.prof);
        const userpassword = sesStoge.password;
        const userrole = whatisthis(sesStoge.role);
        const userpushtoken = whatisthis(sesStoge.pushtoken);
        const userallow = sesStoge.allow;
        const userville = whatisthis(sesStoge.ville);
        const userbio = whatisthis(sesStoge.bio);
        const usersex = whatisthis(sesStoge.sex);
        const useravailability = sesStoge.availability;
        const useraddress = whatisthis(sesStoge.address);
        const userphoto = sesStoge.image;

        const usersituation = whatisthis(sesStoge.situation ? sesStoge.situation : "");
        const userage = whatisthis(sesStoge.age ? sesStoge.age : "");
        const userwhatsapp = whatisthis(sesStoge.wapp ? sesStoge.wapp : "");
        const usernationality = whatisthis(sesStoge.natinalite ? sesStoge.natinalite : "");
        const userreligion = whatisthis(sesStoge.religion ? sesStoge.religion : "");
        const useretudient = whatisthis(sesStoge.etudient ? sesStoge.etudient : "");



        if (userphoto.length > 0) {
            document.getElementById(`imagea`).src = userphoto[0].ima == null ? "assets/images/baby1.webp" : userphoto[0].ima;
            document.getElementById(`ioda`).value = userphoto[0]._id;
            imagbotoma.setAttribute("onclick", `DeleteImage('${userphoto[0].ima}', '${userphoto[0]._id}', 'imagbotoma')`);
            imagbotoma.innerHTML = `
                Modifier
                <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
            `;
        } else {
            document.getElementById(`imagea`).src = "assets/images/baby1.webp"
        }


        if (userphoto.length > 1) {
            document.getElementById(`imageb`).src = userphoto[1].ima == null ? "assets/images/baby1.webp" : userphoto[1].ima;
            document.getElementById(`iodb`).value = userphoto[1]._id;
            imagbotomb.setAttribute("onclick", `DeleteImage('${userphoto[1].ima}', '${userphoto[1]._id}', 'imagbotomb')`);
            imagbotomb.innerHTML = `
                Modifier
                <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
            `;
        } else {
            document.getElementById(`imageb`).src = "assets/images/baby1.webp"
        }

        if (userphoto.length > 2) {
            document.getElementById(`imagec`).src = userphoto[2].ima == null ? "assets/images/baby1.webp" : userphoto[2].ima;
            document.getElementById(`iodc`).value = userphoto[2]._id;
            imagbotomc.setAttribute("onclick", `DeleteImage('${userphoto[2].ima}', '${userphoto[2]._id}', 'imagbotomc')`);
            imagbotomc.innerHTML = `
                Modifier
                <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
            `;
        } else {
            document.getElementById(`imagec`).src = "assets/images/baby1.webp"
        }



        document.getElementById('username').innerText = username;
        document.getElementById('userrole').innerText = userrole;
        document.getElementById('userprof').value = userprof;

        document.getElementById('userbio').innerText = userbio;


        document.getElementById('userphone').value = userphone;
        document.getElementById('useremail').value = useremail;
        document.getElementById('userville').value = userville;
        document.getElementById('useraddress').value = useraddress;
        document.getElementById('usersex').innerHTML = `
            <option id="usersexseleca" value="HOMME" ${usersex === "HOMME" ? "selected" : ""}>HOMME</option>
            <option id="usersexselecb" value="FEMME" ${usersex === "FEMME" ? "selected" : ""}>FEMME</option>
        `;
        sexslea = usersex;


        document.getElementById('userallow').innerText = userallow === true ? "Authorizé" : "Non Authorisé";

        document.getElementById('useravailability').innerHTML = `
                                <option id="useravailabilityseleca" value="true" ${useravailability === true ? "selected" : ""}>Disponible</option>
                                <option id="useravailabilityselecb" value="false" ${useravailability === false ? "selected" : ""}>Indisponible</option>
        `;
        useravailabilitysleb = useravailability;


        document.getElementById('usernameedi').value = username;
        document.getElementById('userroleedi').value = userrole;
        document.getElementById('userbioedi').value = userbio;

        document.getElementById('usersituation').innerHTML = `
            <option id="usersituationseleca" value="true" ${usersituation === "true" ? "selected" : ""}>Marié</option>
            <option id="usersituationselecb" value="false" ${usersituation === "false" ? "selected" : ""}>Célibataire</option>
        `;
        usersituationslec = usersituation;


        document.getElementById('userage').value = userage;
        document.getElementById('useretudient').innerHTML = `
            <option id="usersituationseleca" value="true" ${useretudient === "true" ? "selected" : ""}>Oui</option>
            <option id="usersituationselecb" value="false" ${useretudient === "false" ? "selected" : ""}>Non</option>
        `;
        useretudientsled = useretudient;

        document.getElementById('userwhatsapp').value = userwhatsapp;
        document.getElementById('usernationality').value = usernationality;
        document.getElementById('userreligion').value = userreligion;



        if (userrole === "Owner") {
            Supprimer.setAttribute("onclick", 'DeleteMyAccount()'); // Assigning the function reference directly
            Supprimer.disabled = false;
            Supprimer.style.color = "rgb(163, 5, 5)";
            Supprimer.style.cursor = "pointer";
        } else {
            Supprimer.disabled = false;
            Supprimer.style.color = "#aaaaaa";
            Supprimer.style.cursor = "none";
            Supprimer.removeAttribute("onclick");
        }


    } else {
        window.location.href = "/";

    }
};

getAdmin();

async function Disconexion() {
    var result = window.confirm("Etes vous sur ne vouloir, vous deconnectez?");

    if (result) {
        await deletePeople();
        sessionStorage.clear();
        window.location.href = "login"
    }
};

async function DeleteMyAccount() {
    var result = window.confirm("Etes vous sur ne vouloir supprimer votre compte?");
    const user_id = sessionStorage.getItem('_id');

    if (result) {
        const Supprimer = document.getElementById("Supprimer");
        Supprimer.removeAttribute("onclick");
        Supprimer.innerText = "En cours..."
        const deleting = await requesttoBackend('DELETE', `copinedeletinguser/${user_id}`);
        if (deleting.done) {
            await deletePeople();
            sessionStorage.clear();
            window.location.href = "login"
        } else {
            alert("échè re-essayez");
            Supprimer.setAttribute("onclick", "DeleteMyAccount()")
            Supprimer.innerText = "Supprimer";

        }
    }
};



const selectlista = document.getElementById('usersex');
const selectlistb = document.getElementById('useravailability');
const selectlistc = document.getElementById('usersituation');
const selectlistd = document.getElementById('useretudient');

selectlista.addEventListener("change", function () {
    sexslea = selectlista.value;
});

selectlistb.addEventListener("change", function () {
    useravailabilitysleb = selectlistb.value;
});

selectlistc.addEventListener("change", function () {
    usersituationslec = selectlistc.value;
});

selectlistd.addEventListener("change", function () {
    useretudient = selectlistd.value;
});


async function UpadatMyAccount() {
    const user_id = sessionStorage.getItem('_id');

    const Modifier = document.getElementById("Modifier");
    Modifier.removeAttribute("onclick");
    Modifier.innerText = "En cours..."
    const sesStoge = await GetPersonByID(user_id);

    const usernameedi = document.getElementById('usernameedi').value;
    const userroleedi = document.getElementById('userroleedi').value;
    const userville = document.getElementById('userville').value;
    const useraddress = document.getElementById('useraddress').value;
    const userage = document.getElementById('userage').value;
    const userprofedi = document.getElementById('userprof').value;
    const userphone = document.getElementById('userphone').value;
    const userwhatsapp = document.getElementById('userwhatsapp').value;
    const useremail = document.getElementById('useremail').value;
    const usernationality = document.getElementById('usernationality').value;
    const userreligion = document.getElementById('userreligion').value;
    const userbioedi = document.getElementById('userbioedi').value;


    const user_data = {
        name: thisiswhat(usernameedi),
        phone: thisiswhat(userphone),
        //password: userville,
        ville: thisiswhat(userville),
        role: userroleedi === "Owner" ? sesStoge.role : thisiswhat(userroleedi),
        address: thisiswhat(useraddress),
        email: thisiswhat(useremail),
        bio: thisiswhat(userbioedi),
        sex: thisiswhat(sexslea),
        //pushtoken: string,
        image: sesStoge.image,
        //allow: boolean,
        availability: useravailabilitysleb,
        situation: thisiswhat(usersituationslec),
        age: thisiswhat(userage),
        wapp: thisiswhat(userwhatsapp),
        natinalite: thisiswhat(usernationality),
        religion: thisiswhat(userreligion),
        etudient: thisiswhat(useretudientsled),
        prof: thisiswhat(userprofedi),
    }

    var result = window.confirm("Etes vous sur ne vouloir modifer votre compte?");
    if (result) {
        const updating = await requesttoBackend('PUT', `${user_id}`, user_data);
        if (updating.name) {
            Modifier.setAttribute("onclick", "UpadatMyAccount()")
            Modifier.innerText = "Modifier";
            await PutPeople(updating);
            window.location.reload()
        } else {
            alert("échè re-essayez");
            Modifier.setAttribute("onclick", "UpadatMyAccount()")
            Modifier.innerText = "Modifier";
        }
    } else {
        Modifier.setAttribute("onclick", "UpadatMyAccount()")
        Modifier.innerText = "Modifier";
    }
};

let imagbotom;
let fileboton;

async function AddUserImage() {
    const imagbotomc = document.getElementById(`${imagbotom}`);
    imagbotomc.removeAttribute("onclick");
    function getLastCharacter(text) {
        return text[text.length - 1];
    }

    const lastCharacter = getLastCharacter(imagbotom);

    const imagePreview = document.getElementById(`image${lastCharacter}`);
    imagePreview.src = '';

    const fileInput = document.getElementById(`${fileboton}`);
    const file = fileInput.files[0];

    if (!file) {
        alert("Aucune image n'a été sélectionnée !");
        return;
    }

    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;

    const reader = new FileReader();
    reader.onload = async function (event) {
        const base64Data = event.target.result.split(',')[1];
        const fileName = file.name;

        if (`${fileboton}` === "filec") {
            imagbotomc.setAttribute("onclick", `SendTheImage('${base64Data}', '${fileName}')`);
        } else {
            imagbotomc.setAttribute("onclick", `ChangeTheImage('${base64Data}', '${fileName}')`);
        };

        imagbotomc.innerHTML = `
        Valider
        <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
    `;
    };

    reader.readAsDataURL(file);
}


const SendTheImage = async (base64Data, fileName) => {
    const imagbotomc = document.getElementById(`${imagbotom}`);
    imagbotomc.innerHTML = `En Cours ...`;

    try {
        // Assuming requesttoBackend is a function that returns a Promise
        const url = await requesttoBacken('POST', 'boutique/uploadImage', { ima: base64Data, nam: fileName });
        if (url.ima) {
            const us_id = sessionStorage.getItem('_id');
            function getLastCharacter(text) {
                return text[text.length - 1];
            }
            const useimach = await GetPersonByID(us_id);

            const urlo = useimach.image.length > 0 ? `pushcandidateimage/${us_id}` : `${us_id}`;
            const obco = useimach.image.length > 0 ? { ima: url.ima } : { image: [{ ima: url.ima }] };

            const sending = await requesttoBackend('PUT', urlo, obco);

            if (sending.name) {
                const lastCharacter = getLastCharacter(imagbotom);
                const imagbo = document.getElementById(`image${lastCharacter}`);
                imagbo.src = url.ima;

                await deletePeople();
                imagbotomc.setAttribute("onclick", `OpenFileDia('${imagbotom}')`);
                imagbotomc.innerHTML = `
                    Modifier
                    <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
                `;
                await PutPeople(sending);

            } else {
                console.log(sending);
            }
        }

    } catch (error) {
        imagbotomc.innerHTML = `
            échèc
            <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
        `;
        console.error("Error uploading image:", error);
    }


}

function OpenFileDia(imagbotoma) {
    imagbotom = imagbotoma;
    fileboton = "filec";
    document.getElementById('filec').click();

}

const CloseMessega = () => {
    document.getElementById('messaga').style = "";
    document.getElementById('messaga').classList = "";
    document.getElementById('messaga').innerHTML = "";
}

const DeleteImage = async (image_url, id, html_tag_id) => {
    const user_id = sessionStorage.getItem('_id');
    function getLastCharacter(text) {
        return text[text.length - 1];
    }
    const lastCharacter = getLastCharacter(html_tag_id);
    const imagbo = document.getElementById(`image${lastCharacter}`);
    if (image_url !== "null") {
        try {
            const del_url = await requesttoBacken('POST', 'boutique/deleteImage', { image_url: image_url });
            if (del_url.done) {
                const send = await requesttoBackend('PUT', `changecandidateimage/${user_id}/${id}`, { url: null });
                if (send.name) {
                    await deletePeople();


                    const imagboto = document.getElementById(`${html_tag_id}`);
                    imagboto.setAttribute("onclick", `OpenFileDia('${html_tag_id}')`);
                    imagboto.innerHTML = `
                    En cours...
                    <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
                `;
                    await PutPeople(send);

                    imagbo.src = "assets/images/baby1.webp";
                    imagbotom = html_tag_id;
                    fileboton = "filea";
                    document.getElementById('filea').click();
                }
            }

        } catch (error) {

            console.error("Error uploading image:", error);
        }

    } else {
        imagbo.src = "assets/images/baby1.webp";
        imagbotom = html_tag_id;
        fileboton = "filea";
        document.getElementById('filea').click();
    }

}

const ChangeTheImage = async (base64Data, fileName) => {
    const imagbotomc = document.getElementById(`${imagbotom}`);

    imagbotomc.innerHTML = `En Cours ...`;

    try {
        // Assuming requesttoBackend is a function that returns a Promise
        const url = await requesttoBacken('POST', 'boutique/uploadImage', { ima: base64Data, nam: fileName });
        if (url.ima) {
            function getLastCharacter(text) {
                return text[text.length - 1];
            }
            const lastiod = getLastCharacter(imagbotom);

            const us_id = sessionStorage.getItem('_id');
            const iod = document.getElementById(`iod${lastiod}`).value;

            const send = await requesttoBackend('PUT', `changecandidateimage/${us_id}/${iod}`, { url: url.ima });
            if (send.name) {
                const lastCharacter = getLastCharacter(imagbotom);
                const imagbo = document.getElementById(`image${lastCharacter}`);
                imagbo.src = url.ima;

                await deletePeople();
                const imagboto = document.getElementById(`${imagbotom}`);
                imagboto.setAttribute("onclick", `OpenFileDia('${imagbotom}')`);
                imagboto.innerHTML = `
                    Modifier
                    <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
                `;
                await PutPeople(send);
            }
        }

    } catch (error) {
        imagbotomc.innerHTML = `
            échèc
            <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
        `;
        console.error("Error uploading image:", error);
    }


}