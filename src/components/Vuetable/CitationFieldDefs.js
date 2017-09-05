export default [
  // {
  //   name: '__handle',
  //   titleClass: 'text-center',
  //   dataClass: 'text-center',
  // },
  {
    name: '__sequence',
    title: '#',
    titleClass: 'text-center',
    dataClass: 'text-center',
  },
  // {
  //   name: '__checkbox',
  //   titleClass: 'text-center',
  //   dataClass: 'text-center',
  // },
  {
    name: 'status',
    sortField: 'status',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
  },
  {
    title: 'Payment Reference',
    name: 'paymentReference',
    sortField: 'paymentReference',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
  },
  {
    title: 'Fine Amount',
    name: 'fineAmount',
    sortField: 'fineAmount',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
  },
  {
    name: 'date',
    sortField: 'date',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
    // callback: 'formatDate|DD-MM-YYYY',
  },
  {
    name: 'time',
    sortField: 'time',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
    // callback: 'allcap',
  },

  {
    title: 'Name',
    name: 'driverName',
    sortField: 'driverName',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
    // callback: 'allcap',
  },
  {
    title: 'Plate',
    name: 'vehicleRegistration',
    sortField: 'vehicleRegistration',
    titleClass: 'text-center',
    dataClass: 'text-center custom-table-cell',
    // callback: 'allcap',
  },

  // {
  //   name: '__component:custom-actions',
  //   title: 'Actions',
  //   titleClass: 'text-center',
  //   dataClass: 'text-center',
  // },
  {
    name: '__slot:actions',
    title: 'Actions',
    titleClass: 'text-center',
    dataClass: 'text-center',
  },
];
