import React, { PureComponent } from 'react'
import styled from 'styled-components'
import GithubLogo from '../image/github-logo.png'
import GoogleLogo from '../image/google-logo.png'
import Hamburger from '../image/hamburger.png'
import Color from '../styles/ThemeColor'
import Cross from '../image/cross.png'
import Icon from '../image/menuIcon.png'
import { connect } from 'react-redux'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { toastr } from 'react-redux-toastr';
import { triggerMenu, changeView, inputTextChange, setUserGoogleInfo } from '../actions'

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
const InfoUser = styled(InfoCount)`
  grid-area:infoUser;
  @media (max-width: 1200px){
    justify-content: end;
    margin-right:10px;
  }
`

const InfoUserPic = styled(InfoCount)`
  grid-area:infoUserPic;
`
const UserImg = styled.img`
  content:url(${props => props.img === '' ? GoogleLogo : props.img});
  height:40px;
  width:40px;
  border-radius:50%; 
  /* border: 2px solid rgb(153,164,174);  */
  /* cursor: pointer; */
  filter: ${props => props.img === '' ? 'invert(1)' : ''};
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
const responseGoogle = (response) => {
  console.log(response);
}

class Header extends PureComponent {
  getGoogleResponse = (response) => {
    if (response.error) {
      toastr.error('登入失敗', '請嘗試重新登入')
    } else {
      const { googleId, imageUrl: UserPic, email: userEmail, name: userName } = response.profileObj
      this.props.setUserGoogleInfo({ googleId, UserPic, userEmail, userName })
      toastr.success('登入成功')
    }
  }
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
            單字庫總字數: {Object.keys(this.props.pickedComb).reduce(
              (acc, index) => acc + this.props.pickedComb[index].length, 0)}
          </InfoSave>
          {/* <InfoSave>尚未有任何變更</InfoSave> */}
          {/* <InfoUser>galadiya41@gmail.com</InfoUser> */}
          <InfoUser>
            {this.props.googleOauth.googleId === 0
              ? <GoogleLogin
                clientId="682853208442-tl3uos3lgc3sddc99gj857gartvacbuo.apps.googleusercontent.com"
                render={renderProps => (
                  <p style={{ color: '#E6E6E6', fontSize: '17px', cursor: 'pointer' }} onClick={renderProps.onClick} disabled={renderProps.disabled}>登入</p>
                )}
                onSuccess={(response) => this.getGoogleResponse(response)}
                onFailure={(response) => this.getGoogleResponse(response)}
                cookiePolicy={'single_host_origin'}
              />
              : <GoogleLogout
                clientId="682853208442-tl3uos3lgc3sddc99gj857gartvacbuo.apps.googleusercontent.com"
                render={renderProps => (
                  <div>
                    <span>{this.props.googleOauth.userEmail}</span>
                    <span style={{ color: '#E6E6E6', fontSize: '17px', marginLeft: '10px', cursor: 'pointer' }} onClick={renderProps.onClick} disabled={renderProps.disabled}>登出</span>
                  </div>
                )}
                onLogoutSuccess={() => {
                  this.props.setUserGoogleInfo({ googleId: 0, UserPic: '', userEmail: '', userName: '' })
                  toastr.success('登出成功')
                }}
                cookiePolicy={'single_host_origin'}
              />}
          </InfoUser>
          <InfoUserPic>
            <UserImg img={this.props.googleOauth.UserPic} />
          </InfoUserPic>
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
    pickedComb: state.defaultReducer.pickedComb,
    googleOauth: state.defaultReducer.googleOauth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    triggerMenu: bool => dispatch(triggerMenu(bool)),
    changeView: str => dispatch(changeView(str)),
    inputTextChange: num => dispatch(inputTextChange(num)),
    setUserGoogleInfo: obj => dispatch(setUserGoogleInfo(obj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
