var stakeholder_id;
var data_innovadors;
var temp_stakeholder;
var people_list_count = 0;
var count = 1;
$('document').ready(function () {
  if (is_logged_in()) {
    $('#stakeholders_no_people').hide();
    var url_string = location.href;
    var url = new URL(url_string);
    stakeholder_id = url.searchParams.get('action');
    //console.log(url.searchParams);
    //console.log(url);
    //alert(stakeholder_id);
    get_stakeholders(
      'single_profile',
      { id: stakeholder_id },
      populate_profile
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
  temp_stakeholder = stakeholder;
  console.log('clientside', stakeholder);
  console.log;
  if (stakeholder.status == 'Profile Created') {
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
      '<div>' +
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
      '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
      people[i].id +
      '")">Edit</span>' +
      '</li>';
    $('#stakeholders_people_list').append(li);
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

$(document).ready(function () {
  //Make script DOM ready
  $('#check').click(function () {
    //jQuery Change Function
    opval = is_submission_valid();
    if (opval != '') {
      alert('Please fill the following :' + opval);
    } else {
      $('#submit').attr('disabled', false);
      alert('That works fine , you can now submit');
    }
  });
});

function is_submission_valid() {
  alert('working');
  var arr = [];
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
  if (people_list_count == 0) {
    arr.push('Add People');
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
          data_innovadors[i].designation +
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
          '<td>' +
          '</div>' +
          '</td>' +
          '</tr>'
      );
    }
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

/* function submit_complete_profile() {
    var data = {};
    $("#complete_startup_details").serializeArray().map(function (x) { data[x.name] = x.value; });
    console.log(data);

} */

let complete_profile = {
  id: '',
  cin: '',
  description: '',
  pincode: '',
  address: '',
  status: '',
};

let cin;
let description;
let pincode;
let address;

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
    },
    error: function (request, error) {
      $('#loader_modal').modal('hide');
      location.reload();
      alert('Request: ' + JSON.stringify(request));
    },
  });
}

//Heet Started here.

const engagement = {
  id: '',
  engagement_type: '',
  created_on: '',
  created_by: '',
  mandate: {
    type: '',
    url: '',
    file_type: '',
  },
};
const fundraiser = {
  ask: {
    currency_type: '',
    amount: 0,
  },
  expected_value: [{ currency_type: '', amount: '', as_on: '' }],

  documents: [
    {
      type: '',
      url: '',
      file_type: '',
      //  pdf , excel , doc
      //pitchdeck: '',
      //  pdf , ppt , url
    },
  ],
};

const fundraiser_form = document.getElementById('engagement_form-fundraiser');
const growth_form = document.getElementById('engagement_form-growth');

let engagement_type = 'fundraiser';

function toggleGrowthForm() {
  growth_form.style.display = 'none';
  fundraiser_form.style.display = 'block';
  engagement_type = 'fundraiser';
}
function toggleFundraiserForm() {
  growth_form.style.display = 'block';
  fundraiser_form.style.display = 'none';
  engagement_type = 'growth';
}

// function handleFiles() {}

// let docArr = [];
// let doc = document.getElementsByClassName('other-file-input');
// function handleFiles(event) {
//   console.log(event.target.files);
//   let fileList = [...event.target.files];
//   docArr.push(...fileList);
//   console.log('Document Array: ', docArr);
//   fileList.forEach((file) => {
//     const para = document.createElement('ul');
//     const close = document.createElement('p');
//     const name = document.createTextNode(file.name);
//     const close_name = document.createTextNode('x');

//     para.appendChild(name);
//     close.appendChild(close_name);
//     close.addEventListener('click', (event) => {
//       console.log('close', event);
//       fileList.pop();
//       console.log(fileList);
//     });
//     const element = document.getElementById('file-name');

//     para.appendChild(close);
//     para.classList.add('singleFile-line');
//     element.appendChild(para);
//     console.log('File Name: ', file.name);
//   });
// }
let ask = document.getElementById('ask_evaluation');
let evaluation = document.getElementById('expected_evaluation');
let date = document.getElementById('date_as_on');
let ask_curr = document.getElementById('ask_currency');
let eval_curr = document.getElementById('evaluation_currency');
let date_as_on = document.getElementById('date_as_on');
let data_list_options = document.getElementById('datalistOptions');
let file_type = [];
let file_type_option_list = ['file 1', 'file 2', 'pitch deck'];
let docArray = [];
let urlsmthn = [];
let mandate_file;
let file_placeholder = document.getElementById('inputGroupFile04');
let text_placeholder = document.getElementById('exampleDataList');
let mandate_type = '';

function setDocumentType(event) {
  if (!file_type_option_list.includes(event.target.value)) {
    const new_option = document.createElement('option');
    const file_type_name = document.createTextNode(event.target.value);

    new_option.appendChild(file_type_name);

    data_list_options.appendChild(new_option);
  }
  file_type.push(event.target.value);
}
let mandate_url = [];
function handleMandate(event) {
  mandate_file = event.target.files[0];
  console.log(mandate_file);
  let file = mandate_file;
  let formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      mandate_url.push(data);
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
  console.log(mandate_url);
  mandate_type = event.target.files[0].type;
}

function handleFileChange(event) {
  docArray.push(...event.target.files);
}

function handleAddButton() {
  console.log('file type', file_type);
  console.log('Files', docArray);

  file_placeholder.value = '';
  text_placeholder.value = '';
}
function handleModalOpen() {
  docArray = [];
  file_type = [];
}
async function handleSave() {
  for (i = 0; i < docArray.length; i++) {
    // urlsmthn[i] = get_url(docArray[i]);
    var file = docArray[i];
    let formData = new FormData();
    formData.append('file', file);

    await $.ajax({
      url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        urlsmthn.push(data);
      },
      error: function (request, error) {
        alert('Request: ' + JSON.stringify(request));
        $('.custom-file-label').text('Upload Logo to Proceed');
        $('.custom-file-label').css({ color: 'maroon' });
      },
    });
  }
}

function handleClose() {
  file_placeholder.value = '';
  text_placeholder.value = '';
}
function handleObject() {
  engagement.id = moment().format('YYYY|MMM|DD,HH:mm A');
  engagement.engagement_type = engagement_type;
  engagement.created_on = {
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    time: moment().format('hh:mm A'),
    datetime: moment().toISOString(),
    showdate: moment().format('DD MMM, YYYY hh:mm A'),
  };
  for (let i = 0; i < mandate_url.length; i++) {
    engagement.mandate.url = mandate_url[i];
  }
  engagement.mandate.type = 'mandate';
  engagement.mandate.file_type = mandate_type;
  console.log('Engagement: ', engagement);

  fundraiser.ask.amount = ask.value;
  fundraiser.ask.currency_type = ask_curr.value;
  fundraiser.expected_value[0].currency_type = eval_curr.value;
  fundraiser.expected_value[0].amount = evaluation.value;
  fundraiser.expected_value[0].as_on = date_as_on.value;

  for (let i = 0; i < docArray.length; i++) {
    fundraiser.documents[i] = {
      type: docArray[i].type,
      file_type: file_type[i],
      url: urlsmthn[i],
    };
  }
  console.log('Fundraiser: ', fundraiser);

  handleHeet();
}

function handleHeet() {
  var data_object = engagement;

  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/startEngagement',
    type: 'POST',
    data: data_object,
    dataType: 'json',
    success: function (data) {
      console.log(data);
      getObject(data);
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
}

function getObject(data) {
  console.log('i got this id', data.id);
}
