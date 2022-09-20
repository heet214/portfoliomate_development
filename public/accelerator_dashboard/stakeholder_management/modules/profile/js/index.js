var stakeholder_id;
var data_innovadors;
$('document').ready(function () {
    if (is_logged_in()) {
        $('#stakeholders_no_people').hide();
        var url_string = location.href;
        var url = new URL(url_string);
        stakeholder_id = url.searchParams.get("action");
        //console.log(url.searchParams);
        //console.log(url);
        //alert(stakeholder_id);
        get_stakeholders('single_profile', { id: stakeholder_id }, populate_profile);
        
    }
    else {

    }
});



function is_logged_in() {
    return true;
}

function detectMob() {
    return ((window.innerWidth <= 480));
}

function populate_profile(stakeholder) {    
    console.log("clientside", stakeholder);
    console.log
    if (stakeholder.status == "Profile Created") {

    }

    $('#stakeholder_company_name_label').text(stakeholder.company_name);
    $('#stakeholder_company_logo').attr("src", stakeholder.logo);
    $('#company_logo').val(stakeholder.logo);

    if (stakeholder.description) {
        $('#stakeholder_company_description_label').text(stakeholder.description);
    }

    $('#company_name').text(stakeholder.company_name);
    $('#createdon_label').text("Created On: " + stakeholder.created_on.showdate);
    $.each(stakeholder, function (name, val) {
        //console.log(name, val);
        var $el = $('[name="' + name + '"]'),
            type = $el.attr('type');

        switch (type) {
            case 'checkbox':
                $el.attr('checked', 'checked');
                break;
            case 'radio':
                $el.filter('[value="' + val + '"]').attr('checked', 'checked');
                break;
            default:
                $el.val(val);
        }
    });

    if (stakeholder.people) {
        if (stakeholder.people.length > 0) {
            $('#stakeholders_no_people').hide();
            //alert("populating people");
            populate_people(stakeholder.people);
        }
        else {
            $('#stakeholders_no_people').show();
        }
    }
    else {
        alert("No People in this Account, Looks Incomplete");
        $('#stakeholders_no_people').show();
    }

    $("#add_new_person_input").on("change keyup paste", function () {
        console.log($("#add_new_person_input").val().length);
        if ($("#add_new_person_input").val().length > 3) {
            console.log("change color");
            $("#add_people_button").css('background', '#3342AE');
            $("#add_people_button").css('color', '#ffffff');
            $("#add_people_button").css('background-color', '#3342AE');
        }
        else {
            $("#add_people_button").css('background-color', '#f0f0f0;');
            $("#add_people_button").css('background', '#f0f0f0');
            $("#add_people_button").css('color', '#888888');
        }
    })
}

function addperson() {
    if (stakeholder_id) {
        var type = "innovador";
        if ($("#add_new_person_input").val().length > 3) {
            window.location.href = "../../../../onboarding/?parent_id=" + stakeholder_id + "?stakeholder_type=" + type + "?name=" + $("#add_new_person_input").val();
        }
        else alert("Enter Valid Name");

    }
    else alert("Try Again, In a Minute");
}

function populate_people(people) 
{
    $("#stakeholders_people_list").show();
    
    for(i=0;i<people.length;i++)
    {
        console.log(people[i]);
        var li=
        '<li class="list-group-item d-flex justify-content-between lh-condensed">'+
            '<div>'+
                '<a class="my-0" style="cursor:pointer;" href="'+people[i].linkedIn+'"  onclick="openurl("'+people[i].linkedIn+'")">'+people[i].name+'</a><br>'+
                '<small class="text-muted">'+people[i].designation+'</small>'+
            '</div>'+
            '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("'+people[i].id+'")">Edit</span>'+
        '</li>';
        $("#stakeholders_people_list").append(li);
    }
}

function openurl(url)
{
    alert(url);
    window.location.href =url;
}

// Yuvraj Started here

$(document).ready(function(){ //Make script DOM ready
    $('#user_type_select').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="existing_user"){ //Compare it and if true
            $('#existing_user_modal').modal("show"); //Open Modal
            $.ajax({
                url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    data_innovadors = data;
                    console.log(data_innovadors)
                    display_data_innovadors(data_innovadors);
                }
              });
        }
    });
});

$(document).ready(function(){ //Make script DOM ready
    $('#check').click(function() { //jQuery Change Function
        opval = is_submission_valid()
        if(opval != ''){ 

            alert("Please fill the following :"+ opval)
        }
        else{
            $('#submit').attr("disabled", false) 
            alert("That works fine , you can now submit")
        }
    });
});

function is_submission_valid(){
    alert('working')
    var arr = []
    if(document.getElementById('cin').value == ''){
       arr.push("Cin");
    }
    if(document.getElementById('brand_name').value == ''){
        arr.push("Brand Name");
     }
    if(document.getElementById('website').value == ''){
        arr.push("Website");
     }
    if(document.getElementById('description').value == ''){
        arr.push("Description");
     }
    if(document.getElementById('pincode').value == ''){
        arr.push("Pincode");
     }
    if(document.getElementById('address').value == ''){
        arr.push("Address");
     }
    console.log(arr);
    return arr;
}

function display_data_innovadors(data_innovadors){
    var table = $("#populate_existing_people");
    table.empty();
    var itemshow = ['disabled', 'disabled', 'disabled', 'disabled'];
    for(i=0;i<data_innovadors.length;i++)
    {
        if(data_innovadors[i].stakeholder_type == "innovador")
        {
            console.log(data_innovadors[i]);
        
                table.append(
                    '<tr class="shadow">' +
                    "<td>" +
                    '<div class="company_logo_title_holder">' +
                    '<div class="wrapper">' +
                    '<img class= "image--cover" src="' + data_innovadors[i].logo + '">' +
                    '</div>' +
                    "</td>" +
                    "<td>" +
                    '<div class="company_title_holder">' + data_innovadors[i].designation + '</div>'
                     +"</td>" +
                     '<div>' +
                    "<td>" + data_innovadors[i].stakeholder_location + "</td>" +'</div>' +
                    '<td><Button class="btn btn-danger"> Add </Button></td>' +
                    '<td>' +
                    '</div>' +
                    '</td>' +
                    "</tr>");
            }
        }
}
