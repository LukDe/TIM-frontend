import React, { PropTypes } from 'react'


class CircleSearch extends React.Component {
	render(){
		return (
			<div>
				<p></p>
				<input type="integer" name="radius" placeholder="Radius"/>
				<button type="button">Suchen</button>
			</div>
			);
	}
}
export default CircleSearch;