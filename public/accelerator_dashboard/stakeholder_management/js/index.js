


function is_logged_in() {
    return true;
}

function setup_stakeholders_type_list() {
    $('#stakeholder_type_list li').click(function (e) {
        $('#stakeholder_type_list li').removeClass('active');
        $('#stakeholder_type_list li').find("i").removeClass('fa-solid');
        $('#stakeholder_type_list li').find("i").addClass('fa-regular');
        $(this).find("i").removeClass('fa-regular');
        $(this).find("i").addClass('fa-solid');
        $(this).addClass('active');
    });
}

function stakeholder_selected(stakeholder_type) {
    $('.stakeholder_view_holder').hide();
    if (detectMob()) {
        $('#stakeholder_type_list').hide();
    }

    switch (stakeholder_type) {
        case 'startup':
            {
                alert("Getting " + stakeholder_type);
                $("#startup_view_holder").show();
                $("#investors_view_holder").hide();
                $("#innovadors_view_holder").hide();
                callback = populate_startups_table;
                break;
            }

        case 'fund-vc-pe':
            {
                alert("Getting " + stakeholder_type);
                $("#startup_view_holder").hide();
                $("#investors_view_holder").show();
                $("#innovadors_view_holder").hide();
                callback = populate_investors_table;
                break;
            }

        case 'innovador':
            {
                alert("Getting " + stakeholder_type);
                $("#startup_view_holder").hide();
                $("#investors_view_holder").hide();
                $("#innovadors_view_holder").show();
                callback = populate_investors_table;
                break;
            }
    }

    //get_stakeholders(stakeholder_type, {}, callback);
}


var startups, investors, innovadors;

function populate_startups_table(stakeholders) {
    //alert("Populating Startups Table");
    //console.log("Populating Tables ", stakeholders);
    var table = $("#startup_table tbody");
    table.empty();
    startups = stakeholders;
    var itemshow = ['disabled', 'disabled', 'disabled', 'disabled', 'disabled', 'disabled'];
    for (var i = 0; i < startups.length; i++) {
        if (startups[i].isDeleted) {
            console.log("Deleted", startups[i]);
        }
        else {
            var status_badge_color = 'bg-danger';
            console.log(startups[i].brand_name, startups[i].status);
            if (startups[i].status == 'Profile Created') {
                itemshow[0] = ''; //Complete
                itemshow[1] = 'disabled'; // View
                itemshow[2] = 'disabled'; // Edit
                itemshow[3] = 'disabled'; // Enagegements
                itemshow[4] = ''; // Delete
                itemshow[5] = '';
                status_badge_color = 'bg-notready0';
            }
            else if (startups[i].status == 'Profile Completed') {
                itemshow[0] = 'disabled'; //Complete
                itemshow[1] = ''; // View
                itemshow[2] = ''; // Edit
                itemshow[3] = 'disabled'; // Enagegements
                itemshow[4] = ''; // Delete
                itemshow[5] = '';
                status_badge_color = 'bg-notready1';
            }

            table.append(
                '<tr class="shadow">' +
                "<td>" +
                '<div class="company_logo_title_holder">' +
                '<div class="circular--landscape">' +
                '<img width="50" height="50" src="' + startups[i].logo + '">' +
                '</div>' +
                '<div class="company_title_holder">' + startups[i].brand_name + '</div>' +
                '</div>' +
                "</td>" +
                "<td>" + startups[i].company_sector + "</td>" +
                "<td>" + startups[i].stakeholder_location + "</td>" +
                '<td><span class="badge ' + status_badge_color + '">' + startups[i].status + '</span></td>' +
                '<td>' +
                '<div class="dropdown dropleft">' +
                '<i class="fa-solid fa-ellipsis" class="dropdown-toggle" data-toggle="dropdown"></i>' +
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                '<h6 class="dropdown-header">Just for ' + startups[i].company_name + '</h6>' +
                '<div onclick="complete_stakeholder_profile(\'' + startups[i].id + '\')" class="dropdown-item ' + itemshow[0] + ' ">Complete Profile</div>' +
                '<div onclick="view_stakeholder_profile(\'' + startups[i].id + '\')" class="dropdown-item ' + itemshow[1] + '">View Profile</div>' +
                '<div onclick="edit_stakeholder_profile(\'' + startups[i].id + '\')" class="dropdown-item ' + itemshow[2] + '">Edit Profile</div>' +
                '<div onclick="start_enagagement(\'' + startups[i].id + '\')" class="dropdown-item ' + itemshow[3] + '">Enagements</div>' +
                '<div onclick="delete_stakeholder(\'' + startups[i].id + '\',false,null)" class="dropdown-item ' + itemshow[4] + '">Delete Stakeholder</div>' +
                '</div>' +
                '</div>' +
                '</td>' +
                "</tr>");
        }

        $("#startup_list_search_box").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#startup_table tbody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }


}

function populate_investors_table(stakeholders) {
    //alert("Populating Startups Table");
    //console.log("Populating Tables ", stakeholders);
    var table = $("#investor_table tbody");
    table.empty();
    investors = stakeholders;
    var itemshow = ['disabled', 'disabled', 'disabled', 'disabled']
    for (var i = 0; i < investors.length; i++) {
        var status_badge_color = 'bg-danger';
        console.log(investors[i].brand_name, startups[i].status);
        if (investors[i].status == 'Profile Created') {
            itemshow[0] = ''; //Complete
            itemshow[1] = 'disabled'; // View
            itemshow[2] = 'disabled'; // Edit
            itemshow[3] = 'disabled'; // Enagegements
            itemshow[4] = ''; // Delete
            itemshow[5] = '';
            status_badge_color = 'bg-notready0';
        }
        else if (investors[i].status == 'Profile Completed') {
            itemshow[0] = 'disabled'; //Complete
            itemshow[1] = ''; // View
            itemshow[2] = ''; // Edit
            itemshow[3] = 'disabled'; // Enagegements
            itemshow[4] = ''; // Delete
            itemshow[5] = '';
            status_badge_color = 'bg-notready1';
        }

        table.append(
            '<tr class="shadow">' +
            "<td>" +
            '<div class="company_logo_title_holder">' +
            '<div class="circular--landscape">' +
            '<img src="' + investors[i].logo + '">' +
            '</div>' +
            '<div class="company_title_holder">' + investors[i].brand_name + '</div>' +
            '</div>' +
            "</td>" +
            "<td>" + investors[i].company_sector + "</td>" +
            "<td>" + investors[i].stakeholder_location + "</td>" +
            '<td><span class="badge ' + status_badge_color + '">' + investors[i].status + '</span></td>' +
            '<td>' +
            '<div class="dropdown dropleft">' +
            '<i class="fa-solid fa-ellipsis" class="dropdown-toggle" data-toggle="dropdown"></i>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
            '<h6 class="dropdown-header">Just for ' + investors[i].company_name + '</h6>' +
            '<div onclick="complete_stakeholder_profile(\'' + investors[i].id + '\')" class="dropdown-item ' + itemshow[0] + ' ">Complete Profile</div>' +
            '<div onclick="view_stakeholder_profile(\'' + investors[i].id + '\')" class="dropdown-item ' + itemshow[1] + '">View Profile</div>' +
            '<div onclick="edit_stakeholder_profile(\'' + investors[i].id + '\')" class="dropdown-item ' + itemshow[2] + '">Edit Profile</div>' +
            '<div onclick="start_enagagement(\'' + investors[i].id + '\')" class="dropdown-item ' + itemshow[3] + '">Enagements</div>' +
            '<div onclick="delete_stakeholder(\'' + investors[i].id + '\',false,null)" class="dropdown-item ' + itemshow[4] + '">Delete Stakeholder</div>' +
            '</div>' +
            '</div>' +
            '</td>' +
            "</tr>");
    }

    $("#investor_list_search_box").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#investor_table tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function populate_innovadors_table(stakeholders) {
    alert("Populating Startups Table");
    console.log("Populating Tables ", stakeholders);
    var table = $("#innovadors_table tbody");
    table.empty();
    innovadors = stakeholders;
    var itemshow = ['disabled', 'disabled', 'disabled', 'disabled']
    for (var i = 0; i < innovadors.length; i++) {
        var status_badge_color = 'bg-danger';
        if (innovadors[i].status == 'Profile Created') {
            itemshow[0] = '';
            itemshow[1] = '';
            status_badge_color = 'bg-notready0';
        }
        else if (innovadors[i].status == 'Profile Completed') {

            itemshow[1] = '';
            itemshow[2] = '';
            itemshow[3] = '';
            status_badge_color = 'bg-notready1';
        }

        table.append(
            '<tr class="shadow">' +
            "<td>" +
            '<div class="company_logo_title_holder">' +
            '<div class="circular--landscape">' +
            '<img src="' + innovadors[i].logo + '">' +
            '</div>' +
            '<div class="company_title_holder">' + innovadors[i].name + '</div>' +
            '</div>' +
            "</td>" +
            "<td>" + innovadors[i].parent.company_name + "</td>" +
            "<td>" + innovadors[i].stakeholder_location + "</td>" +
            '<td><span class="badge ' + status_badge_color + '">' + innovadors[i].status + '</span></td>' +
            '<td>' +
            '<div class="dropdown dropleft">' +
            '<i class="fa-solid fa-ellipsis" class="dropdown-toggle" data-toggle="dropdown"></i>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
            '<h6 class="dropdown-header">Just for ' + innovadors[i].name + '</h6>' +
            '<div onclick="complete_stakeholder_profile(\'' + innovadors[i].id + '\')" class="dropdown-item ' + itemshow[0] + ' " disabled>Complete Profile</div>' +
            '<div onclick="view_stakeholder_profile(\'' + innovadors[i].id + '\')" class="dropdown-item ' + itemshow[1] + '" disabled>View Profile</div>' +
            '<div onclick="start_enagagement(\'' + innovadors[i].id + '\')" class="dropdown-item ' + itemshow[2] + '"disabled >Start Enagement</div>' +
            '<div onclick="view_enagement(\'' + innovadors[i].id + '\')" class="dropdown-item ' + itemshow[3] + '" disabled>View Enagagements</div>' +
            '<div onclick="delete_stakeholder(\'' + innovadors[i].id + '\',false,null)" class="dropdown-item" disabled>Delete Stakeholder</div>' +
            '</div>' +
            '</div>' +
            '</td>' +
            "</tr>");
    }

    $("#innovador_list_search_box").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#innovadors_table tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function complete_stakeholder_profile(stakeholder_id) {
    window.location.href = "../../accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id=" + stakeholder_id + "?action=" + "complete" + "";;
}

function view_stakeholder_profile(stakeholder_id) {
    window.location.href = "../../accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id=" + stakeholder_id + "";
}

function edit_stakeholder_profile(stakeholder_id) {
    window.location.href = "../../accelerator_dashboard/stakeholder_management/modules/profile/?stakeholder_id=" + stakeholder_id + "?action=" + "edit" + "";;
}

function close_complete_startup_profile_dialog() {
    $('#complete_startup_profile').modal('hide');
}

function delete_stakeholder(stakeholder_id, should_delete, stakeholder) {
    alert("We are entering delete now, with should_delete = " + should_delete);
    if (should_delete) {
        //post receiving the object , initialize with delete details
        var stakeholder = stakeholder[0];
        stakeholder.isDeleted = true;
        var deletedObject = {};
        deletedObject.deletedOn = {
            day: moment().format('DD'),
            month: moment().format('MM'),
            year: moment().format('YYYY'),
            time: moment().format('hh:mm A'),
            datetime: moment().toISOString(),
            showdate: moment().format('DD MMM, YYYY hh:mm A'),
        };
        deletedObject.deletedBy = "";
        stakeholder.deletedObject = deletedObject;
        console.log(stakeholder);
        updatestakeHolder("delete", stakeholder, refresh_page)
    }
    else {
        //activated when should_delete is false
        //first we get the profile from db to update it with delete object
        get_stakeholders('delete_profile', { id: stakeholder_id }, delete_stakeholder);
    }
}

function refresh_page() {
    window.location.href = "../../accelerator_dashboard/stakeholder_management";
}


function setup_stakeholder_management_operator_module(makethecall, returned_object) {
    var stakeholders = [];
    //alert(makethecall);
    if (makethecall) {
        //alert("Setting Up Stakeholder Layout");
        get_stakeholders('setup_stakeholder_management', { callback: false }, setup_stakeholder_management_operator_module);

    }
    else {
        console.log(returned_object);
        stakeholders = returned_object;

        startups = stakeholders.filter(function (el) {
            return el.stakeholder_type == 'startup'
        });

        $('.startup-pill').text(startups.length);
        populate_startups_table(startups);

        investors = stakeholders.filter(function (el) {
            return el.stakeholder_type == 'fund-vc-pe'
        });
        $('.investor-pill').text(investors.length);
        populate_investors_table(investors);

        innovadors = stakeholders.filter(function (el) {
            return el.stakeholder_type == 'innovador'
        });
        $('.innovador-pill').text(innovadors.length);
        populate_innovadors_table(innovadors);

        if (detectMob())
            toggle_mobile_stakeholder_type();
    }
}



