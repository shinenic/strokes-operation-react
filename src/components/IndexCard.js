import React, { PureComponent } from 'react'
import styled from 'styled-components';
import BooksImg from '../image/indexCard/books.png';
import checkImg from '../image/indexCard/check.png';
import linkImg from '../image/indexCard/link.png';
import { ShowDivAni } from '../styles/AnimationStyled';
import { connect } from 'react-redux';
import { cleanAllInput } from '../actions';

const IndexCardDiv = styled.div`
  height:100%;
  width:100%;
  grid-area: main;

`;
const GridContainer = styled.div`
  height:100%;
  width:100%;
  display:grid;
  grid-template-columns:40px 0.33fr 0.33fr 0.33fr 40px;
  grid-template-rows:0.3fr 400px 0.7fr;
  grid-template-areas:
    ". . . . ."
    ". card1 card2 card3 ."
    ". . . . .";
`;
const Card1 = styled.div`
  grid-area:card1;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border:5px solid black;
  transition: 0.3s;
  width: 80%;
  box-sizing:border-box;
  padding:5px;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align:center;
  animation: ${ShowDivAni} 1s 1 both 0.1s;
  /* color: white; 
  text-shadow: black 0.1em 0.1em 0.2em 數字使用陰影 */
`;
const Card2 = styled(Card1)`
  grid-area:card2;
  animation: ${ShowDivAni} 1s 1 both 0.3s;
  /* @media (max-width: 1200px){
    justify-content: start;
  } */
`;
const Card3 = styled(Card1)`
  grid-area:card3;
  animation: ${ShowDivAni} 1s 1 both 0.5s;
  /* @media (max-width: 1200px){
    justify-content: end;
    margin-right:10px;
  } */
`;
const Books = styled.img`
  content:url(${BooksImg});
  height:45px;
  width:45px;
  filter:invert(0.3);
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
`;
const Check = styled(Books)`
  content:url(${checkImg});
`;
const Link = styled(Books)`
  content:url(${linkImg});
`;
const ImgBorder = styled.div`
  border-radius:50%; 
  border: 3px solid rgb(49,54,66); 
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  height:64px;
  width:64px;
  margin: 0 auto 60px auto;
  cursor: pointer;
  position:relative;
`;



class IndexCard extends PureComponent {
  render() {
    const pickedCount = obj => {
      return Object.keys(obj).reduce((acc, index) => {
        return acc + obj[index].length;
      }, 0)
    }
    return (
      <IndexCardDiv>
        <GridContainer>
          {/* <Blank /> */}
          <Card1>
            <div>
              <ImgBorder><Books /></ImgBorder>
              <h2>單字庫</h2>
              <p>{Object.keys(this.props.character).length}</p>
            </div>
          </Card1>
          <Card2>
            <div>
              <ImgBorder><Check /></ImgBorder>
              <h2>已選擇組合</h2>
              <p>{pickedCount(this.props.pickedComb)}</p>
            </div>
          </Card2>
          <Card3>
            <div>
              <ImgBorder><Link /></ImgBorder>
              <h2>總組合數</h2>
              <p>{Object.keys(this.props.character).length * Object.keys(this.props.character).length}</p>
            </div>
          </Card3>
        </GridContainer>
      </IndexCardDiv >
    )
  }
}
const mapStatetoProps = state => {
  return {
    character: state.character,
    pickedComb: state.pickedComb
  }
}
const mapDispatchToProps = dispatch => {
  return {
    cleanAllInput: () => dispatch(cleanAllInput())
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(IndexCard);