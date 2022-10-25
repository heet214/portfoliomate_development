let dropdown_hidden = true;
function displayOptions_notApproached() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-notApproached').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-notApproached").css("display", "none"))
    }

}
function displayOptions_Approached() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-Approached').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-Approached").css("display", "none"))
    }

}
function displayOptions_Interested() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-Interested').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-Interested").css("display", "none"))
    }

}
function displayOptions_meet() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-meet').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-meet").css("display", "none"))
    }

}
function displayOptions_negotiation() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-negotiation').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-negotiation").css("display", "none"))
    }

}
function displayOptions_commit() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-commit').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-commit").css("display", "none"))
    }

}
 
function openApproachedModal(){
    $("#dropdown-menu-notApproached").css("display", "none")
    $('#openApproachedModal').modal('show');
    

}