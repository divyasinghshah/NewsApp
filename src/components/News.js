import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    
    constructor(){
        super();
        console.log("Hello i am a constructer from news");
        this.state={
            articles:[],
            loading:false           

        }
    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=9c81dad13a8646e4bd4c34757b61e70b";
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
        
    }
  render() {
    return (
      <div className='container my-3'>
          <h2>New Monkey - Top Headlines</h2>
          

          <div className="row">

          { this.state.articles.map((element)=>{
             return <div className="col-md-3" key={element.url}>
                 <Newsitem  title={element.title} description={element.description.slice(0,88)} 
                 imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
            
            

          </div>
          
         



      </div>
    )
  }
}

export default News