'use client'

import {useState, createRef, Fragment} from 'react';

const Svgboard = () => {
	const ref = createRef();
	console.log(ref);

	const handleMouseDown = () => {
		console.log('MouseDown');
	}

	const handleMouseMove = () => {
		console.log('MouseMove');
	}

	const handleMouseUp = () => {
		console.log('MouseUp');
	}

	return (
		<Fragment>
			<section>
				<p>Mouse move: </p>
			</section>
			<div style={{background: 'white', height: '400px', width: '600px'}}>
			<svg
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			></svg>
			</div>
		</Fragment>
	)
}

export default Svgboard;