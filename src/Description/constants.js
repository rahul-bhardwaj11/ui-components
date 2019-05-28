export const FORMATS = [
  'size',
  'font',
  'bold',
  'italic',
  'underline',
  'list',
  'link',
  'indent',
  'align'
];
export const MODES = {
  PREVIEW: 'preview',
  EDIT: 'edit'
};

export const VIEW_TYPES = {
  FULL: 'full',
  DEFAULT: 'default'
};

export const FULL_TOOLBAR = [
  [
    {
      size: []
    }
  ],
  [{ font: [] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ align: [] }],
  ['link']
];
