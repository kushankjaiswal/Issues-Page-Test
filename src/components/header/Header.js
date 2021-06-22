/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Anchor from '../commons/Anchor';
import RepoDetail from '../commons/RepoDetail';
import NavigationItem from './NavigationItem';
import Nav from './Nav';
import Navmenus from './Navmenus';
import RepoLogoSVG from '../commons/svg/RepoLogoSVG';

const navigationValues = [
  {
    name: 'Code', selected: false,
  },
  {
    name: 'Issues', value: 253, selected: true,
  },
  {
    name: 'Pull Requests', value: 72, selected: false,
  },
  {
    name: 'Projects', value: 2, selected: false,
  },
  {
    name: 'Insights', selected: false,
  },
];


const PathDivider = styled.span`
  margin: 0 .25em;
`;

const RightNav = styled.div`
   @media (max-width: 820px) {
    display : none;
   }
`;

const RepoTitleInfo = styled.div`
@media (max-width: 600px) {
        padding-top: 15px;
      }

`;

const Header = (props) => (
  <Nav>
    <Navmenus row="first">
      <RepoTitleInfo>
        <RepoLogoSVG />
        <Anchor
          color="#0366d6"
        >
          {props.repoInfo.owner.login}
        </Anchor>
        <PathDivider>/</PathDivider>
        <Anchor
          color="#0366d6"
          fontWeight="bold"
        >
          {props.repoInfo.name}
        </Anchor>
      </RepoTitleInfo>
      <RightNav>
        <RepoDetail tag="Watch" value={props.repoInfo.subscribers_count} handleChange={props.handleChange} />
        <RepoDetail tag="Star" value={props.repoInfo.stargazers_count} handleChange={props.handleChange} />
        <RepoDetail tag="Fork" value={props.repoInfo.forks_count} handleChange={props.handleChange} />
      </RightNav>
    </Navmenus>

    <Navmenus row="second">
      {
        navigationValues.map(item => (
          <NavigationItem
            key={item.name}
            {...item}
          />
        ))
      }
    </Navmenus>
  </Nav>
);

export default Header;


Header.propTypes = {
  name: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  stargazers_count: PropTypes.number.isRequired,
  subscribers_count: PropTypes.number.isRequired,
  forks_count: PropTypes.number.isRequired,
};
