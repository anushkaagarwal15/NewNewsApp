import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country : 'us',
    pageSize: 8
  }
 
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(){
    super();
    console.log("hello from news component");
    // this.state = { articles: this.articles, 
    this.state ={
      articles: [],
      loading: false,
      page: 1

     }

  }

  //run after render method
  //async function can wait for promises to resolve
  async componentDidMount(){

    //backticks are used to make it variable
    let url = `https://newsapi.org/v2/top-headlines?country={this.props.country}&category=business&apiKey=8788bd51ce994b37978b46384abcef67&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,
       totalResults: parsedData.totalResults,
      loading: false})
  }

   handlePrevClick = async ()=>{
    console.log('Previous')
    //change page no by 1

    
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8788bd51ce994b37978b46384abcef67&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page : this.state.page - 1,
      articles: parsedData.articles,
      loading: false

    })
  }


   handleNextClick = async ()=>{
    console.log('Next')
    //increase page number by 1
    //shows total no of pages required
    if(!(this.state.page + 1 >  Math.ceil(this.state.totalResults/this.props.pageSize))){

      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8788bd51ce994b37978b46384abcef67&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //jb data aa rha ie load ho rha h spinner aaega 
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      //console.log(parsedData);
        
      this.setState({
        page : this.state.page + 1,
        articles: parsedData.articles,
        loading:false
  
      })
    }

  }



  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center"> NewsApp - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row"> 
          {/* medium devices m 4 col will take take 12 column ki grid hoti h bootstrap m */}
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} 
            imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
     
        </div>  

        <div className="conatiner d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 >  Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>     
      </div>
    )
  }
}

export default News
