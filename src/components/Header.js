import React, { PureComponent } from 'react'
import styled from 'styled-components'
import GithubLogo from '../image/github-logo.png'
import Hamburger from '../image/hamburger.png'
import Color from '../styles/ThemeColor'
import Cross from '../image/cross.png'
import Icon from '../image/menuIcon.png'
import { connect } from 'react-redux'
import { triggerMenu, changeView, inputTextChange } from '../actions'

const HeaderDiv = styled.div`
  grid-area: header;
  background:${Color.black[1]};
  @media (max-width: 480px) {
    background:${Color.black[0]};
  }
`
const GridContainer = styled.div`
  height:100%;
  width:100%;
  display:grid;
  grid-template-columns:0.18fr 0.18fr 0.41fr 0.2fr 55px 0.03fr;
  grid-template-areas:"infoCount infoSave . infoUser infoUserPic .";
  @media (max-width: 1200px){
    grid-template-columns:0.33fr 0.33fr 0.33fr 55px;
    grid-template-areas:"infoCount infoSave infoUser infoUserPic ";
   }
   
  @media (max-width: 480px) {
    grid-template-columns:20px 50px 1fr 80px;
    grid-template-areas:". icon title hamburger";
    }
`
const InfoCount = styled.div`
  grid-area:infoCount;
  display: grid;
  justify-content: center;
  align-items: center;
  color:${Color.text[1]};
  @media (max-width: 480px){
    display:none;
  }
`
const InfoSave = styled(InfoCount)`
  grid-area:infoSave;
  @media (max-width: 1200px){
    justify-content: start;
  }
`
// const InfoUser = styled(InfoCount)`
//   grid-area:infoUser;
//   @media (max-width: 1200px){
//     justify-content: end;
//     margin-right:10px;
//   }
// `
const InfoUserPic = styled(InfoCount)`
  grid-area:infoUserPic;
`
const UserImg = styled.img`
  content:url(${GithubLogo});
  height:40px;
  width:40px;
  /* border-radius:50%;  */
  /* border: 2px solid rgb(153,164,174);  */
  cursor: pointer;
  filter: invert(1);
  @media (max-width: 480px){
    display:none;
  }
`

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
`

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
`
const HamburgerBorder = styled.div`
  display:none;
  @media (max-width: 480px){
    display: grid;
    grid-area:hamburger;
    justify-content: end;
    align-items: center;
    background:${props => props.expand ? Color.black[0] : Color.black[2]};
    transition:0.1s;
    user-select: none;
    -webkit-touch-callout: none;
    z-index:102;
    cursor:pointer;
    &:active{
      background:rgb(79,85,94);
    }
  }
  
`
const Title = styled.div`
  display:none;
  @media (max-width: 480px){
    grid-area:title;
    font-size:18px;
    display: grid;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    margin-left:10px;
    color:${Color.text[0]};  
    user-select: none;
    -webkit-touch-callout: none;
  }
`

class Header extends PureComponent {
  render() {
    return (
      <HeaderDiv>
        <GridContainer>
          <Title>名字筆劃工具</Title>
          <IconImg onClick={() => { this.props.changeView(''); this.props.inputTextChange(-1); }} />
          <HamburgerBorder expand={this.props.menuExpand} onClick={() => this.props.triggerMenu()}>
            <HamburgerImg expand={this.props.menuExpand} />
          </HamburgerBorder>
          <InfoCount>單字庫總字數: {Object.keys(this.props.character).length}</InfoCount>
          <InfoSave>
            單字庫總字數: {Object.keys(this.props.pickedComb).reduce((acc, index) => {
              return acc + this.props.pickedComb[index].length
            }, 0)}
          </InfoSave>
          {/* <InfoSave>尚未有任何變更</InfoSave> */}
          {/* <InfoUser>galadiya41@gmail.com</InfoUser> */}
          <InfoUserPic>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/shinenic/strokes-operation-react">
              <UserImg />
            </a>
          </InfoUserPic>
          {/* <InfoUser>關於網站</InfoUser>
          <InfoUserPic>聯絡我</InfoUserPic> */}
        </GridContainer>
      </HeaderDiv>
    )
  }
}
// this.props.inputTextChange(index);
const mapStateToProps = state => {
  return {
    character: state.defaultReducer.character,
    menuExpand: state.defaultReducer.menuExpand,
    pickedComb: state.defaultReducer.pickedComb
  }
}
const mapDispatchToProps = dispatch => {
  return {
    triggerMenu: (bool) => dispatch(triggerMenu(bool)),
    changeView: (str) => dispatch(changeView(str)),
    inputTextChange: num => dispatch(inputTextChange(num))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
