/*
 * Copyright 2017-2020 EPAM Systems, Inc. (https://www.epam.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Provider as MobxProvider} from 'mobx-react';
import {Button, Dropdown, Icon, Menu} from 'antd';
import ExportConsumer from './export-consumer';
import ExportImageConsumer from './export-image-consumer';
import exportStore from './export-store';
import * as ExportComposers from './composers';

const ExportFormat = {
  csv: 'csv',
  image: 'image'
};

class ExportReports extends React.Component {
  static Provider = ({children}) => (
    <MobxProvider export={exportStore}>
      {children}
    </MobxProvider>
  );

  static Consumer = ExportConsumer;

  static ImageConsumer = ExportImageConsumer;

  onExport = (format) => {
    const {documentName} = this.props;
    const title = typeof documentName === 'function' ? documentName() : documentName;
    switch (format) {
      case ExportFormat.image:
        exportStore.doImageExport(title);
        break;
      default:
      case ExportFormat.csv:
        exportStore.doCsvExport(title);
        break;
    }
  };

  renderExportMenu = () => {
    return (
      <Menu onClick={({key: format}) => this.onExport(format)}>
        <Menu.Item key={ExportFormat.csv}>As CSV</Menu.Item>
        <Menu.Item key={ExportFormat.image}>As Image</Menu.Item>
      </Menu>
    );
  };

  render () {
    const {className} = this.props;
    return (
      <Dropdown
        overlay={this.renderExportMenu()}
        trigger={['click']}
      >
        <Button
          id="export-reports"
          className={className}
        >
          <Icon type="export" />
          Export
        </Button>
      </Dropdown>
    );
  }
}

ExportReports.propTypes = {
  className: PropTypes.string,
  documentName: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

ExportReports.defaultProps = {
  documentName: 'Billing report'
};

export default ExportReports;
export {ExportComposers};
