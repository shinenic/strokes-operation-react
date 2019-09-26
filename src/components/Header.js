import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import Cat from '../image/cat.png';
import Hamburger from '../image/hamburger.png';
import Icon from '../image/menuIcon.png';
import { connect } from 'react-redux';
import { cleanAllInput } from '../actions';

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
    grid-template-columns:15px 40px 1fr 60px 10px;
    grid-template-areas:". icon title hamburger .";
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
  content:url(${Hamburger});
  height:20px;
  width:20px;
  box-sizing:border-box;
  filter:invert(0.8);
  &:hover{
    filter:invert(1);
  }
`;
const HamburgerBorder = styled.div`
  display:none;
  @media (max-width: 480px){
    display: grid;

    grid-area:hamburger;
    height:34px;
    width:34px;
    box-sizing:border-box;
    margin:12px 0;
    padding:5.5px 8.5px 8.5px 5.5px;

    cursor:pointer;
    border:2px solid rgb(230,230,230);
    border-radius:5px;
    &:hover{
      border:2px solid rgb(255,255,255);
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
          <HamburgerBorder><HamburgerImg /></HamburgerBorder>
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
  }
}
const mapDispatchToProps = dispatch => {
  return {
    cleanAllInput: () => dispatch(cleanAllInput())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);