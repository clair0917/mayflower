import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, select, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SearchBanner from './index';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';
import tabsOptions from '../../molecules/Tabs/Tabs.knobs.options';
import filterBoxSharedProps from '../FilterBox/FilterBox.props';

// import knob options for child patterns
import buttonOptions from '../../atoms/buttons/Button/Button.knobs.options';
import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('SearchBanner', withInfo('<div></div>')(() => {
    const options = inputOptions.options.orgSelector;
    const withOrgDropdown = boolean('HeaderSearch.withOrgDropdown', true);
    const withFilterBox = boolean('HeaderSearch.withFilterBox', true);
    const hideTopic = boolean('filterBox.hideTopic', true);
    const withTabs = boolean('HeaderSearch.withTabs', true);
    const props = {
      searchBox: {
        placeholder: text('HeaderSearch.placeholder', 'Search Mass.gov'),
        buttonSearch: {
          onClick: (e) => {
            action('SearchBanner searchBox.buttonSearch clicked')(e);
            e.preventDefault();
          },
          ariaLabel: text('HeaderSearch.buttonSearch.ariaLabel', 'Search'),
          text: text('HeaderSearch.buttonSearch.text', 'Search')
        },
        onSubmit: action('SearchBanner searchBox.onSubmit'),
        onChange: action('SearchBanner searchBox.onChange'),
        defaultText: text('HeaderSearch.defaultText', '')
      }

    };
    if (withTabs) {
      props.tabs = {
        tabs: object('tabs', tabsOptions.tabValues),
        handleClick: action('SearchBanner tab clicked'),
        selectedTab: select('tabs.selectedTab', tabsOptions.tabValues.map((tab) => tab.value), 'all')
      };
    }
    if (withOrgDropdown) {
      props.searchBox.orgDropdown = {
        dropdownButton: object('searchBox.orgDropdown.dropdownButton', {
          text: ('All Organizations'),
          capitalized: true
        }),
        inputText: object('searchBox.orgDropdown.inputText', {
          boxed: true,
          label: null,
          placeholder: 'Search an organization...',
          id: 'org-typeahead',
          options,
          selected: '',
          onChange: action('SearchBanner searchBox.orgDropdown.onChange')
        })
      };
    }
    if (withFilterBox) {
      props.toggleButtonOnClick = action('SearchBanner toggleButtonOnClick');
      props.filterBoxExpanded = boolean('SearchBanner.filterBoxExpanded', true);
      props.filterBox = {
        active: boolean('filterBox.active', true),
        action: text('filterBox.action', '#'),
        topic: (hideTopic ? undefined : {
          label: text('filterBox.topic.label', 'Filter by Topic'),
          stackLabel: boolean('filterBox.topic.stackLabel', true),
          id: 'topic',
          options: object('filterBox.topic.options', selectBoxOptions.options.topics),
          required: boolean('filterBox.topic.required', true)
        }),
        organization: {
          label: text('filterBox.organization.label', 'State organization'),
          id: text('filterBox.organization.id', 'state-organization'),
          options: object('filterBox.organization.options', inputOptions.options.orgSelector),
          selected: select(
            'filterBox.organization.defaultSelected',
            [''].concat(inputOptions.options.orgSelector.map((option) => option.text)),
            ''
          ),
          placeholder: text('filterBox.organization.placeholder', 'All Organizations'),
          onChange: action('filterBox.organization typeahead onChange')
        },
        pressType: {
          typeAhead: {
            label: text('filterBox.pressType.label', 'Filter by Type'),
            id: text('filterBox.pressType.id', 'press-type'),
            options: object('filterBox.pressType.options', inputOptions.options.pressTypes),
            selected: select(
              'filterBox.pressType.defaultSelected',
              [''].concat(inputOptions.options.pressTypes.map((option) => option.text)),
              ''
            ),
            placeholder: text('filterBox.pressType.placeholder', 'All Types'),
            onChange: action('SearchBanner filterBox.pressType.typeAhead.onChange')
          }
        },
        dateRange: {
          label: text('filterBox.dateRange.label', 'Date range'),
          startDate: object('filterBox.dateRange.startDate', filterBoxSharedProps.startDate),
          endDate: object('filterBox.dateRange.endDate', filterBoxSharedProps.endDate)
        },
        submitButton: {
          text: text('filterBox.submitButton.text', 'Submit'),
          type: select('filterBox.submitButton.type', buttonOptions.type, 'submit'),
          size: select('filterBox.submitButton.size', buttonOptions.size, 'small'),
          theme: select('filterBox.submitButton.theme', buttonOptions.theme, ''),
          outline: boolean('filterBox.submitButton.outline', false),
          onClick: action('SearchBanner filterBox.submitButton.onClick')
        },
        clearButton: {
          text: text('filterBox.clearButton.text', 'Clear all filters'),
          info: text('filterBox.clearButton.aria-label', 'Clear all filters'),
          onClearCallback: action('SearchBanner filterBox.clearButton.onClearCallback')
        }
      };
      props.filterBox.dateRange.startDate.defaultDate = new Date(props.filterBox.dateRange.startDate.defaultDate);
      props.filterBox.dateRange.endDate.defaultDate = new Date(props.filterBox.dateRange.endDate.defaultDate);
    }
    return(<SearchBanner {...props} />);
  }));
