import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    
    constructor(){
        super();
        console.log("Hello i am a constructer from news");
        this.state={
            articles:[],
            loading:false ,
            page:1,
            totalResults:0          

        }
    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9c81dad13a8646e4bd4c34757b61e70b&pageSize=20";
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults});
        
    }
   handlePreviousClick= async()=>{
     console.log("Previous");

     let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page-1}&pageSize=20`;
      let data= await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      
      
      this.setState({
        articles: parsedData.articles,
        page: this.state.page-1
      });


    }
    handleNextClick= async ()=>{
      console.log("Next");
      if(this.state.page+1<= Math.ceil(this.state.totalResults/20))
      {
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page+1}&pageSize=20`;
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        
        
        this.setState({
          articles: parsedData.articles,
          page: this.state.page+1
        });
      }
      
     


    }
  render() {
    return (
      <div className='container my-3'>
          <h2>New Monkey - Top Headlines</h2>
          

          <div className="row">

          { this.state.articles.map((element)=>{
             return <div className="col-md-3" key={element.url}>
                 <Newsitem  title={element.title} description={element.description} 
                 imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
            
            

          </div>
          
         
          <div className="container  d-flex justify-content-between">
            <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr;Previous</button>
            <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/20)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>


      </div>
    )
  }
}

export default News