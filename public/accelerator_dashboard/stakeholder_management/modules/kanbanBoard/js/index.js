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
function displayOptions_notInterested() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-notInterested').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-notInterested").css("display", "none"))
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

function displayOptions_dd() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-dd').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-dd").css("display", "none"))
    }

}
function displayOptions_sign() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-sign').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-sign").css("display", "none"))
    }

}
function openApproachedModal() {
    $(".all-dd").css("display", "none")
    $('#openApproachedModal').modal('show');
}
function openInterestedModal() {
    $(".all-dd").css("display", "none")
    $("#openInterestedModal").modal('show');//Opens the modal
}
function openMeetModal() {
    $(".all-dd").css("display", "none")
    $("#openMeetModal").modal('show');//Opens the modal
}
function openNotApproachedModal() {
    $(".all-dd").css("display", "none")
    $("#openNotApproachedModal").modal('show');//Opens the modal
}
function openNotInterestedModal() {
    $(".all-dd").css("display", "none")
    $("#openNotInterestedModal").modal('show');//Opens the modal
}
function openNegotiationModal() {
    $(".all-dd").css("display", "none")
    $("#openNegotiationModal").modal('show');//Opens the modal
}
function openCommittedModal() {
    $(".all-dd").css("display", "none")
    $("#openCommittedModal").modal('show');//Opens the modal
}
function openDDModal() {
    $(".all-dd").css("display", "none")
    $("#openDDModal").modal('show');//Opens the modal
}
function openSignedModal() {
    $(".all-dd").css("display", "none")
    $("#openSignedModal").modal('show');//Opens the modal
}