import React, { Component } from 'react';
import AntUpload from 'antd/lib/upload';
import 'antd/lib/upload/style/index.css';
import Button from '../Button/index';

class Upload extends Component {
  render() {
    return (
      <AntUpload {...this.props}>
        <Button type="primary" size="medium">
          Upload
        </Button>
      </AntUpload>
    );
  }
}
Upload.Dragger = AntUpload.Dragger;
export default Upload;
