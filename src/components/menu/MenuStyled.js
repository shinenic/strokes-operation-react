import styled from 'styled-components'
import Color from '../../styles/ThemeColor'
import menuIcon from '../../image/menuIcon.png'
import GithubLogo from '../../image/github-logo.png'

const getImgSrc = name => {
  return require(`../../image/menu/${name}.png`);
}

export const MenuDiv = styled.div`
  grid-area: menu;
  background:${Color.black[0]};
  @media (max-width: 480px){
    grid-area: null;
    position:fixed;
    z-index:101;
    top:0;
    right:${props => props.expand ? '0' : '-300px'};
    transition:0.4s;
    opacity:0.9;
    width:300px;
    min-height:100%;
  }
`;
export const UserImg = styled.img`
  content:url(${GithubLogo});
  height:34px;
  width:34px;
  margin:13px auto auto 36px;
  cursor: pointer;
  filter: invert(1);
`
export const MobileHeader = styled.div`
  display:none;
  @media (max-width: 480px){
    display:block;
    width:100%;
    height:60px;
    position:relative;
  }
`;

export const Text = styled.div`
  box-sizing: border-box;
  width:100%;
  height:65px;
  line-height:65px;
  padding-left:10%;
  font-size:17px;
  /* color:${Color.text[0]}; */
  color:${props => props.disable ? Color.textDisable : Color.text[0]}};
  cursor:${props => props.disable ? '' : 'pointer'};
  transition: 0.3s;
  background:${props => props.picked ? Color.redActive : Color.black[0]};
  &:hover{
    background:${props => props.picked ? Color.redActive : props.disable ? Color.black[0] : Color.redHover};
  }
`;
export const TextInput = styled.div`
  transition:0.4s;
  height:${props => props.expand === '' || props.expand === 'closeDiv' ? '0' : '65px'};
  width:100%;
  line-height:65px;
  padding-left:9%;
  box-sizing: border-box;
  overflow: hidden;
  color:${Color.inputBg};
`;
export const Input = styled.input`
  padding: 5px 7px;
  background: ${Color.inputBg};
  border: 0 none;
  border-radius:0;
  border-right:1px solid black;
  width:${props => props.single ? '75%' : '37.5%'};
  height:35px;
  box-sizing: border-box;
  display:inline-block;
  vertical-align: middle;
`;
export const Button = styled.div`
  height:35px;
  line-height:35px;
  border: 0 none;
  border-radius:0;
  background: #EEE;
  font-size:13px;
  color:Black;
  padding-left:5px;
  padding-right:5px;
  cursor: pointer;
  box-sizing: border-box;
  vertical-align: middle;
  display:inline-block;
`;
export const MenuImg = styled.img`
  content:url(${menuIcon});
  transition: 0.3s;
  height:60px;
  width:60px;
  padding:27px 95px 27px 95px;
  margin-bottom:15px;
  filter:invert(0.8);
  cursor:pointer;
  &:hover{
    filter:invert(1);
  }
  @media (max-width: 480px){
    display:none;
  }
`;
export const IconDiv = styled.div`
  display:inline-block;
  width:15px;
  height:15px;
  margin-right:20px;
  position: relative;
  top:1px;
  background-image: url(${props => getImgSrc(props.icon)});
  background-size: cover;  
  filter: ${props => props.disable ? 'invert(0.65)' : 'invert(1)'};
`;