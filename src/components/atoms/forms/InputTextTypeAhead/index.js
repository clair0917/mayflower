import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PropTypes from 'prop-types';
import './style.css';

class InputTextTypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: props.options
    };
    this.selectTag = '';
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.selected });
    this.selectTag.selectedIndex = nextProps.options.findIndex((option) => option.text === nextProps.selected);
  }
  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
    if (newValue.length === 0 && (typeof this.props.onChange === 'function')) {
      // Change the filter back to "" if the user clears the typeahead input.
      const suggestion = { text: '', value: '' };
      this.props.onChange(event, { suggestion });
    }
  }
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }
  onSuggestionSelected(event, { suggestion }) {
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, { suggestion });
    }
  }
  getSuggestions(value) {
    const escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp(`${escapedValue}`, 'i');
    const { options } = this.props;
    if (escapedValue === '') {
      return options;
    }
    return options.filter((item) => regex.test(item.text));
  }
  handleBlur(e) {
    // invokes custom function if passed in the component
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }
  render() {
    const { suggestions } = this.state;
    const {
      boxed, id, label, placeholder, autoFocusInput
    } = this.props;
    const isBoxed = boxed && 'ma__input-typeahead_boxed';
    const value = JSON.parse(JSON.stringify(this.state.value));
    const inputProps = {
      placeholder,
      value,
      onChange: (e, newValue) => this.onChange(e, newValue),
      type: 'search',
      autoFocus: autoFocusInput,
      onBlur: (e) => this.handleBlur(e)
    };
    const shouldRenderSuggestions = (x) => x.trim().length >= 0;
    const getSuggestionValue = (suggestion) => suggestion.text;
    const renderSuggestion = (suggestion, { query }) => {
      const suggestionText = `${suggestion.text}`;
      const matches = match(suggestionText, query);
      const parts = parse(suggestionText, matches);
      return(
        <span className="suggestion-content">
          <span className="name">
            {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
              const key = `suggestion_${index}`;
              return(
                <span className={className} key={key}>{part.text}</span>
              );
            })
            }
          </span>
        </span>
      );
    };
    return(
      <React.Fragment>
        {label && (<label htmlFor={id} className="ma__label">{label}</label>)}
        <div className={`ma__input-typeahead ${isBoxed}`}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            inputProps={inputProps}
            shouldRenderSuggestions={shouldRenderSuggestions}
            id={id}
            ref={(select) => { this.selectTag = select; }}
          />
        </div>
      </React.Fragment>
    );
  }
}

InputTextTypeAhead.propTypes = {
  /** Style the input with a box outline */
  boxed: PropTypes.bool,
  /** The label text above the input text box */
  label: PropTypes.string,
  /** The placeholder text to appear in the input text box */
  placeholder: PropTypes.string.isRequired,
  /** The id of the typeahead element */
  id: PropTypes.string.isRequired,
  /** An array of options for the typeahead */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string
    ])
  })),
  /** Custom change function */
  onChange: PropTypes.func,
  /** The default value for the select box */
  selected: PropTypes.string,
  /** Focus on typeahead input */
  autoFocusInput: PropTypes.bool,
  /** Custom onBlur callback function */
  onBlur: PropTypes.func
};

InputTextTypeAhead.defaultProps = {
  autoFocusInput: false
};

export default InputTextTypeAhead;
