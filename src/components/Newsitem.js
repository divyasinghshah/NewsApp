import React, { Component } from 'react'

export class Newsitem extends Component {
   
  render() {
      let {title, description,imgUrl,newsUrl,author,date,source}=this.props;
    return (
      
        <div className='my-3'>
             
            <div className="card" >
              
              
            <img src={imgUrl} className="card-img-top" alt="..."/>
            
            <div className="card-body">
              
                <h5 className="card-title">{title} <span  class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:1}}>
                  {source}
                    
                  </span></h5>
                <p className="card-text">{description}...</p>
                <p class="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="blank" className="btn btn-primary btn-sm">Read More</a>
            </div>
            </div>

        </div>

      
    )
  }
}

export default Newsitem