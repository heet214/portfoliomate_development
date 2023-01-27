//Heet Started here.
function get_params_from_url() {
  console.log(decodeURI(url));
  var url_string = location.href;
  var url = new URL(url_string);
  var stakeholder_id = url.searchParams.get('stakeholder_type');
  var params = url.search.split('?');
  var tempparams = params.filter(function (el) {
    return el != '';
  });
  params = {};
  for (i = 0; i < tempparams.length; i++) {
    var key = tempparams[i].split('=')[0];
    var value = tempparams[i].split('=')[1].replace('%20', ' ');
    var paramobject = {};
    params[key] = value;
  }
  console.log(params);
  return params;
}
const id = get_params_from_url();

let engagement = {
  id: '',
  engagement_type: '',
  created_on: '',
  //created_by: '',
  stakeholder_id: id.stakeholder_id,
};
let fundraiser = {
  ask: {
    currency_type: '',
    amount: 0,
  },
  expected_value: [{ currency_type: '', amount: 0, as_on: '' }],

  mandate: [
    //engagement_id: '',

    {
      status: '',
      description: '',
      type: '',
      url: '',
      file_type: '',
      created_on: '',
    },
  ],
  fees: [
    {
      payment_mode: '',
      quantity: 0,
      quantity_unit: '',
      isConditional: true,
      comment: '',
    },
  ],
  // sub_engagements: [
  //   {
  //     parent_id: '',
  //     sub_engagement_id: '',
  //     engagement_from: [
  //       {
  //         company_logo: '',
  //         company_name: '',
  //         company_id: '',
  //       },
  //     ],
  //     engagement_to: [{ company_logo: '', company_name: '', company_id: '' }],
  //     status: [{ type: '', description: '', timestamp: '' }],
  //     created_on: '',
  //   },
  // ],
  // documents: [
  //   {
  //     type: '',
  //     url: '',
  //     file_type: '',
  //   },
  // ],
};
let mandate_container = document.getElementById('mandate_container');
let document_container = document.getElementById('document_container');
let investor_list = document.getElementById('investor_list');
let exclusion_list = document.getElementById('exclusion_list');

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
function handleCloseEngagementType() {
  $('#populate_engagements-form').show();
  $('#engagement_form-fundraiser').hide();
  return (engagement_buttons.style.display = 'none');
}
let button_hidden = true;
function toggleEngagementButtons() {
  $('#populate_engagements-form').hide();

  if (button_hidden) {
    button_hidden = false;
    return (engagement_buttons.style.display = 'block');
  }
  if (!button_hidden) {
    button_hidden = true;
    $('#populate_engagements-form').show();
    $('#engagement_form-fundraiser').hide();

    return (engagement_buttons.style.display = 'none');
  }
}

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
let mandate_name = [];
let mandate_type = [];
let mandate_description;
let mandate_status = [];
let mandate_status_value = document.getElementById('mandate_status');
let mandate_description_placeholder = document.getElementById(
  'mandate_description_input'
);
let mandate_description_placeholder_disabled = document.getElementById(
  'mandate_description_input_disabled'
);
let closeMandateModal = document.getElementById('hanldeCloseMandateModal');
let closeMandateModal_disabled = document.getElementById(
  'hanldeCloseMandateModal_disabled'
);
let mandate_file_placeholder = document.getElementById('mandateFileInput');
let mandate_file_placeholder_disabled = document.getElementById(
  'mandateFileInput_disabled'
);
let getMandateSelectedValue;

let other_files_close = document.getElementById('handleOtherFilesClose');
let other_files_close_update = document.getElementById(
  'handleOtherFilesClose_udpate'
);
let file_placeholder = document.getElementById('otherFiles_file_input');
let file_placeholder_update = document.getElementById(
  'otherFiles_file_input_udpate'
);
let text_placeholder = document.getElementById('otherFiles_input');
let text_placeholder_update = document.getElementById(
  'otherFiles_input_update'
);

let fees_radio = document.getElementById('fees');
let equity_radio = document.getElementById('equity');
let fees_amount;
let fees_comments;
let payment_type;
let all_engagements;

$('document').ready(function () {
  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getAllEngagements',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      all_engagements = data;
      console.log('ALL ENGAGEMENTS LOADED');
      populateEngagement(all_engagements);
    },
  });
});

let current_company;
$('document').ready(function () {
  let file = id.stakeholder_id;
  console.log('YEH HAI MERE COMPANY KA ID', file);
  let formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      current_company = data.find((company) => {
        if (company.id === id.stakeholder_id) {
          return company;
        }
      });
      console.log('COMPANY MIL GAYI BHAI', current_company);

      //populate
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
});

// MANDATE KE FUNCTIONS

function handleMandate(event) {
  mandate_file.push(event.target.files[0]);
  console.log(mandate_file);

  mandate_type.push(event.target.files[0].type);
  console.log(mandate_type);

  mandate_name.push(event.target.files[0].name);
  console.log(mandate_name);
}
function handleMandateDescription(event) {
  mandate_description = event.target.value;
}

function handleMandateSave() {
  getMandateSelectedValue = document.querySelector(
    'input[name="mandate_status"]:checked'
  );
  mandate_status.push(getMandateSelectedValue.value);
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
      mandate_url.push(data['image']);
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
  console.log(mandate_url);

  console.log('getting logged');
  let updated_file =
    '<tr style="width: 100%;display:flex; justify-content: space-between;" class="mandate-card mb-4" >' +
    '<td class="mandate-td td-img">' +
    '<div class="mandate-img">' +
    '<div class="wrapper">' +
    '<img class= "image--cover" src="' +
    file_icon(mandate_type[mandate_type.length - 1]) +
    '">' +
    '</div>' +
    '</td>' +
    '<td style="width:250px;" class="mandate-td">' +
    '<div style="padding-left:10px;">' +
    '<a class="my-0" style="cursor:pointer;" href="' +
    mandate_url[mandate_url.length - 1] +
    '"  onclick="openurl("' +
    mandate_url[mandate_url.length - 1] +
    '")">' +
    mandate_name[mandate_name.length - 1] +
    '</a><br>' +
    // '<div class="text-muted" style="font-size:0.7rem;line-height:normal">' +
    // target[i].created_on.showdate +
    // '</div>' +
    '</div>' +
    '</td>' +
    '<div>' +
    '<td class="mandate-td">' +
    mandate_status[mandate_status.length - 1] +
    '</td>' +
    '</div>' +
    '</div>' +
    '</td>' +
    '</tr>';

  // $('#exisisting-mandate_files').append(li);
  $('#exisisting-mandate_files').append(updated_file);

  getMandateSelectedValue.checked = false;
  mandate_description_placeholder.value = '';

  mandate_file_placeholder.value = '';

  closeMandateModal.click();
}

// Payment ke functions

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
async function handleFileSave() {
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

    let updated_file =
      '<tr style="width: 100%;display:flex; justify-content: space-between;" class="mandate-card mb-4"  >' +
      '<td class="mandate-td td-img">' +
      '<div class="mandate-img">' +
      '<div class="wrapper">' +
      '<img class= "image--cover" src="' +
      file_icon(docArray[i].type) +
      '">' +
      '</div>' +
      '</td>' +
      '<td style="width:250px;" class="mandate-td">' +
      '<div style="padding-left:10px;">' +
      '<a class="my-0" style="cursor:pointer;" href="' +
      urlsmthn[i] +
      '"  onclick="openurl("' +
      urlsmthn[i] +
      '")">' +
      file_type[i] +
      '</a><br>' +
      // '<div class="text-muted" style="font-size:0.7rem;line-height:normal">' +
      // target[i].created_on.showdate +
      // '</div>' +
      '</div>' +
      '</td>' +
      '<div>' +
      '</div>' +
      '</div>' +
      '</td>' +
      '</tr>';

    $('#existing_document_files').append(updated_file);
  }

  file_placeholder.value = '';
  text_placeholder.value = '';
  other_files_close.click();
}

function handleClose() {
  file_placeholder.value = '';
  text_placeholder.value = '';
}

// Investors ke functions
function handleInvestorButton() {}

// OBJECT HANDLING Functions

function handleObject() {
  mandate_status = getMandateSelectedValue.value;
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

  if (fundraiser.mandate) {
    for (let i = 0; i < mandate_file.length; i++) {
      fundraiser.mandate[i] = {
        engagement_id: engagement.id,
        description: mandate_description,
        status: mandate_status,
        url: mandate_url[i],
        type: 'mandate',
        file_type: mandate_type[i],
        file_name: mandate_name[i],
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
  } else {
    fundraiser.mandate = [];
    for (let i = 0; i < mandate_file.length; i++) {
      fundraiser.mandate[i] = {
        engagement_id: engagement.id,
        description: mandate_description,
        status: mandate_status,
        url: mandate_url[i],
        type: 'mandate',
        file_type: mandate_type[i],
        file_name: mandate_name[i],
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
  }

  // for (let i = 0; i < mandate_file.length; i++) {
  //   fundraiser.mandate[i] = {
  //     engagement_id: engagement.id,
  //     description: mandate_description,
  //     status: mandate_status,
  //     url: mandate_url[i],
  //     type: 'mandate',
  //     file_type: mandate_type[i],
  //     created_on: {
  //       day: moment().format('DD'),
  //       month: moment().format('MM'),
  //       year: moment().format('YYYY'),
  //       time: moment().format('hh:mm A'),
  //       datetime: moment().toISOString(),
  //       showdate: moment().format('DD MMM, YYYY hh:mm A'),
  //     },
  //   };
  // }

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
        created_on: '',
      },
    ];
    for (let i = 0; i < docArray.length; i++) {
      fundraiser.documents[i] = {
        type: docArray[i].type,
        file_type: file_type[i],
        url: urlsmthn[i],
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
  }
  //else {
  //   fundraiser.documents = null;
  // }

  console.log('Fundraiser: ', fundraiser);

  pushIntoExistingObject();
}

function pushIntoExistingObject() {
  engagement = {
    ...engagement,
    ...((engagement_type === 'fundraiser' && { fundraiser }) ||
      (engagement_type === 'growth' && { a: 'hi' })),
  };
  console.log('engagement Object', engagement);
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
      location.reload();
      alert('reloading');
      console.log(data);
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
}

let filtered_engagements;
function populateEngagement(data) {
  console.log('These are all engagements ', data);
  filtered_engagements = data.filter((element) => {
    if (element.stakeholder_id === id.stakeholder_id) {
      return element;
    }
  });
  console.log('Yeh hai mere companies ke engagements', filtered_engagements);

  var table = $('#populate_exsisting_engagements');
  table.empty();
  for (i = 0; i < filtered_engagements.length; i++) {
    table.append(
      // '<tr class="shadow mb-3">' +
      //   '<div class="wrapper">' +
      //   '<td>' +
      //   '<div class="company_title_holder">' +
      //   filtered_engagements[i].id +
      //   '</div>' +
      //   '</td>' +
      //   '<div>' +
      //   '<td>' +
      //   filtered_engagements[i].stakeholder_id +
      //   '</td>' +
      //   '</div>' +
      //   '</div>' +
      //   '</tr>'

      '<tr class="mb-100 p-2" style="cursor:pointer;padding:2rem" onclick="handleSingleEngagement(\'' +
        filtered_engagements[i].id +
        '\')">' +
        '<div class="wrapper">' +
        '<td style="padding:1.5rem">' +
        '<div class="company_title_holder">' +
        filtered_engagements[i].id +
        '</div>' +
        '</td>' +
        '<td style="padding:1.5rem">' +
        filtered_engagements[i].stakeholder_id +
        '</td>' +
        '<td style="padding:1.5rem">' +
        '<span id="ask_currency">' +
        handleCurrency(filtered_engagements[i].fundraiser.ask.currency_type) +
        '</span>' +
        '<span style="margin-left:0.5rem" id="ask_amount">' +
        numberWithCommas(filtered_engagements[i].fundraiser.ask.amount) +
        '</span>' +
        '</td>' +
        '</div>' +
        '</tr>'
    );
  }
}

let single_engagement_object;

function handleSingleEngagement(selected_engagement_id) {
  //console.log('Engagement mil gaya', engagement);
  console.log('something id mil gaya bhai', selected_engagement_id);

  single_engagement_object = filtered_engagements.find((obj) => {
    if (obj.id === selected_engagement_id) {
      return obj;
    }
  });

  console.log('me hu wo engagement object', single_engagement_object);
  $('#populate_engagements-form').attr('style', 'display:none');
  $('#engagement_form-group').attr('style', 'display:none');
  $('#create_engagement-form').attr('style', 'display:none');
  $('#engagement_type_buttons').attr('style', 'display:none');

  $('#single_engagement_page-container').attr('style', 'display:block');

  $('#single_engagement_ask_currency').text(
    `${handleCurrency(single_engagement_object.fundraiser.ask.currency_type)}`
  );
  $('#single_engagement_ask_amount').text(
    `${numberWithCommas(single_engagement_object.fundraiser.ask.amount)}`
  );

  $('#single_engagement_fees_amount').text(
    `${numberWithCommas(
      single_engagement_object.fundraiser.fees[
        single_engagement_object.fundraiser.fees.length - 1
      ].quantity
    )}`
  );

  $('#single_engagement_fees_type').text(
    `${handleCurrency(
      single_engagement_object.fundraiser.fees[
        single_engagement_object.fundraiser.fees.length - 1
      ].quantity_unit
    )}`
  );
  $('#single_engagement_fees_method').text(
    single_engagement_object.fundraiser.fees[
      single_engagement_object.fundraiser.fees.length - 1
    ].payment_mode
  );

  $('#single_engagement_fees_comment').text(
    single_engagement_object.fundraiser.fees[
      single_engagement_object.fundraiser.fees.length - 1
    ].comment
  );

  $('#modal_valuation_amount').text(
    `${numberWithCommas(
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].amount
    )}`
  );
  $('#modal_valuation_date').text(
    single_engagement_object.fundraiser.expected_value[
      single_engagement_object.fundraiser.expected_value.length - 1
    ].as_on
  );

  $('#single_engagement_valuation_amount').text(
    `${numberWithCommas(
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].amount
    )}`
  );

  $('#single_engagement_valuation_amount_currency').text(
    `${handleCurrency(
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].currency_type
    )}`
  );

  $('#single_engagement_valuation_date').text(
    `${single_engagement_object.fundraiser.expected_value[
      single_engagement_object.fundraiser.expected_value.length - 1
    ].as_on
      .split('-')
      .reverse()
      .join('-')}`
  );

  // $(
  //   `#ask_currency-disabled option[value=${single_engagement_object.fundraiser.ask.currency_type}]`
  // ).attr('selected', 'selected');

  // $('#expected_evaluation-disabled').val(
  //   `${
  //     single_engagement_object.fundraiser.expected_value[
  //       single_engagement_object.fundraiser.expected_value.length - 1
  //     ].amount
  //   }`
  // );
  // $(
  //   `#evaluation_currency-disabled option[value=${
  //     single_engagement_object.fundraiser.expected_value[
  //       single_engagement_object.fundraiser.expected_value.length - 1
  //     ].currency_type
  //   }]`
  // ).attr('selected', 'selected');

  // // $('#date_as_on-disabled').value(
  // //   single_engagement_object.fundraiser.expected_value[
  // //     single_engagement_object.fundraiser.expected_value.length - 1
  // //   ].as_on
  // // );

  // $('input[type=radio][name=fees_type]').val([
  //   single_engagement_object.fundraiser.fees[
  //     single_engagement_object.fundraiser.fees.length - 1
  //   ].payment_mode,
  // ]);

  // $('#fees_amount-disabled').val(
  //   single_engagement_object.fundraiser.fees[
  //     single_engagement_object.fundraiser.fees.length - 1
  //   ].quantity
  // );

  // $('#fees_comments-disabled').val(
  //   single_engagement_object.fundraiser.fees[
  //     single_engagement_object.fundraiser.fees.length - 1
  //   ].comment
  // );

  // var form = document.getElementById(
  //   'single_engagement_form-fundraiser-disabled'
  // );
  // var elements = form.elements;
  // for (var i = 0, len = elements.length; i < len; ++i) {
  //   elements[i].disabled = true;
  // }

  populate_Mandate(single_engagement_object);
  populate_Files(single_engagement_object);
  populate_exclusion_list(single_engagement_object);
  populate_Investor(single_engagement_object);
}

function handleSingleEngagementClose() {
  $(
    `#ask_currency-disabled option[value=${single_engagement_object.fundraiser.ask.currency_type}]`
  ).attr('selected', null);
  $(
    `#evaluation_currency-disabled option[value=${
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].currency_type
    }]`
  ).attr('selected', null);

  $('#populate_engagements-form').attr('style', 'display:show');
  $('#engagement_form-group').attr('style', 'display:show');
  $('#create_engagement-form').attr('style', 'display:show');
  //$('#engagement_type_buttons').attr('style', 'display:show');

  $('#single_engagement_page-container').attr('style', 'display:none');
  exlcude_investor_array = [];
  temp_sub_engagement = {};
}

function investor_Modal() {
  alert('function called');
  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      console.log('investor');
      console.log(data);
      populate_Investor_modal(data);
    },
  });
}

let investorsToShow;
function populate_Investor_modal(data) {
  var table = $('#populate_investor_modal');
  alert('working populate');
  table.empty();
  if (single_engagement_object.fundraiser.sub_engagements) {
    var addedCompanies =
      single_engagement_object.fundraiser.sub_engagements.filter((company) => {
        if (company.company_to.isInvestorAdded) {
          return company;
        }
      });
    console.log('ADDED COMAPNIES HU ME', addedCompanies);
    var newCompanies = addedCompanies.map((company) => {
      return company.company_to.to_id;
    });

    console.log(newCompanies, 'ME HU ADDED COMPANIES ');

    var newData = data.filter((company) => {
      if (!newCompanies.includes(company.id)) {
        return company;
      }
    });

    console.log(newData, 'MERE ME ADDED COMPANUES NAHI HIA');

    investorsToShow = newData;
  } else {
    investorsToShow = data;
  }

  for (i = 0; i < investorsToShow.length; i++) {
    if (investorsToShow[i].stakeholder_type == 'innovador') {
      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          investorsToShow[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          investorsToShow[i].name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          investorsToShow[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td><Button class="btn btn-primary" id="' +
          i +
          '" onclick="createSubEngagement(\'' +
          i +
          "','" +
          investorsToShow[i].id +
          "','" +
          investorsToShow[i].name +
          "','" +
          investorsToShow[i].logo +
          "','" +
          investorsToShow[i].linkedIn +
          "','" +
          investorsToShow[i].designation +
          '\')"><span>Add</span>  </Button></td>' +
          '</tr>'
      );
    } else if (
      investorsToShow[i].stakeholder_type == 'startup' ||
      investorsToShow[i].stakeholder_type == 'fund-vc-pe'
    ) {
      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          investorsToShow[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          investorsToShow[i].brand_name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          investorsToShow[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td><Button class="btn btn-primary" id="' +
          i +
          '" onclick="createSubEngagement(\'' +
          i +
          "','" +
          investorsToShow[i].id +
          "','" +
          investorsToShow[i].brand_name +
          "','" +
          investorsToShow[i].logo +
          "','" +
          investorsToShow[i].website +
          "','" +
          investorsToShow[i].company_name +
          '\')"> <span>Add</span>  </Button></td>' +
          '</tr>'
      );
    }
    $('#investor_list_search_box').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#populate_investor_modal tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });

    $(`#${i}`).click(function () {
      $(`#${i}`).remove();
    });
  }
}

function exclusion_investor_Modal() {
  alert('exclusion function called');
  $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/getStakeHolders',
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      console.log('investor');
      console.log('Exclusion', data);
      populate_exclusion_investor_modal(data);
    },
  });
}

function populate_exclusion_investor_modal(data) {
  var table = $('#populate_Exclusion_investor_modal');
  alert('excluion working populate');
  table.empty();
  for (i = 0; i < data.length; i++) {
    if (data[i].stakeholder_type == 'innovador') {
      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          data[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          data[i].name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          data[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td><Button class="btn btn-primary" id="' +
          i +
          '"onclick="excludeInvestor(\'' +
          i +
          "','" +
          data[i].id +
          "','" +
          data[i].name +
          "','" +
          data[i].logo +
          "','" +
          data[i].linkedIn +
          "','" +
          data[i].designation +
          '\')"> <span>Add</span>  </Button></td>' +
          '</tr>'
      );
    } else if (
      data[i].stakeholder_type == 'startup' ||
      data[i].stakeholder_type == 'fund-vc-pe'
    ) {
      table.append(
        '<tr class="shadow">' +
          '<td>' +
          '<div class="company_logo_title_holder">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          data[i].logo +
          '">' +
          '</div>' +
          '</td>' +
          '<td>' +
          '<div class="company_title_holder">' +
          data[i].brand_name +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td>' +
          data[i].stakeholder_location +
          '</td>' +
          '</div>' +
          '<td><Button class="btn btn-primary" id="' +
          i +
          '"onclick="excludeInvestor(\'' +
          i +
          "','" +
          data[i].id +
          "','" +
          data[i].brand_name +
          "','" +
          data[i].logo +
          "','" +
          data[i].website +
          "','" +
          data[i].company_name +
          '\')"><span>Add</span> </Button></td>' +
          '<td>' +
          '</div>' +
          '</td>' +
          '</tr>'
      );
    }
    $('#exclusion_list_search_box').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#populate_Exclusion_investor_modal tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }
}

let temp_exclude_investor;

function excludeInvestor(i, id, name, logo, link, subtext) {
  console.log('ME I HU EXCLUSION KA ', i);
  ival = document.getElementById(i).disabled = true;
  ival = document.getElementById(i).innerHTML = 'Added';
  console.log('Exclude vala :', id, name, logo, link, subtext);
  exlcude_investor_array.push(name);
  let temp_exclude_investor = {
    id: id,
    name: name,
    logo: logo,
    link: link,
    subtext: subtext,
  };

  if (single_engagement_object.fundraiser.excluded_investor) {
    single_engagement_object.fundraiser.excluded_investor.push(
      temp_exclude_investor
    );
  } else {
    single_engagement_object.fundraiser.excluded_investor = [];
    single_engagement_object.fundraiser.excluded_investor.push(
      temp_exclude_investor
    );
  }

  console.log(single_engagement_object);
}

let company_to = [];
let company_from = [];
let status = [];
let parent_id;
let sub_engagement_id;
let created_on;
let temp_sub_engagement;
let isInvestorAdded = false;

function createSubEngagement(i, id, name, logo, link, subtext) {
  console.log('ME I HU INVESTOR KA ', i);
  ival = document.getElementById(i).disabled = true;
  ival = document.getElementById(i).innerHTML = 'Added';

  console.log(ival, 'IVALL HERE');
  console.log(
    'exlcude_investor_array ALERT ALERT ALERT',
    exlcude_investor_array
  );
  console.log('YEH JUST ADDED COMAPANY KA NAAM HAI', name);

  if (exlcude_investor_array.includes(name)) {
    alert('investor exists in excluded list');
  }
  if (!exlcude_investor_array.includes(name)) {
    created_on = {
      day: moment().format('DD'),
      month: moment().format('MM'),
      year: moment().format('YYYY'),
      time: moment().format('hh:mm A'),
      datetime: moment().toISOString(),
      showdate: moment().format('DD MMM, YYYY hh:mm A'),
    };

    console.log('sub engagement vala console', name, logo);

    temp_sub_engagement = {
      parent_id: single_engagement_object.id,
      created_on: created_on,
      sub_engagement_id: moment().format('YYYY|MMM|DD,HH:m  m A'),
      company_from: {
        from_id: current_company.id,
        from_name: current_company.company_name,
        from_logo: current_company.logo,
        from_link: current_company.website,
      },
      company_to: {
        to_id: id,
        to_name: name,
        to_logo: logo,
        to_link: link,
        to_subtext: subtext,
        isInvestorAdded: true,
      },

      status: [{ type: 'Approached', description: '', timestamp: created_on }],
    };

    console.log(temp_sub_engagement, '<E HU TEMP SUB ENG ');
    if (single_engagement_object.fundraiser.sub_engagements) {
      single_engagement_object.fundraiser.sub_engagements.push(
        temp_sub_engagement
      );
    } else {
      single_engagement_object.fundraiser.sub_engagements = [];
      single_engagement_object.fundraiser.sub_engagements.push(
        temp_sub_engagement
      );
    }
  }
}

function toggleExistingInvestor() {
  exclusion_list.style.display = 'none';
  investor_list.style.display = 'block';
}
function toggleExclusionList() {
  exclusion_list.style.display = 'block';
  investor_list.style.display = 'none';
}

function toggleMandate() {
  mandate_container.style.display = 'none';
  document_container.style.display = 'block';
}
function toggleDocuments() {
  mandate_container.style.display = 'block';
  document_container.style.display = 'none';
}
// mrunal
function toggleMandateCreateEng() {
  // mandate_container.style.display = 'none';
  document.getElementById('mandate-container-create-eng').style.display =
    'none';
  document.getElementById('document_container-create-eng').style.display =
    'block';
  // ('.mandate-container-create-eng').hide();
  // ('.document_container-create-eng').show();
  // document_container.style.display = 'block';
}
function toggleDocumentsCreateEng() {
  document.getElementById('mandate-container-create-eng').style.display =
    'block';
  document.getElementById('document_container-create-eng').style.display =
    'none';
  // mandate_container.style.display = 'block';
  // document_container.style.display = 'none';
}
// UPDATE VALUATION
let expected_value_update;
let evaluation_update_amount;
let evaluation_update_date;
function handleEvaluationAmountUpdate(event) {
  evaluation_update_amount = event.target.value;
}
function handleEvaluationDateUpdate(event) {
  evaluation_update_date = event.target.value;
}

function handleUpdateEvaluation() {
  var updated_valuation_currency = $('#valuation_currency_update_modal')
    .find(':selected')
    .val();

  console.log(updated_valuation_currency);

  if (single_engagement_object.fundraiser.expected_value) {
    expected_value_update = {
      amount: evaluation_update_amount,
      as_on: evaluation_update_date,
      currency_type: updated_valuation_currency,
    };
  } else {
    expected_value_update = [];

    expected_value_update = {
      amount: evaluation_update_amount,
      as_on: evaluation_update_date,
      currency_type: updated_valuation_currency,
    };
  }
  console.log(expected_value_update);

  if (single_engagement_object.fundraiser.expected_value) {
    single_engagement_object.fundraiser.expected_value.push(
      expected_value_update
    );
  } else {
    single_engagement_object.fundraiser.expected_value.push(
      expected_value_update
    );
  }

  console.log(single_engagement_object);

  $('single_engagement_valuation_amount_currency').text(
    single_engagement_object.fundraiser.expected_value[
      single_engagement_object.fundraiser.expected_value.length - 1
    ].currency_type
  );

  $('#modal_valuation_amount').text(
    `${numberWithCommas(
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].amount
    )}`
  );
  $('#modal_valuation_date').text(
    single_engagement_object.fundraiser.expected_value[
      single_engagement_object.fundraiser.expected_value.length - 1
    ].as_on
  );

  $('#single_engagement_valuation_amount').text(
    single_engagement_object.fundraiser.expected_value[
      single_engagement_object.fundraiser.expected_value.length - 1
    ].amount
  );

  $('#single_engagement_valuation_date').text(
    `${single_engagement_object.fundraiser.expected_value[
      single_engagement_object.fundraiser.expected_value.length - 1
    ].as_on
      .split('-')
      .reverse()
      .join('-')}`
  );

  $('#evaluation_amount_update').text('');
  $('#evaluation_date_update').text('');
  $('#close_update_valuation_modal').click();
}

// Update MANDATE

let mandate_new = [];
let mandate_description_updated = [];
let mandate_file_updated = [];
let mandate_url_update = [];
let mandate_file_type_updated = [];
let mandate_file_name_updated = [];
let mandate_status_updated = [];
function handleMandateUpdate(event) {
  mandate_file_updated.push(event.target.files[0]);
  console.log(mandate_file_updated);

  mandate_file_type_updated.push(event.target.files[0].type);
  console.log(mandate_file_type_updated);

  mandate_file_name_updated.push(event.target.files[0].name);
  console.log(mandate_file_name_updated);
}

function handleMandateDescriptionUpdate(event) {
  mandate_description_updated.push(event.target.value);
}

function handleCloseUpdate() {
  getMandateSelectedValue.checked = false;

  mandate_description_placeholder_disabled.value = '';

  mandate_file_placeholder_disabled.value = '';

  // mandate_file_updated.pop();
  // mandate_file_type_updated.pop();
  // mandate_description_updated.pop();
  closeMandateModal_disabled.click();
}

function handleMandateSaveUpdate() {
  getMandateSelectedValue = document.querySelector(
    'input[name="mandate_status_update"]:checked'
  );
  mandate_status_updated.push(getMandateSelectedValue.value);
  console.log(mandate_status_updated);
  let file = mandate_file_updated[mandate_file_updated.length - 1];
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
      mandate_url_update.push(data['image']);
    },
    error: function (request, error) {
      alert('Request: ' + JSON.stringify(request));
      $('.custom-file-label').text('Upload Logo to Proceed');
      $('.custom-file-label').css({ color: 'maroon' });
    },
  });
  console.log(mandate_url_update);
  let table_append = $('#populate_mandate');
  let updated_file =
    '<tr style="width: 100%;display:flex; justify-content: space-between;" class="mandate-card mb-4" >' +
    '<td class="mandate-td td-img">' +
    '<div class="mandate-img">' +
    '<div class="wrapper">' +
    '<img class= "image--cover" src="' +
    file_icon(mandate_file_type_updated[mandate_file_type_updated.length - 1]) +
    '">' +
    '</div>' +
    '</td>' +
    '<td style="width:250px;" class="mandate-td">' +
    '<div style="padding-left:10px;">' +
    '<a class="my-0" style="cursor:pointer;" href="' +
    mandate_url_update[mandate_url_update.length - 1] +
    '"  onclick="openurl("' +
    mandate_url_update[mandate_url_update.length - 1] +
    '")">' +
    mandate_file_name_updated[mandate_file_name_updated.length - 1] +
    '</a><br>' +
    // '<div class="text-muted" style="font-size:0.7rem;line-height:normal">' +
    // target[i].created_on.showdate +
    // '</div>' +
    '</div>' +
    '</td>' +
    '<div>' +
    '<td class="mandate-td">' +
    mandate_status_updated[mandate_status_updated.length - 1] +
    '</td>' +
    '</div>' +
    '</div>' +
    '</td>' +
    '</tr>';

  table_append.append(updated_file);

  getMandateSelectedValue.checked = false;

  mandate_description_placeholder_disabled.value = '';

  mandate_file_placeholder_disabled.value = '';

  closeMandateModal_disabled.click();
}

// ADD OTHER FILES KE FUNCTIONS
let file_type_update = [];
let docArrayUpdate = [];
let doc_url_update = [];
let docs_updated = [];
function setDocumentTypeUpdate(event) {
  // if (!file_type_option_list.includes(event.target.value)) {
  //   const new_option = document.createElement('option');
  //   const file_type_name = document.createTextNode(event.target.value);

  //   new_option.appendChild(file_type_name);

  //   data_list_options.appendChild(new_option);
  // }
  console.log(event.target.value);
  file_type_update.push(event.target.value);
  console.log(file_type_update);
}

function handleFileChangeUpdate(event) {
  docArrayUpdate.push(...event.target.files);
  console.log(docArrayUpdate);
}

function handleAddButtonUpdate() {
  console.log('file type', file_type_update);
  console.log('Files', docArrayUpdate);

  file_placeholder_update.value = '';
  text_placeholder_update.value = '';
}

function handleModalOpen() {
  docArrayUpdate = [];
  file_type_update = [];
}
async function handleFileSaveUpdate() {
  let table_append = $('#populate_files');
  for (i = 0; i < docArrayUpdate.length; i++) {
    var file = docArrayUpdate[i];
    let formData = new FormData();
    formData.append('file', file);

    await $.ajax({
      url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        doc_url_update.push(data['image']);
        console.log(data['image']);
      },
      error: function (request, error) {
        alert('Request: ' + JSON.stringify(request));
        $('.custom-file-label').text('Upload Logo to Proceed');
        $('.custom-file-label').css({ color: 'maroon' });
      },
    });

    let updated_file =
      '<tr style="width: 100%;display:flex;" class="mandate-card mb-4">' +
      '<td class="mandate-td td-img">' +
      '<div class="mandate-img">' +
      '<div class="wrapper">' +
      '<img class= "image--cover" src="' +
      file_icon(docArrayUpdate[i].type) +
      '">' +
      '</div>' +
      '</td>' +
      '<td style="width: 350px; margin-left:50px; align-self: center; class="mandate-td">' +
      '<div style="padding-left:10px;">' +
      '<a class="my-0" style="cursor:pointer;" href="' +
      doc_url_update[i] +
      '"  onclick="openurl("' +
      doc_url_update[i] +
      '")">' +
      file_type_update[i] +
      '</a><br>' +
      '<div class="text-muted" style="font-size:0.7rem;line-height:normal">' +
      'Uploaded Now' +
      '</div>' +
      '</div>' +
      '</td>' +
      '<div>' +
      '</div>' +
      '</div>' +
      '</td>' +
      '</tr>';

    table_append.append(updated_file);
  }

  file_placeholder_update.value = '';
  text_placeholder_update.value = '';
  other_files_close_update.click();
}

function handleDocCloseUpdate() {
  file_placeholder_update.value = '';
  text_placeholder_update.value = '';
}

function handleObjectUpdate() {
  // engagement.id = moment().format('YYYY|MMM|DD,HH:mm A');
  console.log('inside handleObjectFunction');
  //mandate_new.engagement_id = engagement.id;
  console.log('DOUBLE MANDATES HAI KYA?', mandate_file_updated);
  if (single_engagement_object.fundraiser.mandate) {
    for (let i = 0; i < mandate_file_updated.length; i++) {
      console.log('for loop iterating : ' + i);
      mandate_new[i] = {
        status: mandate_status_updated[i],
        description: mandate_description_updated[i],
        url: mandate_url_update[i],
        type: 'mandate',
        file_type: mandate_file_type_updated[i],
        file_name: mandate_file_name_updated[i],
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
  } else {
    mandate_new = [];
    for (let i = 0; i < mandate_file_updated.length; i++) {
      mandate_new[i] = {
        status: mandate_status_updated[i],
        description: mandate_description_updated[i],
        url: mandate_url_update[i],
        type: 'mandate',
        file_type: mandate_file_type_updated[i],
        file_name: mandate_file_name_updated[i],
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
  }

  if (single_engagement_object.fundraiser.documents) {
    for (let i = 0; i < docArrayUpdate.length; i++) {
      docs_updated[i] = {
        type: docArrayUpdate[i].type,
        file_type: file_type_update[i],
        url: doc_url_update[i],
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
  } else {
    docs_updated = [];
    for (let i = 0; i < docArrayUpdate.length; i++) {
      docs_updated[i] = {
        type: docArrayUpdate[i].type,
        file_type: file_type_update[i],
        url: doc_url_update[i],
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
  }

  if (single_engagement_object.fundraiser.mandate) {
    single_engagement_object.fundraiser.mandate.push(...mandate_new);
  } else {
    single_engagement_object.fundraiser.mandate = [];
    single_engagement_object.fundraiser.mandate.push(...mandate_new);
  }

  if (single_engagement_object.fundraiser.documents) {
    single_engagement_object.fundraiser.documents.push(...docs_updated);
  } else {
    single_engagement_object.fundraiser.documents = [];
    single_engagement_object.fundraiser.documents.push(...docs_updated);
  }

  engagement = { ...single_engagement_object };
  console.log(engagement);

  var data_object = engagement;
  console.log(data_object);
  url =
    'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateEngagement';
  $.ajax({
    url: url,
    type: 'POST',
    data: data_object,
    dataType: 'json',
    success: function (data) {
      console.log(
        'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/updateEngagement',
        data
      );
      alert('updated data');
      alert('redirecting to another page !!!');

      location.reload();

      // var url = document.getElementById('v-pills-profile-tab').href;
      // window.open(url);
      // window.location.href = location.href + 'v-pills-profile-tab';
      // $(document).ready(function () {
      // $('#v-pills-profile-tab')[0].show();
      // });

      // document
      //   .getElementById('v-pills-home-tab')
      //   .setAttribute('aria-selected', false);
      // document
      //   .getElementById('v-pills-profile-tab')
      //   .setAttribute('aria-selected', true);
    },
    error: function (request, error) {
      $('#loader_modal').modal('hide');
      location.reload();
      alert('Request: ' + JSON.stringify(request));
    },
  });

  // $('#v-pills-profile-tab')[0].show();

  // document
  //   .getElementById('v-pills-home-tab')
  //   .setAttribute('aria-selected', false);
  // document
  //   .getElementById('v-pills-profile-tab')
  //   .setAttribute('aria-selected', true);

  mandate_description_updated = [];
  mandate_file_updated = [];
  mandate_url_update = [];
  mandate_file_type_updated = [];
  mandate_file_name_updated = [];
  mandate_status_updated = [];
}

function populate_Mandate(data) {
  var table = $('#populate_mandate');
  table.empty();
  if (data.engagement_type == 'fundraiser') {
    var target = data.fundraiser.mandate;
    console.log('mandate', target);
    for (var i = 0; i < target.length; i++) {
      console.log('target type', target[i].file_type);

      table.append(
        '<tr style="width: 100%;display:flex; justify-content: space-between;" class="mandate-card mb-4">' +
          '<td class="mandate-td td-img">' +
          '<div class="mandate-img">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          file_icon(target[i].file_type) +
          '">' +
          '</div>' +
          '</td>' +
          '<td style="width:250px" class="mandate-td">' +
          '<div style="padding-left:10px;">' +
          '<a class="my-0" style="cursor:pointer;" href="' +
          target[i].url +
          '"  onclick="openurl("' +
          target[i].url +
          '")">' +
          target[i].file_name +
          '</a><br>' +
          '<div class="text-muted" style="font-size:0.7rem;line-height:normal">' +
          target[i].created_on.showdate +
          '</div>' +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td id="' +
          i +
          '" class="mandate-td">' +
          target[i].status +
          '</td>' +
          '</div>' +
          '</div>' +
          '</td>' +
          '</tr>'
      );
      if (target[i].status == 'signed') {
        document.getElementById(i).style.color = 'green';
      } else if (target[i].status == 'proposed') {
        document.getElementById(i).style.color = 'orange';
      }
    }
  }
}

function populate_Files(data) {
  console.log('Files', data);
  var table_files = $('#populate_files');
  table_files.empty();
  if (data.engagement_type == 'fundraiser') {
    if (data.fundraiser.documents) {
      var target = data.fundraiser.documents;
      console.log(target);
      for (var i = 0; i < target.length; i++) {
        console.log('Target File type', target[i].type);

        table_files.append(
          '<tr style="width: 100%;display:flex;" class="mandate-card mb-4"  >' +
            '<td style="align-self: flex-start;" class="mandate-td td-img">' +
            '<div class="mandate-img">' +
            '<div class="wrapper">' +
            '<img class= "image--cover" src="' +
            file_icon(target[i].type) +
            '">' +
            '</div>' +
            '</td>' +
            '<td style="width: 350px; margin-left:50px; align-self: center;">' +
            '<div>' +
            '<a class="my-0" style="cursor:pointer;" href="' +
            target[i].url +
            '"  onclick="openurl("' +
            target[i].url +
            '")">' +
            target[i].file_type +
            '</a><br>' +
            '<small class="text-muted">' +
            target[i].created_on.showdate +
            '</small>' +
            '</div>' +
            '</td>' +
            '</div>' +
            '</td>' +
            '</tr>'
        );
      }
    }
  }
}

function populate_Investor(data) {
  console.log('POPULATE INVESTOR KA DIV HAI YEH ', data);

  $('#investor_approached_list').empty();

  if (data.fundraiser.sub_engagements) {
    $('#investor_no_people').hide();
    $('#investor_approached_list').show();
  } else {
    $('#investor_no_people').show();
    $('#investor_approached_list').hide();
  }

  alert('populate references function called');
  var target = data.fundraiser.sub_engagements;

  for (var i = 0; i < target.length; i++) {
    if (i == target.length - 1) {
      var li =
        '<li class="list-group-item d-flex justify-content-between lh-condensed"   >' +
        '<div style="display:flex;flex-direction:row">' +
        '<div style="display:inline-flex";>' +
        '<div>' +
        '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
        target[i].company_to.to_logo +
        '"></img>' +
        '</div>' +
        '<div style="padding-left:10px;">' +
        '<a class="my-0" style="cursor:pointer;" href="' +
        target[i].company_to.to_link +
        '"  onclick="openurl("' +
        target[i].company_to.to_link +
        '")">' +
        target[i].company_to.to_name +
        '</a><br>' +
        '<small class="text-muted">' +
        target[i].company_to.to_subtext +
        '</small>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
        target[i].company_to.to_id +
        '")">Edit</span>' +
        '</div>' +
        '</div>' +
        '</li>';
      $('#investor_approached_list').append(li);
    } else {
      var li =
        '<li class="list-group-item d-flex justify-content-between lh-condensed"  style="border-bottom:3px solid #C5C0C0" >' +
        '<div style="display:flex;flex-direction:row">' +
        '<div style="display:inline-flex";>' +
        '<div>' +
        '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
        target[i].company_to.to_logo +
        '"></img>' +
        '</div>' +
        '<div style="padding-left:10px;">' +
        '<a class="my-0" style="cursor:pointer;" href="' +
        target[i].company_to.to_link +
        '"  onclick="openurl("' +
        target[i].company_to.to_link +
        '")">' +
        target[i].company_to.to_name +
        '</a><br>' +
        '<small class="text-muted">' +
        target[i].company_to.to_subtext +
        '</small>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
        target[i].company_to.to_id +
        '")">Edit</span>' +
        '</div>' +
        '</div>' +
        '</li>';
      $('#investor_approached_list').append(li);
    }
  }
}

let exlcude_investor_array = [];
function populate_exclusion_list(data) {
  console.log('ME HU EXCLUDED INV KA LIST', data.fundraiser.excluded_investor);

  $('#investor_exclusion_list').empty();

  if (!data.fundraiser.excluded_investor) {
    $('#exclusion_list_no_people').show();
    $('#investor_exclusion_list').hide();
  } else {
    $('#exclusion_list_no_people').hide();
    $('#investor_exclusion_list').show();
  }

  if (data.fundraiser.excluded_investor) {
    exlcude_investor_array.push(
      ...data.fundraiser.excluded_investor.map((obj) => {
        return obj.name;
      })
    );

    console.log(
      'THESE ARE EXCLUDED INVESTORS JO MENE PUSH KYA HAI',
      exlcude_investor_array
    );

    console.log('populate_exclusion_list', data);
    if (data.fundraiser.excluded_investor.length > 0) {
      $('#exclusion_list_no_people').hide();

      $('#investor_exclusion_list').empty();
      $('#investor_exclusion_list').show();
      alert('populate references function called');
      var target = data.fundraiser.excluded_investor;

      for (var i = 0; i < target.length; i++) {
        if (i == target.length - 1) {
          var li =
            '<li class="list-group-item d-flex justify-content-between lh-condensed" >' +
            '<div style="display:flex;flex-direction:row">' +
            '<div style="display:inline-flex";>' +
            '<div>' +
            '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
            target[i].logo +
            '"></img>' +
            '</div>' +
            '<div style="padding-left:10px;">' +
            '<a class="my-0" style="cursor:pointer;" href="' +
            target[i].link +
            '"  onclick="openurl("' +
            target[i].link +
            '")">' +
            target[i].name +
            '</a><br>' +
            '<small class="text-muted">' +
            target[i].subtext +
            '</small>' +
            '</div>' +
            '</div>' +
            '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
            target[i].id +
            '")">Edit</span>' +
            '</div>' +
            '</li>';
          $('#investor_exclusion_list').append(li);
        } else {
          var li =
            '<li class="list-group-item d-flex justify-content-between lh-condensed" style="border-bottom:3px solid #C5C0C0">' +
            '<div style="display:flex;flex-direction:row">' +
            '<div style="display:inline-flex";>' +
            '<div>' +
            '<img class="rounded-circle img-fluid" width=50 height=50 src="' +
            target[i].logo +
            '"></img>' +
            '</div>' +
            '<div style="padding-left:10px;">' +
            '<a class="my-0" style="cursor:pointer;" href="' +
            target[i].link +
            '"  onclick="openurl("' +
            target[i].link +
            '")">' +
            target[i].name +
            '</a><br>' +
            '<small class="text-muted">' +
            target[i].subtext +
            '</small>' +
            '</div>' +
            '</div>' +
            '<span style="cursor:pointer;" class="text-muted" onclick="editpeople("' +
            target[i].id +
            '")">Edit</span>' +
            '</div>' +
            '</li>';
          $('#investor_exclusion_list').append(li);
        }
      }
    }
  }
}

function file_icon(file_type) {
  var src;
  switch (file_type) {
    case 'application/pdf':
      src = '../../../../assets/pdf-file.png';
      console.log('PDF');
      break;
    case 'application/csv':
      src = '../../../../assets/csv-file.png';
      break;
    case 'application/ppt':
      src = '../../../../assets/ppt-file.png';
      break;
    case 'application/jpg':
      src = '../../../../assets/jpg.png';
      break;
    case 'application/jpeg':
      src = '../../../../assets/jpeg.png';
      break;
    case 'application/xls':
      src = '../../../../assets/xls-file.png';
      break;
  }
  return src;
}

function handleCurrency(currency) {
  let sign;
  switch (currency) {
    case 'Rupee':
      sign = '₹';
      break;
    case 'Euro':
      sign = '€';
      break;
    case 'Dollar':
      sign = '$';
      break;
    case 'percentage':
      sign = '%';
      break;
    case 'amount':
      sign = '/-';
      break;
  }
  return sign;
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
