import React from 'react'
import PropTypes from 'prop-types';
import Input from '../forms/Input'
import moment from 'moment'

class AddLocationForm extends React.Component {
  static propTypes = {
    onSubmitForm: PropTypes.func,
    onChange: PropTypes.func,
    addLocationValues: PropTypes.object
  }

  // Set by default because is a required input
  errors = {
    location_name: true,
  };
  isValidForm = !this.hasErrors();

  handleChange($event) {
    this.handleValidations($event.target);
    this.props.onChange($event);
  }

  handleValidations({name, value}) {
    if (this.isValidInput(name, value)) {
      Object.prototype.hasOwnProperty.call(this.errors, name) &&
      delete this.errors[name];
    } else if (!Object.prototype.hasOwnProperty.call(this.errors, name)) {
      this.errors[name] = true;
    }
    this.isValidForm = !this.hasErrors();
  }

  isValidInput(inputName, value) {
    const validators = {
      location_name: (value) => !!value.length,
      longitude: (value) => this.isInRange(value, -180, 180),
      latitude: (value) => this.isInRange(value, -90, 90),
    };
    return validators[inputName] && validators[inputName](value);
  }

  isInRange(value, min, max) {
    const valueAsNumber = Number(value);
    return valueAsNumber >= min && valueAsNumber <= max;
  }

  hasErrors() {
    return Object.keys(this.errors).length;
  }

  render() {
    let {
      longitude = '',
      latitude = '',
      location_name = '',
      open_time = moment().format('HH:mm'),
      close_time = moment().format('HH:mm')
    } = this.props.addLocationValues

    return (
      <form onSubmit={this.props.onSubmitForm}>
        <Input
          labelText='Location name'
          value={location_name}
          onChange={this.handleChange.bind(this)}
          placeholder='Your new location name'
          className='input'
          name='location_name'
          type='text'
          invalid={this.errors.location_name}
          helpertext='Location name cannot be empty'
        />
        <Input
          labelText='Opens at'
          value={open_time}
          onChange={this.handleChange.bind(this)}
          placeholder='09:00'
          className='input'
          name='open_time'
          type='text'
        />
        <Input
          labelText='Closes at'
          value={close_time}
          onChange={this.handleChange.bind(this)}
          placeholder='18:00'
          className='input'
          name='close_time'
          type='text'
        />
        <Input
          labelText='Longitude'
          value={longitude}
          onChange={this.handleChange.bind(this)}
          placeholder='-103.3733'
          className='input'
          name='longitude'
          type='text'
          invalid={this.errors.longitude}
          helpertext='Longitude must be between -180 and 180'
        />
        <Input
          labelText='Latitude'
          value={latitude}
          onChange={this.handleChange.bind(this)}
          placeholder='20.669142'
          className='input'
          name='latitude'
          type='text'
          invalid={this.errors.latitude}
          helpertext='Latitude must be between -90 and 90'
        />
        {/* <Input
          value='Submit'
          type='submit'
          className='button popup-button'
        /> */}
        <button
          disabled={!this.isValidForm}
          type='submit'
          className={`button popup-button ${!this.isValidForm ? 'disabled-button' : ''}`}>
            Submit
        </button>
      </form>
    );
  }
}

export default AddLocationForm