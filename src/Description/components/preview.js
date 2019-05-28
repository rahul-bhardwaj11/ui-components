import React from 'react';
import PropTypes from 'prop-types';

import StringToHTML from '../../StringToHTML';

const DescriptionPreview = ({ content, onEdit }) => {
  return (
    <div className="clearfix">
      <span onClick={onEdit} className="desc_editLink">
        Edit
      </span>
      <StringToHTML
        content={content ? content : 'No Description'}
        className="desc_preview"
      />
    </div>
  );
};
DescriptionPreview.propTypes = {
  content: PropTypes.string,
  onEdit: PropTypes.func.isRequired
};

export default DescriptionPreview;
