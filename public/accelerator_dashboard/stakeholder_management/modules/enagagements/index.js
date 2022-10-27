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
  sub_engagements: [
    {
      parent_id: '',
      sub_engagement_id: '',
      engagement_from: [
        {
          company_logo: '',
          company_name: '',
          company_id: '',
        },
      ],
      engagement_to: [{ company_logo: '', company_name: '', company_id: '' }],
      status: [{ type: '', description: '', timestamp: '' }],
      created_on: '',
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
let getMandateSelectedValue;

let other_files_close = document.getElementById('handleOtherFilesClose');
let file_placeholder = document.getElementById('otherFiles_file_input');
let text_placeholder = document.getElementById('otherFiles_input');

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
}

function handleMandateSave() {
  getMandateSelectedValue = document.querySelector(
    'input[name="mandate_status"]:checked'
  );
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

  getMandateSelectedValue.checked = false;
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

      '<tr class="shadow mb-4" style="cursor:pointer;" onclick="handleSingleEngagement(\'' +
        filtered_engagements[i].id +
        '\')">' +
        '<div class="wrapper">' +
        '<td>' +
        '<div class="company_title_holder">' +
        filtered_engagements[i].id +
        '</div>' +
        '</td>' +
        '<td>' +
        filtered_engagements[i].stakeholder_id +
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

  $('#ask_evaluation-disabled').val(
    single_engagement_object.fundraiser.ask.amount
  );

  $(
    `#ask_currency-disabled option[value=${single_engagement_object.fundraiser.ask.currency_type}]`
  ).attr('selected', 'selected');

  $('#expected_evaluation-disabled').val(
    `${
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].amount
    }`
  );
  $(
    `#evaluation_currency-disabled option[value=${
      single_engagement_object.fundraiser.expected_value[
        single_engagement_object.fundraiser.expected_value.length - 1
      ].currency_type
    }]`
  ).attr('selected', 'selected');

  // $('#date_as_on-disabled').value(
  //   single_engagement_object.fundraiser.expected_value[
  //     single_engagement_object.fundraiser.expected_value.length - 1
  //   ].as_on
  // );
  $('input[type=radio][name=fees_type]').val([
    single_engagement_object.fundraiser.fees[
      single_engagement_object.fundraiser.fees.length - 1
    ].payment_mode,
  ]);

  $('#fees_amount-disabled').val(
    single_engagement_object.fundraiser.fees[
      single_engagement_object.fundraiser.fees.length - 1
    ].quantity
  );

  $('#fees_comments-disabled').val(
    single_engagement_object.fundraiser.fees[
      single_engagement_object.fundraiser.fees.length - 1
    ].comment
  );

  var form = document.getElementById(
    'single_engagement_form-fundraiser-disabled'
  );
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }

  populate_Mandate(single_engagement_object);
  populate_Files(single_engagement_object);
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

function populate_Investor_modal(data) {
  var table = $('#populate_investor_modal');
  alert('working populate');
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
          '<td><Button class="btn btn-primary" onclick="createSubEngagement(\''+data[i].id +'\',\'' +
          data[i].name + '\',\'' +
          data[i].logo + 
          '\')">Add </Button></td>' +
           
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
          '<td><Button class="btn btn-primary" onclick="createSubEngagement(\''+data[i].id +'\',\'' +
          data[i].brand_name + '\',\'' +
          data[i].logo + 
          '\')"> Add </Button></td>' +
          
          '</tr>'
      );
    }
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
      console.log("Exclusion",data);
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
          '<td><Button class="btn btn-primary" onclick="excludeInvestor(\''+data[i].id +'\',\'' +
          data[i].name + '\',\'' +
          data[i].logo + 
          '\')"> Add </Button></td>' +
           
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
          '<td><Button class="btn btn-primary" onclick="excludeInvestor(\''+data[i].id +'\',\'' +
          data[i].brand_name + '\',\'' +
          data[i].logo + 
          '\')"> Add </Button></td>' +
          '<td>' +
          '</div>' +
          '</td>' +
          '</tr>'
      );
    }
  }
}

let temp_exclude_Investor = [];
function excludeInvestor(id,name,logo){
  console.log("Exclude vala :" ,id,name,logo)
  temp_exclude_Investor.push({
    temp_id : id,
    temp_name: name,
    temp_logo: logo,
  });

  console.log(temp_exclude_Investor);
}



function createSubEngagement(id, name, logo) {
  console.log("sub engagement vala console",name,logo);

  let temp_sub_engagement = {
    
    temp_id: id,
    temp_name: name,
    temp_logo: logo,
  }

  console.log(temp_sub_engagement);
  
  if(single_engagement_object.fundraiser.sub_engagements){
    single_engagement_object.fundraiser.sub_engagements.push(temp_sub_engagement);
  }else
  {
     single_engagement_object.fundraiser.sub_engagements = [];
    single_engagement_object.fundraiser.sub_engagements.push(temp_sub_engagement)
  }
  console.log(single_engagement_object);

}

function handleObjectUpdate() {
  for (let i = 0; i < temp_sub_engagement.length; i++) {
    fundraiser.sub_engagements[i] = {
      id: temp_id,
      name: temp_name,
      logo: temp_logo,
    };
  }
  console.log('YEH AFTER ADDING SUBENG', fundraiser);
}
// company_logo: current_company.logo,
// company_name: current_company.company_name,
// company_id: current_company.id,
 

function populate_Mandate(data){
  
  var table = $('#populate_mandate')
  table.empty();
  if(data.engagement_type == "fundraiser"){
    var target = data.fundraiser.mandate.files;
    console.log("mandate",target)
    for(var i =0 ;i< target.length;i++){
      console.log("target type",target[i].file_type)
      


    table.append(
      '<tr class="shadow mandate-card" >' +
          '<td class="mandate-td td-img">' +
          '<div class="mandate-img">' +
          '<div class="wrapper">' +
          '<img class= "image--cover" src="' +
          file_icon(target[i].file_type) +
          '">' +
          '</div>' +
          '</td>' +
          '<td class="mandate-td">' +
          '<div style="padding-left:10px;">' +
          '<a class="my-0" style="cursor:pointer;" href="' +
          target[i].url +
          '"  onclick="openurl("' +
          target[i].url +
          '")">' +
          target[i].type +
          '</a><br>' +
          '<div class="text-muted" style="font-size:0.7rem;line-height:normal">' +
          target[i].created_on.showdate +
          '</div>' +
          '</div>' +
          '</td>' +
          '<div>' +
          '<td class="mandate-td">' +
          target[i].status +
          '</td>' +
          '</div>' +
          '</div>' +
          '</td>' +
          '</tr>'
    )
    }
    


  }
  
}
function populate_Files(data){
  console.log("Files",data);
  var table = $('#populate_files')
  table.empty();
  if(data.engagement_type == "fundraiser"){
    var target = data.fundraiser.documents;
    console.log(target);
    for(var i =0 ;i<target.length;i++){
      console.log("Target File type",target[i].type)

      table.append(
        '<tr class="shadow">' +
            '<td>' +
            '<div class="company_logo_title_holder">' +
            '<div class="wrapper">' +
            '<img class= "image--cover" src="' +
            file_icon(target[i].type) +
            '">' +
            '</div>' +
            '</td>' +
            '<td>' +
            '<div style="padding-left:10px;">' +
            '<a class="my-0" style="cursor:pointer;" href="' +
            target[i].url +
            '"  onclick="openurl("' +
            target[i].url +
            '")">' +
            target[i].type +
            '</a><br>' +
            '<small class="text-muted">' +
            target[i].created_on
            +
            '</small>' +
            '</div>' +
            '</td>' +
            '<div>' +
            '<td>' +
            target[i].status +
            '</td>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>'
      )

    }

  }
  
}

function populate_Investor(data){
  if(data.sub_engagements.length > 0){
    $('#investor_no_people').hide();

    $('#investor_approached_list').show();
    alert("populate references function called")
    var target = data.sub_engagements;
    for(var i =0 ; i<target.length;i++){
      var li =
        '<li class="list-group-item d-flex justify-content-between lh-condensed">' +
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
        '</li>';
    }
    $('#investor_approached_list').append(li);
  }
}

function populate_exclusion_list(data){
  if(data.exclusion_list.length > 0){
    $('#exclusion_list_no_people').hide();

    $('#investor_exclusion_list').show();
    alert("populate references function called")
    var target = data.exclusion_list;
    for(var i =0 ; i<target.length;i++){
      var li =
        '<li class="list-group-item d-flex justify-content-between lh-condensed">' +
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
        '</li>';
    }
    $('#investor_exclusion_list').append(li);
  }
}

function file_icon(file_type){
  var src;
  switch (file_type){
    case "application/pdf" :
      src = "../../../../assets/pdf-file.png";
      console.log("PDF")
      break;
    case "application/csv":
      src = "../../../../assets/csv-file.png";
      break;
    case "application/ppt":
      src = "../../../../assets/ppt-file.png";
      break;
    case "application/jpg":
      src = "../../../../assets/jpg.png";
      break;
    case "application/jpeg":
      src = "../../../../assets/jpeg.png";
      break;
    case "application/xls":
      src = "../../../../assets/xls-file.png";
      break;
  }
  return src;
}