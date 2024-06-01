
// Opens Modal for shows styry
const openStoryModal = async (_id) => {
    //console.log(_id);
    line_runner1.style.transition = 'width 10s linear';
    line_runner2.style.transition = 'width 10s linear';
    line_runner3.style.transition = 'width 10s linear';

    const user_content = await GetCandidatByID(_id);

    change_to_next.src = user_content.image[0].ima;

    modala.style.pointerEvents = 'auto';
    modala.style.opacity = '1';
    modala.style.transition = 'all 300ms ease-in-out';

    modala_wrap.style.pointerEvents = 'auto';
    modala_wrap.style.opacity = '1';
    modala_wrap.style.transform = 'scale(1)';
    modala_wrap.style.transition = 'opacity 250ms 500ms ease, transform 350ms 500ms ease';
    line_runner1.style.width = '100%';
    profile_link.setAttribute("onclick", `getProfile('${_id}')`);
    profil_img.src = user_content.image[0].ima
    profil_rol.innerHTML = `
        ${whatisthis(user_content.role)}
        <img style="height: 12px; width: 12px; margin-top: 3px" src="assets/imo/${user_content.status ? whatisthis(user_content.role) === "Owner" ? 'verify.png' : 'verified.png' : whatisthis(user_content.role) === "Owner" ? 'verify.png' : 'bad_verify.png'}">
    `;
    


    timerId = setTimeout(() => {
        line_runner2.style.width = '100%';
        if (user_content.image.length > 1) {
            change_to_next.src = user_content.image[1].ima;
        }
    }, 10010);

    timerIa = setTimeout(() => {
        line_runner3.style.width = '100%';
        if (user_content.image.length > 2) {
            change_to_next.src = user_content.image[2].ima;
        }
    }, 20025);

    timerIb = setTimeout(() => {
        closeStoryModala()
    }, 30026);
};