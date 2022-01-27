import React from "react";

class ClassCounter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
        //ПРи использовании записи increment(){} или decrement(){} необходимо явно указывать контекст
        //this.increment = this.increment.bind(this)
       // this.decrement = this.decrement.bind(this)
    }


    increment = () =>{
        this.setState({count: this.state.count + 1})
        console.log(this)
    }
    
    decrement = () =>{
        this.setState({count: this.state.count - 1})
        console.log(this)
    }

    render() {
         return(
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
         )
    }
}

export default ClassCounter;