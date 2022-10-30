$('document').ready(function () {
    $.ajax({
        url: "https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getAllEngagements",
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var hello = data
            console.log(hello)
            filter_engagements(data);
        },
    });
});

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
$('#stakeholder_icon').click(function () {
    alert("hello there")
    location.href = "../../index.html"
});

function filter_engagements(data) {

    for (var i = 0; i < data.length; i++) {
        if (data[i].fundraiser.sub_engagements) {
            for (var j = 0; j < data[i].fundraiser.sub_engagements.length; j++) {
                console.log(data[i].fundraiser.sub_engagements[j].status[data[i].fundraiser.sub_engagements[j].status.length - 1].type)
                switch (data[i].fundraiser.sub_engagements[j].status[data[i].fundraiser.sub_engagements[j].status.length - 1].type) {
                    case "notApproached":
                       
                        console.log(i,data[i].fundraiser.sub_engagements[j])
                        $('.notApproached-container').append( populate_notApproached_kanban(data[i].fundraiser.sub_engagements[j]));
                        break;
                    case "approached": 
                        $('.Approached-container').append(populate_Approached_kanban(data[i].sub_engagements[j]))
                        break;
                    case "interested":
                        $('.Interested-container').append(populate_Interested_kanban(data[i].sub_engagements[j]))
                        break;
                    case "notInterested":
                        var notInterested = populate_notInterested_kanban(data[i].sub_engagements[j])
                        $('.notInterested-container').append(notInterested)
                        break;
                    case "meetingScheduled":
                        var meetingScheduled = populate_meetingScheduled_kanban(data[i].sub_engagements[j])
                        $('.meet-container').append(meetingScheduled)
                        break;
                    case "comitted":
                        var committed = populate_committed_kanban(data[i].sub_engagements[j])
                        $('.commit-container').append(committed)
                        break;
                    case "negotiation":
                        var negotiation = populate_negotiation_kanban(data[i].sub_engagements[j])
                        $('.negotiation-container').append(negotiation)
                        break;
                    case "dueDeligence":
                        var dueDeligence = populate_dd_kanban(data[i].sub_engagements[j])
                        $('.dd-container').append(dueDeligence)
                        break;
                    case "signed":
                        var signed = populate_signed_kanban(data[i].sub_engagements[j])
                        $('.sign-container').append(signed)



                        break;


                }
            }
        }

    }

    function populate_notApproached_kanban(data) {
        var li =
            '<li>' +
            '<div class="notApproached-card">' +
            '<div class="notApproached-card-header">' +
            '<div class="mandate_id">' + data.parent_id + '</div>' +
            '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
            '</div>' +
            '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
            '<h6 class="dropdown-header">Move to</h6>' +
            '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
            '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
            '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
            '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
            '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
            '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
            '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
            '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
            '</div>' +
            '<div class="engagement">' +
            '<div class="profiles">' +
            '<div style="display:flex;align-items: center;justify-content: space-between;">' +
            '<div class="stakeholder">' +
            '<div><img class="user" src="'+data.company_from.from_logo+'" />' +
            '</div>' +
            '<div>' + data.company_from.from_name + '</div>' +
            '</div>' +

            '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
            '<div class="investor">' +
            '<div><img class="user" src="'+data.company_to.to_logo+'" /></div>' +
            '<div style="color:#ccc">'+data.company_to.to_name+'</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            ' </div>' +
            '</li>';
            console.log(li);
            return li;
    }

    
    function populate_Approached_kanban(data) {
        var li =
        '<li>' +
        '<div class="notApproached-card">' +
        '<div class="notApproached-card-header">' +
        '<div class="mandate_id">' + data.parent_id + '</div>' +
        '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
        '</div>' +
        '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
        '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
        '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
        '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="'+data.company_from.from_logo+'" />' +
        '</div>' +
        '<div>' + data.company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="'+data.company_to.to_logo+'" /></div>' +
        '<div style="color:#ccc">'+data.company_to.to_name+'</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        ' </div>' +
        '</li>';
        console.log(li);
        return li;
    }
    function populate_Interested_kanban(data) {
        var li =
        '<li>' +
        '<div class="notApproached-card">' +
        '<div class="notApproached-card-header">' +
        '<div class="mandate_id">' + data.parent_id + '</div>' +
        '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
        '</div>' +
        '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
        '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
        '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
        '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="'+data.company_from.from_logo+'" />' +
        '</div>' +
        '<div>' + data.company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="'+data.company_to.to_logo+'" /></div>' +
        '<div style="color:#ccc">'+data.company_to.to_name+'</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        ' </div>' +
        '</li>';
        console.log(li);
        return li;

    }
    function populate_notInterested_kanban(data) {
        li = '   <div class="notApproached-card">' +
            '<div class="notApproached-card-header">' +
            '<div class="mandate_id">' + data.parent_id + '</div>' +
            '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
            '</div>' +
            '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
            '<h6 class="dropdown-header">Move to</h6>' +
            '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
            '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
            '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
            '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
            '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
            '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
            '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
            '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
            '</div>' +
            '<div class="engagement">' +
            '<div class="profiles">' +
            '<div style="display:flex;align-items: center;justify-content: space-between;">' +
            '<div class="stakeholder">' +
            '<div>' +
            '<img class="user"' + ' src="' + data.company_from.from_logo + ' />' +
            '</div>' +
            '<div>' + data.company_from.from_name + '</div>' +
            '</div>' +

            '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
            '<div class="investor">' +
            '<div>' +
            '<img class="user" ' +
            ' src="' + data.company_to.to_logo + ' />' +
            '</div>' +
            '</div>' +
            '<div >' + data.company_to.to_name + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return li;

    }
    function populate_meetingScheduled_kanban(data) {
        li = '   <div class="notApproached-card">' +
            '<div class="notApproached-card-header">' +
            '<div class="mandate_id">' + data.parent_id + '</div>' +
            '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
            '</div>' +
            '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
            '<h6 class="dropdown-header">Move to</h6>' +
            '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
            '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
            '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
            '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
            '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
            '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
            '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
            '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
            '</div>' +
            '<div class="engagement">' +
            '<div class="profiles">' +
            '<div style="display:flex;align-items: center;justify-content: space-between;">' +
            '<div class="stakeholder">' +
            '<div>' +
            '<img class="user"' + ' src="' + data.company_from.from_logo + ' />' +
            '</div>' +
            '<div>' + data.company_from.from_name + '</div>' +
            '</div>' +

            '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
            '<div class="investor">' +
            '<div>' +
            '<img class="user" ' +
            ' src="' + data.company_to.to_logo + ' />' +
            '</div>' +
            '</div>' +
            '<div >' + data.company_to.to_name + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return li;

    }
    function populate_committed_kanban(data) {
        li = '   <div class="notApproached-card">' +
            '<div class="notApproached-card-header">' +
            '<div class="mandate_id">' + data.parent_id + '</div>' +
            '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
            '</div>' +
            '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
            '<h6 class="dropdown-header">Move to</h6>' +
            '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
            '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
            '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
            '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
            '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
            '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
            '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
            '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
            '</div>' +
            '<div class="engagement">' +
            '<div class="profiles">' +
            '<div style="display:flex;align-items: center;justify-content: space-between;">' +
            '<div class="stakeholder">' +
            '<div>' +
            '<img class="user"' + ' src="' + data.company_from.from_logo + ' />' +
            '</div>' +
            '<div>' + data.company_from.from_name + '</div>' +
            '</div>' +

            '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
            '<div class="investor">' +
            '<div>' +
            '<img class="user" ' +
            ' src="' + data.company_to.to_logo + ' />' +
            '</div>' +
            '</div>' +
            '<div >' + data.company_to.to_name + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return li;

    }
    function populate_negotiation_kanban(data) {
        li = '   <div class="notApproached-card">' +
            '<div class="notApproached-card-header">' +
            '<div class="mandate_id">' + data.parent_id + '</div>' +
            '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
            '</div>' +
            '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
            '<h6 class="dropdown-header">Move to</h6>' +
            '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
            '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
            '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
            '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
            '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
            '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
            '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
            '<a class="dropdown-item" onclick="openSignedModal()">Signed</a>' +
            '</div>' +
            '<div class="engagement">' +
            '<div class="profiles">' +
            '<div style="display:flex;align-items: center;justify-content: space-between;">' +
            '<div class="stakeholder">' +
            '<div>' +
            '<img class="user"' + ' src="' + data.company_from.from_logo + ' />' +
            '</div>' +
            '<div>' + data.company_from.from_name + '</div>' +
            '</div>' +

            '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
            '<div class="investor">' +
            '<div>' +
            '<img class="user" ' +
            ' src="' + data.company_to.to_logo + ' />' +
            '</div>' +
            '</div>' +
            '<div >' + data.company_to.to_name + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return li;

    }
    function populate_signed_kanban(data) {
        li = '   <div class="notApproached-card">' +
            '<div class="notApproached-card-header">' +
            '<div class="mandate_id">' + data.parent_id + '</div>' +
            '<div class="notApproaced-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
            '</div>' +
            '<div id="dropdown-menu-notApproached" class="all-dd" style="display:none">' +
            '<h6 class="dropdown-header">Move to</h6>' +
            '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
            '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
            '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
            '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
            '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
            '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
            '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
            '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
            '</div>' +
            '<div class="engagement">' +
            '<div class="profiles">' +
            '<div style="display:flex;align-items: center;justify-content: space-between;">' +
            '<div class="stakeholder">' +
            '<div>' +
            '<img class="user"' + ' src="' + data.company_from.from_logo + ' />' +
            '</div>' +
            '<div>' + data.company_from.from_name + '</div>' +
            '</div>' +

            '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
            '<div class="investor">' +
            '<div>' +
            '<img class="user" ' +
            ' src="' + data.company_to.to_logo + ' />' +
            '</div>' +
            '</div>' +
            '<div >' + data.company_to.to_name + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return li;

    }
    //return [notApproached,approached,interested,notIntrested,meetingScheduled,comitted,negotiation,dueDeligence,signed] ;   
}

