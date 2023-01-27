var stakeholder_id;
var data_innovadors;
var data_refference;
var temp_stakeholder;
var temp_refference;
var people_list_count = 0;
var count = 1;
var isEdit = false;

$('document').ready(function () {
  if (is_logged_in()) {
    $('#stakeholders_no_people').hide();
    var params = get_params_from_url();
    //alert("Reading Url");
    console.log(params);
    stakeholder_id = params.stakeholder_id;
    if (params.action == 'edit') {
      isEdit = true;
    } else if (params.action == 'complete') {
      isEdit = true;
    }

    get_stakeholders(
      'single_profile',
      { id: stakeholder_id },
      populate_profile
    );
  } else {
  }
});

$('document').ready(function () {
  if (is_logged_in()) {
    $('#stakeholders_no_refferences').hide();
    var params = get_params_from_url();
    //alert("Reading Url");
    console.log(params);
    stakeholder_id = params.stakeholder_id;
    if (params.action == 'edit') {
      isEdit = true;
    } else if (params.action == 'complete') {
      isEdit = true;
    }

    get_stakeholders(
      'single_profile',
      { id: stakeholder_id },
      populate_refferences
    );
  } else {
  }
});

function is_logged_in() {
  return true;
}

function detectMob() {
  return window.innerWidth <= 480;
}

function populate_profile(stakeholder) {
  if (isEdit) {
    $('#save').show();
    $('.add-people-card').show();
  } else {
    alert("Don't Allow to Edit");
    $('#save').hide();
    $('.add-people-card').hide();
    $('.basic-details .form-control').attr('readonly', 'readonly');
  }
  $('.status-indicator').text(stakeholder.status);

  temp_stakeholder = stakeholder;
  temp_refference = stakeholder;
  console.log('clientside', stakeholder);

  if (stakeholder.status == 'Profile Created') {
    $('#save').hide();
    $('#check').show();
    $('#submit').hide();
    $('.add-people-card').show();
  } else {
    $('#check').hide();
    $('#submit').hide();
  }

  $('#stakeholder_company_name_label').text(stakeholder.company_name);
  $('#stakeholder_company_logo').attr('src', stakeholder.logo);
  $('#company_logo').val(stakeholder.logo);

  if (stakeholder.description) {
    $('#stakeholder_company_description_label').text(stakeholder.description);
  }

  $('#company_name').text(stakeholder.company_name);
  $('#createdon_label').text('Created On: ' + stakeholder.created_on.showdate);
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
      people_list_count = 1;
    } else {
      $('#stakeholders_no_people').show();
    }
  } else {
    alert('No People in this Account, Looks Incomplete');
    $('#stakeholders_no_people').show();
  }

  //refference Check
  if (stakeholder.refferences) {
    alert('first if check');
    if (stakeholder.refferences.length > 0) {
      $('#stakeholders_no_refferences').hide();
      populate_refferences(stakeholder.refferences);
      refferences_list_count = 1;
    } else {
      $('#stakeholders_no_refferences').show();
    }
  } else {
    alert('No refferences in Account !!!');
    $('#stakeholders_no_refferences').show();
  }

  $('#add_new_person_input').on('change keyup paste', function () {
    console.log($('#add_new_person_input').val().length);
    if ($('#add_new_person_input').val().length > 3) {
      console.log('change color');
      $('#add_people_button').css('background', '#3342AE');
      $('#add_people_button').css('color', '#ffffff');
      $('#add_people_button').css('background-color', '#3342AE');
    } else {
      $('#add_people_button').css('background-color', '#f0f0f0;');
      $('#add_people_button').css('background', '#f0f0f0');
      $('#add_people_button').css('color', '#888888');
    }
  });
}

function addperson() {
  if (stakeholder_id) {
    var type = 'innovador';
    if ($('#add_new_person_input').val().length > 3) {
      window.location.href =
        '../../../../onboarding/?parent_id=' +
        stakeholder_id +
        '?stakeholder_type=' +
        type +
        '?name=' +
        $('#add_new_person_input').val();
    } else alert('Enter Valid Name');
  } else alert('Try Again, In a Minute');
}

function populate_people(people) {
  $('#stakeholders_people_list').show();

  for (i = 0; i < people.length; i++) {
    console.log(people[i]);
    var li =
      '<li class="list-group-item d-flex justify-content-between lh-condensed">' +
      '<div style="display:inline-flex";>' +
      '<div>' +
      '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
      people[i].logo +
      '"></img>' +
      '</div>' +
      '<div style="padding-left:10px;">' +
      '<a class="my-0" style="cursor:pointer;" href="' +
      people[i].linkedIn +
      '"  onclick="openurl("' +
      people[i].linkedIn +
      '")">' +
      people[i].name +
      '</a><br>' +
      '<small class="text-muted">' +
      people[i].designation +
      '</small>' +
      '</div>' +
      '</div>' +
      '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
      people[i].id +
      '")">Edit</span>' +
      '</li>';
    $('#stakeholders_people_list').append(li);
  }
}

//Populate refference div
function populate_refferences(refferences) {
  $('#stakeholders_refference_list').show();
  alert('populate refferences function called');
  for (i = 0; i < refferences.length; i++) {
    console.log(refferences[i]);
    if (refferences[i].stakeholder_type == 'innovador') {
      var li =
        '<li class="list-group-item d-flex justify-content-between lh-condensed">' +
        '<div style="display:inline-flex";>' +
        '<div>' +
        '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
        refferences[i].logo +
        '"></img>' +
        '</div>' +
        '<div style="padding-left:10px;">' +
        '<a class="my-0" style="cursor:pointer;" href="' +
        refferences[i].linkedIn +
        '"  onclick="openurl("' +
        refferences[i].linkedIn +
        '")">' +
        refferences[i].name +
        '</a><br>' +
        '<small class="text-muted">' +
        refferences[i].designation +
        '</small>' +
        '</div>' +
        '</div>' +
        '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
        refferences[i].id +
        '")">Edit</span>' +
        '</li>';
    } else if (
      refferences[i].stakeholder_type == 'startup' ||
      refferences[i].stakeholder_type == 'fund-vc-pe'
    ) {
      var li =
        '<li class="list-group-item d-flex justify-content-between lh-condensed">' +
        '<div style="display:inline-flex";>' +
        '<div>' +
        '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
        refferences[i].logo +
        '"></img>' +
        '</div>' +
        '<div style="padding-left:10px;">' +
        '<a class="my-0" style="cursor:pointer;" href="' +
        refferences[i].website +
        '"  onclick="openurl("' +
        refferences[i].website +
        '")">' +
        refferences[i].brand_name +
        '</a><br>' +
        '<small class="text-muted">' +
        refferences[i].company_name +
        '</small>' +
        '</div>' +
        '</div>' +
        '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
        refferences[i].id +
        '")">Edit</span>' +
        '</li>';
    }
    $('#stakeholders_refference_list').append(li);
  }
}

function openurl(url) {
  alert(url);
  window.location.href = url;
}

// Yuvraj Started here

$(document).ready(function () {
  //Make script DOM ready
  $('#user_type_select').change(function () {
    //jQuery Change Function
    var opval = $(this).val(); //Get value from select element
    if (opval == 'existing_user') {
      //Compare it and if true
      $('#existing_user_modal').modal('show'); //Open Modal
      $.ajax({
        url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
          data_innovadors = data;
          console.log(data_innovadors);
          display_data_innovadors(data_innovadors);
        },
      });
    }
  });
});

//refference type select

$(document).ready(function () {
  //Make script DOM ready
  $('#refference_type_select').change(function () {
    //jQuery Change Function
    alert('working');
    var opval = $(this).val(); //Get value from select element
    if (opval == 'existing_refference') {
      //Compare it and if true
      $('#existing_refference_modal').modal('show'); //Open Modal
      $.ajax({
        url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
          data_refference = data;
          console.log('reffer');
          console.log(data_refference);
          display_data_refference(data_refference);
        },
      });
    }
  });
});

$(document).ready(function () {
  //Make script DOM ready
  $('#check').click(function () {
    //jQuery Change Function
    opval = is_submission_valid();
    if (opval != '') {
      $('#submit').hide();
      alert('Please fill the following :' + opval);
    } else {
      $('#submit').show();
      $('#submit').attr('disabled', false);
      alert('That works fine , you can now submit');
    }
  });
});

function is_submission_valid() {
  alert("We're Checking the profile object if completed or not.");
  var arr = [];
  if (people_list_count == 0) {
    arr.push('Add People');
  }
  if (document.getElementById('cin').value == '') {
    arr.push('Cin');
  }
  if (document.getElementById('brand_name').value == '') {
    arr.push('Brand Name');
  }
  if (document.getElementById('website').value == '') {
    arr.push('Website');
  }
  if (document.getElementById('description').value == '') {
    arr.push('Description');
  }
  if (document.getElementById('pincode').value == '') {
    arr.push('Pincode');
  }
  if (document.getElementById('address').value == '') {
    arr.push('Address');
  }
  console.log(arr);
  return arr;
}
var data_innovadors_search_by_id = [];
function display_data_innovadors(data_innovadors) {
  var table = $('#populate_existing_people');
  table.empty();
  for (i = 0; i < data_innovadors.length; i++) {
    if (data_innovadors[i].stakeholder_type == 'innovador') {
      data_innovadors_search_by_id.push(data_innovadors[i]);

      console.log(data_innovadors[i]);

      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          data_innovadors[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          data_innovadors[i].name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          data_innovadors[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td><Button class="btn btn-primary" onclick="profile(\'' +
          data_innovadors[i].id +
          '\')"> Add </Button></td>' +
          '</tr>'
      );
    }
    $('#user_list_search_box').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#populate_existing_people tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }
}

//refference modal populate
var data_refference_search_by_id = [];
function display_data_refference(data_refference) {
  var table = $('#populate_existing_refference');
  alert('working populate');
  table.empty();
  for (i = 0; i < data_refference.length; i++) {
    if (data_refference[i].stakeholder_type == 'innovador') {
      data_refference_search_by_id.push(data_refference[i]);
      console.log(data_refference[i]);

      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          data_refference[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          data_refference[i].name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          data_refference[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td>' +
          '<Button class="btn btn-primary"' +
          ' onclick="refferences(\'' +
          data_refference[i].id +
          '\')">' +
          ' Add' +
          ' </Button>' +
          '</td>' +
          '</tr>'
      );
    } else if (
      data_refference[i].stakeholder_type == 'startup' ||
      data_refference[i].stakeholder_type == 'fund-vc-pe'
    ) {
      data_refference_search_by_id.push(data_refference[i]);
      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          data_refference[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          data_refference[i].brand_name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          data_refference[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td><Button class="btn btn-primary" onclick="refferences(\'' +
          data_refference[i].id +
          '\')"> Add </Button></td>' +
          '</tr>'
      );
    }
    $('#reference_list_search_box').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#populate_existing_refference tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }
}

function profile(id) {
  count = 1;

  if (window.location.href.indexOf('#populate_existing_people') != -1) {
    $('#populate_existing_people').modal('show');
  }
  console.log(data_innovadors_search_by_id);
  for (i = 0; i < data_innovadors_search_by_id.length; i++) {
    if (id == data_innovadors_search_by_id[i].id) {
      var temp = data_innovadors_search_by_id[i];
      console.log(temp);
    }
  }
  console.log(temp_stakeholder);
  if (temp_stakeholder.people) {
    for (i = 0; i < temp_stakeholder.people.length; i++) {
      console.log(temp_stakeholder.people[i].id);
      if (temp_stakeholder.people[i].id == temp.id) {
        count = 0;
        console.log(count);
        break;
      }
    }
  } else {
    temp_stakeholder.people = [];
  }
  if (count == 1) {
    count = 1;
    console.log(count);
    temp_stakeholder.people.push(temp);
    alert('Data Pushed');
    close_modal();
  } else {
    alert('User already Exists !!!');
    close_modal();
  }
  console.log(temp_stakeholder);
  url =
    'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder';
  $.ajax({
    url: url,
    type: 'POST',
    data: temp_stakeholder,
    dataType: 'json',
    success: function (data) {
      console.log(
        'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder',
        data
      );
      location.reload();
    },
    error: function (request, error) {
      $('#loader_modal').modal('hide');
      location.reload();
      alert('Request: ' + JSON.stringify(request));
    },
  });
}

//add refference
function refferences(id) {
  count = 1;
  alert('refferences called');
  if (window.location.href.indexOf('#populate_existing_refference') != -1) {
    $('#populate_existing_refference').modal('show');
  }
  console.log('refference list');
  console.log(data_refference_search_by_id);
  for (i = 0; i < data_refference_search_by_id.length; i++) {
    if (id == data_refference_search_by_id[i].id) {
      var temp = data_refference_search_by_id[i];
      console.log(temp);
    }
  }
  console.log(temp_refference);
  if (temp_refference.refferences) {
    for (i = 0; i < temp_refference.refferences.length; i++) {
      console.log(temp_refference.refferences[i].id);
      if (temp_refference.refferences[i].id == temp.id) {
        count = 0;
        console.log(count);
        break;
      }
    }
  } else {
    temp_refference.refferences = [];
  }
  if (count == 1) {
    count = 1;
    console.log(count);
    temp_refference.refferences.push(temp);
    alert('Data Pushed');
    close_modal();
  } else {
    alert('User already Exists !!!');
    close_modal();
  }
  console.log(temp_refference);
  url =
    'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder';
  $.ajax({
    url: url,
    type: 'POST',
    data: temp_refference,
    dataType: 'json',
    success: function (data) {
      console.log(
        'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder',
        data
      );
      location.reload();
    },
    error: function (request, error) {
      $('#loader_modal').modal('hide');
      location.reload();
      alert('Request: ' + JSON.stringify(request));
    },
  });
}

function addperson() {
  if (stakeholder_id) {
    var type = 'innovador';
    var action = 'addperson';
    if ($('#add_new_person_input').val().length > 3) {
      window.location.href =
        '../../../../onboarding/?parent_id=' +
        stakeholder_id +
        '?stakeholder_type=' +
        type +
        '?name=' +
        $('#add_new_person_input').val() +
        '?action=' +
        action;
    } else alert('Enter Valid Name');
  } else alert('Try Again, In a Minute');
}

function addrefferences() {
  if (stakeholder_id) {
    var type = 'innovador';
    var action = 'addrefferences';
    if ($('#add_new_reference_input').val().length > 3) {
      window.location.href =
        '../../../../onboarding/?parent_id=' +
        stakeholder_id +
        '?stakeholder_type=' +
        type +
        '?name=' +
        $('#add_new_person_input').val() +
        '?action=' +
        action;
    } else alert('Enter Valid Name');
  } else alert('Try Again, In a Minute');
}

function addExistingPerson(id, name, designation, linkedIn) {
  console.log(name);
  console.log(designation);
  console.log(id);
  console.log(linkedIn);
  console.log(linkedIn.name);

  var li =
    '<li class="list-group-item d-flex justify-content-between lh-condensed">' +
    '<div>' +
    '<a class="my-0" style="cursor:pointer;" href="' +
    linkedIn +
    '"  onclick="openurl("' +
    linkedIn +
    '")">' +
    name +
    '</a><br>' +
    '<small class="text-muted">' +
    designation +
    '</small>' +
    '</div>' +
    '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
    id +
    '")">Edit</span>' +
    '</li>';
  $('#stakeholders_people_list').append(li);
}

function close_modal() {
  $('#existing_user_modal').modal('hide');
}
function close_refference_modal() {
  $('#existing_refference_modal').modal('hide');
}

let complete_profile = {
  id: '',
  cin: '',

  description: '',
  brand_name: '',
  website: '',
  pincode: '',
  address: '',
  status: '',
};

let cin;
let description;
let pincode;
let address;
let brand_name;
let website;

function set_cin(event) {
  cin = event.target.value;
}

function set_description(event) {
  description = event.target.value;
}

function set_pincode(event) {
  pincode = event.target.value;
}

function set_address(event) {
  address = event.target.value;
}

function handle_object_profile() {
  complete_profile = {
    id: stakeholder_id,
    cin: cin,
    description: description,
    pincode: pincode,
    address: address,
    brand_name: document.getElementById('brand_name').value,
    website: document.getElementById('website').value,
    status: 'Profile Completed',
  };
  return complete_profile;
}

function submit_complete_profile() {
  var data_object = handle_object_profile();
  console.log(data_object);
  url =
    'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder';
  $.ajax({
    url: url,
    type: 'POST',
    data: data_object,
    dataType: 'json',
    success: function (data) {
      console.log(
        'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateStakeHolder',
        data
      );
      alert('updated data');
      alert('redirecting to another page !!!');

      location.replace('../../index.html');
    },
    error: function (request, error) {
      $('#loader_modal').modal('hide');
      location.reload();
      alert('Request: ' + JSON.stringify(request));
    },
  });
}
