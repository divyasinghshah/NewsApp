import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

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
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9c81dad13a8646e4bd4c34757b61e70b&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        });
        
    }
   handlePreviousClick= async()=>{
     console.log("Previous");

     let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true}); 
     let data= await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      
      
      this.setState({
        articles: parsedData.articles,
        page: this.state.page-1,
        loading:false
      });


    }
    handleNextClick= async ()=>{
      console.log("Next");
      if(this.state.page+1<= Math.ceil(this.state.totalResults/this.props.pageSize))
      {
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        
        
        this.setState({
          articles: parsedData.articles,
          page: this.state.page+1,
          loading:false
        });
      }
      
     


    }
  render() {
    return (
      <div className='container my-3'>
          <h2>New Monkey - Top Headlines</h2>
          {this.state.loading && <Spinner/>}
          

          <div className="row">

          {!this.state.loading && this.state.articles.map((element)=>{
             return <div className="col-md-3" key={element.url}>
                 <Newsitem  title={element.title} description={element.description} 
                 imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
            
            

          </div>
          
         
          <div className="container  d-flex justify-content-between">
            <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr;Previous</button>
            <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>


      </div>
    )
  }
}

export default News