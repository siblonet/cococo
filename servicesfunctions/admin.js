async function getAdmin() {
    const user_id = sessionStorage.getItem('_id');
    if (user_id) {
        const sesStoge = await GetPersonByID(user_id);
        const userrole = whatisthis(sesStoge.role);
        if (userrole === "Owner") {
            /*const username = whatisthis(sesStoge.name);
            if (sesStoge.image.length > 0) {
                //document.getElementById(`imagea`).src = sesStoge.image[0].ima == null ? "assets/images/baby1.webp" : sesStoge.image[0].ima;

            } else {
                //document.getElementById(`imagea`).src = "assets/images/baby1.webp"
            }*/
        } else {
            window.location.href = "/";
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

async function DeleteUser(user_id) {
    var result = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    if (result) {
        const Supprimer = document.getElementById(`${user_id}delete`);
        Supprimer.removeAttribute("onclick");
        Supprimer.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";

        try {
            const deleting = await requesttoBackend('DELETE', `copinedeletinguser/${user_id}`);
            if (deleting.done) {
                Supprimer.setAttribute("onclick", `DeleteUser('${user_id}')`);
                Supprimer.innerHTML = "<i class='far fa-trash-alt'></i>";
            } else {
                alert("Échec, veuillez réessayer.");
                Supprimer.setAttribute("onclick", `DeleteUser('${user_id}')`);
                Supprimer.innerHTML = "<i class='far fa-trash-alt'></i>";
            }
        } catch (error) {
            alert("Une erreur s'est produite, veuillez réessayer.");
            Supprimer.setAttribute("onclick", `DeleteUser('${user_id}')`);
            Supprimer.innerHTML = "<i class='far fa-trash-alt'></i>";
        }
    }
}



/*
const selectlista = document.getElementById('usersex');


selectlista.addEventListener("change", function () {
    sexslea = selectlista.value;
});*/

async function BlockUser(user_id, allow) {
    const Modifier = document.getElementById(`${user_id}block`);
    Modifier.removeAttribute("onclick");
    Modifier.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    const newAllow = allow === "true" ? false : true;

    const user_data = {
        allow: newAllow,
    };
    try {
        const updating = await requesttoBackend('PUT', `${user_id}`, user_data);
        if (updating.name) {
            // Toggle the state for the allow parameter
            Modifier.setAttribute("onclick", `BlockUser('${user_id}', '${newAllow}')`);
            Modifier.innerHTML = `<i class='far fa-eye${newAllow ? '' : '-slash'}'></i>`;
        } else {
            alert("Échec, veuillez réessayer.");
            Modifier.setAttribute("onclick", `BlockUser('${user_id}', '${allow}')`);
            Modifier.innerHTML = `<i class='far fa-eye${allow ? '' : '-slash'}'></i>`;
        }
    } catch (error) {
        alert("Une erreur s'est produite, veuillez réessayer.");
        Modifier.setAttribute("onclick", `BlockUser('${user_id}', '${allow}')`);
        Modifier.innerHTML = `<i class='far fa-eye${allow ? '' : '-slash'}'></i>`;
    }
}



async function VerifyUser(user_id, statusa) {
    const Modifier = document.getElementById(`${user_id}verify`);
    Modifier.removeAttribute("onclick");
    Modifier.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    const newAllow = statusa === "true" ? false : true;

    const user_data = {
        status: newAllow,
    };
    try {
        const updating = await requesttoBackend('PUT', `${user_id}`, user_data);
        if (updating.name) {
            // Toggle the state for the allow parameter
            Modifier.setAttribute("onclick", `VerifyUser('${user_id}', '${newAllow}')`);
            Modifier.innerHTML = `<i class='far fa-eye${newAllow ? '' : '-slash'}'></i>`;
        } else {
            alert("Échec, veuillez réessayer.");
            Modifier.setAttribute("onclick", `VerifyUser('${user_id}', '${statusa}')`);
            Modifier.innerHTML = `<i class='far fa-eye${statusa ? '' : '-slash'}'></i>`;
        }
    } catch (error) {
        alert("Une erreur s'est produite, veuillez réessayer.");
        Modifier.setAttribute("onclick", `VerifyUser('${user_id}', '${statusa}')`);
        Modifier.innerHTML = `<i class='far fa-eye${statusa ? '' : '-slash'}'></i>`;
    }
}





async function UpdateUser(user_id) {
    /* const Modifier = document.getElementById(`${user_id}update`);
     Modifier.removeAttribute("onclick");
     Modifier.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
 
     const userroleedi = document.getElementById('userroleedi').value;
 
     const user_data = {
         role: thisiswhat(userroleedi),
     };
 
     try {
         const updating = await requesttoBackend('PUT', `${user_id}`, user_data);
         if (updating.name) {
             Modifier.setAttribute("onclick", `UpdateUser('${user_id}')`);
             Modifier.innerHTML = "<i class='fas fa-edit'></i>";
         } else {
             alert("Échec, veuillez réessayer.");
             Modifier.setAttribute("onclick", `UpdateUser('${user_id}')`);
             Modifier.innerHTML = "<i class='fas fa-edit'></i>";
         }
     } catch (error) {
         alert("Une erreur s'est produite, veuillez réessayer.");
         Modifier.setAttribute("onclick", `UpdateUser('${user_id}')`);
         Modifier.innerHTML = "<i class='fas fa-edit'></i>";
     }*/
}


const LoadUsersData = async (whos) => {
    await deleteCandidat();

    try {
        const user_content = await requesttoBackend('GET', `team/show/giveaccess/${whos}`);
        if (user_content && user_content.length > 0) {
            document.getElementById('number_of_user').innerText = user_content.length;
            const user_partners = document.getElementById('user_partners');
            let contentHTML = ''; // Initialize an empty string to accumulate HTML
            await PostCandidate(user_content);

            user_content.forEach((user) => {
                contentHTML += `
                    <tr>
                        <th scope="row"><a onclick="OpenNew('${user._id}')"  style="cursor: pointer;">${whatisthis(user.role)}</a></th>
                        <td>${whatisthis(user.name)}</td>
                        <td>${whatisthis(user.phone)}</td>
                        <td>${whatisthis(user.address)}</td>
                        <td>
                            <button type="button" class="btn btn-primary" id="${user._id}block" onclick="BlockUser('${user._id}', '${user.allow}')">
                                <i class="far fa-eye${user.allow ? '' : '-slash'}"></i>
                            </button>
                            <button type="button" class="btn btn-success" id="${user._id}update" onclick="UpdateUser('${user._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-danger" id="${user._id}delete" onclick="DeleteUser('${user._id}')">
                                <i class="far fa-trash-alt"></i>
                            </button>
                            <button type="button" class="btn btn-danger" id="${user._id}verify" onclick="VerifyUser('${user._id}', '${user.status}')">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            user_partners.innerHTML = contentHTML; // Update the DOM once
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
};
LoadUsersData('user');



const OpenNew = (id) => {
    window.open(`viewdata?svc=${id}`, '_blank');
}
