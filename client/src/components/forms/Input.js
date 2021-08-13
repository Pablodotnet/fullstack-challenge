import React from 'react'
import PropTypes from 'prop-types';
import '../../css/inputs.css'

class Input extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    labelText: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    helpertext: PropTypes.string,
    invalid: PropTypes.bool,
  }

  render() {
    let {
      name,
      value,
      onChange,
      type,
      labelText,
      className = '',
      placeholder = '',
      helpertext = '',
      invalid = false,
    } = this.props;

    const props = {
      name,
      value,
      onChange,
      type,
      className,
      placeholder,
      helpertext,
      invalid,
    };

    return (
      <div style={{'paddingBottom': '10px'}}>
        <label>
          {labelText && `${labelText}: `}
          <input {...props} />
          {
            props.invalid &&
            <small style={{'color': 'red'}}>
              {props.helpertext}
            </small>
          }
        </label>
      </div>
    )
  }
}

export default Input