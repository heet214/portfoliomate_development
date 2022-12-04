// terms used for unique ids in population
// not approached-1
// approached-2
// interested-3
// notInterested-4
// meet-5
// reschedule-6
// irud-7
// pitchingdone-8
// softcommitment-9
// dd-10
// termsheetreceived-11
// termsheetsigned-12
// funds transfer-13
// roundclose-14

var count_notApproached = 0;
var count_Approached = 0;
var count_Interested = 0;
var count_notInterested = 0;
var count_meet = 0;
var count_reScheduled = 0;
var count_irud = 0;//interest recieved -under discussion
var count_pitchingDone = 0;
var count_softCommitment = 0;
var count_dd = 0;
var count_termsheetReceived = 0;
var count_termsheetSigned = 0;
var count_fundsTransfered = 0;
var count_roundClosed = 0;

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
function displayOptions_reSchedule() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-reSchedule').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-reSchedule").css("display", "none"))
    }

}
function displayOptions_irud() {
    if (dropdown_hidden) {
        dropdown_hidden = false;
        return ($('#dropdown-menu-irud').css("display", "block"))
    }
    if (!dropdown_hidden) {
        dropdown_hidden = true;
        return ($("#dropdown-menu-irud").css("display", "none"))
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
function openApproachedModal(dataID) {
    // alert("id"+dataID);
    $(".all-dd").css("display", "none")
    link="http://127.0.0.1:5500/accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id="+dataID+"?action=edit"
    // alert("http://127.0.0.1:5500/accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id="+dataID+"?action=edit");
    // $('#openApproachedModal').modal('show');
    // alert("link"+link)
    location.href =  link;
    
    // console.log("http://127.0.0.1:5500/accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id="+dataID)
  

}

function openMeetModal() {
    $(".all-dd").css("display", "none")
    $("#openMeetModal").modal('show');//Opens the modal
}
function openRescheduleModal() {
    $(".all-dd").css("display", "none")
    $("#openRescheduleModal").modal('show');//Opens the modal
}
function openNotApproachedModal() {
    $(".all-dd").css("display", "none")
    $("#openNotApproachedModal").modal('show');//Opens the modal
}
function openInterestedModal() {
    $(".all-dd").css("display", "none")
    $("#openInterestedModal").modal('show');//Opens the modal     
}

function openNotInterestedModal() {
    $(".all-dd").css("display", "none")
    $("#openNotInterestedModal").modal('show');//Opens the modal

}
function openirudModal() {
    $(".all-dd").css("display", "none");
    $("#openirudModal").modal('show');//Opens the modal
}
function openPitchDoneModal() {
    $(".all-dd").css("display", "none")
    $("#openPitchDoneModal").modal('show');//Opens the modal
}
function openCommittedModal() {
    $(".all-dd").css("display", "none")
    $("#openCommittedModal").modal('show');//Opens the modal
}
function openDDModal() {
    $(".all-dd").css("display", "none")
    $("#openDDModal").modal('show');//Opens the modal
}
function openReceivedModal() {
    $(".all-dd").css("display", "none")
    $("#openReceivedModal").modal('show');//Opens the modal
}
function openSignedModal() {
    $(".all-dd").css("display", "none")
    $("#openSignedModal").modal('show');//Opens the modal
}
function openFundsTranferModal() {
    $(".all-dd").css("display", "none")
    $("#openFundsTranferModal").modal('show');//Opens the modal
}
function openRoundClosed() {
    $(".all-dd").css("display", "none")
    $("#openRoundClosed").modal('show');//Opens the modal
}

$('#stakeholder_icon').click(function () {
    alert("hello there")
    location.href = "../../index.html"
});


function filter_engagements(data) {

    for (var i = 0; i < data.length; i++) {
        if (data[i].fundraiser.sub_engagements) {
            for (var j = 0; j < data[i].fundraiser.sub_engagements.length; j++) {

                switch (data[i].fundraiser.sub_engagements[j].status[data[i].fundraiser.sub_engagements[j].status.length - 1].type) {

                    case "Approached":
                        $('.Approached-container').append(populate_Approached_kanban(data[i], j))
                        break;
                    case "interested":
                        $('.Interested-container').append(populate_Interested_kanban(data[i], j))
                        break;
                    case "notInterested":

                        $('.notInterested-container').append(populate_notInterested_kanban(data[i], j))
                        break;
                    case "meetingScheduled":

                        $('.meet-container').append(populate_meetingScheduled_kanban(data[i], j))
                        break;
                    case "meetingReScheduled":

                        $('.rescheduled-container').append(populate_rescheduled_kanban(data[i], j))
                        break;
                    case "InterestReceivedUnderDiscussion":

                        $('.InterestReceivedUnderDiscussion-container').append(populate_InterestReceivedUnderDiscussion_kanban(data[i], j))
                        break;
                    case "pitchingDone":

                        $('.pitchingDone-container').append(populate_pitchingDone_kanban(data[i], j))
                        break;

                    case "SoftCommitment":

                        $('.softCommitment-container').append(populate_softCommitment_kanban(data[i], j))
                        break;
                    case "dueDiligence":

                        $('.dd-container').append(populate_dd_kanban(data[i], j))
                        break;
                    case "termSheetReceived":

                        $('.termSheetReceived-container').append(populate_termSheetReceived_kanban(data[i], j))
                        break;
                    case "termSheetSigned":

                        $('.termSheetSigned-container').append(populate_termSheetSigned_kanban(data[i], j))
                        break;
                    case "fundsTransfer":

                        $('.fundsTransfered-container').append(populate_fundsTransfered_kanban(data[i], j))
                        break;
                    case "roundClosed":

                        $('.roundClosed-container').append(populate_roundClosed_kanban(data[i], j))
                        break;
                }
            }
        }
        else {
            $('.notApproached-container').append(populate_notApproached_kanban(data[i]),j);
        }

    }

}




function populate_notApproached_kanban(data,count) {
    // alert("notApproached", data)
    count_notApproached++;
    var url = 'https://firebasestorage.googleapis.com/v0/b/portfoliomate-e14a8.appspot.com/o/WhatsApp%20Image%202022-06-26%20at%204.37.51%20PM.jpeg?alt=media';
    var name = 'Antennae Ventures'
    var stakeholderID='startup_2022|Sep|30,22:55%20PM'

    var li =
        '<li>' +
        '<div class="notApproached-card">' +
        '<div class="notApproached-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notApproached-options" onclick="displayOptions_notApproached()">&#10247;</div>' +
        // '</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle Approaced-options" onclick="displayOptions_Approached()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(stakeholderID) + ")'>Approached</div>" +
        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: center;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + url + '" />' +
        '</div>' +
        '<div class="name">' + name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        ' </div>' +
        '</li>';
    console.log('yo ' + count_notApproached)
    // count_notApproached=count_notApproached+1;
    console.log(count_notApproached)
    $('#notApproached-number').text(count_notApproached)
    console.log(li);
    return li;
}


function populate_Approached_kanban(data, count) {
        
   
    count_Approached++;
    var li =
        '<li>' +
        '<div class="Approached-card">' +
        '<div class="Approached-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="Approaced-options" onclick="displayOptions_Approached()">&#10247;</div>' +

        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle Approaced-options" onclick="displayOptions_Approached()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'"+">Not Approached</div>" +
        //  "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data) + ")'"+">Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +


        '</div>' +
        '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;    margin-bottom: 0.5rem;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +  
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn2'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"' +
       "onclick='ViewMore("+"2"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content2'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+

        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    // console.log(count_Approached)
    $('#Approached-number').text(count_Approached);


    // console.log(li);
    return li;
}
function populate_Interested_kanban(data, count) {
    count_Interested++;
    var li =
        '<li>' +
        '<div class="Interested-card">' +
        '<div class="Interested-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notInterested-options" onclick="displayOptions_Interested()">&#10247;</div>' +

        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle Interested-options"   type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'"+">Not Approached</div>" +
        // "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.to_id) + ")'" + ">Approached</div>" +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +
        '</div>' +
        '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;margin-bottom: 0.5rem;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn3'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+
       "onclick='ViewMore("+"3"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content3'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+

        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    // console.log(count_Interested+"jlaslf")
    $('#Interested-number').text(count_Interested)
    // console.log(li);
    return li;

}
function populate_notInterested_kanban(data, count) {
    count_notInterested++;
    li = '<li>' + '<div class="notInterested-card">' +
        '<div class="notInterested-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notInterested-options" onclick="displayOptions_notInterested()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle notInterested-options"   type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;margin-bottom: 0.5rem;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn4'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"' +
       "onclick='ViewMore("+"4"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +
       '<div id="content4'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    console.log(count_notInterested)
    $('#notInterested-number').text(count_notInterested)

    return li;

}
function populate_meetingScheduled_kanban(data, count) {
    console.log( "meet "+data.fundraiser.sub_engagements[count].sub_engagement_id)

    count_meet++;
    li = '<li>' + '<div class="meet-card">' +
        '<div class="meet-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notApproaced-options" onclick="displayOptions_meet()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle meet-options" onclick="displayOptions_meet()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +        
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn5'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"5"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +
        '</div>' +
        '</div>' + 
        '<div id="content5'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
            '<div class="status-details">'+
                '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
                    '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
                    '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        
                    '</div>'+
                '</div>'+
                '<div class="content-details" style="margin-top:0.2rem;">'+
                   '<div style="display:flex;justify-content: space-between;">'+
                    '<div style="font-size:0.8rem;font-weight: 600;align-items: center;">Meet Date</div>'+
                    '<div class="meet-date"style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
                    data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_date+

                    '</div>'+
                    '</div>'+
                    '<div style="display:flex;justify-content: space-between;align-items: center;">'+
                    '<div style="font-size:0.8rem;font-weight: 600;">Meet Time</div>'+
                   '<div class="meet-time" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
                   data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_time+

                    '</div>'+
                    '</div>'+
                    '<div style="font-size:0.8rem;font-weight: 600;margin-top:0.2rem">Meet Link</div>'+
                    '<div class="meetLink" style="margin:0.2rem">'+
                   data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].link+

                   '</div>'+
                      
                    '<div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
                    '<div class="detailMsg" style="margin:0.2rem">'+
                    data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+

                        '</div>'+

                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '</li>';
    console.log(count_dd)
    $('#meet-number').text(count_meet)
    return li;

}
function populate_rescheduled_kanban(data, count) {
    count_reScheduled++;
    li = '<li>' + '<div class="reScheduled-card">' +
        '<div class="reScheduled-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notApproaced-options" onclick="displayOptions_meet()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle reSchedule-options" onclick="displayOptions_reSchedule()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn6'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+
       "onclick='ViewMore("+"6"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +
        '</div>' +
        '</div>' + 
        '<div id="content6'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
            '<div class="status-details">'+
                '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
                    '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
                    '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        
                    '</div>'+
                '</div>'+
                '<div class="content-details" style="margin-top:0.2rem;">'+
                   '<div style="display:flex;justify-content: space-between;">'+
                    '<div style="font-size:0.8rem;font-weight: 600;align-items: center;">Meet Date</div>'+
                    '<div class="meet-date"style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
                    data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_date+

                    '</div>'+
                    '</div>'+
                    '<div style="display:flex;justify-content: space-between;align-items: center;">'+
                    '<div style="font-size:0.8rem;font-weight: 600;">Meet Time</div>'+
                   '<div class="meet-time" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
                   data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_time+

                    '</div>'+
                    '</div>'+
                    '<div style="font-size:0.8rem;font-weight: 600;margin-top:0.2rem">Meet Link</div>'+
                    '<div class="meetLink" style="margin:0.2rem">'+
                   data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].link+

                   '</div>'+
                      
                    '<div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
                    '<div class="detailMsg" style="margin:0.2rem">'+
                    data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+

                        '</div>'+

                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '</li>';
    $('#reScheduled-number').text(count_reScheduled)
    console.log("hiiiiiiii"+li)
    return li;

}
function populate_InterestReceivedUnderDiscussion_kanban(data, count) {
    count_irud++;
    // alert("irud "+ data.fundraiser.sub_engagements[count].company_to.to_id+count+"2")

    li = '<li>' + '<div class="irud-card">' +
        '<div class="irud-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notApproaced-options" onclick="displayOptions_meet()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle reSchedule-options" onclick="displayOptions_irud()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        //    "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn7'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"7"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

        '<div id="content7'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    $('#irud-number').text(count_irud)
    return li;

}

function populate_pitchingDone_kanban(data, count) {
    count_pitchingDone++;
    li = '<li>' + '<div class="pd-card">' +
        '<div class="pd-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="notApproaced-options" onclick="displayOptions_meet()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle pd-options"   type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        //    "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn8'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"8"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content8'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    $('#pitchingDone-number').text(count_pitchingDone)
    return li;

}
function populate_softCommitment_kanban(data, count) {
    count_softCommitment++;
    li = ' <li>' + '<div class="commit-card">' +
        '<div class="commit-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="commit-options" onclick="displayOptions_commit()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle commit-options" onclick="displayOptions_commit()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        //    "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +


        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn9'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"9"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content9'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.8rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.6rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    // console.log(count_softCommitment)
    $('#commit-number').text(count_softCommitment)

    return li;

}

function populate_dd_kanban(data, count) {
    count_dd++;

    var li =
        '<li>' +
        '<div class="dd-card">' +
        '<div class="dd-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="dd-options" onclick="displayOptions_dd()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle dd-options" onclick="displayOptions_dd()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        // '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        // '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
        // '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
        // '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        // '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        // '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
        // '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        // // '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        // '<div class="dropdown-item" onclick="openSignedModal()">Signed</div>' +
        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: center;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn10'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"10"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content10'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>'
        ;
    // console.log('yo '+cou)
    // count_notApproached=count_notApproached+1;
    console.log(count_dd)
    $('#dd-number').text(count_dd)
    console.log(li);
    return li;

}
function populate_termSheetReceived_kanban(data, count) {
    count_termsheetReceived++;
    li = ' <li>' +
        '<div class="sign-card">' +
        '<div class="sign-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="sign-options" onclick="displayOptions_sign()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle sign-options" onclick="displayOptions_sign()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        // '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        // '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
        // '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
        // '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        // '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        // '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        // '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        // '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn11'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"11"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content11'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    $('#receive-number').text(count_termsheetReceived)

    return li;

}
function populate_termSheetSigned_kanban(data, count) {
    count_termsheetSigned++;
    li = ' <li>' +
        '<div class="sign-card">' +
        '<div class="sign-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="sign-options" onclick="displayOptions_sign()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle sign-options" onclick="displayOptions_sign()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        // '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        // '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
        // '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
        // '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        // '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        // '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        // '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        // '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn12'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"12"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content12'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    $('#sign-number').text(count_termsheetSigned)

    return li;

}
function populate_fundsTransfered_kanban(data, count) {
    count_fundsTransfered++;
    li = ' <li>' +
        '<div class="sign-card">' +
        '<div class="sign-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="sign-options" onclick="displayOptions_sign()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle sign-options" onclick="displayOptions_sign()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        // '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        // '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
        // '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
        // '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        // '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        // '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        // '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        // '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +

        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn13'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"13"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content13'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    $('#ft-number').text(count_fundsTransfered)

    return li;

}
function populate_roundClosed_kanban(data, count) {
    count_roundClosed++;
    li = ' <li>' +
        '<div class="sign-card">' +
        '<div class="sign-card-header">' +
        '<div class="mandate_id">' + data.id + '</div>' +
        // '<div class="sign-options" onclick="displayOptions_sign()">&#10247;</div>' +
        '<div class="dropdown">' +
        '<div style="background-color:white;color:black;border:none" class="btn btn-secondary dropdown-toggle sign-options" onclick="displayOptions_sign()" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +

        '</div>' +

        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data.fundraiser.sub_engagements[count].company_from.from_id) + ")'>Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +

        // '<div class="dropdown-item" onclick="openNotApproachedModal()">Not Approached</div>' +
        // '<div class="dropdown-item" onclick="openApproachedModal()">Approached</div>' +
        // '<div class="dropdown-item" onclick="openInterestedModal()">Interested</div>' +
        // '<div class="dropdown-item" onclick="openNotInterestedModal()">Not Interested</div>' +
        // '<div class="dropdown-item" onclick="openCommittedModal()">Committed</div>' +
        // '<div class="dropdown-item" onclick="openMeetModal()">Meeting Scheduled</div>' +
        // '<div class="dropdown-item" onclick="openDDModal()">Due Diligence</div>' +
        // '<div class="dropdown-item" onclick="openNegotiationModal()">Negotiation</div>' +
        '</div>' + '</div>' + '</div>' +
        '<div class="engagement">' +
        '<div class="profiles">' +
        '<div style="display:flex;align-items: center;justify-content: space-between;">' +
        '<div class="stakeholder">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_from.from_logo + '" />' +
        '</div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +

        '<div style="font-size:2.5rem;color: #3342ae;margin-top:-1rem"> ⇋ </div>' +
        '<div class="investor">' +
        '<div><img class="user" src="' + data.fundraiser.sub_engagements[count].company_to.to_logo + '" /></div>' +
        '<div class="name">' + data.fundraiser.sub_engagements[count].company_to.to_name + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="button-container" style="display: flex;flex-direction: row;justify-content: flex-end;">'+
        '<button type="button" class="btn btn-dark viewMorebtn" '+
        'id="viewMorebtn14'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+ 
       "onclick='ViewMore("+"14"+"," +JSON.stringify(data.fundraiser.sub_engagements[count].company_to.to_id)+","+JSON.stringify(count) + ")'>"+
       ' View More'+
       ' </button>'+
       '</div>'+
       '</div>' +
       '</div>' +

       '<div id="content14'+data.fundraiser.sub_engagements[count].company_to.to_id+count+'"'+' class="content">'+
        '<div style="padding:0.3rem;">'+
        '<div class="status-details" >'+
        '<div class="lastmodified-details" style="display: flex;justify-content: space-between;align-items: center;">'+
        '<div style="font-size:0.8rem;font-weight: 600;">Last Modified</div>'+
        '<div class="lastModified" style="margin:0.2rem;font-size: 0.6rem;font-weight: 400;">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate+
        '</div>'+
        '</div>'+
        '<div class="content-details" style="margin-top:0.2rem">'+
        ' <div style="font-size:0.8rem;font-weight: 600;">Comments</div>'+
        '<div class="detailMsg" style="margin:0.2rem">'+
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>';
    $('#rc-number').text(count_roundClosed)

    return li;

}
//return [notApproached,approached,interested,notIntrested,meetingScheduled,comitted,negotiation,dueDeligence,signed] ;   
let termSheetSigned_file=[];
let termSheetSigned_name=[];
let termSheetSigned_url=[];

   function termSheetSignedHandle(event){

    termSheetSigned_file.push(event.target.files[0]);
    console.log(termSheetSigned_file);
  
    termSheetSigned_name.push(event.target.files[0].name);
    console.log(termSheetSigned_name);
  };

  function termSheetSignedSave(){
    let file = termSheetSigned_file[0];
    console.log("hi"+file);
    let formData = new FormData();
    formData.append('file', file);
    console.log(formData);
  
    $.ajax({
      url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log("GHAR REHNA HAI"+data);
        termSheetSigned_url.push(data['image']);
        
      },
      error: function (request, error) {
        alert("error hai" +error);
        alert('Request: ' + JSON.stringify(request));
      },
    });
  }
function update_Status_to_approached(data, count) {
    openApproachedModal()
    $('#saveApproached').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('approachedNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "Approached",
        }

        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openApproachedModal').modal('hide')
        updateEngagement(data)
    })
}


function update_Status_to_Interested(data, count) {
    openInterestedModal()
    $('#saveInterested').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('interestedNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "interested",
        }

        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openInterestedModal').modal('hide')
        updateEngagement(data)
    })
}

function update_Status_to_NotInterested(data, count) {
    openNotInterestedModal()
    $('#saveNotinterested').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('notinterestedNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "notInterested",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openNotInterestedModal').modal('hide')
        updateEngagement(data)
    })
}

function update_Status_to_meetScheduled(data, count) {
    openMeetModal()
    $('#saveMeetScheduled').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('meetingScheduledNote').value,
            meet_date: document.getElementById('meetdate').value,
            meet_time: document.getElementById('meettime').value,
            link: document.getElementById('meetlink').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "meetingScheduled",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openMeetModal').modal('hide')
        updateEngagement(data)
    })
}
function update_Status_to_reSchedule(data, count) {
    openRescheduleModal();
    $('#saveMeetreScheduled').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('meetingreScheduledNote').value,
            meet_date: document.getElementById('meetingreScheduleddate').value,
            meet_time: document.getElementById('meetingreScheduledtime').value,
            link: document.getElementById('meetingreScheduledlink').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "meetingReScheduled",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openRescheduleModal').modal('hide')
        updateEngagement(data)
    })

}

function update_Status_to_irud(data, count) {
    openirudModal()
    $('#saveirud').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('irudNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "InterestReceivedUnderDiscussion",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openirudModal').modal('hide')
        updateEngagement(data)
    })
}

function update_Status_to_pitchingDone(data, count) {
    openPitchDoneModal();
    $('#pitchdone').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('pitchDoneNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "pitchingDone",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openPitchDoneModal').modal('hide')
        updateEngagement(data)
    })
}
function update_Status_to_committed(data, count) {
    openCommittedModal()
    $('#saveCommitted').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('commitNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "SoftCommitment",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openCommittedModal').modal('hide')
        updateEngagement(data)
    })
}

function update_Status_to_DD(data, count) {
    openDDModal()
    $('#saveDD').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('ddNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "dueDiligence",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openDDModal').modal('hide')
        updateEngagement(data)
    })
}

function update_Status_to_termSheetReceived(data, count) {
    openReceivedModal();
    $('#saveReceived').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('receivedNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "termSheetReceived",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openReceivedModal').modal('hide')
        updateEngagement(data)
    })
}
function update_Status_to_termSheetSigned(data, count) {
    openSignedModal();
   
    $('#saveSigned').click(function () {
        termSheetSignedSave();
        let status = {
            changed_by: '',
            description: document.getElementById('signNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "termSheetSigned",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openSignedModal').modal('hide')
        updateEngagement(data)
    })
}
function update_Status_to_fundsTransfer(data, count) {
    openFundsTranferModal()
    $('#fundsTransfer').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('fundsTransferNote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "fundsTransfer",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openFundsTranferModal').modal('hide')
        updateEngagement(data)
    })
}
function update_Status_to_roundClose(data, count) {
    openRoundClosed();
    $('#roundClosed').click(function () {
        let status = {
            changed_by: '',
            description: document.getElementById('roundclosednote').value,
            timestamp: {
                day: moment().format('DD'),
                month: moment().format('MM'),
                year: moment().format('YYYY'),
                time: moment().format('hh:mm A'),
                datetime: moment().toISOString(),
                showdate: moment().format('DD MMM, YYYY hh:mm A'),
            },
            type: "roundClosed",
        }
        data.fundraiser.sub_engagements[count].status.push(status)
        console.log(data)
        $('#openRoundClosed').modal('hide')
        updateEngagement(data)
    })
}


function updateEngagement(data) {
    $('#loader_modal').modal("show");
    console.log(data);
    url =
        'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateEngagement';
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (data) {
            console.log(
                'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateEngagement',
                data
            );
            //   alert('updated data');
            location.reload();
            $('#loader_modal').modal("hide")

        },
        error: function (request, error) {
            $('#loader_modal').modal('hide');
            //location.reload();
            alert('Request: ' + JSON.stringify(request));
        },
    });
}


// Mrunal

let viewMoreCard = false
function ViewMore(statusUniqueNumber,toCompanyId,id) {
console.log(id)
    if (viewMoreCard) {
        // console.log($('#content'+data.id));

        document.getElementById('content'+statusUniqueNumber+toCompanyId+id).style.display = 'none';
        document.getElementById('viewMorebtn'+statusUniqueNumber+toCompanyId+id).innerHTML = "View More"
        return (viewMoreCard = false);

    }
    if (!viewMoreCard) {
console.log(document.getElementById('content'+statusUniqueNumber+toCompanyId+id).innerHTML);

        document.getElementById('content'+statusUniqueNumber+toCompanyId+id).style.display = "block";
        document.getElementById('viewMorebtn'+statusUniqueNumber+toCompanyId+id).innerHTML = "View Less"
        return (viewMoreCard = true);

    }
}