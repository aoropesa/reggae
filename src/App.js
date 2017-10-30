import React, { Component } from 'react';

function Search(props){
    const {children, onChange, value, className} = props;
    return (
      <form className={className}>
        <p className='search-title'>{children}</p><input type="text" onChange={onChange} value={value}/>
      </form>
    );
  }

  // function isSearched(artist) {
  //     return function(item) {
  //       return item.Reggae.toLowerCase().includes(artist.toLowerCase())
  //    }
  //  }

  function List ({list,searchArtist}){
      return  <div className='table'>
      {list.Reggae.map(item => (
        item.toLowerCase().includes(searchArtist.toLowerCase())
        ? <li className="artist">{item}</li>
        : null
      ))}
    </div>
    }

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchArtist: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.fetchArtist = this.fetchArtist.bind(this);
  }

  fetchArtist(searchArtist){
    fetch(`https://gist.githubusercontent.com/anonymous/1295788c7bff052a1e8a/raw/6e109604c7a7f3efe77c8048bb2fe2f3e1cdcb7b/gistfile1.json${searchArtist}`)
      .then(response => response.json())
      .then(result => this.setState({result: result}))
      .catch(e => e);
  }

  componentDidMount(){
    const {searchArtist} = this.state;
    this.fetchArtist(searchArtist);
  }

  onSearchChange(event){
    this.setState({searchArtist: event.target.value});
  }

  render() {
    const {result, searchArtist} = this.state;
    if(!result) return null;
    return (
      <div className="App">
        <div className="title">
          <p className="first">React Search!</p>
          <p className="paragraph">Here is a list of Reggae artists rendered from a JSON object</p>
        </div>
        <Search className= 'search' value={searchArtist} onChange={this.onSearchChange}>Search: </Search>
         <List list={result} searchArtist={searchArtist}/>
      </div>
    );
  }
}

export default App;
