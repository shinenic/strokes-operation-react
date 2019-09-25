import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { pickName } from '../actions';

const ColumnIndex = styled.div`
  grid-area:index;
  width:50px;
  display: grid;
  justify-content: center;
  align-items: center;
`;
const BorderText = styled.span`
  /* border-radius:5px; */
  /* border:2px solid black; */
  box-sizing:border-box;
  padding:5px;
  font-weight:bold;
  font-size:18px;
`;
const ColumnChar = styled.div`
  box-sizing:border-box;
  padding:5px;
  grid-area:character;
  border-bottom:1px solid rgb(209,215,222);
`;
const Row = styled.div`
  box-sizing:border-box;
  margin:20px 40px;
  display:grid;
  grid-template-columns:60px 1fr;
  grid-template-areas:"index character";
`;

const OverviewDiv = styled.div`
  height:calc(100vh - 140px);
  width:calc(100vw - 250px);
  overflow: scroll;
  /* ${Row}:nth-child(odd) ${BorderText}{
    border:2px solid black;
  } */
`;

class Overview extends PureComponent {
  render() {
    const data = this.props.groupChar;
    return (
      <OverviewDiv>
        {Object.keys(data).map((value, index) => {
          return (
            <Row>
              <ColumnIndex><BorderText>{value}</BorderText></ColumnIndex>
              <ColumnChar>
                {data[value].map((value, index) => {
                  return (
                    <span>
                      {value + ` `}
                    </span>
                  )
                })}
              </ColumnChar>
            </Row>
          )
        })}

      </OverviewDiv >
    )
  }
}

const mapStateToProps = state => {
  return {
    groupChar: state.defaultReducer.groupChar,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // pickName: (str) => dispatch(pickName(str)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
