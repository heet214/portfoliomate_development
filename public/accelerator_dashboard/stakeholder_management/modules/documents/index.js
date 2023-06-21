let files = {};
let i = 0;
function filterEngagementDoc(data) {
  console.log('CROSS FILE CALLING HO RAHI BHAAAI', data);

  data.map((engagement, i) => {
    let docs = [];
    let mandate = [];

    if (engagement.fundraiser.documents) {
      //   console.log('ME HU DOCUMENTS OF ENG', engagement.fundraiser.documents);
      //   docs.push(...engagement.fundraiser.documents);
      files.document = {
        ...files.document,
        ...engagement.fundraiser.documents,
      };
      console.log('counter', i);
      console.log('Docs ', files);
    }

    if (engagement.fundraiser.mandate) {
      //   console.log('ME HU MAndate OF ENG', engagement.fundraiser.mandate);
      //   mandate.push(...engagement.fundraiser.mandate);
      files.mandate = {
        ...files.mandate,
        ...engagement.fundraiser.mandate,
      };
      console.log('counter', i);

      console.log('MADATE', files);
    }
  });
  console.log('FILLESESES', files);
}
