export default {
  table: {
    tableClass: 'table table-striped table-bordered',
    ascendingIcon: 'glyphicon glyphicon-chevron-up',
    descendingIcon: 'glyphicon glyphicon-chevron-down',
    handleIcon: 'glyphicon glyphicon-menu-hamburger',
    renderIcon: classes => `<span class="${classes.join(' ')}"></span>`,
  },
  paginationInfo: {
    infoClass: 'float-left',
  },
  pagination: {
    wrapperClass: 'pagination float-right',
    activeClass: 'btn-primary',
    disabledClass: 'disabled',
    pageClass: 'btn btn-border',
    linkClass: 'btn btn-border',
    icons: {
      first: '',
      prev: '',
      next: '',
      last: '',
    },
  },
};
