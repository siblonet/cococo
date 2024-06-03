let comment_fetched = [];
async function getProfile(user_id) {
    const connected_true = sessionStorage.getItem('_id');
    document.getElementById('Deverrouillage_id').setAttribute("onclick", `Deverrouillage('${user_id}')`);
    document.getElementById('unlock').classList = "fa fa-eye-slash";
    document.getElementById('user_profile_detail').style.display = "none";

    if (user_id && connected_true) {
        let sesStoge = await GetCandidatByID(user_id);
        if (!sesStoge) {
            sesStoge = await GetPersonByID(user_id);
        }
        const username = sesStoge.name;
        const userrole = whatisthis(sesStoge.role);
        const userstatus = sesStoge.status;
        const userphoto = sesStoge.image;
        closeStoryModala()



        if (userphoto.length > 0) {
            document.getElementById(`profile_ima_tag`).src = userphoto[0].ima == null ? "assets/imo/baby1.webp" : userphoto[0].ima;
            document.getElementById(`comment_ima_tag`).src = userphoto[0].ima == null ? "assets/imo/baby1.webp" : userphoto[0].ima;

        } else {
            document.getElementById(`profile_ima_tag`).src = "assets/imo/baby1.webp";
            document.getElementById(`comment_ima_tag`).src = "assets/imo/baby1.webp"

        }


        if (userphoto.length > 1) {
            document.getElementById(`cover_ima_tag`).src = userphoto[1].ima == null ? "assets/imo/baby1.webp" : userphoto[1].ima;
        } else {
            document.getElementById(`cover_ima_tag`).src = "assets/imo/baby1.webp"
        }


        document.getElementById('desc_tag').innerText = "";

        document.getElementById('name_tag').innerText = username;
        document.getElementById('status_tag').innerHTML = `
                    @${userrole}
                    <img style="height: 15px; width: 15px; margin-top: 2px;" src="assets/imo/${userstatus ? userrole === "Owner" ? 'verify.png' : 'verified.png' : userrole === "Owner" ? 'verify.png' : 'bad_verify.png'}" alt="">
                `;


        comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
        document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;
        document.getElementById('profile_data_goes_here').style.display = "block";

    } else {
        alert("Vous devez avoir un compte, pour voir ses détails")
    }
};

async function getProfilea(user_id) {
    const connected_true = sessionStorage.getItem('_id');
    document.getElementById('Deverrouillage_id').setAttribute("onclick", `Deverrouillage('${user_id}')`);
    document.getElementById('unlock').classList = "fa fa-eye-slash";
    document.getElementById('user_profile_detail').style.display = "none";

    if (user_id && connected_true === user_id) {
        let sesStoge = await GetCandidatByID(user_id);
        if (!sesStoge) {
            sesStoge = await GetPersonByID(user_id);
        }
        const username = sesStoge.name;
        const userrole = whatisthis(sesStoge.role);
        const userstatus = sesStoge.status;
        const userphoto = sesStoge.image;
        closeStoryModala()



        if (userphoto.length > 0) {
            document.getElementById(`profile_ima_tag`).src = userphoto[0].ima == null ? "assets/imo/baby1.webp" : userphoto[0].ima;
            document.getElementById(`comment_ima_tag`).src = userphoto[0].ima == null ? "assets/imo/baby1.webp" : userphoto[0].ima;

        } else {
            document.getElementById(`profile_ima_tag`).src = "assets/imo/baby1.webp";
            document.getElementById(`comment_ima_tag`).src = "assets/imo/baby1.webp"

        }


        if (userphoto.length > 1) {
            document.getElementById(`cover_ima_tag`).src = userphoto[1].ima == null ? "assets/imo/baby1.webp" : userphoto[1].ima;
        } else {
            document.getElementById(`cover_ima_tag`).src = "assets/imo/baby1.webp"
        }



        document.getElementById('name_tag').innerText = username;
        document.getElementById('status_tag').innerHTML = `
                    @${userrole}
                    <img style="height: 15px; width: 15px; margin-top: 2px;" src="assets/imo/${userstatus ? userrole === "Owner" ? 'verify.png' : 'verified.png' : userrole === "Owner" ? 'verify.png' : 'bad_verify.png'}" alt="">
                `;

        document.getElementById('desc_tag').innerText = "";

        comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
        document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;
        document.getElementById('profile_data_goes_here').style.display = "block";

    } else {
        alert("Vous devez avoir un compte, pour voir ses détails")
    }
};



async function Disconexion() {
    var result = window.confirm("Etes vous sur ne vouloir, vous deconnectez?");

    if (result) {
        await deletePeople();
        sessionStorage.clear();
        window.location.href = "login"
    }
};

const NaveTo = () => {
    window.location.href = 'dashboard'

}

const SendComennt = async () => {
    const user_id = sessionStorage.getItem('_id');
    const loading = document.getElementById('Envoyer');


    if (user_id) {
        loading.removeAttribute("onclick");
        loading.innerHTML = `
            <i class="fa fa-spinner fa-spin" style="color: #aaaaaa !important;"></i>
        `;

        const data = {
            commenta: user_id,
            recepto: user_id,
            message: document.getElementById('comment_data').value,
        };

        const comment = await requesttoBackend('POST', 'commentcopinecreating', data);
        if (comment && comment.length > 0) {
            document.getElementById('comment_data').value = "";
            comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
            document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;
            ShowComments()
        }


        loading.setAttribute("onclick", "SendComennt()");
        loading.innerHTML = `

        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
            style="margin-bottom: -5px;" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" fill="#aaaaaa"></path>
        </svg>

        `;

    } else {
        alert("Connectez-vous ou Créez un compte pour commenter")
    }

}



const ShowComments = async () => {
    const user_id = sessionStorage.getItem('_id');
    const comment_data_render = document.getElementById('comment_data_render');
    comment_data_render.innerHTML = "";
    moment.locale('fr');

    document.getElementById('loadnf_comments').innerHTML = `
                <i class="fa fa-spinner fa-spin" style="color: #aaaaaa !important;"></i>
            `;

    document.getElementById(`display_comment_section`).classList.remove("displo-profil_view");
    //document.getElementById(`display_comment_section`).style.display = "inline-block";

    comment_fetched.forEach((commo, index) => {
        const CommotHTML = `
        <div class="comment_dis_sessse-profil_view">
        <div class="comment_photo_sess_style-profil_view">
            <div class="comment_photo_style-profil_view">
                <img id="comment_ima_tagb" src="${commo.commenta.image.length > 0 ? commo.commenta.image[0].ima : "assets/imo/avatay.png"}"
                    style="height: 50px; width: 50px;" alt="">
            </div>
        </div>


        <div class="comment_text_style-profil_view">
            <span style="font-weight: bold; color: #333333; font-size: 18px; display: flex; align-items: center">
                ${whatisthis(commo.commenta.name)} ${commo.commenta.status ? whatisthis(commo.commenta.role) === "Owner" ? '<img  style="height: 13px; width: 13px;" src="assets/imo/verify.png">' : '<img  style="height: 13px; width: 13px;" src="assets/imo/verified.png">' : '<img  style="height: 13px; width: 13px;" src="assets/imo/bad_verify.png">'}
            </span>
            <span style="color: #aaaaaa; font-size: 12px;">
                <i class="far fa-clock"></i> ${moment(commo.comented_at).format('MMMM Do YYYY, HH:mm:ss')}
            </span>
            <div style="height: 7px;"></div>
            <span style="text-align: start !important;">${commo.message}</span>
            <div class="comment_down_buttons-profil_view">
                <a onclick="ShowReplies('${commo._id}')" style="font-size: 15px; color: #042c57; cursor: pointer;" class="mefirst-profil_view">${commo.reply}
                    Réponses
                </a>

                <a onclick="ShowReplyInput('${commo._id}')" class="mefirst-profil_view" style="color: #042c57 !important; font-size: 15px; cursor: pointer;">
                    <i class="fa fa-reply" style="color: #042c57 !important;"></i>
                    Répondre
                </a>
                ${commo.commenta._id === user_id ?
                `
                        <a onclick="DeleteComment('${commo._id}')" class="mefirst-profil_view" style="background-color: #da1a344f; border-radius: 7px !important; padding: 5px !important; color: #da1a34 !important; font-size: 15px; cursor: pointer;">
                            <i id="${commo._id}a" class="fa fa-trash" style="color: #da1a34 !important;"></i>
                        </a>                
                        ` :

                ''
            }
               
            </div>
        </div>
    </div>
    <div style="height: 42px;"></div>



    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ replay @@@@@@@@@@@@@@@@@@@-->

    <div class="reply_input_dis-profil_view displo-profil_view" id="${commo._id}rep">

    <div class="comment_dis_sessse-profil_view replay">
        <div class="comment_photo_sess_style-profil_view">
            <div class="comment_photo_style-profil_view">
                <img id="comment_ima_tagd" src="${commo.commenta.image.length > 0 ? commo.commenta.image[0].ima : "assets/imo/avatay.png"}" style="height: 50px; width: 50px;"
                    alt="">
            </div>
        </div>


        <div class="comment_inpu_style-profil_view">
            <textarea class="" name="replay_data" id="replay_data${commo._id}"></textarea>

            <a id="Envoyera${commo._id}" onclick="SendReply('${commo._id}')" class="send_button-profil_view">

            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                style="margin-bottom: -5px;" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" fill="#aaaaaa"></path>
            </svg>

            </a>
        </div>
    </div>
</div>

    <br>



    <div id="replay_data_render"></div>

        `;
        comment_data_render.innerHTML += CommotHTML;

    });

    document.getElementById('loadnf_comments').innerHTML = `

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="margin-bottom: -4px;"
                viewBox="0 0 1791 1996" id="comments">
                <path
                    d="M704 384q-153 0-286 52T206.5 577 128 768q0 82 53 158t149 132l97 56-35 84q34-20 62-39l44-31 53 10q78 14 153 14 153 0 286-52t211.5-141 78.5-191-78.5-191T990 436t-286-52zm0-128q191 0 353.5 68.5T1314 511t94 257-94 257-256.5 186.5T704 1280q-86 0-176-16-124 88-278 128-36 9-86 16h-3q-11 0-20.5-8t-11.5-21q-1-3-1-6.5t.5-6.5 2-6l2.5-5 3.5-5.5 4-5 4.5-5 4-4.5q5-6 23-25t26-29.5 22.5-29 25-38.5 20.5-44q-124-72-195-177T0 768q0-139 94-257t256.5-186.5T704 256zm822 1169q10 24 20.5 44t25 38.5 22.5 29 26 29.5 23 25q1 1 4 4.5t4.5 5 4 5 3.5 5.5l2.5 5 2 6 .5 6.5-1 6.5q-3 14-13 22t-22 7q-50-7-86-16-154-40-278-128-90 16-176 16-271 0-472-132 58 4 88 4 161 0 309-45t264-129q125-92 192-212t67-254q0-77-23-152 129 71 204 178t75 230q0 120-71 224.5T1526 1425z"
                    fill="#aaaaaa">
                </path>
            </svg>

    `;
}

const DeleteComment = async (id) => {
    const user_id = sessionStorage.getItem('_id');
    const trashlodin = document.getElementById(`${id}a`);
    trashlodin.classList = "fa fa-spinner fa-spin";


    const deleti = await requesttoBackend('DELETE', `deletingcopinecomment/${id}`);
    if (deleti.done) {
        //document.getElementById('commentsa').innerHTML = "";
        //CommentNumber()
        comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
        document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;
        ShowComments()
    }
}


const ShowReplies = async (id) => {
    const user_id = sessionStorage.getItem('_id');
    const replay_data_render = document.getElementById('replay_data_render');
    replay_data_render.innerHTML = "";
    const replies = await requesttoBackend('GET', `gettingbycopinereply/${id}`);

    moment.locale('fr');

    replies.forEach((reply, index) => {
        const ReplyHTML = `
        <div class="comment_dis_sessse-profil_view replay">
                            <div class="comment_photo_sess_style-profil_view">
                                <div class="comment_photo_style-profil_view">
                                <img id="comment_ima_taga" src="${reply.commenta.image.length > 0 ? reply.commenta.image[0].ima : "assets/imo/avatay.png"}"
                                style="height: 50px; width: 50px;" alt="">
                                </div>
                            </div>


                            <div class="comment_text_style-profil_view">
                                <span style="font-weight: bold; color: #333333; font-size: 18px; display: flex; align-items: center">
                                    ${whatisthis(reply.commenta.name)} ${reply.commenta.status ? whatisthis(reply.commenta.role) === "Owner" ? '<img  style="height: 13px; width: 13px;" src="assets/imo/verify.png">' : '<img  style="height: 13px; width: 13px;" src="assets/imo/verified.png">' : '<img  style="height: 13px; width: 13px;" src="assets/imo/bad_verify.png">'}
                                </span>
                                <span style="color: #aaaaaa; font-size: 12px;">
                                    <i class="far fa-clock"></i> ${moment(reply.comented_at).format('MMMM Do YYYY, HH:mm:ss')}
                                </span>
                                <div style="height: 7px;"></div>
                                <span style="text-align: start !important;">${reply.message}</span>
                                <div class="comment_down_buttons-profil_view">
                                    ${reply.commenta._id === user_id ?
                `
                                            <div style="padding: 0px 50px 0px 50px !important"></div>
                                            <a onclick="DeleteReply('${reply._id}', '${reply.recepto}')" class="mefirst-profil_view" style="background-color: #da1a344f; border-radius: 7px !important; padding: 0px 10px 0px 10px !important; color: #da1a34 !important; font-size: 15px; cursor: pointer; align-self: end !important">
                                                <span id="${reply._id}a" class="" style="color: #da1a34 !important; font-weight: bold">effacer</span>
                                            </a>             
                                            ` :

                ''
            }
                                
                                </div>
                            </div>
                        </div>
                        <br>

        `;
        replay_data_render.innerHTML += ReplyHTML;

    });
}

const DeleteReply = async (id, com_id) => {
    const trashlodin = document.getElementById(`${id}a`);
    trashlodin.classList = "fa fa-spinner fa-spin";


    const deleti = await requesttoBackend('DELETE', `deletingreplycopine/${id}`);
    if (deleti.done) {
        ShowReplies(com_id)
    }
}

const SendReply = async (comid) => {
    const user_id = sessionStorage.getItem('_id');
    const loading = document.getElementById("Envoyera" + comid);


    if (user_id) {
        loading.innerHTML = `
        <i class="fa fa-spinner fa-spin" style="color: #aaaaaa !important;"></i>
        `;

        const data = {
            commenta: user_id,
            recepto: comid,
            message: document.getElementById('replay_data' + comid).value,
        };

        const comment = await requesttoBackend('POST', 'replycopinecreating', data);
        if (comment && comment.length > 0) {
            document.getElementById('replay_data' + comid).value = "";
            loading.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                style="margin-bottom: -5px;" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" fill="#aaaaaa"></path>
            </svg>
                    `;
            ShowReplies(comid)
        }
    } else {
        alert("Connectez-vous ou Créez un compte pour commenter")
    }

}

function ShowReplyInput(params) {
    document.getElementById(`${params}rep`).classList.remove("displo-profil_view");
    document.getElementById(`${params}rep`).style.display = "block";
}

