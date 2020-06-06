import React from 'react';
import ReactDOM from 'react-dom';
import ListAllUsers from './components/ListAllUsers'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div>
			<h1>_TecnoForum_</h1>{' '}
			<ListAllUsers/>
			</div>
		);
	}
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));
