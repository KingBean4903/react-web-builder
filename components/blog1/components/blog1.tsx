import React from 'react';
import { useRef, useEffect, useState } from 'react';

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
		
	const divRef = useRef(null);
	const boxRef = useRef(null);

	const handleRef = useRef(null);

	const links = props.links.map(one => <li><Atag text={one} url="#" /></li> )
	


	function handleClick(ctx) { 
			//const ctx = cnvRef.current.getContext("2d");
			let rect = divRef.current.getBoundingClientRect();
			let cRect = boxRef.current.getBoundingClientRect();

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
					border: "4px solid yellow"
				 }}
				ref={divRef}> 
		
			<BoundingBox boxRef={boxRef} handleRef={handleRef} />

			
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

function BoundingBox({ boxRef, handleRef }) {
	
	//
	const [rect, setRect] = useState({ xr: 0, yr: 0, width: 200, height: 150 });

	const [pos, setPos] = useState({
					x: 0,
					y: 0,
		});

		// Bounding box refs
		const liveRectRef = useRef({ ...rect });
		const startRectRef = useRef({ ...rect });


		// Refs for dragging
		const draggingRef = useRef(false);
		const startMouseRef = useRef({ x: 0, y: 0 });
		const startPosRef = useRef({ x: 0, y: 0 });
	  const livePosRef = useRef({ x: pos.x, y: pos.y })

		useEffect(() => {
			let frameId: number;
			
			const animate = () => {
					if (handleRef.current && boxRef.current) {
							const { x,  y } = livePosRef.current;
							const { xr, yr, width, height} = liveRectRef.current;
							boxRef.current.style.transform = `translate(${x})`;
							boxRef.current.style.width = `${width}px`;
							handleRef.current.style.transform = `translate(${x}px)`;
					}
					frameId = requestAnimationFrame(animate);
			};

			frameId = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(frameId);
		}, []);

		const onMouseDown = (e: React.MouseEvent) => {

				draggingRef.current = true;
				startMouseRef.current = { x: e.clientX, y: e.clientY };
				startPosRef.current = { ...livePosRef.current };

				startRectRef.current = { ...liveRectRef.current };

				document.addEventListener("mousemove", onMouseMove);
				document.addEventListener("mouseup", onMouseUp);
		}
		
		const onMouseMove = (e: MouseEvent) => {
			if (!draggingRef.current) return;

			const dx = e.clientX - startMouseRef.current.x;
			const dy = e.clientY - startMouseRef.current.y;
			const { xr, yr, width, height } = startRectRef.current;
			let newRect = { xr, yr, width, height};

			newRect.width = Math.max(50, width + dx);
			liveRectRef.current = newRect;


			livePosRef.current = {
					x: startPosRef.current.x + dx,
					y: startPosRef.current.y + dy,
			};
		
		};


		const onMouseUp = () => {
				draggingRef.current = false;

				setPos({ ...livePosRef.current });

				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
		}



	return(
			<>

			<div style={{
						position: "absolute",
						zIndex: 500,
						left: 0,
						top: 0,
						width: rect.width, 
						tranform: `translate(${rect.x}px)`,
						border: "1px solid green",
						height: rect.height,
				}} ref={boxRef}>
	
				<div ref={handleRef} 
							  onMouseDown={onMouseDown} 
								style={{
								border: "1px solid green",
								width: "14px",
								zIndex: 999,
								height: "14px",
								borderRadius: "50%",
								background: "#E0E0E0",
								position:  "absolute",
								top: "35%",
								left: "-7px",
								transform: `translate(${pos.x}px)`
					}}>
				</div>

			</div>
			</>
	)

}

function RightHandle({ handleRef }) {






	return(
				<div ref={handleRef} 
							  onMouseDown={onMouseDown} 
								style={{
								border: "1px solid green",
								width: "14px",
								zIndex: 999,
								height: "14px",
								borderRadius: "50%",
								background: "#E0E0E0",
								position:  "absolute",
								top: "35%",
								left: "-7px",
								transform: `translate(${pos.x}px)`
					}}>
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
