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

// function get_url(file) {
//   if (file.type.match('image.*')) {
//     let formData = new FormData();
//     formData.append('file', file);
//     $('.custom-file-label').text('Uploading Image');
//     $.ajax({
//       url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
//       type: 'POST',
//       data: formData,
//       processData: false,
//       contentType: false,
//       success: function (data) {
//         console.log(data);
//         console.log('Data: ' + data);
//         $('.custom-file-label').text('Uploaded Successfully.');
//         $('.custom-file-label').css({ color: 'green' });
//         $('#submit_stakeholder').show();
//       },
//       error: function (request, error) {
//         alert('Request: ' + JSON.stringify(request));
//         $('.custom-file-label').text('Upload Logo to Proceed');
//         $('.custom-file-label').css({ color: 'maroon' });
//       },
//     });
//   } else {
//     alert('Not An Image');
//   }
// }

var stakeholder_id;
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
  console.log(arr);
  return arr;
}

/* function populate_existing_people(people) 
{
    $("#stakeholders_people_list").show();
    
    if(people.stakeholder_type == 'innovador' ){
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
    
} */

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

function handleMandate(event) {
  mandate_file = event.target.files;
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
  // docArray = [];
  // file_type = [];
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
}
