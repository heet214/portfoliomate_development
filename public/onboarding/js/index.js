function is_logged_in() {
  return true;
}

var stakeholder_type = '';
var is_startup_sector_list_setup = false;
var is_country_list_setup = false;

function setup_onboarding_form(value) {
  switch (value) {
    case 'startup': {
      setup_country_list();
      setup_startup_sector_list();
      $('#company_sector_div').show();
      $('.fund-vc-pe').prop('disabled', true);
      $('.innovador').prop('disabled', true);
      $('.startup').prop('disabled', false);
      $('.own-company').prop('disabled', true);
      $('.investment_banker').prop('disabled', true);
      $('.university_incubationr').prop('disabled', true);
      break;
    }

    case 'fund-vc-pe': {
      setup_country_list();
      setup_startup_sector_list();
      $('#company_sector_div').show();
      $('.fund-vc-pe').prop('disabled', false);
      $('.innovador').prop('disabled', true);
      $('.startup').prop('disabled', true);
      $('.own-company').prop('disabled', true);
      $('.investment_banker').prop('disabled', true);
      $('.university_incubationr').prop('disabled', true);
      break;
    }

    case 'innovador': {
      setup_country_list();
      $('#company_sector_div').hide();
      $('.fund-vc-pe').prop('disabled', true);
      $('.innovador').prop('disabled', false);
      $('.startup').prop('disabled', true);
      $('.own-company').prop('disabled', true);
      $('.investment_banker').prop('disabled', true);
      $('.university_incubationr').prop('disabled', true);
      break;
    }

    case 'own-company': {
      setup_country_list();
      $('#company_sector_div').hide();
      $('.fund-vc-pe').prop('disabled', true);
      $('.innovador').prop('disabled', true);
      $('.startup').prop('disabled', true);
      $('.own-company').prop('disabled', false);
      $('.investment_banker').prop('disabled', true);
      $('.university_incubationr').prop('disabled', true);
      break;
    }
    case 'investment_banker': {
      setup_country_list();
      $('#company_sector_div').hide();
      $('.fund-vc-pe').prop('disabled', true);
      $('.innovador').prop('disabled', true);
      $('.startup').prop('disabled', true);
      $('.own-company').prop('disabled', true);
      $('.investment_banker').prop('disabled', false);
      $('.university_incubationr').prop('disabled', true);

      break;
    }

    case 'university_incubationr': {
      setup_country_list();
      setup_startup_sector_list();
      $('#company_sector_div').show();

      $('.fund-vc-pe').prop('disabled', true);
      $('.innovador').prop('disabled', true);
      $('.startup').prop('disabled', true);
      $('.own-company').prop('disabled', true);
      $('.investment_banker').prop('disabled', true);
      $('.university_incubationr').prop('disabled', false);
      break;
    }
  }
}

function setup_country_list() {
  if (!is_country_list_setup) {
    is_country_list_setup = true;
    //console.log(sectors_data);
    var output = [];
    for (var i = 0; i < countries_data.length; i++) {
      //console.log(countries_data[i]);
      output.push(
        '<option data-subtext="' +
          countries_data[i].code +
          '" value="' +
          countries_data[i].name +
          '">' +
          countries_data[i].name +
          '</option>'
      );
    }
    $('#country').html(output.join(''));
    $('#country').selectpicker();
  }
}

function get_logo_from_url(stakeholder) {
  switch (stakeholder) {
    case 'startup': {
      if ($('#startuplogourl').val()) {
      } else 'Please Enter Valid Url';
    }
  }
}

function setup_startup_sector_list() {
  if (!is_startup_sector_list_setup) {
    is_startup_sector_list_setup = true;
    //console.log(sectors_data);
    var output = [];
    for (var i = 0; i < sectors_data.length; i++) {
      //console.log(sectors_data[i]);
      output.push(
        '<option data-subtext="' +
          sectors_data[i].IndustryGroups +
          '" value="' +
          sectors_data[i].IndustryName +
          '">' +
          sectors_data[i].IndustryName +
          '</option>'
      );
    }
    $('#company_sector').html(output.join(''));
    $('#company_sector').selectpicker();
  }
}

var user_data = {};
var parent_stakeholder = {};
function proceed_pressed() {
  var data = {};
  $('#onboarding_form')
    .serializeArray()
    .map(function (x) {
      data[x.name] = x.value;
    });
  console.log(data);

  if (is_submission_valid(data)) {
    console.log(user_data);
    save_user_data(user_data);
  }
}

var is_startuplogo_processed = true;
function is_submission_valid(data) {
  if (data.stakeholder_type) {
    switch (data.stakeholder_type) {
      case 'startup': {
        if (!is_startuplogo_processed) {
          alert('Enter Logo Url & Click Get Logo');
          return false;
        }

        if (!data.stakeholder_location) {
          alert('Enter Country');
          return false;
        }

        if (!data.company_name) {
          alert('Enter Valid Name');
          return false;
        }

        if (!data.company_sector) {
          alert('Enter Valid Sector');
          return false;
        }

        if (!data.brand_name) {
          alert('Enter Brand Name');
          return false;
        }
        if (!data.email) {
          alert('Enter Email Address');
          return false;
        }
        if (!data.password) {
          alert('Enter Password');
          return false;
        }

        delete data.fund_name;
        data.logo = user_data.logo;
        user_data = data;
        //console.log("startup user",data);
        return true;
      }

      case 'fund-vc-pe': {
        if (!is_startuplogo_processed) {
          alert('Enter Logo Url & Click Get Logo');
          return false;
        }

        if (!data.stakeholder_location) {
          alert('Enter Country');
          return false;
        }

        if (!data.company_name) {
          alert('Enter Valid Name');
          return false;
        }

        if (!data.company_sector) {
          alert('Enter Valid Sector');
          return false;
        }

        if (!data.brand_name) {
          alert('Enter Brand Name');
          return false;
        }
        data.logo = user_data.logo;
        user_data = data;
        //console.log("startup user",data);
        return true;
      }

      case 'innovador': {
        if (!data.stakeholder_location) {
          alert('Select Location/Country');
          return false;
        }
        data.parent = parent_stakeholder;
        data.parent.as_of = {
          day: moment().format('DD'),
          month: moment().format('MM'),
          year: moment().format('YYYY'),
          time: moment().format('hh:mm A'),
          datetime: moment().toISOString(),
          showdate: moment().format('DD MMM, YYYY hh:mm A'),
        };
        delete data.brand_name;
        delete data.website;
        data.logo = user_data.logo;
        user_data = data;
        //console.log(data);
        return true;
      }
    }
  } else {
    alert('Please Select Stakeholder Type');
    return false;
  }
}

async function save_user_data(data) {
  let user = {
    id: '',
    email: '',
    password: '',
  };
  data.id = moment().format('YYYY|MMM|DD,HH:mm A');
  data.status = 'Profile Created';

  data.created_on = {
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    time: moment().format('hh:mm A'),
    datetime: moment().toISOString(),
    showdate: moment().format('DD MMM, YYYY hh:mm A'),
  };

  data.id = data.stakeholder_type + '_' + data.id;

  user.id = data.id;
  user.email = data.email;
  user.password = data.password;
  user.stakeholder_type = data.stakeholder_type;
  console.log(user);
  $('#loader_modal').modal('show');
  await $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/createUser',
    type: 'POST',
    data: user,
    dataType: 'json',
    success: function (data) {
      console.log('NEW USER CREATED', data);
    },
    error: function (request, error) {
      console.log('Request: ' + JSON.stringify(request));
      console.error('Error: ' + error);
    },
  });

  console.log(data);

  await $.ajax({
    url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/createStakeHolder',
    type: 'POST',
    data: data,
    dataType: 'json',
    success: function (data) {
      $('#loader_modal').modal('hide');
      switch (data.stakeholder_type) {
        case 'startup': {
          alert('Sucessfully Added');
          window.location.href =
            '../accelerator_dashboard/stakeholder_management?action=' +
            data.stakeholder_type +
            '';
          break;
        }

        case 'fund-vc-pe': {
          alert('Sucessfully Added');
          window.location.href =
            '../accelerator_dashboard/stakeholder_management?action=' +
            data.stakeholder_type +
            '';
          break;
        }

        case 'innovador': {
          //add innovador to parent, if parent had called to add people in it from profile page
          if (parent_stakeholder) {
            if (action == 'addrefferences') {
              console.log(parent_stakeholder.refferences);
              if (parent_stakeholder.refferences) {
                alert('adding');
                var refferences = parent_stakeholder.refferences;
                refferences.push(data);
              } else if (!parent_stakeholder.refferences) {
                var refferences = [];
                refferences.push(data);
                parent_stakeholder.refferences = refferences;
              }
            } else if (action == 'addperson') {
              if (parent_stakeholder.people) {
                var people = parent_stakeholder.people;
                people.push(data);
              } else if (!parent_stakeholder.people) {
                var people = [];
                people.push(data);
                parent_stakeholder.people = people;
              }
            }
            updatestakeHolder(
              'startup',
              parent_stakeholder,
              open_stakeholder_profile
            );
          } else alert('Sucessfully Added');
          break;
        }
      }
    },
    error: function (request, error) {
      $('#loader_modal').modal('hide');
      alert('Request: ' + JSON.stringify(request));
    },
  });
}

function open_stakeholder_profile(stakeholder_id) {
  window.location.href =
    '../accelerator_dashboard/stakeholder_management/modules/profile?action=' +
    stakeholder_id +
    '';
}

//const upload = document.getElementsByClassName('upload_logo');

function upload_image(input_id) {
  console.log('Upload Image');
  console.log(stakeholder_type, input_id);
  const file_input = document.getElementById(input_id);
  var file = file_input.files[0];
  if (file.type.match('image.*')) {
    console.log('is an image');
    console.log('Show type of image: ', file.type.split('/')[1]);
    let formData = new FormData();
    formData.append('file', file);
    $('.custom-file-label').text('Uploading Image');
    $.ajax({
      url: 'https://us-central1-portfoliomate-e14a8.cloudfunctions.net/uploadFile',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log(data);
        console.log('Data: ' + data, 'userData', user_data);
        user_data.logo = data.image;
        console.log('Image Uploaded', user_data);
        $('.custom-file-label').text('Uploaded Successfully.');
        $('.custom-file-label').css({ color: 'green' });
        $('#submit_stakeholder').show();
      },
      error: function (request, error) {
        alert('Request: ' + JSON.stringify(request));
        $('.custom-file-label').text('Upload Logo to Proceed');
        $('.custom-file-label').css({ color: 'maroon' });
      },
    });
  } else {
    alert('Not An Image');
  }
}

function populate_profile(stakeholder_type, parent) {
  //alert(stakeholder_type);
  console.log('populate_profile', parent);
  var params = get_params_from_url();
  switch (stakeholder_type) {
    case 'innovador': {
      console.log('parent', parent);
      if (parent == null) {
        //alert("Calling Stakeholders");
        get_stakeholders(
          'single_profile',
          { id: params.parent_id, internal_type: 'innovador' },
          populate_profile
        );
      } else {
        $('#loader_modal').modal('hide');
        parent_stakeholder = parent;
        user_data.organization = parent;
        $('#organization_name').val(parent.company_name);
        $('#person_name').val(params.name);
        $('#stakeholder_type option[value=' + stakeholder_type + ']').attr(
          'selected',
          'selected'
        );
        $('#stakeholder_type').trigger('change');
      }
      break;
    }
  }
}
