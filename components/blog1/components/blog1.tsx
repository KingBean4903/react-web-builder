import React from 'react';
import { useLayoutEffect, useRef, useEffect, useState } from 'react';

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

	const [containerSize, setContainerSize] = useState({ width: 500, height: 90});

	const [size, setSize] = useState({ width: 0, height: 0 });

	const links = props.links.map(one => <li key={crypto.randomUUID()}><Atag text={one} url="#" /></li> )
	
  useEffect(() => {

		/*if (divRef.current) {
				const { clientWidth, clientHeight } = divRef.current;
				setSize({ width: clientWidth, height: clientHeight });
				} */

		if (!boxRef.current) return;

		const observer = new ResizeObserver((entries) => {
			requestAnimationFrame(() => {
							for (let entry of entries) {


								const { width, height } = entry.contentRect;
								const left = boxRef.current?.offsetLeft ?? 0;
								const top = boxRef.current?.offsetTop ?? 0;

								setContainerSize({
										width: left + width,
										height: top + height,
								})
							}
			});

		});

		observer.observe(boxRef.current);

		return () => observer.disconnect();

	}, []);


	return(
		<div style={{ width: '700px', display: 'flex', alignItems: 'center'
									, justifyContent: 'end', height: '200px'
			}}> 
		<div style={{
			  
					position:"relative",
					border: "4px solid yellow",
					width: `${containerSize.width}px`,
					height: `${containerSize.height}px`,
				 }}
				ref={divRef}> 
	    	
			   <BoundingBox boxRef={boxRef} dimensions={containerSize} handleRef={handleRef}  /> 

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
		</div>
	)
}

function BoundingBox({ boxRef, handleRef, dimensions }) {
	
	//
	const [rect, setRect] = useState({
		left: 0,
		top: 0,
						xr: 0, 
						yr: 0, 
						width: dimensions.width, 
						height: dimensions.height });

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
							//		Lock edges 
							boxRef.current.style.width = `${width}px`;
							handleRef.current.style.transform = `translate(${x})`;
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

			newRect.width = Math.max(50, width - dx);
			liveRectRef.current = newRect;


			livePosRef.current = {
					x: startPosRef.current.x + dx,
					y: startPosRef.current.y + dy,
			};
		
		};


		const onMouseUp = () => {
				draggingRef.current = false;

				setPos({ ...livePosRef.current });

				console.log(handleRef);

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
						width: `${rect.width}px`, 
						tranform: `translate(${pos.x}px)`,
						border: "1px solid green",
						height: `${rect.height}px`,
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
								transform: `translate(${pos.x})`
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
