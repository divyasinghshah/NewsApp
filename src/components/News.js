import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProptypes={
    country:'in',
    pageSize:8,
    category:'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
    
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
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c81dad13a8646e4bd4c34757b61e70b&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        });
        
    }
    
   updateNews=  async ()=>{

    if(this.state.page<= Math.ceil(this.state.totalResults/this.props.pageSize))
    {
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      
      
      this.setState({
        articles: parsedData.articles,        
        loading:false,
        totalResults:parsedData.totalResults
      });
    }

  }
   handlePreviousClick= async()=>{
     console.log("Previous");

    //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true}); 
    //  let data= await fetch(url);
    //   let parsedData= await data.json();
    //   console.log(parsedData);
      
      
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page-1,
    //     loading:false
    //   });

      this.setState({
        page:this.state.page+1
      });
      this.updateNews();


    }


    handleNextClick= async ()=>{
      console.log("Next");
      // if(this.state.page+1<= Math.ceil(this.state.totalResults/this.props.pageSize))
      // {
      //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      //   this.setState({loading:true});
      //   let data= await fetch(url);
      //   let parsedData= await data.json();
      //   console.log(parsedData);
        
        
      //   this.setState({
      //     articles: parsedData.articles,
      //     page: this.state.page+1,
      //     loading:false
      //   });
      // }

      this.setState({
        page:this.state.page+1
      });
      this.updateNews(); 
    
    }

    fetchMoreData= async()=>{
      this.setState({page:this.state.page+1});
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=9c81dad13a8646e4bd4c34757b61e70b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      let data=await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      
      
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),        
        loading:false,
        totalResults:parsedData.totalResults
      });

    }

  render() {
    return (
      <>
      
          <h2 className='text-center my-5'>New Monkey - Top Headlines</h2>
          {this.state.loading && <Spinner/>}
          
          <InfiniteScroll
            pageStart={0}
            dataLength={this.state.articles.length}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spinner/>}
            next={this.fetchMoreData}
        >  
          <div className="container">

          
          <div className="row">

          {this.state.articles.map((element)=>{
             return <div className="col-md-3" key={element.url}>
                 <Newsitem  title={element.title} description={element.description} 
                 imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>

          })}
            
            

          </div>
          </div>

          </InfiniteScroll>
          
         
          {/* <div className="container  d-flex justify-content-between">
            <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr;Previous</button>
            <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}

          
          </>
      
    )
  }
}

export default News