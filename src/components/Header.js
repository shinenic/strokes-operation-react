import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import Cat from '../image/cat.png';
import Hamburger from '../image/hamburger.png';
import Cross from '../image/cross.png';
import Icon from '../image/menuIcon.png';
import { connect } from 'react-redux';
import { triggerMenu } from '../actions';

const HeaderDiv = styled.div`
  grid-area: header;
  background:rgb(39,45,54);
  @media (max-width: 480px) {
    background:rgb(49,54,66);
  }
`;
const GridContainer = styled.div`
  height:100%;
  width:100%;
  display:grid;
  grid-template-columns:0.18fr 0.18fr 0.37fr 0.2fr 55px 0.07fr;
  grid-template-areas:"infoCount infoSave . infoUser infoUserPic .";
  @media (max-width: 1200px){
    grid-template-columns:0.33fr 0.33fr 0.33fr 55px;
    grid-template-areas:"infoCount infoSave infoUser infoUserPic ";
   }
   
  @media (max-width: 480px) {
    grid-template-columns:15px 40px 1fr 80px;
    grid-template-areas:". icon title hamburger";
    }
`;
const InfoCount = styled.div`
  grid-area:infoCount;
  display: grid;
  justify-content: center;
  align-items: center;
  color:rgb(153,164,174);
  @media (max-width: 480px){
    display:none;
  }
`;
const InfoSave = styled(InfoCount)`
  grid-area:infoSave;
  @media (max-width: 1200px){
    justify-content: start;
  }
`;
const InfoUser = styled(InfoCount)`
  grid-area:infoUser;
  @media (max-width: 1200px){
    justify-content: end;
    margin-right:10px;
  }
`;
const InfoUserPic = styled(InfoCount)`
  grid-area:infoUserPic;
`;
const UserImg = styled.img`
  content:url(${Cat});
  height:45px;
  width:45px;
  border-radius:50%; 
  border: 2px solid rgb(153,164,174); 
  cursor: pointer;
  @media (max-width: 480px){
    display:none;
  }
`;

const IconImg = styled.img`
  display:none;
  @media (max-width: 480px){
    grid-area:title;
    display: grid;

    content:url(${Icon});
    grid-area:icon;
    height:34px;
    width:34px;
    margin:12px 0;
    box-sizing:border-box;
    filter:invert(0.8);
    cursor:pointer;
    &:hover{
      filter:invert(1);
    } 
  }
`;

const HamburgerImg = styled.img`
  content:url(${props => props.expand ? Cross : Hamburger});
  height:20px;
  width:20px;
  margin-right:20px;
  box-sizing:border-box;
  filter:invert(0.8);
  transition:0.5s;
  &:hover{
    filter:invert(1);
  }
`;
const HamburgerBorder = styled.div`
  display:none;
  @media (max-width: 480px){
    display: grid;
    grid-area:hamburger;
    justify-content: end;
    align-items: center;

    /* background:rgb(19,25,34); */
    background:${props => props.expand ? "#313642" : "#131922"};
    transition:0.1s;
    user-select: none;
    -webkit-touch-callout: none;
    z-index:101;
    cursor:pointer;
    &:active{
      background:rgb(99,105,114);
    }
  }
  
`;
const Title = styled.div`
  display:none;
  @media (max-width: 480px){
    grid-area:title;
    display: grid;
    justify-content: start;
    align-items: center;
    color:rgb(230,230,230);
  }
`;




class Header extends PureComponent {
  render() {
    return (
      <HeaderDiv>
        <GridContainer>
          <Title>名字筆劃組合</Title>
          <IconImg />
          <HamburgerBorder expand={this.props.menuExpand} onClick={() => this.props.triggerMenu()}>
            <HamburgerImg expand={this.props.menuExpand} />
          </HamburgerBorder>
          <InfoCount>單字庫總字數: {Object.keys(this.props.character).length}</InfoCount>
          <InfoSave>尚未有任何變更</InfoSave>
          <InfoUser>timwei5566@gmail.com</InfoUser>
          <InfoUserPic><UserImg /></InfoUserPic>
          {/* <InfoUser>關於網站</InfoUser>
          <InfoUserPic>聯絡我</InfoUserPic> */}
        </GridContainer>
      </HeaderDiv >
    )
  }
}
const mapStateToProps = state => {
  return {
    character: state.defaultReducer.character,
    menuExpand: state.defaultReducer.menuExpand
  }
}
const mapDispatchToProps = dispatch => {
  return {
    triggerMenu: (bool) => dispatch(triggerMenu(bool))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);