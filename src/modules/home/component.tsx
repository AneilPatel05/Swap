import React from 'react';
import { IUser } from 'common/interfaces';
import { SearchNavbar } from 'modules/search/subcomponents';
import { CategoryBox } from './subcomponents';
import { merge } from 'lodash';

const categories = require('./categories.json');

interface Props {
  user : IUser;
  search : (query : string) => void;
}

class Home extends React.Component<any, {}> {
  constructor(props) {
    super(props);
    this.viewDescription = this.viewDescription.bind(this);
    this.hideDescription = this.hideDescription.bind(this);
    this.renderNavbar = this.renderNavbar.bind(this);
  }

  public componentDidMount() {
    $('#search-query').focus();
    const currentQuery = this.props.currentQuery;
    let nextQuery = merge({}, currentQuery, {query: ""});
    this.props.saveQuery(nextQuery)
  }

  private viewDescription(e) {
    e.currentTarget.querySelectorAll('img')[0].classList.add("thumbnail-backdrop");
    let title = e.currentTarget.querySelectorAll('h3')[0];
    let description = e.currentTarget.querySelectorAll('p')[0];

    description.classList.remove("hide");
    description.classList.add("animated");
    description.classList.add("fadeIn");
  }

  private hideDescription(e) {
    e.currentTarget.querySelectorAll('img')[0].classList.remove("thumbnail-backdrop");
    let title = e.currentTarget.querySelectorAll('h3')[0];
    let description = e.currentTarget.querySelectorAll('p')[0];

    description.classList.add("hide");
    description.classList.remove("animated");
    description.classList.remove("fadeIn");
  }

  private renderNavbar() {
    return (
      <div>
        <SearchNavbar
          user={this.props.user}
          searchResult={this.props.searchResult}
          search={this.props.search}
          currentQuery={this.props.currentQuery}
          saveQuery={this.props.saveQuery}
          home={true}
        />
      </div>
    )
  }

  public render() {
    return (
      <div>
        <div className="block app-block-intro">
          <div className="container text-center">
            <h1 className="block-title m-b-sm text-uppercase app-myphone-brand">Swap</h1>
            <p className="lead m-b-lg p-b-md">Best marketplace. For students, exclusively.</p>
          </div>
        </div>

        {this.renderNavbar()}

        <div>
          <div className="container" id="add-margin-bottom">
            <div className="row">
              { categories.map(category => (
                <CategoryBox
                  viewDescription={this.viewDescription}
                  hideDescription={this.hideDescription}
                  category={category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
