import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import CatImage from '../image/cat.png';
import { connect } from 'react-redux';
import { cleanAllInput } from '../actions';

const HeaderDiv = styled.div`
  grid-area: header;
  background:rgb(39,45,54);
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
`;
const InfoCount = styled.div`
  grid-area:infoCount;
  display: grid;
  justify-content: center;
  align-items: center;
  color:rgb(153,164,174);
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
  content:url(${CatImage});
  height:45px;
  width:45px;
  border-radius:50%; 
  border: 2px solid rgb(153,164,174); 
  cursor: pointer;
`;



class Header extends PureComponent {
  render() {
    return (
      <HeaderDiv>
        <GridContainer>
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
const mapStatetoProps = state => {
  return {
    character: state.character,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    cleanAllInput: () => dispatch(cleanAllInput())
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Header);