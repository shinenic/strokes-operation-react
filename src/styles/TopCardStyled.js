import styled, { keyframes } from 'styled-components';
import searchIcon from '../image/search_white.png';
import crossIcon from '../image/cross_white.png';
import menuIcon from '../image/menu_white.png';
import { Link } from 'react-router-dom'

const ImgMinSize = '26px';
const ImgMaxSize = '30px';

export const StyledLink = styled(Link)`
    text-decoration: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const Title = styled.span`
  float:left;
  color:white;
  font-weight:bold;
  margin-left:47px;
`;

export const Hamburger = styled.button`
  float:right;
  width:25px;
  height:25px;
  margin:0;
`;
export const MenuImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${menuIcon});
  height:23px;
  width:23px;
  position: absolute;
  left:15px;
  top:50%;
  transform: translateY(-50%);
  cursor: pointer; 
  z-index:12;
`;

const SearchInit = keyframes`
  to{
    height:${ImgMinSize};
    top:40%;
    transform: translateY(-40%);
  }
`;
export const SearchImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${searchIcon});
  height:${ImgMaxSize};
  position: absolute;
  right:25px;
  top:50%;
  transform: translateY(-50%);
  cursor: pointer; 
  z-index:12;
  animation-name:
  ${props => props.textboxState === 'OPEN' && SearchInit};
  animation-duration:0.5s;
  /* animation-direction:${props => props.text === '' ? 'normal' : 'reverse'} ; */
  animation-fill-mode:both;
`;
export const CrossImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${crossIcon});
  height:${ImgMinSize};
  position: absolute;
  right:25px;
  top:40%;
  transform: translateY(-40%);
  cursor: pointer; 
  z-index:12;
`;

const InputOpen = keyframes`
  0%{
  width:25px;
  visibility:visible;
    }
  100%{
  width:115px;
  visibility:visible;
  }
`;
export const TextInput = styled.input`
  outline:none;
  background:#013B63;
  border: none;
  border-bottom: 3px solid white;
  color:white;
  font-size:17px;

  padding:0;
  padding-left:10px;
  height:25px;
  width:25px;
  position: absolute;
  right:25px;
  top:57%;
  -ms-transform: translateY(-57%);
  transform: translateY(-57%);
  visibility: hidden;
  animation: 
    ${props => props.switch === "OPEN" && InputOpen} 
     0.7s 1 both 0.3s;
`;


const zoomOut = keyframes`
  from{
    height:80px;
    line-height:80px;
    font-size:27px;
    }
  to{
    height:55px;
    line-height:55px;
    font-size:23px;
  }
`;
export const TopCardDiv = styled.div`
  background:#013B63;
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  margin:0;
  font-size:${props => props.topCardState === 'DOWN' ? '23px' : '27px'} ;
  line-height:${props => props.topCardState === 'DOWN' ? '55px' : '80px'} ;
  height:${props => props.topCardState === 'DOWN' ? '55px' : '80px'} ;
  z-index:10;
  animation-name:${props => (props.topCardState === 'MIN' || props.topCardState === 'MAX') && zoomOut} ;
  animation-duration:0.7s;
  animation-direction:${props => props.topCardState === 'MIN' ? 'normal' : 'reverse'} ;
  animation-fill-mode:both;
`;