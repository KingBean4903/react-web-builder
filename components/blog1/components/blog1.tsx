import React from 'react';
import { useRef, useEffect } from 'react';

const sections = {

	Column: Column,
	Row: Row,
	IconButton: IconButton, 
	ActionBar: ActionBar,
	Grid: Atag,
	HorizontalMenu: HorizontalMenu,
	MediaImg: MediaImg,
	Header: Header,
};

interface HeaderProps {
	elements: any;
	style: React.CSSProperties;
}

function Header({ elements, style }: { elements : any , style: React.CSSProperties }) {

	
	const items = elements.map(item => {
				const Block = sections[item.tag]
				return <Block key={crypto.randomUUID()} {...item } />
	})

	return(
			<div style={style}>
					{items}
			</div>

	)
}


function Column({elements, style }: { elements : any , style: React.CSSProperties }) {

	const canvasRef = useRef(null);
	const columnRef = useRef<HTMLDivElement>(null);

	const items =  elements.map(item => {
				const Block = sections[item.tag]
				return <Block key={crypto.randomUUID()} {...item } />
	});


	return(
			<div ref={columnRef} style={style}>
				{items}
			</div>

	)
}

function Row({ children, styles }) {

	return(
			<div>
				{children}
			</div>

	)
}
function MediaImg({ props }){ 
		return(
				<img src={props.src} alt={props.alt} />
		)
}

function HorizontalMenu({ props,style, isFocussed}) {
		
	const cnvRef = useRef(null);
	const divRef = useRef(null);

	const links = props.links.map(one => <li><Atag text={one} url="#" /></li> )
	
	useEffect(() => {

				const ctx = cnvRef.current.getContext("2d");	
				if (isFocussed) {	
					handleClick(ctx);
				} else {
					ctx.ClearRect()	
				}
	}, [isFocussed])


	function handleClick(ctx) { 
			//const ctx = cnvRef.current.getContext("2d");
			let rect = divRef.current.getBoundingClientRect();
			let cRect = cnvRef.current.getBoundingClientRect();

			let [width, height] = computeSize(divRef.current);

			console.log(`Rect Size ${rect.width} ${rect.height}`)
			console.log(`Width ${width} ${height}`)

			let totalWidth = width + rect.width;
			let totalHeight = height + rect.height;

			console.log(`Totals Width ${totalWidth} ${totalHeight}`)
	}

	function computeSize(element) {
			
			const cSize = window.getComputedStyle(element);
			const marginTop = parseFloat(cSize.marginTop);
			const marginRight = parseFloat(cSize.marginRight);
			const marginBottom = parseFloat(cSize.marginBottom);
			
			console.log(`Margin bottom ${marginBottom}`);
			const marginLeft= parseFloat(cSize.marginLeft);

			const paddingBottom = parseFloat(cSize.paddingBottom);
			console.log(`Padding bottom ${paddingBottom}`);
			const paddingTop = parseFloat(cSize.paddingTop);
			const paddingLeft = parseFloat(cSize.paddingLeft);
			const paddingRight= parseFloat(cSize.paddingRight);

			const totalWidth = paddingLeft + paddingRight + marginRight + marginLeft;
			const totalHeight = paddingTop + paddingBottom + marginBottom + marginTop;

			return [totalWidth, totalHeight];
	}


	return(
		<div style={{
					position:"relative",
				 }}

				ref={divRef}> 
		

			<div style={{
						position: "absolute",
						zIndex: 500,
						top: 0,
						left: 0,
						width: "100%", 
						height: "100%",
				}}>
				
				<canvas style={{
							width: "100%", 
							border: "1px solid pink",
							height: "100%",
							zIndex: 999,
					 }}
					 ref={cnvRef}>
					</canvas>
			
			</div>

			

			<div style={{
						width: "100%", 
					  padding: ".5em .5em",
						height: "100%",
				}}>

					<ul style={style}>
						{links}
					</ul>
			
			</div>

		</div>
	)
}

function Atag({ text, url}) {
		return(
			<a href={url}>{text}</a>
		)
}


function Grid({ children }) {
	
	return(
			<div>
				{children}
			</div>
	)

}


function ActionBar({ children}) {

	const items =  children.map(item => {
				const Block = sections[item.tag]
				return <Block key={crypto.randomUUID()} {...item } />
	})
	return(
			<div >
				{items}
			</div>
	)
}

function UserText() {
	
}

function LoggedInUser() {
	


}

function IconButton({ props }) {	
	return(
			<button type="button" >
				{props.text}
			</button>
	)
}

export { Column, Row, IconButton, ActionBar, Grid, Atag, HorizontalMenu, MediaImg, Header}
