import React, { Component } from 'react';
import { connect } from 'redux';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired
  }

  static defaultProps = {
    value: '',
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    const {
      formID,
      value,
      onChange,
      classNameWrapper,
    } = this.props;

    return (
      <Textarea
        id={formID}
        value={value || ''}
        className={classNameWrapper}
        style={{ minHeight: '140px' }}
        onChange={e => onChange(e.target.value)}
      />
    );
  }

}

export default TextEditor;
