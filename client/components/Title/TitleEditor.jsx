import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TitleEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    formID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string
  };

  static defaultProps = {
    value: '',
  };

  render() {
    const {
      formID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    return (
      <input
        type="text"
        id={formID}
        className={classNameWrapper}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
}

export default TitleEditor;
