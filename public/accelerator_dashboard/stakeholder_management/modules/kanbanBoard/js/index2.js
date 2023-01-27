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
var signedTermSheet_Signed = [];
var signedTermSheet_Received = []

let noOfCharacters = 95;


function readMore(btn) {
    let post = (btn.parentElement).parentElement;
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";

}

function viewMore(btn) {
    let block = ((btn.parentElement).parentElement).parentElement;
    block.querySelector(".view_more_block").classList.toggle("show");
    console.log(block.querySelector(".view_more_block"));
    let image = btn.firstChild;
    image.classList.toggle("up")
    console.log(image)
    //   image.style.transform = "rotate(0deg)" ? image.style.transform = "rotate(180deg)" :image.style.transform = "rotate(0deg)";
}

$('document').ready(function () {


    $.ajax({
        url: "https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getAllEngagements",
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var hello = data
            console.log(hello)

            filter_engagements(data);

            let contents = document.querySelectorAll(".content");
            contents.forEach(content => {

                //if text length is less than noOfCharacters then hide the read more button
                if (content.textContent.length < noOfCharacters) {
                    // content.nextElementSibiling.style.display = "none";
                    let btndiv = content.parentElement;
                    btndiv.querySelector(".readMorebtn").style.display = "none";
                }
                else {
                    let displayText = content.textContent.slice(0, noOfCharacters);
                    let moreText = content.textContent.slice(noOfCharacters);
                    content.innerHTML = `${displayText}<span class="dots">...</span><span class="hide more">${moreText}</span>`
                }
            });
        },
    });

});


function openApproachedModal(dataID, type) {
    // alert("id"+dataID);
    if (type == null) {//for notapproached
        $(".all-dd").css("display", "none")

        link = "https://portfoliomate-e14a8.web.app/accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id=" + dataID + "?action=edit"
        // alert("http://127.0.0.1:5500/accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id="+dataID+"?action=edit");
        // $('#openApproachedModal').modal('show');
        // alert("link"+link)
        location.href = link;
    }
    else {
        //for all others except for notapproached
        $("#openApproachedModal").modal('show');//Opens the modal
    }
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
    // alert("OPEN SIGNED MODAL ON")
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
    // alert("hello there")
    location.href = "../../index.html"
});

function filter_engagements(data) {

    for (var i = 0; i < data.length; i++) {
        if (data[i].fundraiser.sub_engagements) {
            for (var j = 0; j < data[i].fundraiser.sub_engagements.length; j++) {

                switch (data[i].fundraiser.sub_engagements[j].status[data[i].fundraiser.sub_engagements[j].status.length - 1].type) {

                    case "Approached":
                        $('.Approached-container').append(populate_Approached_kanban(data[i], j));
                        // contenthide();
                        break;
                    case "interested":
                        $('.Interested-container').append(populate_Interested_kanban(data[i], j));
                        // contenthide();
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
            $('.notApproached-container').append(populate_notApproached_kanban(data[i]), j);
        }

    }

}

function populate_notApproached_kanban(data, count) {
    // alert("notApproached", data)
    count_notApproached++;
    var url = 'https://firebasestorage.googleapis.com/v0/b/portfoliomate-e14a8.appspot.com/o/WhatsApp%20Image%202022-06-26%20at%204.37.51%20PM.jpeg?alt=media';
    var name = 'Antennae Ventures Pvt Ltd'
    var stakeholderID = 'startup_2022|Sep|30,22:55%20PM'

    let li =
        '<li>' +
        '<div class="notApproached_cards">' +
        '<div class="cards">' +
        '<div class="notApproached_card">' +
        '<div class="card_header">' +
        '<div class="companies" style="justify-content: center;background: #7FBCD2;border-radius-top-left: 20px;border-top-left-radius: 20px;border-top-right-radius: 20px;">' +
        '<div class="from_name from_notapproached from"' +
        'style="color:#ffffff;display: flex;border-top-left-radius:20px;margin-left:6px;width:9.5rem;justify-content: center; height: fit-content;padding:5px">' +
        name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(stakeholderID) + "," + null + ")'" + ">Approached</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div>' +
        ' <div class="mandateID">' +
        '2022|Dec|03,15:11 PM' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="info"style="margin-top:0.5rem">' +
        '</div>' +
        '<div class="options">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' + '</li>';
    $('#notApproached-number').text(count_notApproached)
    // console.log(li);
    return li;
}

function populate_Approached_kanban(data, count) {
    count_Approached++;

    var li =
        '<li>' +
        '<div class="Approached_cards">' +
        '<div class="cards">' +
        '<div class="Approached_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_approached from"' +
        'style="color:#FFCAC8;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color: #FFCAC8;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +
        // "<div class='dropdown-item' onclick='openApproachedModal(" + JSON.stringify(data) + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +


        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/approachedEditicon.png'onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '</div>' +
        ' </div>' +
        '</li>';

    $('#Approached-number').text(count_Approached);


    // console.log(li);
    return li;
}

function populate_Interested_kanban(data, count) {
    count_Interested++;
    var li =
        '<li>' +
        '<div class="Interested_cards">' +
        '<div class="cards">' +
        '<div class="Interested_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_interested from"' +
        'style="color:#C5C0C0;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color: #C5C0C0;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +


        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/interestedEditicon.png'onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '</div>' +
        ' </div>' +
        '</li>';


    // console.log(count_Interested+"jlaslf")
    $('#Interested-number').text(count_Interested)
    // console.log(li);
    return li;

}

function populate_notInterested_kanban(data, count) {
    count_notInterested++;
    li = '<li>' +
        '<div class="notInterested_cards">' +
        '<div class="cards">' +
        '<div class="notInterested_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_notinterested from"' +
        'style="color:#fdfd96;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#fdfd96;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/notInterestedEditicon.png'onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    // console.log(count_notInterested)
    $('#notInterested-number').text(count_notInterested)

    return li;

}

function populate_meetingScheduled_kanban(data, count) {
    console.log("meet " + data.fundraiser.sub_engagements[count].sub_engagement_id)

    count_meet++;
    li = '<li>' +
        '<div class="meet_cards">' +
        '<div class="cards">' +
        '<div class="meet_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_meet from"' +
        'style="color:#C8DBBE;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#C8DBBE;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent" style="flex-direction:column;align-items: flex-start;">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '<div class="meet-details">' +
        '<div class="dateTime">' +
        '<div class="date">' +
        '<div  class="viewMoretexts">Meet Date</div>' +
        '<div class="details">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_date +
        '</div>' +
        '</div>' +
        '<div class="time">' +
        '<div  class="viewMoretexts">Meet Time</div>' +
        '<div class="details">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_time +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="meetlink" style="align-items: flex-start;">' +
        '<div  class="viewMoretexts">Meet Link:</div>' +
        '<div class="meetlinkdetails">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].link +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/meetEditicon.png'onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';

    $('#meet-number').text(count_meet)
    return li;

}

function populate_rescheduled_kanban(data, count) {
    count_reScheduled++;
    li = '<li>' +
        '<div class="rs_cards">' +
        '<div class="cards">' +
        '<div class="rs_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_rs from"' +
        'style="color:#E7B7A6;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#E7B7A6;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent" style="flex-direction:column;align-items: flex-start;">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '<div class="meet-details">' +
        '<div class="dateTime">' +
        '<div class="date">' +
        '<div  class="viewMoretexts">Meet Date</div>' +
        '<div class="details">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_date +
        '</div>' +
        '</div>' +
        '<div class="time">' +
        '<div  class="viewMoretexts">Meet Time</div>' +
        '<div class="details">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].meet_time +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="meetlink" style="align-items: flex-start;">' +
        '<div  class="viewMoretexts">Meet Link:</div>' +
        '<div class="meetlinkdetails">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].link +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/rsEditicon.png'onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    $('#reScheduled-number').text(count_reScheduled)
    // console.log("hiiiiiiii" + li)
    return li;

}

function populate_InterestReceivedUnderDiscussion_kanban(data, count) {
    count_irud++;
    // alert("irud "+ data.fundraiser.sub_engagements[count].company_to.to_id+count+"2")
    li = '<li>' +
        '<div class="irud_cards">' +
        '<div class="cards">' +
        '<div class="irud_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_irud from"' +
        'style="color:#A4C9D7;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#A4C9D7;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +


        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/irudEditicon.png'onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '</div>' +
        ' </div>' +
        '</li>';

    $('#irud-number').text(count_irud)
    return li;

}

function populate_pitchingDone_kanban(data, count) {
    count_pitchingDone++;
    li = '<li>' +
        '<div class="pd_cards">' +
        '<div class="cards">' +
        '<div class="pd_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_pd from"' +
        'style="color:#FFDBA4;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#FFDBA4;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/pdEditicon.png'onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    $('#pitchingDone-number').text(count_pitchingDone)
    return li;

}

function populate_softCommitment_kanban(data, count) {
    count_softCommitment++;
    li = '<li>' +
        '<div class="sc_cards">' +
        '<div class="cards">' +
        '<div class="sc_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_sc from"' +
        'style="color:#D2DAFF;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#D2DAFF;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_Interested(" + JSON.stringify(data) + "," + count + ")'" + ">Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_NotInterested(" + JSON.stringify(data) + "," + count + ")'" + ">Not Interested</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_meetScheduled(" + JSON.stringify(data) + "," + count + ")'" + ">Meet Scheduled</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_reSchedule(" + JSON.stringify(data) + "," + count + ")'" + ">Reschedule</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_irud(" + JSON.stringify(data) + "," + count + ")'" + ">Under Discussion</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_pitchingDone(" + JSON.stringify(data) + "," + count + ")'" + ">Pitching Done</div>" +
        // "<div class='dropdown-item' onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'" + ">Soft Commitment</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'" + ">Due Diligence</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Received</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'" + ">Term Sheet Signed</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'" + ">Funds Transfered</div>" +
        "<div class='dropdown-item' onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'" + ">Round Closed</div>" +
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/scEditicon.png'onclick='update_Status_to_committed(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    // console.log(count_softCommitment)
    $('#commit-number').text(count_softCommitment)

    return li;

}

function populate_dd_kanban(data, count) {
    count_dd++;

    var li =
        '<li>' +
        '<div class="dd_cards">' +
        '<div class="cards">' +
        '<div class="dd_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_dd from"' +
        'style="color:#EFEAD8;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#EFEAD8;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/ddEditicon.png'onclick='update_Status_to_DD(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';

    $('#dd-number').text(count_dd)

    return li;

}

function populate_termSheetReceived_kanban(data, count) {
    count_termsheetReceived++;
    li = '<li>' +
        '<div class="termSheetReceived_cards">' +
        '<div class="cards">' +
        '<div class="termSheetReceived_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_termSheetReceived from"' +
        'style="color:#FF9F9F;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#FF9F9F;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent" style="flex-direction:column;align-items: flex-start;">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '<div class="file-details" style="display:flex;flex-direction: column;align-items: flex-start;margin:0.5rem 0;">' +
        '<div style="font-size:0.8rem;font-weight: 600;">' +
        'File' +
        '</div>' +
        '<a href="' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].fileUrl +
        '" target="_blank">' +
        '<div style="display: flex;justify-content: space-between;align-items: center;" class="file-container">' +
        '<img src="/assets/file_icon.png"/>' +
        '<div class="file-name-container">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].fileName +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/termSheetReceivedEditicon.png'onclick='update_Status_to_termSheetReceived(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';

    $('#receive-number').text(count_termsheetReceived)

    return li;

}

function populate_termSheetSigned_kanban(data, count) {
    count_termsheetSigned++;
    li = '<li>' +
        '<div class="termSheetSigned_cards">' +
        '<div class="cards">' +
        '<div class="termSheetSigned_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_termSheetSigned from"' +
        'style="color:#9E7676;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#9E7676;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent" style="flex-direction:column;align-items: flex-start;">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '<div class="file-details" style="display:flex;flex-direction: column;align-items: flex-start;margin:0.5rem 0;">' +
        '<div style="font-size:0.8rem;font-weight: 600;">' +
        'File' +
        '</div>' +
        '<a href="' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].fileUrl +
        '" target="_blank">' +
        '<div style="display: flex;justify-content: space-between;align-items: center;" class="file-container">' +
        '<img src="/assets/file_icon.png"/>' +
        '<div class="file-name-container">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].fileName +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/termSheetSignedEditicon.png'onclick='update_Status_to_termSheetSigned(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    ;
    $('#sign-number').text(count_termsheetSigned)

    return li;

}

function populate_fundsTransfered_kanban(data, count) {
    count_fundsTransfered++;
    li =
        '<li>' +
        '<div class="ft_cards">' +
        '<div class="cards">' +
        '<div class="ft_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_ft from"' +
        'style="color:#9ED2C6;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#9ED2C6;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/ftEditicon.png'onclick='update_Status_to_fundsTransfer(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    $('#ft-number').text(count_fundsTransfered)

    return li;

}

function populate_roundClosed_kanban(data, count) {
    count_roundClosed++;
    li =
        '<li>' +
        '<div class="rc_cards">' +
        '<div class="cards">' +
        '<div class="rc_card">' +
        '<div class="card_header">' +
        '<div class="companies">' +
        '<div class="from_name from_rc from"' +
        'style="color:#AF7AB3;display: flex;border-top-left-radius:20px;margin-left:6px;width:8.5rem;justify-content: center;  height: fit-content;padding:5px">' + '<div style="line-height:9px">' +
        data.fundraiser.sub_engagements[count].company_from.from_name + '</div>' +
        '</div>' +
        '<div class="to_name to_shape"' +
        'style="background-color:#AF7AB3;width: 10rem;border-top-right-radius: 20px;text-align: center;margin-left: 6px;color: #ffffff;height: fit-content;padding: 5px;">' +
        data.fundraiser.sub_engagements[count].company_to.to_name +
        '</div>' +
        '</div>' +
        '<div class="dropdown" style="display: flex;flex-direction: row-reverse;">' +
        '<div style="background-color:white;color:black;border:none;padding: 0 0.5rem;" class="btn btn-secondary dropdown-toggle Approaced-options" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<img src="/assets/more (1).png" style="width: 1rem;margin-left:0" />' +
        '</div>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<h6 class="dropdown-header">Move to</h6>' +
        // "<div class='dropdown-item' onclick='openNotApproachedModal()(" + JSON.stringify(data) + ")'" + ">Not Approached</div>" +

        "<div class='dropdown-item' onclick='update_Status_to_approached(" + JSON.stringify(data) + "," + count + ")'" + ">Approached</div>" +
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
        '</div>' + '</div>' +
        '<div  class="comments">' +
        '<div class="comment-content">' +
        '<p class="content" style="margin-bottom:-2px">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].description +
        '</p>' +
        '<span class="readMorebtn"><a onclick="readMore(this)" style="color:#7FBCD2;text-decoration:underline">Read More</a></span>' +
        '</div>' +
        '</div>' +

        '<div class="view_more_block">' +
        '<hr>' +
        '<div class="viewMoreContent">' +
        '<div class="viewMoretexts">Mandate ID : </div> <div class="mandateID">' +
        data.id +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="info">' +
        '<div class="last_changed">' +
        '<div class="last_changedBy"><img src="/assets/changedByexample.jpeg"/></div>' +
        '<div class="last_changedTime">' +
        data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].timestamp.showdate +
        '</div>' +
        '</div>' +
        '<div class="options">' +
        '<div class="edit">' +
        "<img src='/assets/rcEditicon.png'onclick='update_Status_to_roundClose(" + JSON.stringify(data) + "," + count + ")'/>" +
        '</div>' +
        '<div class="view_more" onclick="viewMore(this)"><img  class="down" src="/assets/downArrow.png"/></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    $('#rc-number').text(count_roundClosed)

    return li;

}














//termSheet Signed
//return [notApproached,approached,interested,notIntrested,meetingScheduled,comitted,negotiation,dueDeligence,signed] ;   
let termSheetSigned_file = [];
let termSheetSigned_name = [];
let termSheetSigned_url = [];

function termSheetSignedHandle(event) {

    termSheetSigned_file.push(event.target.files[0]);
    console.log(termSheetSigned_file);

    termSheetSigned_name.push(event.target.files[0].name);
    console.log(termSheetSigned_name);
};

function termSheetSignedSave() {
    // alert("SIGNED ON");
    let file = termSheetSigned_file[0];
    // console.log("hi"+file);
    let formData = new FormData();
    formData.append('file', file);
    // console.log(formData);

    $.ajax({
        url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            termSheetSigned_url.push(data['image']);
            // alert("URL:"+termSheetSigned_url);
            let fileDetails = {
                name: termSheetSigned_name[0],
                url: termSheetSigned_url[0],
            }
            // alert(JSON.stringify(fileDetails))
            signedTermSheet_Signed.push(fileDetails);
            alert('Uploaded file successfully')
        },
        error: function (request, error) {
            alert("error hai" + error);
            alert('Request: ' + JSON.stringify(request));
        },
    });
}

//termSheetRECEIVED 
let termSheetReceived_file = [];
let termSheetReceived_name = [];
let termSheetReceived_url = [];

function termSheetReceivedHandle(event) {

    termSheetReceived_file.push(event.target.files[0]);
    console.log(termSheetReceived_file);

    termSheetReceived_name.push(event.target.files[0].name);
    console.log(termSheetReceived_name);
};

function termSheetReceivedSave() {
    let file = termSheetReceived_file[0];
    console.log("hi" + file);
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
            termSheetReceived_url.push(data['image']);
            let fileDetails = {
                name: termSheetReceived_name[0],
                url: termSheetReceived_url[0],
            }
            // alert(JSON.stringify(fileDetails))
            signedTermSheet_Received.push(fileDetails);
            alert('Uploaded file successfully')
        },

        error: function (request, error) {
            alert("error hai" + error);
            alert('Request: ' + JSON.stringify(request));
        },
    });

}

function update_Status_to_approached(data, count) {
    openApproachedModal(data.id, data.fundraiser.sub_engagements[count].status[data.fundraiser.sub_engagements[count].status.length - 1].type)
    $('#saveApproached').click(function () {
         'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
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
                        data.fundraiser.sub_engagements[count].status.push(status);
                        $('#openApproachedModal').modal('hide')
                        updateEngagement(data);
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    });
     

}

function update_Status_to_Interested(data, count) {
    openInterestedModal()
    $('#saveInterested').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        $('#openInterestedModal').modal('hide')
                        updateEngagement(data);
                    }
                    form.classList.add('was-validated')
                }, false)
            });
    });
}

function update_Status_to_NotInterested(data, count) {
    openNotInterestedModal()
    $('#saveNotinterested').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
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
                        data.fundraiser.sub_engagements[count].status.push(status);
                        $('#openNotInterestedModal').modal('hide');
                        updateEngagement(data);
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
}

function update_Status_to_meetScheduled(data, count) {
    openMeetModal()
    $('#saveMeetScheduled').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
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
                        data.fundraiser.sub_engagements[count].status.push(status);
                        $('#openMeetModal').modal('hide');
                        updateEngagement(data)
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    });
}

function update_Status_to_reSchedule(data, count) {
    openRescheduleModal();
    $('#saveMeetreScheduled').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        data.fundraiser.sub_engagements[count].status.push(status);
                        $('#openRescheduleModal').modal('hide');
                        updateEngagement(data);
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });

}

function update_Status_to_irud(data, count) {
    openirudModal()
    $('#saveirud').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        updateEngagement(data);
                        // alert('ho gaya idk')
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#saveirud').click(function () {
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('irudNote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         type: "InterestReceivedUnderDiscussion",
    //     }
    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     console.log(data)
    //     $('#openirudModal').modal('hide')
    //     updateEngagement(data)
    // })
}

function update_Status_to_pitchingDone(data, count) {
    openPitchDoneModal();
    $('#pitchdone').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
                        // alert("in the else")
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
                        // alert(status.description);
                        $('#openPitchDoneModal').modal('hide')
                        updateEngagement(data);
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#pitchdone').click(function () {
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('pitchDoneNote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         type: "pitchingDone",
    //     }
    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     console.log(data)
    //     $('#openPitchDoneModal').modal('hide')
    //     updateEngagement(data)
    // })
}

function update_Status_to_committed(data, count) {
    openCommittedModal()
    $('#saveCommitted').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        // console.log(data)
                        $('#openCommittedModal').modal('hide')
                        updateEngagement(data)
                        // alert('ho gaya idk')
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#saveCommitted').click(function () {
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('commitNote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         type: "SoftCommitment",
    //     }
    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     console.log(data)
    //     $('#openCommittedModal').modal('hide')
    //     updateEngagement(data)
    // })
}

function update_Status_to_DD(data, count) {
    openDDModal()
    $('#saveDD').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        // alert('ho gaya idk')
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#saveDD').click(function () {
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('ddNote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         type: "dueDiligence",
    //     }
    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     console.log(data)
    //     $('#openDDModal').modal('hide')
    //     updateEngagement(data)
    // })
}

function update_Status_to_termSheetReceived(data, count) {
    openReceivedModal();
    $('#saveReceived').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
                        let fileDetails = signedTermSheet_Received;
                        // alert(fileDetails);
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
                            fileUrl: fileDetails[0].url,
                            fileName: fileDetails[0].name,
                            type: "termSheetReceived",
                        }
                        console.log(status)

                        data.fundraiser.sub_engagements[count].status.push(status)
                        // console.log("vaat hai"+data)
                        $('#openReceivedModal').modal('hide')
                        updateEngagement(data)
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#saveReceived').click(function () {
    //     //    let url= termSheetReceivedSave()
    //     fileDetails = signedTermSheet_Received;
    //     console.log(fileDetails);
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('receivedNote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         fileUrl: fileDetails[0].url,
    //         fileName: fileDetails[0].name,
    //         type: "termSheetReceived",
    //     }
    //     console.log(status)

    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     // console.log("vaat hai"+data)
    //     $('#openReceivedModal').modal('hide')
    //     updateEngagement(data)
    // })
}
function update_Status_to_termSheetSigned(data, count) {

    openSignedModal();

    $('#saveSigned').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
                        let fileDetails = signedTermSheet_Signed;
                        // console.log(fileDetails);
                        alert(fileDetails);

                        let status = {
                            changed_by: '',
                            description: document.getElementById('signedNote').value,
                            timestamp: {
                                day: moment().format('DD'),
                                month: moment().format('MM'),
                                year: moment().format('YYYY'),
                                time: moment().format('hh:mm A'),
                                datetime: moment().toISOString(),
                                showdate: moment().format('DD MMM, YYYY hh:mm A'),
                            },
                            fileUrl: fileDetails[0].url,
                            fileName: fileDetails[0].name,
                            type: "termSheetSigned",
                        }
                        // alert(status)
                        data.fundraiser.sub_engagements[count].status.push(status)
                        // console.log("vaat hai part2"+JSON.stringify(data))
                        $('#openSignedModal').modal('hide')
                        updateEngagement(data)
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
}
function update_Status_to_fundsTransfer(data, count) {
    openFundsTranferModal()
    $('#fundsTransfer').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        // console.log(data)
                        $('#openFundsTranferModal').modal('hide')
                        updateEngagement(data)
                        // alert('ho gaya idk')
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#fundsTransfer').click(function () {
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('fundsTransferNote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         type: "fundsTransfer",
    //     }
    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     console.log(data)
    //     $('#openFundsTranferModal').modal('hide')
    //     updateEngagement(data)
    // })
}
function update_Status_to_roundClose(data, count) {
    openRoundClosed();
    $('#roundClosed').click(function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    else {
                        // event.preventDefault();
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
                        // console.log(data)
                        $('#openRoundClosed').modal('hide')
                        updateEngagement(data)
                        // alert('ho gaya idk')
                    }
                    form.classList.add('was-validated')
                }, false)
            })


    });
    // $('#roundClosed').click(function () {
    //     let status = {
    //         changed_by: '',
    //         description: document.getElementById('roundclosednote').value,
    //         timestamp: {
    //             day: moment().format('DD'),
    //             month: moment().format('MM'),
    //             year: moment().format('YYYY'),
    //             time: moment().format('hh:mm A'),
    //             datetime: moment().toISOString(),
    //             showdate: moment().format('DD MMM, YYYY hh:mm A'),
    //         },
    //         type: "roundClosed",
    //     }
    //     data.fundraiser.sub_engagements[count].status.push(status)
    //     console.log(data)
    //     $('#openRoundClosed').modal('hide')
    //     updateEngagement(data)
    // })
}


function updateEngagement(data) {

    $('#loader_modal').modal("show");
    // alert('in update engagement')
    url = 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateEngagement';
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
            $('#loader_modal').modal("hide")
            alert('updated data');
            location.reload();
        },
        error: function (request, error) {
            $('#loader_modal').modal('hide');
            location.reload();
            alert('Request: ' + JSON.stringify(request));
        },
    });
}



