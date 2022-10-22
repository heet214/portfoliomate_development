//Heet Started here.

let engagement = {
  id: '',
  engagement_type: '',
  created_on: '',
  created_by: '',
};
let fundraiser = {
  ask: {
    currency_type: '',
    amount: 0,
  },
  expected_value: [{ currency_type: '', amount: 0, as_on: '' }],

  mandate: {
    engagement_id: '',
    status: '',
    description: '',
    files: [
      {
        type: '',
        url: '',
        file_type: '',
        created_on: '',
      },
    ],
  },
  fees: [
    {
      payment_mode: '',
      quantity: 0,
      quantity_unit: '',
      isConditional: true,
      comment: '',
    },
  ],
  // documents: [
  //   {
  //     type: '',
  //     url: '',
  //     file_type: '',
  //   },
  // ],
};

let fundraiser_form = document.getElementById('engagement_form-fundraiser');
let growth_form = document.getElementById('engagement_form-growth');
let engagement_buttons = document.getElementById('engagement_type_buttons');
let engagement_type = '';

let form_hidden = true;
function toggleGrowthForm() {
  if (form_hidden) {
    growth_form.style.display = 'none';
    fundraiser_form.style.display = 'block';
    engagement_type = 'fundraiser';
    return (form_hidden = false);
  }
  if (!form_hidden) {
    growth_form.style.display = 'none';
    fundraiser_form.style.display = 'none';
    engagement_type = '';
    return (form_hidden = true);
  }
}
function toggleFundraiserForm() {
  if (form_hidden) {
    growth_form.style.display = 'block';
    fundraiser_form.style.display = 'none';
    engagement_type = 'growth';
    return (form_hidden = false);
  }
  if (!form_hidden) {
    growth_form.style.display = 'none';
    fundraiser_form.style.display = 'none';
    engagement_type = '';
    return (form_hidden = true);
  }
}

let button_hidden = true;
function toggleEngagementButtons() {
  if (button_hidden) {
    button_hidden = false;
    return (engagement_buttons.style.display = 'block');
  }
  if (!button_hidden) {
    button_hidden = true;
    return (engagement_buttons.style.display = 'none');
  }
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

let mandate_url = [];
let mandate_file = [];
let mandate_type = [];
let mandate_description;
let mandate_status;
let mandate_status_value = document.getElementById('mandate_status');
let mandate_description_placeholder = document.getElementById(
  'mandate_description_input'
);
let closeMandateModal = document.getElementById('hanldeCloseMandateModal');
let mandate_file_placeholder = document.getElementById('mandateFileInput');

let other_files_close = document.getElementById('handleOtherFilesClose');
let file_placeholder = document.getElementById('otherFiles_file_input');
let text_placeholder = document.getElementById('otherFiles_input');

let fees_radio = document.getElementById('fees');
let equity_radio = document.getElementById('equity');
let fees_amount;
let fees_comments;
let payment_type;

// MANDATE KE FUNCTIONS

function handleMandate(event) {
  mandate_file.push(event.target.files[0]);
  console.log(mandate_file);

  mandate_type.push(event.target.files[0].type);
  console.log(mandate_type);
}

function handleMandateSave() {
  let file = mandate_file[0];
  console.log(file);
  let formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      mandate_url.push(Object.values(data)[0]);
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
  console.log(mandate_url);

  console.log('getting logged');
  var li = '<p>GOT the file</p>';

  $('#exisisting-mandate_files').append(li);

  mandate_status_value.checked = false;
  mandate_description_placeholder.value = '';
  mandate_file_placeholder.value = '';
  closeMandateModal.click();
}

function handleMandateDescription(event) {
  mandate_description = event.target.value;
}

function handlePaymentAmount(event) {
  fees_amount = event.target.value;
}
function handlePaymentDescription(event) {
  fees_comments = event.target.value;
}

// ADD OTHER FILES KE FUNCTIONS

function setDocumentType(event) {
  if (!file_type_option_list.includes(event.target.value)) {
    const new_option = document.createElement('option');
    const file_type_name = document.createTextNode(event.target.value);

    new_option.appendChild(file_type_name);

    data_list_options.appendChild(new_option);
  }
  file_type.push(event.target.value);
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
async function handleFilesSave() {
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
        urlsmthn.push(data['image']);
        console.log(data['image']);
      },
      error: function (request, error) {
        alert('Request: ' + JSON.stringify(request));
        $('.custom-file-label').text('Upload Logo to Proceed');
        $('.custom-file-label').css({ color: 'maroon' });
      },
    });
  }

  file_placeholder.value = '';
  text_placeholder.value = '';
  other_files_close.click();
}

function handleClose() {
  file_placeholder.value = '';
  text_placeholder.value = '';
}

// OBJECT HANDLING Functions

function handleObject() {
  let mandate_radios = document.getElementsByName('mandate_status');
  let mandate_selected = Array.from(mandate_radios).find(
    (radio) => radio.checked
  );
  mandate_status = mandate_selected.value;
  console.log(mandate_status);

  let payment_radios = document.getElementsByName('fees_type');
  let payment_selected = Array.from(payment_radios).find(
    (radio) => radio.checked
  );
  payment_type = payment_selected.value;
  console.log(payment_type);

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

  fundraiser.mandate.engagement_id = engagement.id;
  fundraiser.mandate.status = mandate_status;
  fundraiser.mandate.description = mandate_description;

  for (let i = 0; i < mandate_file.length; i++) {
    fundraiser.mandate.files[i] = {
      url: mandate_url[i],
      type: 'mandate',
      file_type: mandate_type[i],
      created_on: {
        day: moment().format('DD'),
        month: moment().format('MM'),
        year: moment().format('YYYY'),
        time: moment().format('hh:mm A'),
        datetime: moment().toISOString(),
        showdate: moment().format('DD MMM, YYYY hh:mm A'),
      },
    };
  }

  fundraiser.fees[0].payment_mode = payment_type;
  fundraiser.fees[0].quantity_unit =
    payment_type === 'fees' ? 'amount' : 'percentage';
  fundraiser.fees[0].quantity = fees_amount;
  fundraiser.fees[0].comment = fees_comments;
  fundraiser.ask.amount = ask.value;
  fundraiser.ask.currency_type = ask_curr.value;
  fundraiser.expected_value[0].currency_type = eval_curr.value;
  fundraiser.expected_value[0].amount = evaluation.value;
  fundraiser.expected_value[0].as_on = date_as_on.value;

  if (docArray.length > 0) {
    fundraiser.documents = [
      {
        type: '',
        url: '',
        file_type: '',
      },
    ];
    for (let i = 0; i < docArray.length; i++) {
      fundraiser.documents[i] = {
        type: docArray[i].type,
        file_type: file_type[i],
        url: urlsmthn[i],
      };
    }
  }
  //else {
  //   fundraiser.documents = null;
  // }

  console.log('Fundraiser: ', fundraiser);

  heetLearnsNew();
}

function heetLearnsNew() {
  engagement = {
    ...engagement,
    ...((engagement_type === 'fundraiser' && { fundraiser }) ||
      (engagement_type === 'growth' && { a: 'hi' })),
  };
  console.log('engagement heet learns', engagement);
  pushObjectEngagement(engagement);
}

function pushObjectEngagement(engagement) {
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
