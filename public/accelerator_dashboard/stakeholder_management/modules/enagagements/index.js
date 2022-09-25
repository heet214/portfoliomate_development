const engagement = {
  id: '',
  engagement_type: '',
  created_on: '',
  created_by: '',
  mandate: {
    type: '',
    url: '',
    file_type: '',
    // pdf , excel , doc
  },
};
const fundraiser = {
  ask: {
    currencytype: '',
    amount: 0,
  },
  expected_value: [{ amt: '', as_on: '' }],

  documents: [
    {
      type: '',
      url: '',
      file_type: '',
      //  pdf , excel , doc
      pitchdeck: ' ',
      //  pdf , ppt , url
    },
  ],
};

let fundraiser_form = document.getElementById('#engagement_form-fundraiser');
let growth_form = document.getElementById('#engagement_form-growth');

function toggleGrowthForm() {
  growth_form.style.display = 'none';
  fundraiser_form.style.display = 'block';
}
function toggleFundraiserForm() {
  fundraiser_form.style.display = 'none';
  growth_form.style.display = 'block';
}

// * mandate and pitchdeck
