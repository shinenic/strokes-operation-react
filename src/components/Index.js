import React, { PureComponent } from 'react';
import Menu from './Menu';
import MenuMask from './MenuMask';
import Header from './Header';
import MainInfo from './MainInfo';
import Overview from './Overview';
import Combination from './Combination';
import PickedOutput from './PickedOutput';
import IndexCard from './IndexCard';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateWindowSize, changeView } from '../actions';
import ReduxToastr from 'react-redux-toastr';
import '../styles/react-redux-toastr-edit.min.css';

const GridContainer = styled.div`
  height:100%;
  width:100%;
  display:grid;
  box-sizing:border-box;
  grid-template-columns:250px 1fr;
  grid-template-rows:80px 60px 1fr;
  grid-template-areas:'menu header''menu mainInfo''menu main';
  @media (max-width: 480px) {
    grid-template-columns:100%;
    grid-template-rows:60px 30px 1fr;
    grid-template-areas:'header'
                      'mainInfo'
                      'main';
  }
`;
const Main = styled.div`
  grid-area: main;
  width:100%;
  height:100%;
  @media (max-width: 480px){
    /* display:none; */
  }
`;

class Index extends PureComponent {
  // constructor() {
  //   super();
  // }
  // https://tg.pe/i4W 警告提醒
  // componentDidMount() {
  //   window.addEventListener('beforeunload', this.handleWindowClose);
  // }
  // componentWillUnmount(nextLocation) {
  //   console.log(nextLocation);
  //   window.removeEventListener('beforeunload', this.handleWindowClose);
  // }
  // handleWindowClose = (ev) => {
  //   const confirmationMessage = '離開網站將不會自動儲存任何變更';
  //   (ev || window.event).returnValue = confirmationMessage;
  //   return confirmationMessage;
  // }

  updateWindowSize = (height, width) => {
    this.props.updateWindowSize(height, width);
    if ((width <= 480 && this.props.windowWidth >= 480) || (width >= 480 && this.props.windowWidth <= 480)) {
      this.props.changeView('');
    }
  }

  componentDidMount() {
    window.addEventListener('resize',
      () => this.updateWindowSize(window.innerHeight, window.innerWidth));
  }
  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  render() {
    const renderView = (view) => {
      switch (view) {
        case 'INDEX':
          return <IndexCard />;
        case 'SEARCH_COMBINATION':
          return <Combination />;
        case 'OVERVIEW':
        case 'OVERVIEW_PICKED':
          return <Overview />;
        case 'PICKED_OUTPUT':
          return <PickedOutput />;
        default:
          return <IndexCard />;
      }
    }
    return (
      <GridContainer>
        <Header />
        <Menu />
        <MainInfo />
        <Main>
          {renderView(this.props.view)}
        </Main>
        {this.props.menuExpand && <MenuMask />}
        <ReduxToastr
          timeOut={2800}
          newestOnTop={false}
          position={this.props.windowWidth < 500 ? "bottom-center" : "bottom-right"}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          style={{ fontweight: 'bold' }}
          progressBar
          closeOnToastrClick />
      </GridContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuState: state.defaultReducer.menuState,
    view: state.defaultReducer.view,
    windowHeight: state.defaultReducer.windowHeight,
    windowWidth: state.defaultReducer.windowWidth,
    menuExpand: state.defaultReducer.menuExpand
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateWindowSize: (height, width) => dispatch(updateWindowSize(height, width)),
    changeView: str => dispatch(changeView(str)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
