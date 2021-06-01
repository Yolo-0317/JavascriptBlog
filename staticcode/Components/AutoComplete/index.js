import React, { Component, PropTypes } from "react";
import _ from 'lodash';

const GithubApi = 'https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc';

class SecAutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // 要展示的数据
      dataSource: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  loadData = (queryStt) => {
    const {assetClass} = this.props;
    return new Promise((resolve) => {
      $.get(GithubApi).then(function(resp) {
        resolve(_.map(resp.items, function(item) {
          return {
            label: `${item.name}`,
            value: item.full_name,
            securityId: item.id,
            tickerSymbol: item.full_name,
            name: item.name
          };
        }));
      });
    });
    
  }

  // Event fired when the input value is changed
  onChange = e => {
    const {value} = e.currentTarget;

    const self = this;
    this.setState({
      userInput: value
    });
    if (_.size(value) > 1 ) {
      this.loadData(value).then(function(resp) {
        self.setState({
          activeSuggestion: 0,
          dataSource: resp,
          showSuggestions: true
        });
      });
    }
  };

  onBlur = e => {
    this.setState({showSuggestions: false});
  }

  onFocus = (e) => {
    const {value} = e.currentTarget;
    const { dataSource } = this.state;
    if (_.size(dataSource)) {
      this.setState({showSuggestions: true});
    } else {
      const self = this;
      if (_.size(value) > 1 ) {
        this.loadData(value).then(function(resp) {
          self.setState({
            activeSuggestion: 0,
            dataSource: resp,
            showSuggestions: true
          });
        });
      }
    }
  }

  // 通过onMouseDown触发
  onClickMenuItem = (e, itemInfo) => {
    // Update the user input and reset the rest of the state
    // const { innerText: userInput } = e.currentTarget;
    this.props.onSelect(itemInfo);
    this.setState({
      activeSuggestion: 0,
      dataSource: [],
      showSuggestions: false,
      userInput: itemInfo.tickerSymbol
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, dataSource } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: dataSource[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === dataSource.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  menuItemMouseEnter = (index) => () => {
    this.setState({ activeSuggestion: index });
  }

  resetInput() {
    this.setState({ userInput: '' });
  }

  render() {
    const {
      onChange,
      onClickMenuItem,
      onKeyDown,
      menuItemMouseEnter,
      state: {
        activeSuggestion,
        dataSource,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (dataSource.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {_.map(dataSource, (ds, index) => {
              let className = '';

              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={`suggestions-menu-item ${className}`}
                  key={ds.securityId}
                  onMouseEnter={menuItemMouseEnter(index)}
                  onMouseDown={(e) => onClickMenuItem(e, ds)}
                >
                  <a>{ds.label}</a>
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <div className="sec-autocomplete-wapper">
        <input
          className="bondFormInput"
          type="text"
          placeholder="拼音/代码/名称"
          autoComplete="new-password"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          onBlur={this.onBlur}
        />
        {suggestionsListComponent}
      </div>
    );
  }
}

SecAutoComplete.defaultProps = {
  assetClass: 'BOND'  //EQUITY,BOND,FUND'
};

SecAutoComplete.propTypes = {
  assetClass: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default SecAutoComplete;