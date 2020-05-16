import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class Star extends Component {
    constructor(props){
        super(props)
            this.state = {
              aggregateRating: 0,
              students: 0
            }
        
    }

    componentDidUpdate(prevProps, prevState){
      const {index, sVideos} = this.props;
      if(prevProps.sVideos[index] !== sVideos[index]){
        this.setState({
          aggregateRating: sVideos[index].rating,
          students: sVideos[index].stds
        });
      }
    }

    componentDidMount(){
      const {index, getAvgRating, sVideos} = this.props;
      
      const retrieveRating = async()=>{
          const temp = await getAvgRating(sVideos)
          
          if(!isNaN(temp[0][index])){
              this.setState({
                aggregateRating: temp[0][index],
                students: temp[1][index]
              });
          }
      }

      retrieveRating()  
  }
 
    render() {
      const {aggregateRating, students} = this.state;
      const {userType} = this.props
      const aggregateStyle = {display: "inline-block", margin: "-10px 0 0 6px", color:"#6c757d", 
                              fontSize: userType === 'students'? "12px":"16px",
                              fontWeight: "bolder"
                              }
      return (
        <div className="starBlock" style={{paddingTop: "0px", cursor: "not-allowed"}}>
          <StarRatings
            rating={ this.state.aggregateRating }
            starRatedColor= {userType === 'students'? "#000":'#ffc107'}
            numberOfStars={5}
            name='rating'
            starWidthAndHeight = {userType === 'students'? "12px":"17px"}
            starSpacing= {userType === 'students'? "1px":"3px"}
            isSelectable={false}
            isAggregateRating={true}
            
          />
          <span style={aggregateStyle}> {aggregateRating}</span>
          <p style={{padding: "5px 0 0 0" }}>({students} ratings)</p>
        </div>
       
      );
    }
}



export default Star
