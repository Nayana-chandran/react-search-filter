import React from 'react';
class Search extends React.Component{
  constructor(){
    super();
    this.state = {
      data:'',
      items: []
    }
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({data: result});
        }
        )
  }

  filterList(event){
    var updatedList = this.state.data;
    console.log('-----------------',updatedList)
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  componentWillMount(){
    this.setState({items: this.state.data})
  }

  render(){
      
    return (
      <div>
        <form>
        <fieldset>
        <input type="text" placeholder="Search" onChange={this.filterList}/>
        </fieldset>
        </form>
      <List items={this.state.items}/>
      </div>
    );
  }
}
class List extends React.Component{
  render(){
    return (
      <ul>
      {this.props.items && 
        this.props.items.map(function(item) {
          return <li key={item.name}>{item.name}</li>
        })
       }
      </ul>
    )  
  }
};

export default Search;