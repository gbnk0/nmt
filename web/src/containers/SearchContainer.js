require('normalize.css/normalize.css');


import React from 'react';
import HeaderComponent from '../components/HeaderComponent'
import BreadcrumbComponent from '../components/BreadcrumbComponent'
import SearchComponent from '../components/SearchComponent'

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchFetchData  } from '../actions/search';



class SearchContainer extends React.Component {

  render() {
    const links = [
      {
        'route': '/search/',
        'name': 'Search',
        'active': true
      }
    ];
    return (
        <div>
              <BreadcrumbComponent links={links}/>
              <HeaderComponent
                title='Search'
                subtitle={this.props.search.total + ' Results'}
                icon='search'
                isLoading={this.props.isLoading}/>

              <SearchComponent {...this.props} />
        </div>

    );
  }
}


SearchContainer.propTypes = {
    fetchData: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchterm: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    hasErrored: state.searchHasErrored,
    isLoading: state.searchIsLoading,
    searchterm: state.searchterm
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(searchFetchData(url))
    };
};

SearchContainer.displayName = 'SearchContainer';

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
