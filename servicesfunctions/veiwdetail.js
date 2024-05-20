function getUrlParameter(paramName) {
    paramName = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + paramName + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const svcValue = getUrlParameter('svc');

if (!svcValue || svcValue.length < 5) {
    ///document.getElementById('coverfor').classList.add("preloader-area");
} else {
    document.getElementById('commentsa').innerHTML = "";
    //document.getElementById('respond').innerHTML = "";

    /*document.getElementById('sel_service_b').innerText = `
     Veuillez faire défiler vers le bas pour accéder à la liste des ${svcValue}. Cliquez ensuite sur les différents ${svcValue} pour obtenir plus de détails les concernant
    `;*/
    document.getElementById('postid').value = svcValue;
    const user_id = sessionStorage.getItem('_id');
    if (user_id) {
        document.getElementById('login').innerHTML = `
            <a class="nav-link" href="profile">Mon Compte</a>
        `;

        document.getElementById('creacom').innerHTML = "";
    }

    RequestData()
}

let imageso = [];
async function RequestData() {
    try {
        const sesStoge = await GetCandidatByID(svcValue);
        if (sesStoge > 0) {

            if (sesStoge.image.length > 0) {
                imageso = sesStoge.image;
                document.getElementById(`imagea`).src = sesStoge.image[0].ima;
            }


            document.getElementById('username').innerText = sesStoge.name;
            document.getElementById('userrole').innerText = sesStoge.role;
            document.getElementById('userbio').innerText = sesStoge.bio;
            document.getElementById('userphone').innerText = sesStoge.phone;
            document.getElementById('useremail').innerText = sesStoge.email;
            document.getElementById('userville').innerText = sesStoge.ville;
            document.getElementById('useraddress').innerText = sesStoge.address;
            document.getElementById('usersex').innerText = sesStoge.sex;
            //document.getElementById('userallow').innerText = sesStoge.allow === "true" ? "Authorizé" : "Non Authorisé";
            document.getElementById('useravailability').innerText = sesStoge.availability === "true" ? "Diponible" : "Indisponible";

            document.getElementById('usersituation').innerText = sesStoge.situation;
            document.getElementById('userage').innerText = sesStoge.age;
            document.getElementById('userwhatsapp').innerText = sesStoge.wapp;
            document.getElementById('usernationality').innerText = sesStoge.natinalite;
            document.getElementById('userreligion').innerText = sesStoge.religion;
            document.getElementById('userschool').innerText = sesStoge.etudient;

            //const everrouillage = document.getElementById('Deverrouillage');
            //everrouillage.setAttribute("onclick", `Deverrouillage('${}')`);
            CommentNumber()
        } else {
            const userdata = await requesttoBackend('GET', `gettingmyaccountinfo/${svcValue}`);

            if (userdata.image.length > 0) {
                imageso = userdata.image;
                document.getElementById(`imagea`).src = userdata.image[0].ima;
            }


            document.getElementById('username').innerText = userdata.name;
            document.getElementById('userrole').innerText = userdata.role;
            document.getElementById('userbio').innerText = userdata.bio;
            document.getElementById('userphone').innerText = userdata.phone;
            document.getElementById('useremail').innerText = userdata.email;
            document.getElementById('userville').innerText = userdata.ville;
            document.getElementById('useraddress').innerText = userdata.address;
            document.getElementById('usersex').innerText = userdata.sex;
            //document.getElementById('userallow').innerText = sesStoge.allow === "true" ? "Authorizé" : "Non Authorisé";
            document.getElementById('useravailability').innerText = userdata.availability === "true" ? "Diponible" : "Indisponible";

            document.getElementById('usersituation').innerText = userdata.situation;
            document.getElementById('userage').innerText = userdata.age;
            document.getElementById('userwhatsapp').innerText = userdata.wapp;
            document.getElementById('usernationality').innerText = userdata.natinalite;
            document.getElementById('userreligion').innerText = userdata.religion;
            document.getElementById('userschool').innerText = userdata.etudient;

            //const everrouillage = document.getElementById('Deverrouillage');
            //everrouillage.setAttribute("onclick", `Deverrouillage('${}')`);
            CommentNumber()
        }
    } catch (error) {
        console.log("View detail RequestData", error)
    }

}

function ImageNextBack(road) {
    let posi = parseInt(road);
    const nexca = document.getElementById(`nexca`);
    const nexcb = document.getElementById(`nexcb`);

    if (imageso.length > posi) {
        document.getElementById(`imagea`).src = imageso[posi].ima;
        nexca.setAttribute("onclick", `ImageNextBack('${posi + 1}')`);
        nexcb.setAttribute("onclick", `ImageNextBack('${posi - 1}')`);
    } else {
        console.log(posi);
        document.getElementById(`imagea`).src = imageso[0].ima;
        nexca.setAttribute("onclick", `ImageNextBack('${1}')`);
        nexcb.setAttribute("onclick", `ImageNextBack('${0}')`);
    }

}
let paymen_method_selected = "noselected";


const paymenhtm = `
                <div class="form-group text-center">
                    <a style="cursor: pointer; padding: 5px 20px 5px 20px !important; border: 1px solid #145fb8; border-radius: 20px;" class="btn font_weight_600">Payer</a>
                </div>
        `;


const PaymenSelecion = (paymen_method) => {
    paymen_method_selected = paymen_method;
    const Orangeci = document.getElementById('orangeci');
    const Mtnci = document.getElementById('mtnci');
    const Waveci = document.getElementById('waveci');
    const Cards = document.getElementById('cards');
    const payer = document.getElementById('payer');

    Orangeci.classList.remove('payment_icons_selected');
    Mtnci.classList.remove('payment_icons_selected');
    Waveci.classList.remove('payment_icons_selected');
    Cards.classList.remove('payment_icons_selected');

    document.getElementById(paymen_method).classList.add('payment_icons_selected');

    if (paymen_method !== "cards") {
        const customerphone = document.getElementById('customerphone');
        customerphone.placeholder = `Entrez tél pour ${paymen_method === "orangeci" ? "ORANGE MONEY" : paymen_method === "mtnci" ? "MTN MONEY" : "Wave"}`;
        customerphone.style.display = "block";
        payer.innerHTML = paymenhtm;

    } else {
        const customerphone = document.getElementById('customerphone');
        customerphone.value = "";
        customerphone.placeholder = "";
        customerphone.style.display = "none";
    };


    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    }
};


const KaliaPay = async () => {
    try {
        const customer = encodeURIComponent(document.getElementById('customerphone').value);

        const response = await requesttoBackend('POST', `orders/${customer ? customer : "0701743686"}/nuance`, order);

        if (response && response.orderid) {
            await deletePannier();
            window.location.href = response.orderid


        } else if (!response) {
            handleError("Erreur inconnue, Veuillez réessayer plus tard");
            document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
        }

    } catch (error) {
        console.log(error);
        handleError("Vérifiez que vous avez accès à l'internet");
        document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');

        // Handle errors appropriately
    }
}




const PaymenSession = `
               

<div style="margin-bottom: -50px; align-items: center; text-align: center;">
                                    <P style="color: #007bff;">Vous serez facturé à 500 pour voir les infos complètes
                                    </P>
                                </div>
                                <div class="tab products-details-tab">
                                    <br>
                                    <br>
                                    <br>

                                    <div class="tab-content">
                                        <div class="tabs-item">
                                            <div class="products-details-tab-content">
                                                <div
                                                    style="display: flex; justify-content: space-between; width: 100%;">
                                                    <div class="payment_icons" id="orangeci"
                                                        onclick="PaymenSelecion('orangeci')">
                                                        <img src="assets/images/orange.png" alt="ORANGE MONEY">
                                                    </div>
                                                    <div class="payment_icons" id="mtnci"
                                                        onclick="PaymenSelecion('mtnci')">
                                                        <img src="assets/images/mtn.png" alt="MTN MONEY">
                                                    </div>
                                                    <div class="payment_icons" id="waveci"
                                                        onclick="PaymenSelecion('waveci')">
                                                        <img src="assets/images/icon.png" alt="WAVE CI">
                                                    </div>
                                                    <div class="payment_icons" id="cards"
                                                        onclick="PaymenSelecion('cards')">
                                                        <img src="assets/images/vm.png" alt="VISA MASTERCARD">
                                                    </div>
                                                </div>
                                                <br>
                                                <input style="height: 40px !important; display: none;"
                                                    placeholder="Entrez tél pour " type="tel" class="form-control"
                                                    id="customerphone">
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="payment-box" id="validate-hide-forfil">


                                </div>
                                <div class="col-lg-12" id="payer">
                                    
                                </div>


        `;





const Deverrouillage = async () => {
    const user_id = sessionStorage.getItem('_id');

    if (user_id) {
        const sesStoge = await GetCandidatByID(svcValue);
        const username = whatisthis(sesStoge.name);
        const userphone = whatisthis(sesStoge.phone);
        const useremail = whatisthis(sesStoge.email);
        const userrole = whatisthis(sesStoge.role);
        const userville = whatisthis(sesStoge.ville);
        const userbio = whatisthis(sesStoge.bio);
        const usersex = whatisthis(sesStoge.sex);
        const useravailability = sesStoge.availability;
        const useraddress = whatisthis(sesStoge.address);

        const usersituation = whatisthis(sesStoge.situation);
        const userage = whatisthis(sesStoge.age);
        const userwapp = whatisthis(sesStoge.wapp);
        const usernatinalite = whatisthis(sesStoge.natinalite);
        const userreligion = whatisthis(sesStoge.religion);
        const useretudient = whatisthis(sesStoge.etudient);



        document.getElementById('username').innerText = username;
        document.getElementById('userrole').innerText = userrole;
        document.getElementById('userbio').innerText = userbio;
        document.getElementById('userphone').innerText = userphone;
        document.getElementById('useremail').innerText = useremail;
        document.getElementById('userville').innerText = userville;
        document.getElementById('useraddress').innerText = useraddress;
        document.getElementById('usersex').innerText = usersex;
        document.getElementById('useravailability').innerText = useravailability === "true" ? "Diponible" : "Indisponible";


        document.getElementById('usersituation').innerText = usersituation === "true" ? "Marié" : "Célibataire";


        document.getElementById('userwhatsapp').innerText = userwapp;
        document.getElementById('usernationality').innerText = usernatinalite;
        document.getElementById('userreligion').innerText = userreligion;
        document.getElementById('userschool').innerText = useretudient === "true" ? "Oui" : "Non";
        const givenDate = new Date(userage);
        const currentDate = new Date();
        const differenceMs = currentDate - givenDate;
        const differenceYears = differenceMs / (1000 * 60 * 60 * 24 * 365);
        const yearsOld = Math.floor(differenceYears);
        document.getElementById('userage').innerText = yearsOld;

        //document.getElementById('paymensession').innerHTML = PaymenSession;
    } else {
        alert("Connectez-vous ou Créez un compte pour Déverrouiller")
    }

}





const commentsHtml = `
            <div class="comment-list">
                    <div class="comment" id="comment-1">
                        <div class="image" data-aos="flip-left" data-aos-once="true"><img alt=""
                                src="assets/images/we.png" class="avatar"></div>
                        <div class="text">
                            <h5 class="name font_weight_700">John Kokar</h5>
                            <span class="comment_date">
                                <i class="far fa-clock"></i> 15:32h, 06 July
                            </span>
                            <a class="comment-reply-link"
                                style="cursor: pointer; color: #145fb8;">
                                <i class="fa fa-reply" style="color: #2d96db !important"></i>

                                Repondre
                            </a>
                            <div class="text_holder">
                                <p class="text-size-16">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                </p>
                            </div>
                        </div>

                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

                        <div class="comment post-item-description" id="comment-1-1">
                            <div class="image" data-aos="flip-left" data-aos-once="true">
                                <img alt="" src="assets/images/wed.JPG" class="avatar">
                            </div>

                            <div class="text">
                                <h5 class="name font_weight_700">John Doe</h5>
                                <span class="comment_date">
                                    <i class="far fa-clock"></i> 15:32h, 06 July
                                </span>
                            </div>
                            <div class="blockquote text_holder">
                                <p class="text-size-16">It is a long established fact that a
                                    reader will be distracted by the readable content of a page
                                    when looking at its layout.
                                </p>
                                <small style="cursor: pointer; color: #145fb8;">Repondre</small>
                            </div>
                        </div>
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

                    </div>
                    
            </div>


`;

const DeleteComment = async (id) => {
    const trashlodin = document.getElementById(`${id}a`);
    trashlodin.classList = "fa fa-spinner fa-spin";


    const deleti = await requesttoBackend('DELETE', `deletingcopinecomment/${id}`);
    if (deleti.done) {
        document.getElementById('commentsa').innerHTML = "";
        CommentNumber()
        ShowComment();
    }
}




const ShowComment = async () => {
    const user_id = sessionStorage.getItem('_id');

    document.getElementById('commentsa').innerHTML = `
                <div class="comment_number text-uppercase font_weight_600">
                    En cours...
                </div>
        `;
    const comments = await requesttoBackend('GET', `gettingbycopinecomment/${document.getElementById('postid').value}`);

    if (comments.length > 0) {
        document.getElementById('commentsa').innerHTML = `
                <div class="comment_number text-uppercase font_weight_600">
                    Commentaires <span id="comentnumbera">(${comments.length})</span>
                </div>
                <div class="comment-list" id="ComentContents">

                </div> 
        `;

        const ComentContents = document.getElementById('ComentContents');
        ComentContents.innerHTML = "";
        moment.locale('fr');

        comments.forEach((comment, index) => {
            const ComenttHTML = `
                    <div class="comment" id="${comment._id}">
                        <div class="image">
                            <img alt="" src="${comment.commenta.image.length > 0 ? comment.commenta.image[0].ima : "assets/images/avatay.png"}" class="avatar">
                        </div>
                        <div class="text">
                            <h5 class="name font_weight_700">${whatisthis(comment.commenta.name)}${whatisthis(comment.commenta.role) === "Owner" ? ' <img  style="height: 15px; width: 15px;" src="assets/images/park_success.png">' : ''}</h5>
                            <span class="comment_date">
                                <i class="far fa-clock"></i> ${moment(comment.comented_at).format('MMMM Do YYYY, HH:mm:ss')}
                            </span>
                            <a onclick="ShowReplyable('${comment._id}')" class="comment-reply-link" style="cursor: pointer; color: #145fb8;">
                                <i class="fa fa-reply" style="color: #2d96db !important;"></i> ${comment.reply}
                                Répondre 
                            </a>
                            ${comment.commenta._id === user_id ?
                    `
                                    <a class="comment-reply-link" style="cursor: pointer; color: #145fb8; margin-left: 5px;" onclick="DeleteComment('${comment._id}')">
                                        <i id="${comment._id}a" class="fa fa-trash" style="color: #da1a34 !important"></i>
                                    </a>
                            ` :

                    ''}
                            <div class="text_holder">
                                <p class="text-size-16">
                                ${comment.message}
                                </p>
                            </div>
                            



                                <div class="widget widget-newsletter replaybar" id="${comment._id}idtagconreplable">
                                    
                                </div>

                        </div>
                        <div class="comment post-item-description" id="${comment._id}repiesSubs">
                            
                        </div>
                    </div>
                   
            `;

            ComentContents.innerHTML += ComenttHTML;

        });

    } else {
        document.getElementById('commentsa').innerHTML = `
        <div class="comment_number text-uppercase font_weight_600">
            Commentaires <span id="comentnumbera">(0)</span>
        </div>
        <div class="comment-list" id="ComentContents">

        </div> 
`;
    }


}

async function ShowReplyable(params) {
    const user_id = sessionStorage.getItem('_id');
    const replau = document.getElementById(params + "idtagconreplable");
    replau.innerHTML = `
        <form id="widget-search-form-sidebar" class="form-inline">
            <div class="input-group">
                <textarea type="text" aria-required="true" name="replay" id="replay"
                    class="form-control widget-search-form replay" placeholder="Saisissez-ici">
                </textarea>
                    <div class="input-group-append">
                    <span class="input-group-btn">
                        <a style="cursor: pointer;" onclick="Sendreply('${params}')" id="widget-widget-search-form-button"
                            class="btn">
                            <i id="${params}b" class="fa fa-paper-plane"></i>
                        </a>
                    </span>
                </div>
            </div>
        </form>
    `;
    const replies = await requesttoBackend('GET', `gettingbycopinereply/${params}`);
    if (replies.length) {
        const ReplyContents = document.getElementById(params + "repiesSubs");
        ReplyContents.innerHTML = "";
        moment.locale('fr');

        replies.forEach((reply, index) => {
            const ReplytHTML = `
                <div class="image" data-aos="flip-left" data-aos-once="true">
                        <img alt="" src="${reply.commenta.image.length > 0 ? reply.commenta.image[0].ima : "assets/images/avatay.png"}" class="avatar">
                    </div>

                    <div class="text">
                        <h5 style="margin-bottom: -5px" class="name font_weight_700">${whatisthis(reply.commenta.name)}${whatisthis(reply.commenta.role) === "Owner" ? ' <img  style="height: 15px; width: 15px;" src="assets/images/park_success.png">' : ''}</h5>
                        <span class="comment_date">
                            <i class="far fa-clock"></i> ${moment(reply.comented_at).format('MMMM Do YYYY, HH:mm:ss')}
                        </span>
                        ${reply.commenta._id === user_id ?
                    `
                                            <a class="comment-reply-link" style="cursor: pointer; color: #145fb8; margin-left: 5px;" onclick="DeleteReply('${reply._id}', '${reply.recepto}')">
                                                <i id="${reply._id}a" class="fa fa-trash" style="color: #da1a34 !important"></i>
                                            </a>
                                    ` :

                    ''}
                        <div class="text_holder" style="margin-top: -5px">
                            <p class="text-size-16">
                             ${reply.message}
                            </p>
                            <br>
                        </div>

                    </div>
                `;

            ReplyContents.innerHTML += ReplytHTML;

        });
    }
}



const Sendreply = async (comid) => {
    const user_id = sessionStorage.getItem('_id');
    const loading = document.getElementById(comid + "b");
    const replau = document.getElementById(comid + "idtagconreplable");


    if (user_id) {
        loading.classList = "fa fa-spinner fa-spin";

        const data = {
            commenta: user_id,
            recepto: comid,
            message: document.getElementById('replay').value,
        };

        const comment = await requesttoBackend('POST', 'replycopinecreating', data);
        if (comment && comment.length > 0) {
            document.getElementById('replay').value = "";
            //ShowSubComment();
            replau.innerHTML = ""

        }
    } else {
        alert("Connectez-vous ou Créez un compte pour commenter")
    }

}

const SendComennt = async () => {
    const user_id = sessionStorage.getItem('_id');
    const loading = document.getElementById('Envoyer');


    if (user_id) {
        loading.removeAttribute("onclick");
        loading.innerHTML = `En cours ...`;
        const data = {
            commenta: user_id,
            recepto: document.getElementById('postid').value,
            message: document.getElementById('comment').value,
        };

        const comment = await requesttoBackend('POST', 'commentcopinecreating', data);
        if (comment && comment.length > 0) {
            document.getElementById('comment').value = "";
            CommentNumber();
            ShowComment();
        }


        loading.setAttribute("onclick", "SendComennt()");
        loading.innerHTML = `Envoyer`;
    } else {
        alert("Connectez-vous ou Créez un compte pour commenter")
    }

}

const CommentNumber = async () => {
    const comments = await requesttoBackend('GET', `gettingbycopinecomment/${document.getElementById('postid').value}`);
    document.getElementById('comentnumbera').innerHTML = `
    ${comments.length}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1791 1996" id="comments">
            <path d="M704 384q-153 0-286 52T206.5 577 128 768q0 82 53 158t149 132l97 56-35 84q34-20 62-39l44-31 53 10q78 14 153 14 153 0 286-52t211.5-141 78.5-191-78.5-191T990 436t-286-52zm0-128q191 0 353.5 68.5T1314 511t94 257-94 257-256.5 186.5T704 1280q-86 0-176-16-124 88-278 128-36 9-86 16h-3q-11 0-20.5-8t-11.5-21q-1-3-1-6.5t.5-6.5 2-6l2.5-5 3.5-5.5 4-5 4.5-5 4-4.5q5-6 23-25t26-29.5 22.5-29 25-38.5 20.5-44q-124-72-195-177T0 768q0-139 94-257t256.5-186.5T704 256zm822 1169q10 24 20.5 44t25 38.5 22.5 29 26 29.5 23 25q1 1 4 4.5t4.5 5 4 5 3.5 5.5l2.5 5 2 6 .5 6.5-1 6.5q-3 14-13 22t-22 7q-50-7-86-16-154-40-278-128-90 16-176 16-271 0-472-132 58 4 88 4 161 0 309-45t264-129q125-92 192-212t67-254q0-77-23-152 129 71 204 178t75 230q0 120-71 224.5T1526 1425z" fill="#c0810d"></path>
        </svg>
    `;
}

const DeleteReply = async (id, com_id) => {
    const trashlodin = document.getElementById(`${id}a`);
    trashlodin.classList = "fa fa-spinner fa-spin";


    const deleti = await requesttoBackend('DELETE', `deletingreplycopine/${id}`);
    if (deleti.done) {
        ShowReplyable(com_id)
    }
}