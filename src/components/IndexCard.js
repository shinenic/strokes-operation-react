import React, { PureComponent } from 'react'
import styled from 'styled-components';
import BooksImg from '../image/indexCard/books.png';
import checkImg from '../image/indexCard/check.png';
import linkImg from '../image/indexCard/link.png';
import { ShowDivAni } from '../styles/AnimationStyled';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { cleanAllInput } from '../actions';

const IndexCardDiv = styled.div`
  height:100%;
  width:100%;
  grid-area: main;
  color:rgb(49,54,66);
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


const Books = styled.img`
  content:url(${BooksImg});
  height:67%;
  width:67%;
  filter:invert(1);
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


const BooksBorder = styled.div`
  border-radius:50%; 
  /* border: 3px solid rgb(215,225,235);  */
  transition: 0.3s;
  background:rgb(219,102,35);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
  height:64px;
  width:64px;
  margin: 60px auto 60px auto;
  cursor: pointer;
  position:relative;
`;
const CheckBorder = styled(BooksBorder)`
  background:rgb(62,94,179);

`;
const LinkBorder = styled(BooksBorder)`
  background:rgb(170,198,52);

`;
const CountText = styled.span`
  font-weight:bold;
  font-size:26px;
`;

const Card1 = styled.div`
  grid-area:card1;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1); 
  border-radius:5px;
  transition: 0.3s;
  width:80%;
  max-width:250px;
  height:95%;
  box-sizing:border-box;
  padding:5px;
  text-align:center;
  animation: ${ShowDivAni} 1s 1 both 0.1s;
  background:rgb(217,225,232);
  box-sizing: border-box;
  &:hover{
    height:100%;
    border-bottom:10px solid rgb(219,102,35);
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.2); 
  }
  &:hover ${BooksBorder} {
    height:80px;
    width:80px;
  }
`;
const Card2 = styled(Card1)`
  grid-area:card2;
  animation: ${ShowDivAni} 1s 1 both 0.3s;
  &:hover{
    border-bottom:10px solid rgb(62,94,179);
  }
`;
const Card3 = styled(Card1)`
  grid-area:card3;
  animation: ${ShowDivAni} 1s 1 both 0.5s;
  &:hover{
    border-bottom:10px solid rgb(170,198,52);
  }
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
              <BooksBorder><Books /></BooksBorder>
              <h2>單字庫</h2>
              <CountText>
                <CountUp
                  separator=","
                  suffix="  字"
                  end={Object.keys(this.props.character).length} />
              </CountText>
            </div>
          </Card1>
          <Card2>
            <div>
              <CheckBorder><Check /></CheckBorder>
              <h2>已選擇組合</h2>
              <CountText>
                <CountUp
                  separator=","
                  suffix="  組"
                  end={pickedCount(this.props.pickedComb)} />
              </CountText>
            </div>
          </Card2>
          <Card3>
            <div>
              <LinkBorder><Link /></LinkBorder>
              <h2>總組合數</h2>
              <CountText>
                <CountUp
                  separator=","
                  suffix="  組"
                  end={Object.keys(this.props.character).length * Object.keys(this.props.character).length} />
              </CountText>
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